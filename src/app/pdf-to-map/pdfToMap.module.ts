import { NgModule } from '@angular/core';
import { UploadComponent } from './pages/upload/upload.component';
import { ResultComponent } from './pages/result/result.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfRoutingModule } from './pdfToMap.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PdfToMapService } from './services/pdfToMapService/pdfToMap.service';
import { NgxGraphModule } from '@swimlane/ngx-graph';


@NgModule({
  declarations: [
    UploadComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,    
    RouterModule,
    PdfRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxGraphModule,
  
  ],
  providers: [
    PdfToMapService
  ]

})
export class PdfToMapModule { }
