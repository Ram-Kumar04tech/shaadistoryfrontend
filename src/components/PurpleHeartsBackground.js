import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const HEART_COUNT = 20;

function createHeartShape() {
  const x = 0, y = 0;
  const heartShape = new THREE.Shape();
  heartShape.moveTo(x + 5, y + 5);
  heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
  return heartShape;
}

const PurpleHeartsBackground = () => {
  const mountRef = useRef();

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    mountRef.current.appendChild(renderer.domElement);

    const hearts = [];
    const heartGeometry = new THREE.ShapeGeometry(createHeartShape());
    for (let i = 0; i < HEART_COUNT; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: 0x8a70d6,
        transparent: true,
        opacity: 0.7 + Math.random() * 0.3,
      });
      const mesh = new THREE.Mesh(heartGeometry, material);
      mesh.scale.setScalar(0.7 + Math.random() * 0.7);
      mesh.position.x = (Math.random() - 0.5) * width / 10;
      mesh.position.y = (Math.random() - 0.5) * height / 10;
      mesh.position.z = Math.random() * -20;
      mesh.userData = {
        speed: 0.1 + Math.random() * 0.2,
        direction: Math.random() > 0.5 ? 1 : -1,
        float: Math.random() * Math.PI * 2,
      };
      scene.add(mesh);
      hearts.push(mesh);
    }

    let frameId;
    const animate = () => {
      hearts.forEach((heart) => {
        heart.position.y += heart.userData.speed * heart.userData.direction;
        heart.position.x += Math.sin(Date.now() * 0.001 + heart.userData.float) * 0.02;
        if (heart.position.y > height / 20) heart.position.y = -height / 20;
        if (heart.position.y < -height / 20) heart.position.y = height / 20;
      });
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default PurpleHeartsBackground;