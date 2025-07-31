import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ResponseWrapper } from '../../../shared/interface/responseWrapper.interface';
import { PdfToMapResponse } from '../../interfaces/pdfToMapResponse.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PdfToMapService {

  private baseUrl = environment.apiUrl;

  private http = inject(HttpClient)

  UploadPdf(formData: FormData) {
    return this.http.post<ResponseWrapper<PdfToMapResponse>>(`${this.baseUrl}/pdf/upload`, formData);
  }

}
