/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment,useGLTF } from '@react-three/drei';
import { useRef, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { Drone } from '../components/Drone.jsx';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import emitter from '../config/eventEmmiter.js';


const ScreenshotCapture = ({ droneCameraRef, environment }) => {
  const { gl, scene, size } = useThree();

  const captureImage = () => {
    const renderTarget = new THREE.WebGLRenderTarget(size.width, size.height);
    const originalRenderTarget = gl.getRenderTarget();

    gl.setRenderTarget(renderTarget);
    gl.render(scene, droneCameraRef.current);

    const buffer = new Uint8Array(size.width * size.height * 4);
    gl.readRenderTargetPixels(renderTarget, 0, 0, size.width, size.height, buffer);

    const canvas = document.createElement("canvas");
    canvas.width = size.width;
    canvas.height = size.height;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(size.width, size.height);

    for (let y = 0; y < size.height; y++) {
      for (let x = 0; x < size.width; x++) {
        const i = (y * size.width + x) * 4;
        const j = ((size.height - y - 1) * size.width + x) * 4;
        imageData.data[i] = buffer[j];
        imageData.data[i + 1] = buffer[j + 1];
        imageData.data[i + 2] = buffer[j + 2];
        imageData.data[i + 3] = buffer[j + 3];
      }
    }

    ctx.putImageData(imageData, 0, 0);
    const dataUrl = canvas.toDataURL("image/png");

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${environment}_${timestamp}.png`;
    link.click();

    gl.setRenderTarget(originalRenderTarget);
    renderTarget.dispose();
  };

  useEffect(() => {
    const handleScreenshotCommand = () => {
      if (droneCameraRef.current) captureImage();
    };
    emitter.on('commandTakeScreenShot', handleScreenshotCommand);
    return () => {
      emitter.off('commandTakeScreenShot', handleScreenshotCommand);
    };
  }, [droneCameraRef]);

  return null;
};


const loader = new FontLoader(); 
let GlobalCamera;
let GlobalScene;
let lastPosition = null;
let measurementLineColor = "white";
let measurementPinColor = "black";
let dronePathColor = "yellow"
let measurementTextColor="black"

const CameraController = ({ measurementViewEnabled }) => {
  const { camera, gl, scene } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (measurementViewEnabled) {
      camera.position.set(-40, 140, -70); // Move camera to top-down view
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      camera.updateProjectionMatrix();

      if (controlsRef.current) {
        controlsRef.current.maxPolarAngle = Math.PI / 2; // Lock to top-down
        controlsRef.current.minPolarAngle = Math.PI / 2;
        controlsRef.current.enableRotate = false; // Disable rotation
      }
    } else {
      // Reset camera to default view
      camera.position.set(50, 50, 50);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      camera.updateProjectionMatrix();

      if (controlsRef.current) {
        controlsRef.current.maxPolarAngle = Math.PI; // Allow full rotation
        controlsRef.current.minPolarAngle = 0;
        controlsRef.current.enableRotate = true; // Enable rotation
      }
    }
    GlobalCamera = camera;
    GlobalScene = scene;
  }, [measurementViewEnabled, camera]);

  return (
    <>
      {!measurementViewEnabled && (
        <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} />
      )}
    </>
  );
};

const Pin = ({ position }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color={measurementPinColor} />
    </mesh>
  );
};

const handleCanvasClick = (event, setPins, enableMeasurement, droneRef) => {
  if (enableMeasurement) {
    const rect = event.target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const vector = new THREE.Vector3(x, y, 0.5);
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(vector, GlobalCamera);

    // Intersect the city model instead of all buildings
    const intersections = raycaster.intersectObject(GlobalScene, true); // true for recursive

    if (intersections.length > 0) {
      const point = intersections[0].point; // Get the intersection point
      setPins((prevPins) => [...prevPins, point]); // Update pin positions

      if (lastPosition == null) {
        lastPosition = droneRef.current.position.clone(); // Clone to avoid reference issues
      }
      const distance = lastPosition.distanceTo(point);

      // Draw a line from the drone to the intersection point
      const points = [lastPosition, point];
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({ color: measurementLineColor });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      GlobalScene.add(line);
      lastPosition.copy(point); // Update lastPosition to the current intersection point

      // Display the distance near the point
      displayCoordinatesText(`${distance.toFixed(2)} cm`, point);
    }
  }
};

const displayCoordinatesText = (text, position) => {
  loader.load('assets/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry(text, {
      font: font,
      size: 0.9, // Adjust size as needed
      height: 0.09, // Adjust height
      curveSegments: 1,
      bevelEnabled: false,
      bevelThickness: 0.0,
      bevelSize: 0.03,
      bevelSegments: 2,
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: measurementTextColor });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(position.x, position.y + 0.4, position.z); // Adjust Y position slightly above the line point
    textMesh.rotation.x = -Math.PI / 2; // Rotate 90 degrees around the X-axis

    GlobalScene.add(textMesh); // Add the text mesh to the scene
  }, undefined, (error) => {
    console.error('An error occurred loading the font:', error);
  });
};

const Model = () => {
  const { scene } = useGLTF('assets/models/mountains/snowy_mountains.glb'); 
  const modelPosition = [8, -9, -4];

  // Set the desired rotation (in radians)
  const rotation = [0, 98, 0]; // Example: Rotate 45 degrees around the Y-axis

  // Apply rotation directly to the scene
  scene.rotation.set(rotation[0], rotation[1], rotation[2]);
  return <primitive object={scene} position={modelPosition} scale={80} />;
};

const LandingPad = ({ position, size = [2, 0.1, 2], color = "yellow" }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} emissive={new THREE.Color(color)} emissiveIntensity={0.5} />
    </mesh>
  );
};

const InitialPad = ({ position, size = [2, 0.1, 2], color = "red" }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} emissive={new THREE.Color(color)} emissiveIntensity={0.5} />
    </mesh>
  );
};

const Mountain = ({
  droneRef,
  measurementViewEnabled,
  mouseControlEnabled,
}) => {
  const controlsRef = useRef();
  const droneCameraRef = useRef();

  const [pins, setPins] = useState([]); // State to track pin positions
  
  return (
  <Canvas 
    shadows 
    onClick={(event) => handleCanvasClick(event, setPins, measurementViewEnabled, droneRef)} // Pass click event
  >
      <color attach="background" args={['#d7d4d4']} /> {/* Set background color */}
      <ambientLight intensity={0.4} color={new THREE.Color(0xffc1a0)} /> Warm light color
      <Environment preset="sunset" intensity={0.5} /> {/* Adjusted intensity */}
      <Model />

      {pins.map((pin, index) => ( <Pin key={index} position={pin} /> ))}
      <CameraController measurementViewEnabled={measurementViewEnabled} />
      <ScreenshotCapture droneCameraRef={droneCameraRef} environment="mountain"/>

      <Drone
        ref={droneRef}
        controlsRef={controlsRef}
        measurementViewEnabled={measurementViewEnabled}
        mouseControlEnabled={mouseControlEnabled}
        droneScale={0.2}
        cameraOffset={[0,5,-10]}
        lineColor={dronePathColor}
        droneCameraRef={droneCameraRef}
      />
      <InitialPad position={[0, 0, 0]} />

      <LandingPad position={[7, 1, 0]} color="yellow"/>
      <LandingPad position={[30, 6, 10]} color="cyan"/>

  </Canvas>
  );
};

Mountain.propTypes = {
  droneRef: PropTypes.object.isRequired, // Define the prop type
  mouseControlEnabled: PropTypes.bool,
  measurementViewEnabled:  PropTypes.bool,
};

export default Mountain;
