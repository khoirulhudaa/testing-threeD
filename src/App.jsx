import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useState, useEffect } from "react";

export default function App() {
    const { scene } = useGLTF("/woman.glb"); // Memuat file GLB
    const [rotation, setRotation] = useState([0, 0, 0]);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const x = event.clientX - window.innerWidth / 2;
            const y = event.clientY - window.innerHeight / 2;

            const sensitivity = 0.005; // Semakin kecil, semakin lambat gerakannya
            const maxRotationX = Math.PI / 2; // 90 derajat dalam radian

            // Batasi rotasi pada sumbu X dan Y
            const newRotationX = Math.max(
                -maxRotationX,
                Math.min(maxRotationX, y * sensitivity)
            );
            const newRotationY = x * sensitivity;

            setRotation([newRotationX, newRotationY, 0]);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="w-screen h-[90vh]">
            <Canvas>
                <ambientLight intensity={6} />
                <directionalLight position={[10, 10, 5]} intensity={12} />
                <OrbitControls />
                <primitive object={scene} rotation={rotation} />
            </Canvas>
        </div>
    );
}