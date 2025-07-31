import { Component, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationInfoService } from '../../services/navigationInfo/navigationInfo.service'

import { Router } from '@angular/router';
import { PdfToMapService } from '../../services/pdfToMapService/pdfToMap.service';
import { firstValueFrom } from 'rxjs';
import { Ok_STATUS } from '../../../shared/constants/statusConstant';
import { AuthService } from '../../../auth/services/auth.service';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})

export class UploadComponent {
  public selectedFile = signal<File | null>(null);
  public errorMsg = signal('');
  public isLoading = signal(false);
  public isLoggin = signal(false);
  public showModal = signal(false);


  private navigationInfo = inject(NavigationInfoService);
  private router = inject(Router);
  private pdfUploadService = inject(PdfToMapService);
  private authService = inject(AuthService);


  ngOnInit(){
    this.isLoggin.set(this.authService.isLoggedIn());
  }

  public onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    this.errorMsg.set('');

    if (file) {
      if (file.type !== 'application/pdf') {
        this.errorMsg.set('Solo se permiten archivos PDF.');
        this.selectedFile.set(null);
      } else if (file.size > 5 * 1024 * 1024) {
        this.errorMsg.set('El PDF debe pesar menos de 5 MB.');
        this.selectedFile.set(null);
      } else {
        this.selectedFile.set(file);
      }
    }
  }

  handleUploadClick(): void {
    if (!this.isLoggin()) {
      this.showModal.set(true); 
      return;
    }

    this.uploadFile(); 
  }

  async uploadFile() {
    const file = this.selectedFile();

    if (!file) return;

    const formData = new FormData();
    formData.append('pdf', file);

    this.isLoading.set(true);

    try{
      const {body, status} = await firstValueFrom(this.pdfUploadService.UploadPdf(formData));

      if(status.code !== Ok_STATUS){
        this.errorMsg.set(status.description);
        this.isLoading.set(false);
      }
      
      this.navigationInfo.setMapaConceptual(body?.mapaConceptual ?? {nodes:[],links:[]});
      this.router.navigate(['/pdf/result']);

    }catch(error){
      this.errorMsg.set('Error del servidor, intentalo más tarde.');
      this.isLoading.set(false);
    }

  }

  canUpload = computed(() => !!this.selectedFile() && !this.isLoading());

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  goToLogout(): void {
    this.authService.logout();
    this.isLoggin.set(false);
  }

  closeModal(): void {
    this.showModal.set(false); 
  }
}
