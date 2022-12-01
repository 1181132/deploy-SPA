import * as THREE from 'three'
import No from './no.js'

export default class ElementoLigacao extends THREE.Group {
  constructor(
    center = new THREE.Vector3(0.0, 0.0, 0.0),
    comprimento = 3,
    largura = 2,
    orientacao = 0,
  ) {
    super()
    const geometry = new THREE.BoxGeometry(comprimento, largura, 0.001)
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff })
    const cube = new THREE.Mesh(geometry, material)
    this.position.set(
      (comprimento / 1.9) * Math.cos(orientacao) + center.x,
      (comprimento / 1.9) * Math.sin(orientacao) + center.y,
      center.z,
    )
    this.rotateZ(orientacao)
    this.add(cube)
  }

  /*update() {
        
    }*/
}
