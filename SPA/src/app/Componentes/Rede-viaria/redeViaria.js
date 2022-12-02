import * as THREE from 'three'
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js'

import No from './no.js'
import ElementoLigacao from './elementoLigacao.js'
import Arco from './arco.js'

export default class RedeViaria {
  constructor(localizacoesArmazem) {
    this.armazemArray = []

    this.scene = new THREE.Scene()

    this.scene.fog = new THREE.FogExp2(0x34583d, 0.004)

    const axesHelper = new THREE.AxesHelper(5)
    this.scene.add(axesHelper)

    const color = 0xffffff
    const intensity = 1
    const light = new THREE.SpotLight(color, intensity)
    light.position.set(80, 80, 0)
    light.angle = THREE.MathUtils.degToRad(30)
    light.penumbra = 0.4
    this.scene.add(light)
    this.scene.add(light.target)

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    //this.scene.background = new THREE.Color(0xfffffff)

    this.scene.background = new THREE.CubeTextureLoader().load([
      'skybox/xpos.png',
      'skybox/xneg.png',
      'skybox/ypos.png',
      'skybox/yneg.png',
      'skybox/zpos.png',
      'skybox/zneg.png',
    ])

    this.camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      10000,
    )
    this.camera.position.set(0, 90, 0)
    this.camera.up.set(0, 0, 1)

    window.addEventListener('resize', (event) => this.windowResize(event))

    this.renderer = new THREE.WebGL1Renderer({
      antialias: true,
    })
    this.renderer.setSize(sizes.width, sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    document.body.appendChild(this.renderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.2
    this.controls.maxPolarAngle = Math.PI / 2
    this.controls.target.set(0, 5, 0)
    this.controls.update()
    this.setUpScene(localizacoesArmazem)
  }

  setUpScene(localizacoesArmazem) {
    let geometry, material, box
    geometry = new THREE.BoxGeometry(120, 0.1, 120)
    material = new THREE.MeshBasicMaterial({ color: 0x99e599 })
    box = new THREE.Mesh(geometry, material)
    box.rotateX(Math.PI / 2)
    box.position.x = -5
    this.scene.add(box)

    localizacoesArmazem.forEach((obj) => {
      const no = new No(obj)
      this.armazemArray.push(no)
      this.scene.add(no.object)
    })
    this.ligacoes()
  }

  ligacoes() {
    for (let i = 0; i < this.armazemArray.length; i++) {
      console.log(
        this.armazemArray[i].name +
          '--' +
          this.armazemArray[i].x +
          ' / ' +
          this.armazemArray[i].y +
          ' / ' +
          this.armazemArray[i].z,
      )

      for (let j = 0; j < this.armazemArray[i].links.length; j++) {
        const origem = this.armazemArray[i]
        const destino = this.armazemArray[this.armazemArray[i].links[j]]
        const arco = new Arco(origem, destino)
        this.scene.add(arco.object)
      }
    }
  }

  update() {
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  windowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

/*   const INFINITESIMO = 0.001
const K_CIRCULO = 2.1
const K_LIGACAO = 1.1

/* const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper) */

/* let pos1 = new THREE.Vector3(0, 0, 0 + INFINITESIMO)
let pos2 = new THREE.Vector3(6, 0, 4 + INFINITESIMO)
let node1 = new No(pos1, (K_CIRCULO * 2) / 2)
let node2 = new No(pos2, (K_CIRCULO * 2) / 2)

scene.add(node1)
scene.add(node2)

let arco = new Arco(node1, node2)
scene.add(arco)

 pos2 = new THREE.Vector3(10, 10, 2 + INFINITESIMO)
let node3 = new No(pos2, (K_CIRCULO * 2) / 2)
scene.add(node3);

let arco1 = new Arco(node2,node3)
scene.add(arco1)
 */

/* const lightDir = new THREE.DirectionalLight(0xffffff)
lightDir.position.set(-1, -1, 1)
scene.add(lightDir)
 */

//const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

//const controls = new OrbitControls(camera, renderer.domElement)

//renderer.shadowMap.enable = true
//renderer.gammaOutput = true
//animate()

//function animate() {
//  requestAnimationFrame(animate)

// required if controls.enableDamping or controls.autoRotate are set to true
//  controls.update()

//  renderer.render(scene, camera)
//}
