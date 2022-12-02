import * as THREE from 'three'
import No from './no.js'
import ElementoLigacao from './elementoLigacao.js'

export default class Arco {
  constructor(origem, destino) {
    //no1 = new No(new THREE.Vector3(0.0, 0.0, 0.0), 2), no2 = new No(new THREE.Vector3(3, 3.0, 3.0), 2),

    this.object = new THREE.Group()

    const largura = 2
    const compE = 2.5 // Sij

    const desnivel = destino.z - origem.z //hij

    let yFinal = destino.y - origem.y
    let xFinal = destino.x - origem.x

    const orientacao = Math.atan2(yFinal, xFinal) // Alphaij

    //var orientacao = Math.asin(y / Math.sqrt(y * y + x * x));
    const e1 = new ElementoLigacao(
      new THREE.Vector3(origem.x, origem.y, origem.z),
      compE,
      2,
      orientacao,
    )
    const e2 = new ElementoLigacao(
      new THREE.Vector3(destino.x, destino.y, destino.z),
      compE,
      2,
      3.14 + orientacao,
    )
    const comprimentoOXY =
      Math.sqrt(Math.pow(xFinal, 2) + Math.pow(yFinal, 2)) - compE * 2 //pij
    const inclinacao = Math.atan(desnivel / comprimentoOXY) // Betaij
    const comprimento = Math.sqrt(
      Math.pow(comprimentoOXY, 2) + Math.pow(desnivel, 2),
    )

    this.object.add(e1)
    this.object.add(e2)

    const geometry = new THREE.BoxGeometry(comprimento, largura, 0.01)
    const material = new THREE.MeshBasicMaterial({ color: 0xffa500 })
    const cube = new THREE.Mesh(geometry, material)
    this.object.add(cube)
    this.object.position.set(
      Math.abs(destino.x + origem.x) / 2,
      Math.abs(destino.y + origem.y) / 2,
      Math.abs(destino.z + origem.z) / 2,
    )
    this.object.rotateZ(orientacao)
    this.object.rotateY(-inclinacao)
  }
}
