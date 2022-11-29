import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ArmazemCriarComponent } from './Componentes/Armazem/armazem-criar/armazem-criarcomponent';
import { ArmazemDetalhosComponent } from './Componentes/Armazem/armazem-detalhos/armazem-detalhos.component';
import { ArmazemProcuraComponent } from './Componentes/Armazem/armazem-procura/armazem-procura.component';
import { ArmazemListarComponent } from './Componentes/Armazem/armazem-listar/armazem-listar.component';
import { EntregaCriarComponent } from './Componentes/Entrega/entrega-criar/entrega-criar.component';
import { EntregaDetalhesComponent } from './Componentes/Entrega/entrega-detalhes/entrega-detalhes.component';
import { EntregaListarComponent } from './Componentes/Entrega/entrega-listar/entrega-listar.component';
import { EntregaProcuraComponent } from './Componentes/Entrega/entrega-procura/entrega-procura.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
 //   HttpClientInMemoryWebApiModule.forRoot(
 //     InMemoryDataService, { dataEncapsulation: false }
 //   )
  ],
  declarations: [
    AppComponent,
    ArmazemCriarComponent,
    ArmazemDetalhosComponent,
    ArmazemProcuraComponent,
    ArmazemListarComponent,
    EntregaCriarComponent,
    EntregaDetalhesComponent,
    EntregaListarComponent,
    EntregaProcuraComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
