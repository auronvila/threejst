import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Cube: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Initialize Three.js
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Create a geometry (shape) for the cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);

        // Create a material and set its color
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        // Create a mesh using the geometry and material
        const cube = new THREE.Mesh(geometry, material);

        // Add the cube to the scene
        scene.add(cube);

        // Set the initial position of the camera
        camera.position.z = 5;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate the cube
            if (cube.rotation.x < Math.PI * 2) cube.rotation.x += 0.01;
            else cube.rotation.x = 0;

            if (cube.rotation.y < Math.PI * 2) cube.rotation.y += 0.01;
            else cube.rotation.y = 0;

            // Render the scene with the camera
            renderer.render(scene, camera);
        };

        // Start the animation loop
        animate();

        // Clean up Three.js resources when the component unmounts
        return () => {
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} />;
};

export default Cube;
