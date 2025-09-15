/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */

import * as THREE from "three";
import PropTypes from "prop-types";
import { useGLTF, Line, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef, useEffect, useState } from "react";
import emitter from "../config/eventEmmiter";
import gsap from "gsap";

const DISTANCE_INCHES_OFFSET = 2.54;
const NEGATIVE_OFFSET = 1;

const CIRCLE_RIGHT = "CIRCLE_RIGHT";
const CIRCLE_LEFT = "CIRCLE_LEFT";
const ARC_RIGHT = "ARC_RIGHT";
const ARC_LEFT = "ARC_LEFT";
const SECONDS = "SECONDS";
const INCHES = "INCHES";
const RIGHT = "RIGHT";
const LEFT = "LEFT";
const RESET = "RESET";

export const Drone = React.forwardRef(
  (
    {
      mouseControlEnabled,
      measurementViewEnabled,
      droneScale,
      cameraOffset,
      lineColor,
      droneCameraRef,
    },
    ref
  ) => {
    const canMoveInArena = mouseControlEnabled;
    const memoizedDrone = useMemo(() => {
      return useGLTF("assets/models/drone.glb");
    }, []);
    const droneRef = ref || useRef();
    const velocity = useRef(new THREE.Vector3(0, 0, 0));
    const keys = useRef({
      w: false,
      a: false,
      s: false,
      d: false,
      u: false,
      p: false,
      t: false,
    });

    const { camera } = useThree();

    const [path, setPath] = useState([new THREE.Vector3(0, 0, 0)]);
    const [isStalling, setIsStalling] = useState(false);
    const [isFlipping, setIsFlipping] = useState(false);

    const DEFAULT_DRONE_SPEED = 0.001;
    let droneSpeed = DEFAULT_DRONE_SPEED;

    const updateDronePosition = (directionVector, [distance, unit]) => {
      return new Promise((resolve) => {
        const drone = droneRef.current;
        if (!drone) return resolve();
    
        const step = droneSpeed;
        const convertedDistance = unit === "INCHES" ? distance * DISTANCE_INCHES_OFFSET : distance;
    
        const direction = directionVector.clone().normalize().applyQuaternion(drone.quaternion);
        const targetPosition = drone.position.clone().add(direction.clone().multiplyScalar(convertedDistance));
   
        const animateMove = () => {
          if (!droneRef.current) return resolve();
    
          const currentPosition = drone.position.clone();
          const remaining = targetPosition.clone().sub(currentPosition);
          const distanceToTarget = remaining.length();
    
          if (distanceToTarget <= step) {
            drone.position.copy(targetPosition);
            return resolve();
          }
    
          const moveStep = remaining.normalize().multiplyScalar(step);
          drone.position.add(moveStep);
    
          // Optional: maintain orientation toward movement direction
          const lookAtPoint = targetPosition.clone();
          lookAtPoint.y = drone.position.y; // keep level
          drone.lookAt(lookAtPoint);
    
          requestAnimationFrame(animateMove);
        };
    
        animateMove();
      });
    };

    const droneMovePositiveZ = async ([distance, measurement]) => {
      await moveDroneOnAxis("z", [distance, measurement], 1); // Positive direction
    };

    const droneMoveNegativeZ = async ([distance, measurement]) => {
      await moveDroneOnAxis("z", [distance + NEGATIVE_OFFSET, measurement], -1); // Negative direction
    };

    const droneMovePositiveX = async ([distance, measurement]) => {
      await moveDroneOnAxis("x", [distance, measurement], 1); // Positive direction
    };

    const droneMoveNegativeX = async ([distance, measurement]) => {
      await moveDroneOnAxis("x", [distance + NEGATIVE_OFFSET, measurement], -1); // Negative direction
    };

    const droneMovePositiveY = async ([distance, measurement]) => {
      await moveDroneOnAxis("y", [distance, measurement], 1); // Positive direction
    };

    const droneMoveNegativeY = async ([distance, measurement]) => {
      if (distance == -Infinity) {
        const hasWait = measurement.split(",")[1] != null;
        if (hasWait) {
          const waitTime = measurement.split(",")[1];
          await moveDroneToPosition([
            droneRef.current.position.x,
            0,
            droneRef.current.position.z,
            "CM",
          ]);
          stallAndFly([parseInt(waitTime), true]);
        } else {
          await moveDroneToPosition([
            droneRef.current.position.x,
            0,
            droneRef.current.position.z,
            "CM",
          ]);
        }
      } else {
        await moveDroneOnAxis(
          "y",
          [distance + NEGATIVE_OFFSET, measurement],
          -1
        ); // Negative direction
      }
    };

    const moveToPosition = async (position) => {
      await moveDroneToPosition(position);
    };

    const flipDrone = async (flipDirection) => {
      if (!droneRef.current) return;
      const [direction] = flipDirection;
      console.log("commanding to flip it", direction);

      setIsFlipping(true); // Set the flipping state to true

      const initialRotation = droneRef.current.rotation.clone(); // Clone the initial rotation
      const fullFlip = Math.PI * 2; // 360 degrees in radians

      const duration = 1; // Duration of the flip in seconds
      const framesPerSecond = 60;
      const totalFrames = duration * framesPerSecond;
      const increment = fullFlip / totalFrames;

      let frame = 0;

      const animateFlip = () => {
        if (frame < totalFrames) {
          switch (direction) {
            case "FORWARD":
              droneRef.current.rotation.x += increment; // Flip along the X-axis
              break;
            case "BACKWARD":
              droneRef.current.rotation.x -= increment; // Flip along the X-axis in reverse
              break;
            case "RIGHT":
              droneRef.current.rotation.z += increment; // Flip along the Z-axis
              break;
            case "LEFT":
              droneRef.current.rotation.z -= increment; // Flip along the Z-axis in reverse
              break;
            default:
              console.warn("Invalid flip direction");
              setIsFlipping(false);
              return;
          }

          frame++;
          requestAnimationFrame(animateFlip);
        } else {
          // Reset rotation to prevent overflow and reset flipping state
          droneRef.current.rotation.copy(initialRotation); // Reset to initial rotation
          setIsFlipping(false);
          console.log(`${direction} Flip complete`);
        }
      };

      animateFlip();
    };

    const moveDroneOnAxis = async (
      axis,
      [distance, measurement],
      direction = 1
    ) => {
      if (!droneRef.current) return;

      const position = droneRef.current.position.clone();

      if (measurement === "SECONDS") {
        const directionVector = new THREE.Vector3(
          axis === "x" ? direction : 0,
          axis === "y" ? direction : 0,
          axis === "z" ? direction : 0
        );

        moveContinuous(directionVector, distance);
      } else {
        const convertedDistance =
          measurement === "INCHES"
            ? distance * DISTANCE_INCHES_OFFSET
            : distance;
        position[axis] += convertedDistance * direction;

        await updateDronePosition(
          new THREE.Vector3(position.x, position.y, position.z),
          [distance, measurement]
        );
      }
    };

    const moveContinuous = (directionVector, seconds) => {
      const distancePerFrame = 0.001 * 75;
      const startTime = Date.now();
      const totalTime = seconds * 1000;
      const direction = directionVector
        .clone()
        .applyQuaternion(droneRef.current.quaternion)
        .normalize();

      const moveStep = () => {
        const elapsedTime = Date.now() - startTime;

        if (elapsedTime < totalTime) {
          droneRef.current.position.add(
            direction.clone().multiplyScalar(distancePerFrame)
          );
          requestAnimationFrame(moveStep);
        } else {
          console.log("Movement complete.");
        }
      };

      moveStep();
    };

    const moveDroneToPosition = async (position) => {
      let [newX, newY, newZ, unit] = position;

      if (unit == RESET) {
        setPath([new THREE.Vector3(0, 0, 0)]);
      }

      // Convert coordinates if the unit is in inches
      if (unit === INCHES) {
        newX *= DISTANCE_INCHES_OFFSET;
        newY *= DISTANCE_INCHES_OFFSET;
        newZ *= DISTANCE_INCHES_OFFSET;
      }

      const targetPosition = new THREE.Vector3(newX, newY, newZ);
      const speed = 0.05;

      const moveStep = () => {
        const currentPosition = droneRef.current.position.clone();
        const distance = currentPosition.distanceTo(targetPosition);

        if (distance < 0.01) {
          droneRef.current.position.copy(targetPosition);
        } else {
          const direction = targetPosition
            .clone()
            .sub(currentPosition)
            .normalize();
          const moveDistance = Math.min(distance, speed);
          droneRef.current.position.add(direction.multiplyScalar(moveDistance));
          requestAnimationFrame(moveStep);
        }
      };

      moveStep();
    };

    const rotateDrone = (value) => {
      const [direction, degrees, radius, unit] = value;

      const DISTANCE_INCHES_OFFSET = 2.54;
      const radiusInCm =
        unit === "INCHES" ? radius * DISTANCE_INCHES_OFFSET : radius;
      const radiusInThreeJsUnits = radiusInCm / 100;

      const totalRadians = THREE.MathUtils.degToRad(degrees);
      const isClockwise =
        direction === "CIRCLE_RIGHT" || direction === "ARC_RIGHT" || direction === "RIGHT";

      moveInArc(radiusInThreeJsUnits, totalRadians, isClockwise);
    };

    const moveInArc = (radius, radians, clockwise) => {
      const startAngle = droneRef.current.rotation.y;
      const angleIncrement = radians / 60; // Adjust for smoothness
      const initialPosition = droneRef.current.position.clone(); // Initial position to calculate relative arc
      const centerX = initialPosition.x - radius * Math.sin(startAngle);
      const centerZ = initialPosition.z - radius * Math.cos(startAngle);

      let angleTraveled = 0;

      const animateArc = () => {
        if (Math.abs(angleTraveled) >= Math.abs(radians)) {
          return;
        }

        angleTraveled += angleIncrement;
        const currentAngle =
          startAngle + (clockwise ? -angleTraveled : angleTraveled);

        const x = centerX + radius * Math.sin(currentAngle);
        const z = centerZ + radius * Math.cos(currentAngle);

        droneRef.current.position.set(x, initialPosition.y, z);
        droneRef.current.rotation.y = currentAngle;

        requestAnimationFrame(animateArc);
      };

      animateArc();
    };

    const stall = (waitTime) => {
      return new Promise((resolve) => setTimeout(resolve, waitTime * 1000));
    };

    const stallAndFly = async ([waitTime, shouldFly]) => {
      setIsStalling(true);
      await stall(waitTime);
      setIsStalling(false);
      if (shouldFly) {
        await updateDronePosition(
          new THREE.Vector3(
            droneRef.current.position.x,
            droneRef.current.position.y + 5,
            droneRef.current.position.z
          ),
          [5, "CM"]
        );
      }
    };

    const updateDroneSpeed = (speed) => {
      droneSpeed = DEFAULT_DRONE_SPEED * speed;
    };

    const resetDrone = async () => {
      await updateDronePosition(new THREE.Vector3(0, 0, 0), [5, "CM"]);
      setPath([new THREE.Vector3(0, 0, 0)]);
    };

    useEffect(() => {
      // Register event listener
      emitter.on("commandFlyFoward", droneMovePositiveZ);
      emitter.on("commandFlyBackward", droneMoveNegativeZ);
      emitter.on("commandFlyUp", droneMovePositiveY);
      emitter.on("commandFlyDown", droneMoveNegativeY);
      emitter.on("commandFlyLeft", droneMovePositiveX);
      emitter.on("commandFlyRight", droneMoveNegativeX);
      emitter.on("commandFlyTo", moveToPosition);
      emitter.on("commandRotate", rotateDrone);
      emitter.on("resetSimulationEnv", resetDrone);

      emitter.on("commandSetWaitTime", stallAndFly);
      emitter.on("commandSetSpeed", updateDroneSpeed);
      emitter.on("commandFlip", flipDrone);

      // Keyboard event handlers
      const handleKeyDown = (event) => {
        keys.current[event.key] = true;
      };
      const handleKeyUp = (event) => {
        keys.current[event.key] = false;
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      return () => {
        emitter.off("commandFlyFoward", droneMovePositiveZ);
        emitter.off("commandFlyBackward", droneMoveNegativeZ);
        emitter.off("commandFlyLeft", droneMoveNegativeX);
        emitter.off("commandFlyRight", droneMovePositiveX);
        emitter.off("commandFlyUp", droneMovePositiveY);
        emitter.off("commandFlyTo", moveToPosition);
        emitter.off("commandRotate", rotateDrone);
        emitter.on("resetSimulationEnv", resetDrone);

        emitter.off("commandSetWaitTime", stallAndFly);
        emitter.off("commandSetSpeed", updateDroneSpeed);
        emitter.off("commandFlip", flipDrone);

        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }, [keys]);

    // Update drone movement
    const updateDroneMovement = () => {
      velocity.current.set(0, 0, 0);
      if (!droneRef.current) return;

      if (isFlipping) {
        camera.lookAt(droneRef.current.position);
        return;
      }

      // Calculate the forward direction based on the drone's current rotation
      const forwardDirection = new THREE.Vector3(0, 0, 1).applyQuaternion(
        droneRef.current.quaternion
      ); // Apply current drone rotation
      const backwardDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(
        droneRef.current.quaternion
      ); // Apply current drone rotation
      const leftDirection = new THREE.Vector3(1, 0, 0).applyQuaternion(
        droneRef.current.quaternion
      ); // Apply current drone rotation
      const rightDirection = new THREE.Vector3(-1, 0, 0).applyQuaternion(
        droneRef.current.quaternion
      ); // Apply current drone rotation

      if (keys.current.w)
        velocity.current.add(forwardDirection.multiplyScalar(droneSpeed)); // Forward
      if (keys.current.s)
        velocity.current.add(backwardDirection.multiplyScalar(droneSpeed)); // Backward
      if (keys.current.a)
        velocity.current.add(leftDirection.multiplyScalar(droneSpeed)); // left
      if (keys.current.d)
        velocity.current.add(rightDirection.multiplyScalar(droneSpeed)); // right

      if (keys.current.z)
        droneRef.current.rotation.y += THREE.MathUtils.degToRad(1); // Rotate left
      if (keys.current.c)
        droneRef.current.rotation.y -= THREE.MathUtils.degToRad(1); // Rotate right

      if (keys.current.u) velocity.current.y += droneSpeed; // Up
      if (keys.current.p) velocity.current.y -= droneSpeed; // Down

      droneRef.current.position.add(velocity.current);

      if (!mouseControlEnabled && !measurementViewEnabled) {
        const [cameraOffsetX, cameraOffsetY, cameraOffsetZ] = cameraOffset;
        const cameraView = new THREE.Vector3(
          cameraOffsetX,
          cameraOffsetY,
          cameraOffsetZ
        );
        cameraView.applyQuaternion(droneRef.current.quaternion);
        camera.position.copy(droneRef.current.position.clone().add(cameraView));
        camera.lookAt(droneRef.current.position);
      }

      // Update the path the drone follows
      const currentPosition = droneRef.current.position.clone();
      setPath((prevPath) => [...prevPath, currentPosition]);
    };

    useFrame(() => {
      if (!droneRef.current) return;
      updateDroneMovement();
    });

    return (
      <>
        <mesh ref={droneRef}>
        <PerspectiveCamera
          makeDefault={false}
          ref={droneCameraRef}
          fov={75}
          rotation={[0,59.6,0]}
          position={[0,1,0]} // Position relative to drone
        />
          <primitive
            object={memoizedDrone.scene}
            position={[0, 0, 0]}
            scale={droneScale}
          />
        </mesh>
        <Line points={path} color={lineColor} lineWidth={3} />
      </>
    );
  }
);

Drone.propTypes = {
  mouseControlEnabled: PropTypes.bool,
  measurementViewEnabled: PropTypes.bool,
  droneScale: PropTypes.number,
  cameraOffset: PropTypes.arrayOf(PropTypes.number),
  lineColor: PropTypes.string,
};

export default Drone;
