'use client'

import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image, Text, Environment } from '@react-three/drei'
import * as THREE from 'three'

const menuItems = [
    { name: 'Driftwood Burger', image: '/menus/beach-themed-restaurant-sports-grill-menu-layout.jpg', price: '$16' },
    { name: 'Fish Tacos', image: '/menus/coastal-restaurant-menu-salads-entrees-pastas-desserts.jpg', price: '$17' },
    { name: 'Coconut Shrimp', image: '/menus/coastal-brunch-menu-with-appetizers-and-cocktails.jpg', price: '$14' },
    { name: 'Coastal Cocktails', image: '/menus/coastal-cocktail-menu-driftwoods-restaurant-sports-grill.jpg', price: '$12' },
]

function CarouselCard({
    position,
    rotation,
    image,
    name,
    price,
    index,
    activeIndex,
    onHover
}: {
    position: [number, number, number]
    rotation: [number, number, number]
    image: string
    name: string
    price: string
    index: number
    activeIndex: number
    onHover: (index: number | null) => void
}) {
    const meshRef = useRef<THREE.Mesh>(null)
    const [hovered, setHovered] = useState(false)
    const isActive = index === activeIndex

    useFrame(() => {
        if (!meshRef.current) return
        const targetScale = hovered ? 1.15 : isActive ? 1.1 : 1
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    })

    return (
        <group position={position} rotation={rotation}>
            <mesh
                ref={meshRef}
                onPointerEnter={() => { setHovered(true); onHover(index) }}
                onPointerLeave={() => { setHovered(false); onHover(null) }}
            >
                <planeGeometry args={[2.5, 3.5]} />
                <meshStandardMaterial color={hovered ? '#ff8c42' : '#1a212f'} />
            </mesh>
            <Suspense fallback={null}>
                <Image
                    url={image}
                    position={[0, 0.3, 0.01]}
                    scale={[2.2, 2.2]}
                    transparent
                />
            </Suspense>
            <Text
                position={[0, -1.3, 0.01]}
                fontSize={0.18}
                color="#ede6df"
                anchorX="center"
                anchorY="middle"
                font="/fonts/inter-bold.woff"
            >
                {name}
            </Text>
            <Text
                position={[0, -1.55, 0.01]}
                fontSize={0.22}
                color="#dc6b26"
                anchorX="center"
                anchorY="middle"
                font="/fonts/inter-bold.woff"
            >
                {price}
            </Text>
        </group>
    )
}

function RotatingCarousel({ speed = 0.3 }: { speed?: number }) {
    const groupRef = useRef<THREE.Group>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    useFrame((state, delta) => {
        if (!groupRef.current || isPaused) return
        groupRef.current.rotation.y += delta * speed * 0.5

        // Calculate active index based on rotation
        const rotation = groupRef.current.rotation.y % (Math.PI * 2)
        const newIndex = Math.floor(((rotation + Math.PI / 4) / (Math.PI * 2)) * menuItems.length) % menuItems.length
        if (newIndex !== activeIndex && newIndex >= 0) {
            setActiveIndex(Math.abs(newIndex))
        }
    })

    const radius = 4

    return (
        <group ref={groupRef}>
            {menuItems.map((item, i) => {
                const angle = (i / menuItems.length) * Math.PI * 2
                const x = Math.sin(angle) * radius
                const z = Math.cos(angle) * radius

                return (
                    <CarouselCard
                        key={i}
                        position={[x, 0, z]}
                        rotation={[0, -angle, 0]}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                        index={i}
                        activeIndex={activeIndex}
                        onHover={(idx) => setIsPaused(idx !== null)}
                    />
                )
            })}
        </group>
    )
}

interface MenuCarousel3DProps {
    className?: string
}

export function MenuCarousel3D({ className = '' }: MenuCarousel3DProps) {
    const [isWebGLSupported, setIsWebGLSupported] = useState(true)
    const [isReducedMotion, setIsReducedMotion] = useState(false)

    useEffect(() => {
        // Check WebGL support
        try {
            const canvas = document.createElement('canvas')
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
            setIsWebGLSupported(!!gl)
        } catch {
            setIsWebGLSupported(false)
        }

        // Check reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setIsReducedMotion(mediaQuery.matches)
    }, [])

    // 2D Fallback for non-WebGL or reduced motion
    if (!isWebGLSupported || isReducedMotion) {
        return (
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-8 ${className}`}>
                {menuItems.map((item, i) => (
                    <div
                        key={i}
                        className="bg-dark-lighter rounded-xl p-4 text-center hover:scale-105 transition-transform"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h3 className="text-cream font-semibold">{item.name}</h3>
                        <p className="text-primary font-bold">{item.price}</p>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className={`w-full h-[500px] ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#dc6b26" />

                <RotatingCarousel />

                <Environment preset="city" />
            </Canvas>
        </div>
    )
}
