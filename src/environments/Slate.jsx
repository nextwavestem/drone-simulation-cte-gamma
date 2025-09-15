/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import PropTypes from 'prop-types';
import { Drone } from '../components/Drone.jsx';
import { useRef, useEffect, useState } from "react";
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import ScreenshotCapture from '../components/ScreenshotCapture.jsx';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const loader = new FontLoader()
let GlobalCamera;
let GlobalScene;
let lastPosition = null
let measurementLineColor = "white"
let measurementPinColor = "black"
let dronePathColor = "yellow"
let launchPadColor = "white"
let planeColor="lightgreen"
let measurementTextColor="black"

const CameraController = ({ measurementViewEnabled }) => {
  const { camera, gl, scene } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (measurementViewEnabled) {

      camera.position.set(0, 20, 0); 
      camera.lookAt(new THREE.Vector3(0, 10, 0));
      camera.updateProjectionMatrix();

      if (controlsRef.current) {
        controlsRef.current.maxPolarAngle = Math.PI / 2; 
        controlsRef.current.minPolarAngle = Math.PI / 2;
        controlsRef.current.enableRotate = false; 
      }
    } else {

      camera.position.set(50, 50, 50);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      camera.updateProjectionMatrix();

      if (controlsRef.current) {
        controlsRef.current.maxPolarAngle = Math.PI; 
        controlsRef.current.minPolarAngle = 0;
        controlsRef.current.enableRotate = true; 
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
      <sphereGeometry args={[0.1, 4, 4]} />
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

    const intersections = raycaster.intersectObject(GlobalScene, true);

    if (intersections.length > 0) {
      const point = intersections[0].point; 
      setPins((prevPins) => [...prevPins, point]); 

      if (lastPosition == null) {
        lastPosition = droneRef.current.position.clone(); 
      }

      const points = [lastPosition, point];
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({ color: measurementLineColor });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      GlobalScene.add(line);
      lastPosition.copy(point);
      const coordinatesText = `X: ${point.x.toFixed(2)} cm, Y: ${point.y.toFixed(2)} cm, Z: ${point.z.toFixed(2)} cm`;
      
      displayCoordinatesText(coordinatesText, point, 0.2);
    } else {
      displayCoordinatesText(coordinatesText, point, 0);
    }

  }
};

const displayCoordinatesText = (text, position, textSize) => {
  loader.load('assets/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry(text, {
      font: font,
      size: textSize,
      height: 0.01, 
      curveSegments: 1,
      bevelEnabled: false,
      bevelThickness: 0.0,
      bevelSize: 0.02,
      bevelSegments: 1,
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: measurementTextColor });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    console.log(position)
    textMesh.position.set(position.x, position.y + 1, position.z); 
    textMesh.rotation.x = -Math.PI / 2; 

    GlobalScene.add(textMesh); 
  }, undefined, (error) => {
    console.error('An error occurred loading the font:', error);
  });
};



const Plane = () => {
  const planeRef = useRef();
  const planeSize = 50;

  return (
    <>
    <mesh ref={planeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[planeSize, planeSize]} />
      <meshStandardMaterial color={planeColor} roughness={0.9} />
    </mesh>

    {/* Landing pads at the corners of the plane */}
    <LandingPad position={[-planeSize / 2, -2, -planeSize / 2]} /> {/* Bottom Left */}
    <LandingPad position={[planeSize / 2,  -2, -planeSize / 2]} />  {/* Bottom Right */}
    <LandingPad position={[-planeSize / 2, -2, planeSize / 2]} />  {/* Top Left */}
    <LandingPad position={[planeSize / 2,  -2, planeSize / 2]} />   {/* Top Right */}
    </>
  );
};


const LandingPad = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[3, 0.3, 3]} /> 
      <meshStandardMaterial color={launchPadColor} />
    </mesh>
  );
};

const Slate = ({
  droneRef,
  measurementViewEnabled,
  mouseControlEnabled,
}) => {
  const controlsRef = useRef();
  const droneCameraRef = useRef();

  const [pins, setPins] = useState([]);
  
  return (
  <Canvas 
    shadows 
    style={{ background: 'gray' }}
    onClick={(event) => handleCanvasClick(event, setPins, measurementViewEnabled, droneRef)}>
      <ambientLight intensity={0.4} color={new THREE.Color(0x000000)} />
      <Environment preset="sunset" intensity={0.5} />
      <Plane />

      {pins.map((pin, index) => ( <Pin key={index} position={pin} /> ))}
      <CameraController measurementViewEnabled={measurementViewEnabled} />
      <ScreenshotCapture droneCameraRef={droneCameraRef} environment="slate"/>
      <Drone
        ref={droneRef}
        controlsRef={controlsRef}
        measurementViewEnabled={measurementViewEnabled}
        mouseControlEnabled={mouseControlEnabled}
        cameraOffset={[0, 6, -5]}
        droneScale={0.1}
        lineColor={dronePathColor}
        droneCameraRef={droneCameraRef}
      />
  </Canvas>
  );
};

Slate.propTypes = {
  droneRef: PropTypes.object.isRequired, // Define the prop type
  mouseControlEnabled: PropTypes.bool,
  measurementViewEnabled:  PropTypes.bool,
};

export default Slate;
