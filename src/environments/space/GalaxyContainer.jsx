import { Canvas } from "@react-three/fiber";
import Galaxy from './Galaxy';
import PropTypes from 'prop-types';

export const GalaxyContainer = ({ droneRef }) => { // Accept droneRef as a prop
  return (
    <Canvas>
      <Galaxy droneRef={droneRef} /> {/* Pass droneRef to Galaxy */}
    </Canvas>
  );
};

GalaxyContainer.propTypes = {
  droneRef: PropTypes.object.isRequired, // Define the prop type
};

export default GalaxyContainer;
