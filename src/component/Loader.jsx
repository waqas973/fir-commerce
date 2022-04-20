import React from "react";

const Loader = () => {
  let loaderStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: "999",
  };
  return (
    <div className="d-flex justify-content-center" style={loaderStyle}>
      <div
        className="spinner-border"
        role="status"
        style={{ height: "100px", width: "100px" }}
      ></div>
    </div>
  );
};

export default Loader;
