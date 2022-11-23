import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Armazem } from './Modelos/armazem';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const armazens = [
      { id: 1, name: 'Arouca' ,coordLat: 40.9321, coordLon: 8.2451},
      { id: 2, name: 'Espinho',coordLat: 41.0072, coordLon: 8.6410 },
      { id: 3, name: 'Gondomar',coordLat: 42.1115, coordLon: 8.7613 },
      { id: 4, name: 'Maia',coordLat: 41.2279, coordLon: 8.6210 },
      { id: 5, name: 'Matosinhos',coordLat: 41.1844, coordLon: 8.6963 },
      { id: 6, name: 'Oliveira de Azeméis',coordLat: 40.8387, coordLon: 8.4770 },
      { id: 7, name: 'Paredes',coordLat: 41.2059, coordLon: 8.3304 },
      { id: 8, name: 'Porto',coordLat: 41.1579, coordLon: 8.6291 },
      { id: 9, name: 'Póvoa de Varzim',coordLat: 41.3804, coordLon: 8.7609 },
      { id: 10, name: 'Santa Maria da Feira',coordLat: 40.9268, coordLon: 8.5483 },
      { id: 11, name: 'Santo Tirso',coordLat: 41.3431, coordLon: 8.4738 },
      { id: 12, name: 'São João da Madeira',coordLat: 40.9005, coordLon: 8.4907 },
      { id: 13, name: 'Trofa',coordLat: 41.3391, coordLon: 8.5600 },
      { id: 14, name: 'Vale de Cambra',coordLat: 40.8430, coordLon: 8.3956 },
      { id: 15, name: 'Valongo',coordLat: 41.1887, coordLon: 8.4983 },
      { id: 16, name: 'Vila do Conde',coordLat: 41.3517, coordLon: 8.7479 },
      { id: 17, name: 'Vila Nova de Gaia',coordLat: 41.1239, coordLon: 8.6118 }
    ];
    return {armazens};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(armazens: Armazem[]): number {
    return armazens.length > 0 ? Math.max(...armazens.map(armazem => armazem.id)) + 1 : 11;
  }
}
