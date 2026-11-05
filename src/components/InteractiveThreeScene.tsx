import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Eye, RotateCcw, Sparkles } from 'lucide-react';
import { Language } from '../data/translations';

interface InteractiveThreeSceneProps {
  lang: Language;
}

export const InteractiveThreeScene: React.FC<InteractiveThreeSceneProps> = ({ lang }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

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

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 4.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // 2. Studio Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
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
    // Concept: Floating Translucent Glass Orb enclosing a delicate Cybernetic Neon Butterfly
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Part 1: Outer Translucent Glass Orb (MeshPhysicalMaterial)
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

    // Parts 4 & 5: Antennae (Curved tubes)
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

    // Procedural Wing Geometry Builder
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

    // Part 6 & 7: Left & Right Forewings
    const leftWingGroup = new THREE.Group();
    leftWingGroup.position.set(0.04, 0.05, 0);
    const leftForewingMesh = new THREE.Mesh(createWingShape(true), wingMatPink);
    leftWingGroup.add(leftForewingMesh);

    // Part 8: Left Hindwing
    const leftHindwingMesh = new THREE.Mesh(createWingShape(false), wingMatPurple);
    leftWingGroup.add(leftHindwingMesh);
    butterflyGroup.add(leftWingGroup);

    const rightWingGroup = new THREE.Group();
    rightWingGroup.position.set(-0.04, 0.05, 0);
    const rightForewingMesh = new THREE.Mesh(createWingShape(true), wingMatPink);
    rightForewingMesh.scale.x = -1;
    rightWingGroup.add(rightForewingMesh);

    // Part 9: Right Hindwing
    const rightHindwingMesh = new THREE.Mesh(createWingShape(false), wingMatPurple);
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

    // Pre-allocated math scratch variables for zero GC in render loop
    const _targetRotation = new THREE.Euler();
    let mouseX = 0;
    let mouseY = 0;
    let clock = new THREE.Clock();

    // Mouse movement response
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
    };
    container.addEventListener('mousemove', handleMouseMove);

    // Scroll response
    let scrollRotationOffset = 0;
    const handleScroll = () => {
      scrollRotationOffset = (window.scrollY || 0) * 0.0025;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Window resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 5. Render Loop with Exponential Damping & Soft Flapping
    let frameId = 0;

    const tick = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Wing flapping physics (sinusoidal flap cycle)
      const flapAngle = Math.sin(time * 6.5) * 0.45;
      leftWingGroup.rotation.y = flapAngle;
      rightWingGroup.rotation.y = -flapAngle;

      // Gyro Ring Orbit
      gyroRing.rotation.z += 0.012;
      gyroRing.rotation.y += 0.008;

      // Gentle floating bob
      butterflyGroup.position.y = Math.sin(time * 2.2) * 0.08;

      // Target rotation based on mouse, scroll, and base spin
      const targetY = (mouseX * 0.8) + scrollRotationOffset + (time * 0.35);
      const targetX = -(mouseY * 0.5) + (Math.sin(time * 1.5) * 0.08);

      // Exponential damping: 1 - Math.exp(-k * dt)
      const dampFactor = 1 - Math.exp(-4 * delta);
      rootGroup.rotation.y += (targetY - rootGroup.rotation.y) * dampFactor;
      rootGroup.rotation.x += (targetX - rootGroup.rotation.x) * dampFactor;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      // Dispose geometries & materials
      orbGeometry.dispose();
      orbMaterial.dispose();
      thoraxGeo.dispose();
      bodyMat.dispose();
      headGeo.dispose();
      headMat.dispose();
      antennaGeoLeft.dispose();
      antennaGeoRight.dispose();
      antennaMat.dispose();
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
              Three.js PBR · Procedural Shaders
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full bg-[#160D20] border border-[#B84DFF]/30 text-[10px] font-mono text-[#FF85C0]">
          WebGL
        </span>
      </div>

      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className="w-full h-56 sm:h-64 flex items-center justify-center cursor-grab active:cursor-grabbing relative"
        title={isRtl ? 'برای چرخش ماوس را روی کره حرکت دهید' : 'Move cursor over sphere to inspect 3D orientation'}
      />

      {/* Footer Navigation Cue */}
      <div className="pt-2 border-t border-[#F12D91]/20 flex items-center justify-between text-[11px] font-mono text-[#BDA9C9] z-10">
        <span>{isRtl ? 'پاسخگو به حرکت ماوس و اسکرول' : 'Mouse & Scroll Reactive'}</span>
        <span className="text-[#FF85C0]">10-Part Composite</span>
      </div>
    </div>
  );
};
