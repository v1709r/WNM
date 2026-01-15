import React from "react";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa6";

const SocialIcons = () => {
  // You can customize icon size and color
  const iconStyle = { color: "#000", margin: "0 10px", fontSize: "30px" };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <a
        href="https://www.linkedin.com/in/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Manny on LinkedIn"
      >
        <FaLinkedin style={iconStyle} />
      </a>
      <a
        href="https://twitter.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Manny on Twitter"
      >
        <FaTwitter style={iconStyle} />
      </a>
      <a
        href="https://www.instagram.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Manny on Instagram"
      >
        <FaInstagram style={iconStyle} />
      </a>
    </div>
  );
};

export default SocialIcons;
