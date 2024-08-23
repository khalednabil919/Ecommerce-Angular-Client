import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerSharedComponent } from './components/spinner-shared/spinner-shared.component';
import { SelectComponent } from './components/select/select.component';
import {FormsModule} from '@angular/forms'


@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerSharedComponent,
    SelectComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    
  ],
  exports:[
    HeaderComponent,
    SpinnerSharedComponent,
    SelectComponent,
    FormsModule
  ]
})
export class SharedModule { }
