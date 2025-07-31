import { Component, computed, inject } from '@angular/core';
import { NavigationInfoService } from '../../services/navigationInfo/navigationInfo.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {

  private navigationInfo = inject(NavigationInfoService);

  mapa = this.navigationInfo.mapaConceptual();
  nodes = computed(() => this.mapa?.nodes ?? []);
  links = computed(() => this.mapa?.links ?? []);
  
  
 
}
