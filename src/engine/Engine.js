import * as BABYLON from "babylonjs";
import React, { useEffect } from "react";

const Engine = props => {
  var canvas = document.createElement("canvas");

  useEffect(() => {
    const engine = new BABYLON.Engine(
      canvas,
      true,
      props.engineOptions,
      props.adaptToDeviceRatio
    );

    let scene = new BABYLON.Scene(engine);

    if (typeof props.onSceneMount === "function") {
      props.onSceneMount({
        scene,
        engine,
        canvas
      });
    } else {
      console.error("onSceneMount function not available");
    }

    window.addEventListener("resize", () => {
      engine.resize();
    });
  });

  const onCanvasLoaded = c => {
    if (c !== null) {
      canvas = c;
    }
  };

  let { width, height } = props;

  let opts = {};

  if (width !== undefined && height !== undefined) {
    opts.width = width;
    opts.height = height;
  }

  return (
    <canvas
      style={{ position: "relative", zIndex: 2, outline: "none" }}
      {...opts}
      ref={onCanvasLoaded}
    />
  );
};

export default Engine;
