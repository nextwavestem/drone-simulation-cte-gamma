/* eslint-disable react/no-unknown-property */
import { useEffect, useState, useRef } from 'react';
import { OrbitControls, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Earth }  from './Earth'
import { Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Sun } from './Planets';
import { Drone } from '../../components/Drone.jsx';
import PropTypes from 'prop-types';
import emitter from '../../config/eventEmmiter.js';

const Galaxy = ({ droneRef }) => { // Accept droneRef as a prop
  const controlsRef = useRef();
  const [measurementView, setMeasurementView] = useState(false);
  const [mouseControl, setMouseControl] = useState(false);

  useEffect(() => {
    const setMeasurementViewValue = (value) => { setMeasurementView(value); };
    const setMouseControlValue = (value) => { setMouseControl(value); };

    
    emitter.on('measurementViewEnabled', setMeasurementViewValue);
    emitter.on('mouseControlEnabled', setMouseControlValue);

    return () => {
      emitter.off('measurementViewEnabled', setMeasurementViewValue);
      emitter.off('mouseControlEnabled', setMouseControlValue);

    };
  }, []);

  return (
    <>
      <color attach="background" args={['black']} />
      <AnimatedStars />
      <OrbitControls ref={controlsRef} enablePan enableZoom />
      <ambientLight />
      <Mercury />
      <Venus />
      <Earth />
      <Mars />
      <Jupiter />
      <Saturn />
      <Uranus />
      <Neptune />
      <Sun />
      <Drone
        measurementViewEnabled={measurementView}
        mouseControlEnabled={mouseControl}
        ref={droneRef} // Pass the ref to the Drone component
        controlsRef={controlsRef}
        droneScale={0.5}
        cameraOffset={[0, 4, -10]}
        lineColor="lightgreen"
      />
    </>
  );
};

const AnimatedStars = () => {
  const starsRef = useRef();
  useFrame(() => {
    starsRef.current.rotation.x += 0.0001;
    starsRef.current.rotation.y += 0.0001;
    starsRef.current.rotation.z += 0.0001;
  });

  return <Stars ref={starsRef} />;
};

Galaxy.propTypes = {
  droneRef: PropTypes.object.isRequired, // Define the prop type
};

export default Galaxy;
