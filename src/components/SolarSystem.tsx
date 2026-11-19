import { useEffect, useRef } from 'react';
import { createEngine } from '@/three/engine';

const SolarSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !labelsRef.current) return;
    return createEngine(canvasRef.current, labelsRef.current);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-label="Interactive 3D model of the Solar System"
        style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 1, display: 'block' }}
      />
      <div ref={labelsRef} className="label-layer" aria-label="Body labels" />
    </>
  );
};

export default SolarSystem;
