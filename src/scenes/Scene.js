import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import React, { useEffect } from "react";

const Scene = () => {
  var canvas = document.createElement("canvas");

  useEffect(() => {
    var engine = new BABYLON.Engine(canvas, true);
    const scene = createScene(engine);

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  });

  const createScene = engine => {
    var scene = new BABYLON.Scene(engine);

    let camera = addCameras(scene);

    let lights = addLights(scene);

    let mesh = addMesh(scene);

    let customMesh = importCustomMesh(scene);

    scene.registerBeforeRender(() => {
      lights.position = camera.position;
    });

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    return scene;
  };

  const addCameras = scene => {
    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.ArcRotateCamera(
      "Camera",
      10,
      0.8,
      100,
      new BABYLON.Vector3(0, 30, 0),
      scene
    );

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);
    camera.minZ = 10.0;

    return camera;
  };

  const addLights = scene => {
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.PointLight(
      "omni",
      new BABYLON.Vector3(20, 20, 100),
      scene
    );

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    return light;
  };

  const addMesh = scene => {
    var sphere = new BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    var ground = BABYLON.Mesh.CreateGround("ground", 100, 100, 1, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.material = groundMaterial;
    ground.receiveShadows = true;
  };

  const importCustomMesh = scene => {
    const shoe = BABYLON.SceneLoader.ImportMesh(
      "",
      "./mesh/",
      "AF1.obj",
      scene,
      shoes => {
        var shoe = shoes[0];
        shoe.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
        shoe.rotation.y = Math.PI;
      }
    );

    const head = BABYLON.SceneLoader.ImportMesh(
      "",
      "./mesh/",
      "HEAD.obj",
      scene,
      heads => {
        var head = heads[0];
        head.rotation.y = 7.9;

        // head Clones!
        var head2 = head.clone("head2");
        head.position = new BABYLON.Vector3(0, 0, -10);
        head2.position = new BABYLON.Vector3(0, 0, 10);

        // head materials
        var headMaterial = new BABYLON.StandardMaterial("headMaterial", scene);
        headMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);

        head.material = headMaterial;
      }
    );
  };

  // Makes the canvas instance the DOM canvas element in the  virtual DOM return
  const onCanvasLoaded = c => {
    if (c !== null) {
      canvas = c;
    }
  };

  // Height and Width of the canvas
  var options = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  return (
    <canvas
      style={{
        position: "relative",
        zIndex: 2,
        outline: "none"
      }}
      {...options}
      ref={onCanvasLoaded}
    />
  );
};

export default Scene;
