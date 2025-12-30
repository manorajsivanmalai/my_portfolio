import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const ComputerModel = () => {
  const { scene } = useGLTF('/models/gaming_room.glb'); 
  const { viewport } = useThree();

  scene.traverse((child) => {
  console.log(child.name);
});
  
  return <primitive object={scene} scale={viewport.width < 6 ? 0.7 : 1}  position={[.1, -4, 0]} rotation={[0, -0.7, 0]} />;
}
export default ComputerModel