import { Component, Inject, Input } from '@angular/core'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class NoComponent extends THREE.Group {
  circle: THREE.Mesh<THREE.CircleGeometry, THREE.MeshBasicMaterial>

  constructor(@Inject(Number)center = new THREE.Vector3(0.0, 0.0, 0.0),@Inject(String)radius = 2) {
    super()

    const loader = new GLTFLoader()
    const modeloArmazem = new THREE.Object3D()

    loader.load('assets/assets1/modeloArmazem/warehouse_building.glb', function (gltf) {
      const modelo = gltf.scene.children[0];
      console.log(modelo)

      var box = new THREE.Box3().setFromObject(gltf.scene)
      const c = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      gltf.scene.position.set(-c.x, size.y / 2 - c.y, -c.z)
      modeloArmazem.add(gltf.scene)
    })

    modeloArmazem.scale.set(0.1, 0.1, 0.1)
    modeloArmazem.position.set(3, 3, 0)
    modeloArmazem.rotation.x = Math.PI / 2
    this.add(modeloArmazem)

    const geometry = new THREE.CircleGeometry(radius, 32)
    const material = new THREE.MeshBasicMaterial({ color:  0x1a1e24 })
    this.circle = new THREE.Mesh(geometry, material)
    this.position.set(center.x, center.y, center.z)

    this.add(this.circle)
  }
}
