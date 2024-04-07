import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Texture
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = (e)=>{
    console.log('loading started')
    
}
loadingManager.onProgress = ()=>{
    console.log('loading in progress')
}
loadingManager.onLoad = ()=>{
    console.log('loaded')
}
loadingManager.onError = ()=>{
    console.log('error loading')
}

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/door/color.jpg')
colorTexture.colorSpace = THREE.SRGBColorSpace
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
alphaTexture.colorSpace = THREE.SRGBColorSpace
const ambientTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
ambientTexture.colorSpace = THREE.SRGBColorSpace
const heightTexture = textureLoader.load('/textures/door/height.jpg')
heightTexture.colorSpace = THREE.SRGBColorSpace
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
metalnessTexture.colorSpace = THREE.SRGBColorSpace
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
normalTexture.colorSpace = THREE.SRGBColorSpace
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
roughnessTexture.colorSpace = THREE.SRGBColorSpace
const matcapsTexture = textureLoader.load('/textures/matcaps/1.png')
matcapsTexture.colorSpace = THREE.SRGBColorSpace
const  gradientTexture= textureLoader.load('/textures/gradients/5.jpg')
gradientTexture.colorSpace = THREE.SRGBColorSpace



// MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial({}); 
// material.side =  THREE.DoubleSide
// material.map = colorTexture
// material.color = new THREE.Color('#fff')
// material.wireframe = true

// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial()

// MeshMatcapMaterail
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapsTexture

// MeshDepthMaterail
// const material = new THREE.MeshDepthMaterial()

// MeshLamberMaterial
// const material = new THREE.MeshLambertMaterial()

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)
// material.wireframe = true

// MeshToonMaterial
const material = new THREE.MeshToonMaterial()
gradientTexture.generateMipmaps =false
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
material.gradientMap = gradientTexture


// Sphere geometry
const geometry = new THREE.SphereGeometry( .5, 32, 16 ); 
const sphere = new THREE.Mesh( geometry, material );
sphere.position.x = -1.5

// Plane geometry
const planeGeometry = new THREE.PlaneGeometry( 1, 1 );
const plane = new THREE.Mesh( planeGeometry, material );

// Torus geometry
const torusGeometry = new THREE.TorusGeometry( .4, .2, 16, 100 ); 
const torus = new THREE.Mesh( torusGeometry, material );
torus.position.x = 1.5
scene.add( sphere,plane, torus );

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
// camera.lookAt(plane.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true





/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    sphere.rotation.x += .01
    sphere.rotation.y += .01
    plane.rotation.x += .01
    plane.rotation.y += .01
    torus.rotation.x += .01
    torus.rotation.y += .01

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()