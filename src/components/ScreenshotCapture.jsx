/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
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

export default ScreenshotCapture;
