import { Component, OnInit } from '@angular/core'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Location } from '@angular/common'
import { Armazens } from './Armazens'
import { WebGLRenderer } from 'three'
import { NoComponent } from './no.component'

@Component({
  selector: 'app-rede-viaria',
  templateUrl: './rede-viaria.component.html',
  styleUrls: ['./rede-viaria.component.css'],
})
export class RedeViariaComponent implements OnInit {
  name = 'Angular'

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.animation()
  }

  animation(): void {
    // Atributos e Constantes Auxiliares
    const K_CIRCULO = 1.1
    const wij = 3
    const INFINITESIMO = 0.01
    const K_LIGACAO = 2
    const circleRadius = K_CIRCULO * wij
    const elemLigColor = 0x7e848c
    const ruaColor = 0x5d636b

    //SCENE
    //Eixo Vermelho: X -> longitude
    //Eixo Verde: Y -> latitude
    //Eixo Azul: Z -> altitude
    var scene = new THREE.Scene()

/*     const sceneAxisHelper = new THREE.AxesHelper(100)
    scene.add(sceneAxisHelper) */

    scene.fog = new THREE.FogExp2(0xebebeb, 0.0004)

    let filename = 'bluecloud'

    const materialArray = this.createMaterialArray(filename)
    const skyboxGeo = new THREE.BoxGeometry(500, 500, 500)
    const skybox = new THREE.Mesh(skyboxGeo, materialArray)
    scene.add(skybox)

    //CAMERA
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    camera.up.set(0, 0, 1) //Coloca o vetor up pelo eixo z
    camera.position.set(50, 50, 100)
    camera.lookAt(0, 0, 0)

    //LIGHTS
    const color = 0xffffff
    const intensity = 1
    const light = new THREE.SpotLight(color, intensity)
    light.position.set(0, 0, 1000)
    light.angle = THREE.MathUtils.degToRad(30)
    light.penumbra = 0.4
    scene.add(light)
    scene.add(light.target)

    //RENDERER
    var renderer = new WebGLRenderer()
    renderer.shadowMap.enabled = true
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.style.position = 'absolute'
    document.body.appendChild(renderer.domElement)

    //Controls
    var controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.2
    controls.maxPolarAngle = Math.PI / 2
    controls.target.set(0, 5, 0)
    controls.maxDistance = 150
    controls.minDistance = 10
    controls.update()

    //Exemplos de nos
    const coords1 = new Armazens(1, 'Arouca', -50, -42.6618, 15.625)
    const coords2 = new Armazens(2, 'Espinho', 26.6951, -36.7615, 34.375)
    const coords3 = new Armazens(3, 'Gondomar', 50, 50, 12.5)
    const coords4 = new Armazens(4, 'Maia', 22.8206, -19.4217, 43.75)
    const coords5 = new Armazens(5, 'Matosinhos', 37.408, -22.8394, 21.875)
    const coords6 = new Armazens(
      6,
      'Oliveira de Azeméis',
      -5.0756,
      -50.0,
      46.875,
    )
    const coords7 = new Armazens(7, 'Paredes', -33.4754, -21.2052, 0.0)
    const coords8 = new Armazens(8, 'Porto', 24.3898, -24.9214, 37.5)
    const coords9 = new Armazens(
      9,
      'Póvoa de Varzim',
      49.9225,
      -7.4403,
      25.0,
    )
    const coords10 = new Armazens(
      10,
      'Santa Maria da Feira',
      8.7369,
      -43.0783,
      6.25,
    )
    const coords11 = new Armazens(
      11,
      'Santo Tirso',
      -5.6955,
      -10.3708,
      40.625,
    )
    const coords12 = new Armazens(
      12,
      'São João da Madeira',
      -2.4215,
      -45.1446,
      18.75,
    )
    const coords13 = new Armazens(13, 'Trofa', 11.0035, -10.6851, 28.125)
    const coords14 = new Armazens(
      14,
      'Vale de Cambra',
      -20.8446,
      -49.6622,
      3.125,
    )
    const coords15 = new Armazens(15, 'Valongo', -0.9492, -22.5016, 50.0)
    const coords16 = new Armazens(
      16,
      'Vila do Conde',
      47.4041,
      -9.6952,
      9.375,
    )
    const coords17 = new Armazens(
      17,
      ' Vila Nova de Gaia',
      21.0384,
      -27.5927,
      31.25,
    )

    let coords: Armazens[] = [
      coords1,
      coords2,
      coords3,
      coords4,
      coords5,
      coords6,
      coords7,
      coords8,
      coords9,
      coords10,
      coords11,
      coords12,
      coords13,
      coords14,
      coords15,
      coords16,
      coords17,
    ]

    let geometry, material, plane, texture
    texture = new THREE.TextureLoader().load(
      'assets/assets1/texturas/relva.png',
    )
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(100, 100)
    geometry = new THREE.BoxGeometry(150, 0.1, 150)
    material = new THREE.MeshLambertMaterial({ map: texture })
    plane = new THREE.Mesh(new THREE.PlaneGeometry(400, 3500), material)
    plane.material.side = THREE.DoubleSide
    plane.rotateZ(Math.PI / 2)
    plane.position.z = -1
    scene.add(plane)

    //Criar e Adicionar cada rotunda ao grupo
    coords.forEach(function (item) {
      let pos = new THREE.Vector3(
        item.longitude,
        item.latitude,
        item.altitude + INFINITESIMO,
      )
      let node = new NoComponent(pos, circleRadius)
      scene.add(node)

      let index = coords.indexOf(item)
      let indexNext = index + 1
      let indexPrev = index - 1

      if (index == coords.length - 1) {
        indexNext = 0
      }
      if (index == 0) {
        indexPrev = coords.length - 1
      }

      //Criar a ligação à anterior
      let si = K_LIGACAO * circleRadius

      const retangulo = new THREE.PlaneGeometry(si, wij)
      const materialRetangulo = new THREE.MeshBasicMaterial({
        color: elemLigColor,
        side: THREE.DoubleSide,
      })
      const elementoLigacao = new THREE.Mesh(retangulo, materialRetangulo)

      let orientacao = Math.atan2(
        coords[index].latitude - coords[indexPrev].latitude,
        coords[index].longitude - coords[indexPrev].longitude,
      )
      elementoLigacao.rotateZ(orientacao)

      let pontoX = node.position.x
      let pontoY = node.position.y
      let pontoZ = node.position.z

      elementoLigacao.position.set(pontoX, pontoY, pontoZ - 0.1)

      let tr = circleRadius + (si - 2 * circleRadius) / 2
      elementoLigacao.translateX(-tr)

      scene.add(elementoLigacao)

      //Criar a ligação ao seguinte
      const retangulo2 = new THREE.PlaneGeometry(si, 3)
      const materialRetangulo2 = new THREE.MeshBasicMaterial({
        color: elemLigColor,
        side: THREE.DoubleSide,
      })
      const elementoLigacao2 = new THREE.Mesh(retangulo2, materialRetangulo2)

      let orientacao2 = Math.atan2(
        coords[index].latitude - coords[indexNext].latitude,
        coords[index].longitude - coords[indexNext].longitude,
      )
      elementoLigacao2.rotateZ(orientacao2)

      elementoLigacao2.position.set(pontoX, pontoY, pontoZ - 0.1)
      elementoLigacao2.translateX(-tr)

      scene.add(elementoLigacao2)

      //ARCOS (RAMPAS/ESTRADAS)

      let xElemLig = coords[index].longitude + Math.cos(orientacao2) / si
      let yElemLig = coords[index].latitude + Math.sin(orientacao2) / si
      let zElemLig = coords[index].altitude

      let xElemLigNext =
        coords[indexNext].longitude - Math.cos(orientacao2) / si
      let yElemLigNext = coords[indexNext].latitude - Math.sin(orientacao2) / si
      let zElemLigNext = coords[indexNext].altitude

      let pij =
        Math.sqrt(
          Math.pow(xElemLig - xElemLigNext, 2) +
            Math.pow(yElemLig - yElemLigNext, 2),
        ) -
        si * 2
      let hij = zElemLig - zElemLigNext
      let sij = Math.sqrt(Math.pow(pij, 2) + Math.pow(hij, 2))

      const retRua = new THREE.BoxGeometry(sij, 0, wij)
      const materialRua = new THREE.MeshBasicMaterial({
        color: ruaColor,
        side: THREE.DoubleSide,
      })
      const rua = new THREE.Mesh(retRua, materialRua)

      let xMedio = (xElemLig + xElemLigNext) / 2
      let yMedio = (yElemLig + yElemLigNext) / 2
      let zMedio = (zElemLig + zElemLigNext) / 2

      let inclinacao = Math.atan(hij / pij)
      rua.up.set(0, 0, 1)
      rua.position.set(xMedio, yMedio, zMedio)

      rua.rotateX(Math.PI / 2)
      rua.rotateY(orientacao2)
      rua.rotateZ(inclinacao)

      scene.add(rua)
    })

    function animate() {
      requestAnimationFrame(animate)

      skybox.rotation.x += 0.0005
      //  skybox.rotation.y += 0.0005;

      controls.update()

      renderer.render(scene, camera)
    }

    animate()
  }

  createPathStrings(filename: string) {
    const basePath = 'assets/assets1/skybox/'
    const baseFilename = basePath + filename
    const fileType = '.png'
    const sides = ['ft', 'bk', 'up', 'dn', 'rt', 'lf']
    const pathStings = sides.map((side) => {
      return baseFilename + '_' + side + fileType
    })

    return pathStings
  }

  createMaterialArray(filename: string) {
    const skyboxImagepaths = this.createPathStrings(filename)
    const materialArray = skyboxImagepaths.map((image) => {
      let texture = new THREE.TextureLoader().load(image)

      return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide })
    })
    return materialArray
  }

  goBack(): void {
    this.location.back()
  }
}
