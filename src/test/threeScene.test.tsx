import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';

const mockState = vi.hoisted(() => ({
  shouldThrowRenderer: false,
  disposedGeometries: 0,
  disposedMaterials: 0,
  disposedEnvTarget: 0,
  disposedRoomEnv: 0,
  disposedPmrem: 0,
  disposedRenderer: 0,
  renderCalls: 0,
}));

vi.mock('three/examples/jsm/environments/RoomEnvironment.js', () => ({
  RoomEnvironment: class MockRoomEnvironment {
    dispose() {
      mockState.disposedRoomEnv += 1;
    }
  },
}));

vi.mock('three', () => {
  class Disposable {
    dispose() {
      mockState.disposedGeometries += 1;
    }
  }
  class MockMaterial {
    dispose() {
      mockState.disposedMaterials += 1;
    }
  }
  class MockObject3D {
    position = { x: 0, y: 0, z: 0, set: vi.fn() };
    rotation = { x: 0, y: 0, z: 0, set: vi.fn() };
    scale = { x: 1, y: 1, z: 1, set: vi.fn() };
    add = vi.fn();
  }

  return {
    Scene: class MockScene extends MockObject3D {
      environment: unknown = null;
    },
    PerspectiveCamera: class MockCamera extends MockObject3D {
      aspect = 1;
      updateProjectionMatrix = vi.fn();
    },
    WebGLRenderer: class MockWebGLRenderer {
      domElement = document.createElement('canvas');
      outputColorSpace = '';
      toneMapping = 0;
      toneMappingExposure = 1;
      constructor() {
        if (mockState.shouldThrowRenderer) {
          throw new Error('WebGL unsupported');
        }
      }
      setSize = vi.fn();
      setPixelRatio = vi.fn();
      render = vi.fn(() => {
        mockState.renderCalls += 1;
      });
      dispose = vi.fn(() => {
        mockState.disposedRenderer += 1;
      });
    },
    PMREMGenerator: class MockPMREMGenerator {
      fromScene() {
        return {
          texture: { isTexture: true },
          dispose: () => {
            mockState.disposedEnvTarget += 1;
          },
        };
      }
      dispose() {
        mockState.disposedPmrem += 1;
      }
    },
    AmbientLight: class extends MockObject3D {},
    HemisphereLight: class extends MockObject3D {},
    DirectionalLight: class extends MockObject3D {},
    Group: class extends MockObject3D {},
    SphereGeometry: class extends Disposable {},
    CapsuleGeometry: class extends Disposable {},
    TubeGeometry: class extends Disposable {},
    ShapeGeometry: class extends Disposable {},
    TorusGeometry: class extends Disposable {},
    MeshPhysicalMaterial: class extends MockMaterial {},
    MeshStandardMaterial: class extends MockMaterial {},
    Mesh: class extends MockObject3D {},
    Color: class {},
    Vector3: class {
      constructor(public x = 0, public y = 0, public z = 0) {}
    },
    CatmullRomCurve3: class {},
    Shape: class {
      moveTo = vi.fn();
      bezierCurveTo = vi.fn();
    },
    Clock: class {
      getDelta() {
        return 0.016;
      }
    },
    SRGBColorSpace: 'srgb',
    ACESFilmicToneMapping: 4,
    DoubleSide: 2,
  };
});

import { InteractiveThreeScene } from '../components/InteractiveThreeScene';

describe('InteractiveThreeScene lifecycle, reduced motion, and WebGL fallback', () => {
  beforeEach(() => {
    mockState.shouldThrowRenderer = false;
    mockState.disposedGeometries = 0;
    mockState.disposedMaterials = 0;
    mockState.disposedEnvTarget = 0;
    mockState.disposedRoomEnv = 0;
    mockState.disposedPmrem = 0;
    mockState.disposedRenderer = 0;
    mockState.renderCalls = 0;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('disposes all Three.js geometries, materials, PMREM render target, and cancels rAF on unmount', () => {
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 42);
    const cafSpy = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

    const { unmount } = render(<InteractiveThreeScene lang="en" />);

    expect(rafSpy).toHaveBeenCalledTimes(1);
    expect(mockState.disposedRoomEnv).toBe(1);
    expect(mockState.disposedPmrem).toBe(1);

    unmount();

    expect(cafSpy).toHaveBeenCalledWith(42);
    expect(mockState.disposedEnvTarget).toBe(1);
    expect(mockState.disposedRenderer).toBe(1);
    expect(mockState.disposedGeometries).toBeGreaterThanOrEqual(8);
    expect(mockState.disposedMaterials).toBeGreaterThanOrEqual(7);
  });

  it('stops rAF loop and renders a static frame when prefers-reduced-motion is enabled or toggled live', () => {
    let changeHandler: ((e: MediaQueryListEvent) => void) | null = null;
    vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: (_event: string, cb: EventListenerOrEventListenerObject) => {
        changeHandler = cb as (e: MediaQueryListEvent) => void;
      },
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 99);
    const cafSpy = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

    render(<InteractiveThreeScene lang="en" />);

    // Reduced motion active on mount: no rAF loop scheduled, single static render executed
    expect(rafSpy).not.toHaveBeenCalled();
    expect(mockState.renderCalls).toBe(1);
    expect(screen.getByText('Reduced Motion Static View')).toBeInTheDocument();

    // Dynamically disable reduced motion -> animation loop starts
    act(() => {
      changeHandler?.({ matches: false } as MediaQueryListEvent);
    });
    expect(rafSpy).toHaveBeenCalledTimes(1);

    // Dynamically re-enable reduced motion -> animation loop cancels and static frame renders
    act(() => {
      changeHandler?.({ matches: true } as MediaQueryListEvent);
    });
    expect(cafSpy).toHaveBeenCalledWith(99);
    expect(mockState.renderCalls).toBe(2);
  });

  it('renders static SVG fallback gracefully when WebGL initialization fails', () => {
    mockState.shouldThrowRenderer = true;

    render(<InteractiveThreeScene lang="en" />);

    expect(screen.getByText(/Static mode active \(WebGL unavailable\)/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Static fallback illustration/i })).toBeInTheDocument();
  });
});
