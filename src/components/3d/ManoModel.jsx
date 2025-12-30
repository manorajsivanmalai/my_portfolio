import React, { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function Model() {
  const ref = useRef()
  const { scene } = useGLTF('/models/mano3d-hoodie.glb')

  useEffect(() => {
    if (!scene) return
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true

        // If material is not standard, replace with MeshStandardMaterial preserving maps
        const mat = child.material
        if (!mat || !mat.isMeshStandardMaterial) {
          const newMat = new THREE.MeshStandardMaterial()
          if (mat && mat.map) newMat.map = mat.map
          if (mat && mat.emissiveMap) newMat.emissiveMap = mat.emissiveMap
          if (mat && mat.emissive) newMat.emissive = mat.emissive
          newMat.needsUpdate = true
          child.material = newMat
        }
      }
    })
  }, [scene])

  useFrame(() => {
    if (ref.current && ref.current.rotation.y>-1.6) {
        ref.current.rotation.y -= 0.03
    }
  })

  return <primitive ref={ref} object={scene} position={[0,-1.1,-.1]} scale={2.3} rotation={[0,0,0]} dispose={null} />
}

// Rotating spotlight component
function RotatingSpot() {
  const spotlightRef = useRef();


//   useFrame(() => {

//    if (spotlightRef.current) {
//       const time = Date.now() * 0.0003; // time in seconds
//       // Using sine and cosine to move the spotlight in a circle around the Y-axis
//       spotlightRef.current.position.x = Math.sin(time) * 3; // Circular motion on X-axis
//       spotlightRef.current.position.z = Math.cos(time) * 3; // Circular motion on Z-axis
//       spotlightRef.current.lookAt(0, 0, 0); // Keep spotlight focused on the center (optional)
//     }
//   });
 

  return (
    <>
      <spotLight
        ref={spotlightRef}
        position={[-4, -4, 5]}
        // position={[-4, 3, 2]}
        angle={0.2}
        penumbra={.2}
        intensity={500}
        castShadow
      />
    </>
  );
}

// Strong point light placed in front of the model to clearly illuminate the face
function FrontFaceLight() {
  const ref = useRef()

  useEffect(() => {
    if (!ref.current) return
    ref.current.castShadow = true
    ref.current.shadow.mapSize.set(2048, 2048)
    ref.current.shadow.bias = -0.0006
    ref.current.shadow.radius = 2
  }, [])

  // Position is tuned to be in front of the model's face. Adjust if needed.
  return (
    <pointLight
      ref={ref}
      color="#ffffff"
      intensity={15}
      position={[0,.6,1]}
      distance={30}
      decay={2}
      castShadow
    />
  )
}

export default function ManoModel(props) {
    
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 45 }} style={{ width: '100%', height: '100%' }} shadows gl={{ antialias: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 0]} intensity={0.6} />
      {/* <directionalLight position={[0, 0, 0]} intensity={0.3} /> */}
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      {/* rotating spotlight that orbits the model and targets it for a moving highlight */}
      <RotatingSpot />
      <FrontFaceLight />
      <OrbitControls 
       enableZoom={false} 
       enablePan={false}
       maxPolarAngle={Math.PI / 2}
       minPolarAngle={Math.PI / 2} 
    />
    </Canvas>
  )
}

useGLTF.preload('/models/mano3d-hoodie.glb')
