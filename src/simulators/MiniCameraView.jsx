import React, { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import PropTypes from 'prop-types';
import * as THREE from 'three'; // Needed for PerspectiveCamera


function MiniCameraView({ droneRef }) {
  const { gl, scene } = useThree();
  
  // Initialize miniCamera as a PerspectiveCamera reference
  const miniCamera = useRef(new THREE.PerspectiveCamera(50, 1, 0.1, 1000));

  useFrame(() => {
    if (droneRef.current) {
      // Set miniCamera position and rotation based on drone's reference
      miniCamera.current.position.copy(droneRef.current.position);
      miniCamera.current.rotation.copy(droneRef.current.rotation);
      miniCamera.current.translateZ(-5); // Offset for better viewing angle
    }

    // Render the scene using the mini camera
    gl.setViewport(0, 0, gl.domElement.width / 5, gl.domElement.height / 5); // Adjust size as needed
    gl.render(scene, miniCamera.current);
  });

  return null; // Camera renders without returning visible JSX
}

// Prop validation to ensure droneRef is a ref object
MiniCameraView.propTypes = {
  droneRef: PropTypes.shape({ current: PropTypes.instanceOf(THREE.Object3D) }).isRequired,
};

export default MiniCameraView;
