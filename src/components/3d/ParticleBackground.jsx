import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Import all tech icons
import ReactIcon from "../../assets/images/tech-icons/React.svg";
import NodeIcon from "../../assets/images/tech-icons/Node.js.svg";
import JSIcon from "../../assets/images/tech-icons/JavaScript.svg";
import PGIcon from "../../assets/images/tech-icons/PostgresSQL.svg";
import JavaIcon from "../../assets/images/tech-icons/Java.svg";
import PythonIcon from "../../assets/images/tech-icons/Python.svg";
import CSSIcon from "../../assets/images/tech-icons/CSS3.svg";
import ThreeIcon from "../../assets/images/tech-icons/Three.js.svg";
import MySQLIcon from "../../assets/images/tech-icons/MySQL.svg";
import NPMIcon from "../../assets/images/tech-icons/NPM.svg";
import VSCodeIcon from "../../assets/images/tech-icons/Visual Studio Code (VS Code).svg";
import IntelliJIcon from "../../assets/images/tech-icons/IntelliJ IDEA.svg";
import Docker from "../../assets/images/tech-icons/Docker.svg";
import Bootsrap from "../../assets/images/tech-icons/Bootstrap.svg";
import Github from "../../assets/images/tech-icons/GitHub.svg";
import GC from "../../assets/images/tech-icons/Google Cloud.svg";
import Linux from "../../assets/images/tech-icons/Linux.svg";
import Matplotlib from "../../assets/images/tech-icons/Matplotlib.svg";
import Mssql from "../../assets/images/tech-icons/Microsoft SQL Server.svg";
import MongoDB from "../../assets/images/tech-icons/MongoDB.svg";
import NGINX from "../../assets/images/tech-icons/NGINX.svg";
import Postman from "../../assets/images/tech-icons/Postman.svg";
import Selenium from "../../assets/images/tech-icons/Selenium.svg";
import fastAPI from "../../assets/images/tech-icons/FastAPI.svg";
import { useAnimations, useGLTF } from "@react-three/drei";

// Tech icons with their positions and initial velocities
const TECH_ICONS = [
  { name: "React", icon: ReactIcon },
  { name: "Node.js", icon: NodeIcon },
  { name: "JavaScript", icon: JSIcon },
  { name: "PostgreSQL", icon: PGIcon },
  { name: "Java", icon: JavaIcon },
  { name: "Python", icon: PythonIcon },
  { name: "CSS3", icon: CSSIcon },
  { name: "Three.js", icon: ThreeIcon },
  { name: "MySQL", icon: MySQLIcon },
  { name: "NPM", icon: NPMIcon },
  { name: "VS Code", icon: VSCodeIcon },
  { name: "IntelliJ IDEA", icon: IntelliJIcon },
  { name: "Docker", icon: Docker },
  { name: "Bootsrap", icon: Bootsrap },
  { name: "Github", icon: Github },
  { name: "GC", icon: GC },
  { name: "Linux", icon: Linux },
  { name: "Matplotlib", icon: Matplotlib },
  { name: "Mssql", icon: Mssql },
  { name: "MongoDB", icon: MongoDB },
  { name: "NGINX", icon: NGINX },
  { name: "Postman", icon: Postman },
  { name: "Selenium", icon: Selenium },
  { name: "fastAPI", icon: fastAPI },
];

// Tech Icon Particle Component (renders as flat 2D sprites/billboards)
const TechIconParticle = ({ position, velocity, texture, mousePos }) => {
  const spriteRef = useRef();
  const velocityRef = useRef(velocity);

  // create sprite material once per particle
  const material = useMemo(() => {
    if (texture)
      return new THREE.SpriteMaterial({ map: texture, transparent: true });
    return new THREE.SpriteMaterial({ color: 0x6df0c8, opacity: 0.8 });
  }, [texture]);

  useEffect(() => {
    return () => {
      try {
        material.dispose();
      } catch (e) {}
    };
  }, [material]);

  useFrame(() => {
    const sprite = spriteRef.current;
    if (!sprite) return;

    // Normal movement
    sprite.position.x += velocityRef.current.x;
    sprite.position.y += velocityRef.current.y;
    if (sprite.position.z < 1) sprite.position.z += velocityRef.current.z;

    // Parallax: move opposite to mouse
    const parallaxX = -mousePos.x * 2;
    const parallaxY = mousePos.y * 2;
    sprite.position.x += parallaxX * 0.02;
    sprite.position.y += parallaxY * 0.02;

    // small rotation for a subtle effect
    sprite.material.rotation += 0.01;

    // reset when out of boundaries
    if (
      Math.abs(sprite.position.x) > 40 ||
      Math.abs(sprite.position.y) > 40 ||
      Math.abs(sprite.position.z) > 40
    ) {
      sprite.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 2,
      );
    }
  });

  return (
    <sprite
      ref={spriteRef}
      material={material}
      position={position}
      scale={[2, 2, 1]}
    />
  );
};

