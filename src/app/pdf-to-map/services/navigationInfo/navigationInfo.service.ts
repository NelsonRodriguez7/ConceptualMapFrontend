import { Injectable, signal } from '@angular/core';
import { MapaConceptual } from '../../interfaces/pdfToMapResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class NavigationInfoService {

  private _mapaConceptual = signal<MapaConceptual | null>(null);

  // Getter y setter
  get mapaConceptual() {
    return this._mapaConceptual;
  }

  setMapaConceptual(value: MapaConceptual) {
    this._mapaConceptual.set(value);
  }

  clear() {
    this._mapaConceptual.set(null);
  }
}
