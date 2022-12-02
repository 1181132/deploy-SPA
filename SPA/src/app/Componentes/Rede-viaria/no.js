import * as THREE from 'three'
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js'

export default class No {
  constructor(data) {
    const center = new THREE.Vector3(0.0, 0.0, 0.0)
    const radius = 2
    this.name = data.name
    this.links = data.links

    this.object = new THREE.Group()

    this.coordenadas = this.transformarCoordenadas(data)

    this.x = this.coordenadas.x
    this.y = this.coordenadas.y
    this.z = this.coordenadas.z

    const loader = new GLTFLoader()
    const modeloArmazem = new THREE.Object3D()

    loader.load(
      '/assets/warehouse_building.glb',
      function (gltf) {
        console.log(gltf)

        const box = new THREE.Box3().setFromObject(gltf.scene)
        const c = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        gltf.scene.position.set(-c.x, size.y / 2 - c.y, -c.z)
        modeloArmazem.add(gltf.scene)
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loadded')
      },
      function (error) {
        console.log('An error occurred')
      },
    )

    modeloArmazem.scale.set(0.05, 0.05, 0.05)
    modeloArmazem.position.set(2, 0, 0)
    modeloArmazem.rotation.x = Math.PI / 2
    this.object.add(modeloArmazem)

    let geometry, material, circle
    geometry = new THREE.CircleGeometry(radius, 32)
    material = new THREE.MeshBasicMaterial({ color: 0x0000ff })
    circle = new THREE.Mesh(geometry, material)
    this.object.add(circle)

    this.object.position.set(
      this.coordenadas.x,
      this.coordenadas.y,
      this.coordenadas.z,
    )
    //this.object.rotateY(Math.PI/2)
  }

  transformarCoordenadas(data) {
    return {
      x: (100 / (8.7613 - 8.2451)) * (data.lon - 8.2451) - 50,
      y: (100 / (42.1115 - 40.8387)) * (data.lat - 40.8387) - 50,
      z: ((50 / 800) * data.alt) / 10,
    }
  }
}
