import { NgModule } from '@angular/core';

//Ng imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {MenubarModule} from 'primeng/menubar';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { ChartModule } from 'primeng/chart';
import { TagModule } from 'primeng/tag';



@NgModule({
  declarations: [],
  exports: [
    ButtonModule,
    CardModule,
    MenubarModule,
    FieldsetModule,
    FileUploadModule,
    ChartModule,
    TagModule
  ]
})
export class PrimeNgModule { }
