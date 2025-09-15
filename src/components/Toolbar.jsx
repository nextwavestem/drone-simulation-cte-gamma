import '../css/toolbar.css'
import PropTypes from 'prop-types';
import { useState } from 'react';
import emitter from '../config/eventEmmiter.js';


const formatYaw = (yaw) => {
  return -Math.ceil(yaw * (180 / Math.PI)) % 360
}

export const Toolbar = ({ dronePosition }) => {
  const [toggleValue, setToggleValue] = useState(false);
  const handleToggleChange = () => { 
    setToggleValue((prevValue) => {
      const newVal = !prevValue;
      console.log("value changed to ", newVal);
      emitter.emit('measurementViewEnabled', newVal);
      return newVal; // Ensure we return the new state here
    });
  };

  return (
    <div className="toolbar">
      <div className="row">
        <div className="column">
          <span className="coordinate">X: {Math.ceil(dronePosition.xPos)} cm </span>
          <span className="coordinate">Z: {Math.ceil(dronePosition.zPos)} cm </span>
        </div>
        <div className="column">
          <span className="coordinate">Altitude: {Math.ceil(dronePosition.yPos)} cm </span>
          <span className="rotation">Yaw: {formatYaw(dronePosition.yRot)}°</span>
        </div>
        <div className="column">
        <label className="toggle-switch">
          <input type="checkbox" checked={toggleValue} onChange={handleToggleChange}/>
          <span className="slider"> Measurement View</span>
        </label>
        </div>
      </div>
    </div>
  );
};


Toolbar.propTypes = {
  dronePosition: PropTypes.shape({
    xPos: PropTypes.number.isRequired,
    yPos: PropTypes.number.isRequired,
    zPos: PropTypes.number.isRequired,
    xRot: PropTypes.number.isRequired,
    yRot: PropTypes.number.isRequired,
    zRot: PropTypes.number.isRequired,
  }).isRequired,
};

export default Toolbar;
