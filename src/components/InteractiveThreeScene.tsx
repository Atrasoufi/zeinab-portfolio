import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Sparkles } from 'lucide-react';
import { NeonButterfly } from './NeonButterfly';
import { Language } from '../data/translations';

interface InteractiveThreeSceneProps {
  lang: Language;
}

export const InteractiveThreeScene: React.FC<InteractiveThreeSceneProps> = ({ lang }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const mediaQuery =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;

    let reducedMotion = mediaQuery ? mediaQuery.matches : false;
    setPrefersReducedMotion(reducedMotion);

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 1. Scene, Camera, Renderer (guarded against WebGL unavailability)
    const scene = new THREE.Scene();

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 4.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglUnavailable(true);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // 2. Studio Environment Reflection via RoomEnvironment (retain render target for disposal)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnvironment = new RoomEnvironment();
    const envRenderTarget = pmremGenerator.fromScene(roomEnvironment, 0.04);
    scene.environment = envRenderTarget.texture;
    roomEnvironment.dispose();
    pmremGenerator.dispose();

    // 3. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x1a0a2a, 1.5);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xff85c0, 0x08040d, 1.8);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffd1e3, 3.2);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xb84dff, 2.5);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    // 4. Composite 3D Procedural Subject (10 distinct parts in a hierarchical THREE.Group)
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Part 1: Outer Translucent Glass Orb
    const orbGeometry = new THREE.SphereGeometry(1.2, isSoftwareGl ? 32 : 48, isSoftwareGl ? 32 : 48);
    const orbMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2a103c,
      metalness: 0.1,
      roughness: 0.1,
      transmission: isSoftwareGl ? 0 : 0.88,
      transparent: true,
      opacity: isSoftwareGl ? 0.35 : 0.95,
      ior: 1.48,
      thickness: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      attenuationColor: new THREE.Color(0xff85c0),
      attenuationDistance: 1.8,
      depthWrite: false,
    });
    const glassOrb = new THREE.Mesh(orbGeometry, orbMaterial);
    rootGroup.add(glassOrb);

    // Butterfly Subgroup inside the Orb
    const butterflyGroup = new THREE.Group();
    butterflyGroup.scale.set(0.65, 0.65, 0.65);
    rootGroup.add(butterflyGroup);

    // Part 2: Butterfly Thorax & Head
    const thoraxGeo = new THREE.CapsuleGeometry(0.09, 0.42, 8, 16);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x160826,
      metalness: 0.85,
      roughness: 0.25,
      emissive: new THREE.Color(0xf12d91),
      emissiveIntensity: 0.4,
    });
    const thorax = new THREE.Mesh(thoraxGeo, bodyMat);
    thorax.rotation.x = Math.PI / 12;
    butterflyGroup.add(thorax);

    // Part 3: Butterfly Head with glowing eye visor
    const headGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x3d124e,
      metalness: 0.9,
      roughness: 0.15,
      emissive: new THREE.Color(0x00ffcc),
      emissiveIntensity: 0.8,
    });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.set(0, 0.28, 0.08);
    butterflyGroup.add(head);

    // Parts 4 & 5: Antennae
    const curveLeft = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.32, 0.08),
      new THREE.Vector3(0.08, 0.45, 0.15),
      new THREE.Vector3(0.18, 0.55, 0.18),
    ]);
    const antennaGeoLeft = new THREE.TubeGeometry(curveLeft, 12, 0.012, 8, false);
    const antennaMat = new THREE.MeshStandardMaterial({
      color: 0xff85c0,
      emissive: 0xff85c0,
      emissiveIntensity: 0.9,
      roughness: 0.2,
    });
    const antennaLeft = new THREE.Mesh(antennaGeoLeft, antennaMat);
    butterflyGroup.add(antennaLeft);

    const curveRight = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.32, 0.08),
      new THREE.Vector3(-0.08, 0.45, 0.15),
      new THREE.Vector3(-0.18, 0.55, 0.18),
    ]);
    const antennaGeoRight = new THREE.TubeGeometry(curveRight, 12, 0.012, 8, false);
    const antennaRight = new THREE.Mesh(antennaGeoRight, antennaMat);
    butterflyGroup.add(antennaRight);

    // Shared Procedural Wing Geometries
    function createWingShape(isForewing: boolean) {
      const shape = new THREE.Shape();
      if (isForewing) {
        shape.moveTo(0, 0);
        shape.bezierCurveTo(0.2, 0.4, 0.8, 0.9, 1.2, 0.7);
        shape.bezierCurveTo(1.4, 0.5, 1.1, 0.1, 0.7, -0.2);
        shape.bezierCurveTo(0.4, -0.3, 0.1, -0.1, 0, 0);
      } else {
        shape.moveTo(0, 0);
        shape.bezierCurveTo(0.2, -0.1, 0.7, -0.1, 0.85, -0.5);
        shape.bezierCurveTo(0.9, -0.8, 0.4, -0.85, 0.2, -0.55);
        shape.bezierCurveTo(0.1, -0.4, 0.05, -0.2, 0, 0);
      }
      return new THREE.ShapeGeometry(shape, 24);
    }

    const forewingGeo = createWingShape(true);
    const hindwingGeo = createWingShape(false);

    const wingMatPink = new THREE.MeshStandardMaterial({
      color: 0xff4db8,
      emissive: 0xf12d91,
      emissiveIntensity: 0.6,
      metalness: 0.3,
      roughness: 0.35,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });

    const wingMatPurple = new THREE.MeshStandardMaterial({
      color: 0x9333ea,
      emissive: 0xb84dff,
      emissiveIntensity: 0.5,
      metalness: 0.3,
      roughness: 0.35,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });

    // Parts 6 & 7: Left Forewing & Hindwing
    const leftWingGroup = new THREE.Group();
    leftWingGroup.position.set(0.04, 0.05, 0);
    leftWingGroup.add(new THREE.Mesh(forewingGeo, wingMatPink));
    leftWingGroup.add(new THREE.Mesh(hindwingGeo, wingMatPurple));
    butterflyGroup.add(leftWingGroup);

    // Parts 8 & 9: Right Forewing & Hindwing
    const rightWingGroup = new THREE.Group();
    rightWingGroup.position.set(-0.04, 0.05, 0);
    const rightForewingMesh = new THREE.Mesh(forewingGeo, wingMatPink);
    rightForewingMesh.scale.x = -1;
    rightWingGroup.add(rightForewingMesh);

    const rightHindwingMesh = new THREE.Mesh(hindwingGeo, wingMatPurple);
    rightHindwingMesh.scale.x = -1;
    rightWingGroup.add(rightHindwingMesh);
    butterflyGroup.add(rightWingGroup);

    // Part 10: Outer Metallic Gyro Ring
    const ringGeo = new THREE.TorusGeometry(1.35, 0.02, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xff85c0,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0xf12d91,
      emissiveIntensity: 0.3,
    });
    const gyroRing = new THREE.Mesh(ringGeo, ringMat);
    gyroRing.rotation.x = Math.PI / 3;
    rootGroup.add(gyroRing);

    let mouseX = 0;
    let mouseY = 0;
    let scrollRotationOffset = 0;
    let elapsedTime = 0;
    const clock = new THREE.Clock();

    let frameId = 0;
    let isDisposed = false;
    let isPageHidden = typeof document !== 'undefined' ? document.hidden : false;
    let isInViewport = true;

    const applyStaticPose = () => {
      leftWingGroup.rotation.y = 0.28;
      rightWingGroup.rotation.y = -0.28;
      butterflyGroup.position.y = 0;
      rootGroup.rotation.set(0.08, -0.35, 0);
      gyroRing.rotation.set(Math.PI / 3, 0.25, 0);
    };

    const renderStaticFrame = () => {
      if (isDisposed) return;
      applyStaticPose();
      renderer.render(scene, camera);
    };

    const stopLoop = () => {
      if (frameId !== 0) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const canAnimate = () => !isDisposed && !reducedMotion && !isPageHidden && isInViewport;

    const tick = () => {
      frameId = 0;
      if (!canAnimate()) return;

      const delta = Math.min(clock.getDelta(), 0.05);
      elapsedTime += delta;

      const flapAngle = Math.sin(elapsedTime * 6.5) * 0.45;
      leftWingGroup.rotation.y = flapAngle;
      rightWingGroup.rotation.y = -flapAngle;

      gyroRing.rotation.z += delta * 0.7;
      gyroRing.rotation.y += delta * 0.45;

      butterflyGroup.position.y = Math.sin(elapsedTime * 2.2) * 0.08;

      const targetY = mouseX * 0.8 + scrollRotationOffset + elapsedTime * 0.35;
      const targetX = -(mouseY * 0.5) + Math.sin(elapsedTime * 1.5) * 0.08;

      const dampFactor = 1 - Math.exp(-4 * delta);
      rootGroup.rotation.y += (targetY - rootGroup.rotation.y) * dampFactor;
      rootGroup.rotation.x += (targetX - rootGroup.rotation.x) * dampFactor;

      renderer.render(scene, camera);

      if (canAnimate()) {
        frameId = requestAnimationFrame(tick);
      }
    };

    const syncPlaybackState = () => {
      if (canAnimate()) {
        if (frameId === 0) {
          clock.getDelta();
          frameId = requestAnimationFrame(tick);
        }
      } else {
        stopLoop();
        if (reducedMotion) {
          renderStaticFrame();
        }
      }
    };

    // Mouse movement response
    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion) return;
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    container.addEventListener('mousemove', handleMouseMove);

    // Scroll response
    const handleScroll = () => {
      if (reducedMotion) return;
      scrollRotationOffset = (window.scrollY || 0) * 0.0025;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Window resize
    const handleResize = () => {
      if (!container || isDisposed) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (reducedMotion) {
        renderStaticFrame();
      }
    };
    window.addEventListener('resize', handleResize);

    // Visibility pause when tab is hidden
    const handleVisibilityChange = () => {
      isPageHidden = document.hidden;
      syncPlaybackState();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Live reduced-motion preference updates
    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
      setPrefersReducedMotion(reducedMotion);
      syncPlaybackState();
    };
    if (mediaQuery) {
      if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', handleMotionChange);
      } else if (typeof mediaQuery.addListener === 'function') {
        mediaQuery.addListener(handleMotionChange);
      }
    }

    // Pause animation when scrolled offscreen
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          isInViewport = entry.isIntersecting;
          syncPlaybackState();
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    }

    // Start initial frame or animation
    if (reducedMotion) {
      renderStaticFrame();
    } else {
      syncPlaybackState();
    }

    // Cleanup
    return () => {
      isDisposed = true;
      stopLoop();

      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (observer) {
        observer.disconnect();
      }
      if (mediaQuery) {
        if (typeof mediaQuery.removeEventListener === 'function') {
          mediaQuery.removeEventListener('change', handleMotionChange);
        } else if (typeof mediaQuery.removeListener === 'function') {
          mediaQuery.removeListener(handleMotionChange);
        }
      }

      // Dispose all GPU resources
      scene.environment = null;
      envRenderTarget.dispose();
      orbGeometry.dispose();
      orbMaterial.dispose();
      thoraxGeo.dispose();
      bodyMat.dispose();
      headGeo.dispose();
      headMat.dispose();
      antennaGeoLeft.dispose();
      antennaGeoRight.dispose();
      antennaMat.dispose();
      forewingGeo.dispose();
      hindwingGeo.dispose();
      wingMatPink.dispose();
      wingMatPurple.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const isRtl = lang === 'fa';

  return (
    <div
      className="relative glass-panel rounded-3xl p-5 border border-[#F12D91]/35 shadow-[0_0_35px_rgba(241,45,145,0.25)] flex flex-col justify-between overflow-hidden group"
    >
      {/* Header Info */}
      <div className="flex items-center justify-between mb-2 z-10">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-[#221332] border border-[#F12D91]/40 text-[#FF85C0]">
            <Sparkles size={16} aria-hidden="true" />
          </span>
          <div>
            <h4 className="text-sm font-bold text-white font-['Outfit']">
              {isRtl ? 'اکوسیستم سه‌بعدی نئون' : 'Interactive 3D Core'}
            </h4>
            <span className="text-[10px] font-mono text-[#D58BFF]">
              {webglUnavailable
                ? isRtl
                  ? 'نمای ایستا (WebGL در دسترس نیست)'
                  : 'Static Fallback · Vector Core'
                : 'Three.js PBR · Procedural Shaders'}
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full bg-[#160D20] border border-[#B84DFF]/30 text-[10px] font-mono text-[#FF85C0]">
          {webglUnavailable ? 'SVG' : prefersReducedMotion ? 'Static' : 'WebGL'}
        </span>
      </div>

      {/* 3D Canvas Mount Point or Static Fallback */}
      {webglUnavailable ? (
        <div
          role="img"
          aria-label={isRtl ? 'نمای ایستا از پروانه نئونی سه‌بعدی' : 'Static fallback illustration of neon butterfly core'}
          className="w-full h-56 sm:h-64 flex flex-col items-center justify-center relative rounded-2xl bg-gradient-to-b from-[#160D20]/60 to-[#0B0612]/80 border border-[#F12D91]/20"
        >
          <div className="w-32 h-32 rounded-full bg-[#2A103C]/40 border border-[#FF85C0]/40 shadow-[0_0_40px_rgba(241,45,145,0.3)] flex items-center justify-center">
            <NeonButterfly size={64} glow={!prefersReducedMotion} />
          </div>
          <span className="mt-3 text-[11px] font-mono text-[#BDA9C9]">
            {isRtl ? 'نمایش ایستا برای سازگاری با مرورگر' : 'Static mode active (WebGL unavailable)'}
          </span>
        </div>
      ) : (
        <div
          ref={mountRef}
          className={`w-full h-56 sm:h-64 flex items-center justify-center relative ${
            prefersReducedMotion ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
          }`}
          title={
            prefersReducedMotion
              ? isRtl
                ? 'حالت حرکت کاهش‌یافته فعال است'
                : 'Reduced motion mode active'
              : isRtl
              ? 'برای چرخش ماوس را روی کره حرکت دهید'
              : 'Move cursor over sphere to inspect 3D orientation'
          }
        />
      )}

      {/* Footer Navigation Cue */}
      <div className="pt-2 border-t border-[#F12D91]/20 flex items-center justify-between text-[11px] font-mono text-[#BDA9C9] z-10">
        <span>
          {prefersReducedMotion
            ? isRtl
              ? 'حالت حرکت کاهش‌یافته (ایستا)'
              : 'Reduced Motion Static View'
            : isRtl
            ? 'پاسخگو به حرکت ماوس و اسکرول'
            : 'Mouse & Scroll Reactive'}
        </span>
        <span className="text-[#FF85C0]">10-Part Composite</span>
      </div>
    </div>
  );
};
