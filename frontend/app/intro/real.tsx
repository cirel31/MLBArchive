// import React, { useRef, useEffect } from "react";
// import { Canvas, useThree } from "react-three-fiber";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// const totalNum = 10;
// const distance = 50;

// const Scene = () => {
//   const sceneRef = useRef();
//   const cameraRef = useRef();
//   const galleryGroupRef = useRef();
//   const pageNum = useRef(0);
//   const targetNum = useRef(0);
//   const moveX = useRef(0);
//   const controls = new OrbitControls(camera, renderer.domElement);

//   useEffect(() => {
//     const WIDTH = window.innerWidth;
//     const HEIGHT = window.innerHeight;

//     // Scene setup
//     const scene = sceneRef.current;
//     scene.background = new THREE.Color("#000000");

//     // Camera setup
//     const camera = cameraRef.current;
//     camera.position.set(10, 0, 50);

//     // Renderer setup
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(WIDTH, HEIGHT);
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFShadowMap;
//     document.body.appendChild(renderer.domElement);

//     // Lighting
//     const light = new THREE.HemisphereLight(0xffffff, 0x080820, 0.8);
//     light.position.set(0, 50, 50);
//     scene.add(light);

//     // Wall
//     const wallWidth = totalNum * distance + distance;
//     const geometry = new THREE.BoxGeometry(wallWidth, 100, 2);
//     const material = new THREE.MeshPhongMaterial({ color: 0x464946 });
//     const wallMesh = new THREE.Mesh(geometry, material);
//     wallMesh.position.set(wallWidth / 2 - distance, 0, -1.5);
//     wallMesh.receiveShadow = true;
//     galleryGroupRef.current.add(wallMesh);
//     scene.add(galleryGroupRef.current);

//     // Boxes
//     for (let i = 0; i < totalNum; i++) {
//       addBox(i);
//     }

//     // Animation loop
//     const animate = () => {
//       moveX.current += (targetNum.current - moveX.current) * 0.05;
//       galleryGroupRef.current.position.x = moveX.current;
//       camera.lookAt(scene.position);
//       camera.updateProjectionMatrix();
//       renderer.render(scene, camera);
//       requestAnimationFrame(animate);
//     };
//     animate();

//     // Event listeners
//     const stageResize = () => {
//       const newWIDTH = window.innerWidth;
//       const newHEIGHT = window.innerHeight;
//       camera.aspect = newWIDTH / newHEIGHT;
//       camera.updateProjectionMatrix();
//       renderer.setSize(newWIDTH, newHEIGHT);
//     };

//     const clickFunc = (event) => {
//       if (event.pageX < WIDTH / 2) {
//         if (pageNum.current > 0) {
//           pageNum.current -= 1;
//         }
//       } else {
//         if (pageNum.current < totalNum - 1) {
//           pageNum.current += 1;
//         }
//       }
//       targetNum.current = -(pageNum.current * distance);
//     };

//     const scrollFunc = (event) => {
//       if (event.deltaY < 0) {
//         if (pageNum.current > 0) {
//           pageNum.current -= 1;
//         }
//       } else {
//         if (pageNum.current < totalNum) {
//           pageNum.current += 1;
//         }
//       }
//       targetNum.current = -(pageNum.current * distance);
//     };

//     window.addEventListener("resize", stageResize);
//     document.addEventListener("click", clickFunc);
//     document.addEventListener("wheel", scrollFunc);

//     return () => {
//       window.removeEventListener("resize", stageResize);
//       document.removeEventListener("click", clickFunc);
//       document.removeEventListener("wheel", scrollFunc);
//     };
//   }, []);

//   const addBox = (i) => {
//     const imagePath = "/js/intro_pull.png";
//     const imageMap = new THREE.TextureLoader().load(imagePath);
//     const geometry = new THREE.BoxGeometry(32, 18, 1);
//     const material = new THREE.MeshPhongMaterial({ map: imageMap });
//     const boxMesh = new THREE.Mesh(geometry, material);
//     boxMesh.castShadow = true;
//     let x = i * distance;
//     let y = 0;
//     let z = 0;
//     boxMesh.position.set(x, y, z);
//     galleryGroupRef.current.add(boxMesh);

//     const spotLight = new THREE.SpotLight(0xffffff, 1.2);
//     spotLight.position.set(x, 30, 30);
//     spotLight.angle = Math.PI / 6;
//     spotLight.penumbra = 0.1;
//     spotLight.decay = 1;
//     spotLight.distance = 70;
//     spotLight.target = boxMesh;
//     spotLight.castShadow = true;
//     galleryGroupRef.current.add(spotLight);
//   };

//   return null;
// };

// function Real() {
//   const { camera, gl } = useThree(); // useThree 훅을 사용하여 camera와 gl 객체 가져오기

//   return (
//     <Canvas>
//       <Scene />
//       <OrbitControls args={[camera, gl.domElement]} />{" "}
//       {/* OrbitControls 초기화 */}
//     </Canvas>
//   );
// }
// export default Real;
