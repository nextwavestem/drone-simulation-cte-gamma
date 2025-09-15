import { useState } from "react";
import "../css/appContainer.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getBannerReference } from "../config/navigationConfig.js";
import ActionButton from "./ActionButton.jsx";

export const AppContainer = ({ children }) => {
  const navigate = useNavigate();
  const [showNote, setShowNote] = useState(false);

  const handleLogoClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const getCookieValue = (name) => {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? decodeURIComponent(match[2]) : null;
    };

    const sessionActive = getCookieValue("session_active");
    if (!sessionActive) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="application-container">
      <div className="header-container">
        <div className="nws-logo" onClick={handleLogoClick}>
          <img src={getBannerReference()} alt="Logo" />
        </div>
        <div className="nws-home" onClick={handleLogoClick}>
          <ActionButton right small green title="Home" />
        </div>
      </div>

      {/* mouse control note */}
      {showNote && (
        <div className="note-box">
          <p>
            ⚠️ <strong>Note:</strong> Enabling mouse control disables the
            default camera perspective of the drone.
          </p>
          <button className="close-btn" onClick={() => setShowNote(false)}>
            ✖
          </button>
        </div>
      )}

      <div className="application-content">{children}</div>
    </div>
  );
};

AppContainer.propTypes = {
  children: PropTypes.node,
};
