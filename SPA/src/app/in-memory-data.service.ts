import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Armazem } from "./Modelos/armazem.js"
import { Entrega } from './Modelos/entrega.js';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const armazens = [
      { id: 'M13', designacao: 'Arouca' ,coordLat: 40.9321, coordLon: 8.2451},
      { id: 'z2', designacao: 'Espinho',coordLat: 41.0072, coordLon: 8.6410 },
      { id: 'e3', designacao: 'Gondomar',coordLat: 42.1115, coordLon: 8.7613 },
      { id: 'f4', designacao: 'Maia',coordLat: 41.2279, coordLon: 8.6210 },
      { id: 'g5', designacao: 'Matosinhos',coordLat: 41.1844, coordLon: 8.6963 },
      { id: 'h6', designacao: 'Oliveira de Azeméis',coordLat: 40.8387, coordLon: 8.4770 },
      { id: 'h7', designacao: 'Paredes',coordLat: 41.2059, coordLon: 8.3304 },
      { id: 'j8', designacao: 'Porto',coordLat: 41.1579, coordLon: 8.6291 },
      { id: 'k9', designacao: 'Póvoa de Varzim',coordLat: 41.3804, coordLon: 8.7609 },
      { id: 't10', designacao: 'Santa Maria da Feira',coordLat: 40.9268, coordLon: 8.5483 },
      { id: 'y11', designacao: 'Santo Tirso',coordLat: 41.3431, coordLon: 8.4738 },
      { id: 'u12', designacao: 'São João da Madeira',coordLat: 40.9005, coordLon: 8.4907 },
      { id: 'i13', designacao: 'Trofa',coordLat: 41.3391, coordLon: 8.5600 },
      { id: 'p14', designacao: 'Vale de Cambra',coordLat: 40.8430, coordLon: 8.3956 },
      { id: 'p15', designacao: 'Valongo',coordLat: 41.1887, coordLon: 8.4983 },
      { id: 'l16', designacao: 'Vila do Conde',coordLat: 41.3517, coordLon: 8.7479 },
      { id: 'p17', designacao: 'Vila Nova de Gaia',coordLat: 41.1239, coordLon: 8.6118 }
    ];
    return {armazens};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.

}