export const ParticleBackground = ({ mousePos = { x: 0, y: 0 } }) => {
  const particlesRef = useRef([]);
  const [iconsData, setIconsData] = useState([]);
  useEffect(() => {
    // Create particles with random tech icons and preload textures
    const textureLoader = new THREE.TextureLoader();
    const particleDefs = Array.from({ length: 25 }, (_, i) => {
      const iconData = TECH_ICONS[i % TECH_ICONS.length];

      return {
        id: i,
        position: [
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 10,
        ],
        velocity: {
          x: (Math.random() - 0.5) * 0.06,
          y: (Math.random() - 0.5) * 0.06,
          z: (Math.random() - 0.5) * 0.06,
        },
        icon: iconData.icon,
        tech: iconData.name,
        texture: null,
      };
    });

    // Load textures in parallel
    const loadPromises = particleDefs.map(
      (p) =>
        new Promise((resolve) => {
          textureLoader.load(
            p.icon,
            (tex) => {
              tex.magFilter = THREE.LinearFilter;
              tex.minFilter = THREE.LinearFilter;
              p.texture = tex;
              resolve(p);
            },
            undefined,
            () => {
              // on error, resolve with null texture
              p.texture = null;
              resolve(p);
            },
          );
        }),
    );

    Promise.all(loadPromises).then((results) => {
      particlesRef.current = results;
      setIconsData(results);
    });
  }, []);
  const [droppedIcons, setDroppedIcons] = useState([]);
  return (
    <Canvas
      camera={{ position: [0, 0, 30], fov: 75 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={1} color="#ffffff" />
      {/* <pointLight position={[15, 15, 15]} intensity={0.7} color="#f3f5f4ff" />
      <pointLight position={[-15, -15, 15]} intensity={0.5} color="#1098e0ff" /> */}
      <pointLight position={[0, 0, 0]} intensity={0.7} color="#f3f5f4ff" />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#1098e0ff" />
      <spotLight intensity={0.6} position={[0, -10, 10]} />
      {iconsData?.map((particle) => (
        <TechIconParticle
          key={particle.id}
          position={particle.position}
          velocity={particle.velocity}
          texture={particle.texture}
          mousePos={mousePos}
        />
      ))}
      <Bird setDroppedIcons={setDroppedIcons} />

      {droppedIcons.map((icon) => (
        <FallingIcon
          key={icon.id}
          position={icon.position}
          texture={icon.texture}
          onFinish={() =>
            setDroppedIcons((prev) => prev.filter((i) => i.id !== icon.id))
          }
        />
      ))}
    </Canvas>
  );
};



// Falling Icon Component
const FallingIcon = ({ position, texture, onFinish }) => {
  const ref = useRef();
  const velocity = useRef({
    x: (Math.random() - 0.5) * 0.05,
    y: -0.2,
    z: (Math.random() - 0.5) * 0.05,
  });

  const material = useMemo(() => {
    if (texture)
      return new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load(texture),
        transparent: true,
      });
    return new THREE.SpriteMaterial({ color: 0xffffff });
  }, [texture]);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.x += velocity.current.x;
    ref.current.position.y += velocity.current.y;
    ref.current.position.z += velocity.current.z;

    // Optional: rotate icon
    ref.current.material.rotation += 0.05;

    // Remove when below screen
    if (ref.current.position.y < -20) onFinish();
  });

  return (
    <sprite
      ref={ref}
      material={material}
      position={position}
      scale={[2, 2, 1]}
    />
  );
};

// Bird Component
const Bird = ({ setDroppedIcons }) => {
  const ref = useRef();
  const { scene, animations } = useGLTF("/models/phoenix_bird.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    actions[Object.keys(actions)[0]]?.play();
  }, [actions]);

  const direction = useRef(1);
  const speed = 0.2;
  const maxX = 80;
  const minX = -80;
  const dropInterval = useRef(0);
  const dropFrequency = 50; // frames per drop

  useFrame(() => {
    if (!ref.current) return;

    // Move bird
    ref.current.position.x += speed * direction.current;

    // Reverse direction
    if (ref.current.position.x >= maxX) {
      direction.current = -1;
      ref.current.rotation.y = Math.PI;
    }
    if (ref.current.position.x <= minX) {
      direction.current = 1;
      ref.current.rotation.y = 0;
    }

    // Drop icon every N frames
    dropInterval.current++;
    if (dropInterval.current >= dropFrequency) {
      dropInterval.current = 0;

      const icon = TECH_ICONS[Math.floor(Math.random() * TECH_ICONS.length)];

      setDroppedIcons((prev) => [
        ...prev,
        {
          id: Date.now(),
          position: [...ref.current.position],
          texture: icon.icon,
        },
      ]);
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.01}
      dispose={null}
      position={[0, 11, 0]}
    />
  );
};
