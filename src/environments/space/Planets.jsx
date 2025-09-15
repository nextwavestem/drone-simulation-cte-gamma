/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */

import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

// Planet	Radius 	Distance from Sun
// Mercury	2,440	57.9	
// Venus	6,052	108.2	
// Earth	6,371	149.6	
// Mars	    3,390	227.9	
// Jupiter	69,911	778.5	
// Saturn	58,232	1,434	
// Uranus	25,362	2,871	
// Neptune	24,622	4,495	
// Sun      696,340


export const Sun = () => {
    const sunRef = useRef();

    useFrame(() => {
        sunRef.current.rotation.y += 0.001;
        sunRef.current.rotation.x += 0.00001;
    })

    const texture = useTexture('assets/textures/sun.jpg')

    return (
        <group>
            <mesh ref={sunRef} position={[0, 0, -750]}>   {/* x y x */}
                <sphereGeometry args={[650, 100, 100]} /> {/* radius axis axis */}
                <meshStandardMaterial map={texture} />
            </mesh>
        </group>
    )
}

export const Mercury = () => {
    const merRef = useRef();

    useFrame(() => {
        merRef.current.rotation.y += 0.001;
        merRef.current.rotation.x += 0.00001;
    })

    const texture = useTexture('assets/textures/mercury.jpg')

    return (
        <group>
            <mesh ref={merRef} position={[-10, 0, 57.9]}>   {/* x y x */}
                <sphereGeometry args={[2.4, 100, 100]} /> {/* radius axis axis */}
                <meshStandardMaterial map={texture} />
            </mesh>
        </group>
    )
}

export const Venus = () => {
    const venusRef = useRef();

    useFrame(() => {
        venusRef.current.rotation.y += 0.001;
        venusRef.current.rotation.x += 0.00001;
    })

    const texture = useTexture('assets/textures/venus.jpg')

    return (
        <group>
            <mesh ref={venusRef} position={[-5, 0, 108.2]}>   {/* x y x */}
                <sphereGeometry args={[6, 100, 100]} /> {/* radius axis axis */}
                <meshStandardMaterial map={texture} />
            </mesh>
        </group>
    )
}

export const Mars = () => {
    const marsRef = useRef();

    useFrame(() => {
        marsRef.current.rotation.y += 0.001;
        marsRef.current.rotation.x += 0.00001;
    })

    const texture = useTexture('assets/textures/mars.jpg')

    return (
        <group>
            <mesh ref={marsRef} position={[20, 0, 227.9]}>   {/* x y x */}
                <sphereGeometry args={[3.3, 100, 100]} /> {/* radius axis axis */}
                <meshStandardMaterial map={texture} />
            </mesh>
        </group>
    )
}

export const Jupiter = () => {
    const jupiterRef = useRef();

    useFrame(() => {
        jupiterRef.current.rotation.y += 0.001;
        jupiterRef.current.rotation.x += 0.00001;
    })

    const texture = useTexture('assets/textures/jupiter.jpg')

    return (
        <group>
            <mesh ref={jupiterRef} position={[60, 0, 778.5]}>   {/* x y x */}
                <sphereGeometry args={[69.9, 100, 100]} /> {/* radius axis axis */}
                <meshStandardMaterial map={texture} />
            </mesh>
        </group>
    )
}

export const Saturn = () => {
    const saturnref = useRef();

    useFrame(() => {
        saturnref.current.rotation.y += 0.001;
        saturnref.current.rotation.x += 0.00001;
    })

    const texture = useTexture('assets/textures/saturn.jpg')

    return (
        <group>
            <mesh ref={saturnref} position={[550, 0, 1434]}>   {/* x y x */}
                <sphereGeometry args={[58.2, 100, 100]} /> {/* radius axis axis */}
                <meshStandardMaterial map={texture} />
            </mesh>
        </group>
    )
}

export const Uranus = () => {
    const uranusRef = useRef();

    useFrame(() => {
        uranusRef.current.rotation.y += 0.001;
        uranusRef.current.rotation.x += 0.00001;
    })

    const texture = useTexture('assets/textures/uranus.jpg')

    return (
        <group>
            <mesh ref={uranusRef} position={[0, 0, 2871]}>   {/* x y x */}
                <sphereGeometry args={[25.3, 100, 100]} /> {/* radius axis axis */}
                <meshStandardMaterial map={texture} />
            </mesh>
        </group>
    )
}

export const Neptune = () => {
    const neptuneRef = useRef();

    useFrame(() => {
        neptuneRef.current.rotation.y += 0.001;
        neptuneRef.current.rotation.x += 0.00001;
    })

    const texture = useTexture('assets/textures/neptune.jpg')

    return (
        <group>
            <mesh ref={neptuneRef} position={[0, 0, 4495]}>   {/* x y x */}
                <sphereGeometry args={[24.6, 100, 100]} /> {/* radius axis axis */}
                <meshStandardMaterial map={texture} />
            </mesh>
        </group>
    )
}