/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls,  Environment,useGLTF } from '@react-three/drei';
import { useRef, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { Drone } from '../components/Drone.jsx';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import emitter from '../config/eventEmmiter.js';
import ScreenshotCapture from '../components/ScreenshotCapture.jsx';

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
      // Move camera to top-down view
      camera.position.set(5, 25, 0); // should be (0, 100, 0)
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
      size: 0.5, // Adjust size as needed
      height: 0.09, // Adjust height
      curveSegments: 1,
      bevelEnabled: false,
      bevelThickness: 0.0,
      bevelSize: 0.03,
      bevelSegments: 2,
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: measurementTextColor });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(position.x, position.y + 2, position.z); // Adjust Y position slightly above the line point
    textMesh.rotation.x = -Math.PI / 2; // Rotate 90 degrees around the X-axis

    GlobalScene.add(textMesh); // Add the text mesh to the scene
  }, undefined, (error) => {
    console.error('An error occurred loading the font:', error);
  });
};

const getInitialCordinates = () => {
  const droneLocations = {
    food_courts: {
      position:[-17, -0.7, -60],
      rotation: [0, 0, 0]
    },
    shopping_center: {
      position:[-28, -0.8, 25],
      rotation: [0, -55, 0]
    },
    home:{
      position:[-90, -0.8, 75],
      rotation: [0, -55, 0]
    }
  }

  const currentHref = window.location.href;

  if(currentHref.includes("/city/home")) return { initialPosition: droneLocations.home.position , initialRotation: droneLocations.home.rotation }
  if(currentHref.includes("/city/food_court")) return { initialPosition: droneLocations.food_courts.position , initialRotation: droneLocations.food_courts.rotation }
  if(currentHref.includes("/city/shopping_center")) return { initialPosition: droneLocations.shopping_center.position , initialRotation: droneLocations.shopping_center.rotation }
}

const CityModel = () => {
  // const { scene } = useGLTF('assets/models/egypt/environment.glb'); // Load the GLB model
  const { scene } = useGLTF('assets/models/city/city.glb'); // Load the GLB model'
  const { initialPosition, initialRotation }  = getInitialCordinates()
  const modelPosition = initialPosition // Set your desired position (x, y, z)
  const rotation = initialRotation
  scene.rotation.set(rotation[0], rotation[1], rotation[2]);
  return <primitive object={scene} position={modelPosition} scale={5}/>;
};

const City = ({
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
      <ambientLight intensity={0.4} color={new THREE.Color(0xffc1a0)} /> {/* Warm light color */}
      <Environment preset="sunset" intensity={0.5} /> {/* Adjusted intensity */}
      <CityModel />

      {pins.map((pin, index) => ( <Pin key={index} position={pin} /> ))}
      <CameraController measurementViewEnabled={measurementViewEnabled} />
      <ScreenshotCapture droneCameraRef={droneCameraRef} environment="city"/>
      <Drone
        ref={droneRef}
        controlsRef={controlsRef}
        measurementViewEnabled={measurementViewEnabled}
        mouseControlEnabled={mouseControlEnabled}
        droneScale={0.05}
        cameraOffset={[0, 0.2, -1]}
        lineColor={dronePathColor}
        droneCameraRef={droneCameraRef}
      />
  
  </Canvas>
  );
};

City.propTypes = {
  droneRef: PropTypes.object.isRequired, // Define the prop type
  mouseControlEnabled: PropTypes.bool,
  measurementViewEnabled:  PropTypes.bool,
};

export default City;
