import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ArmazensComponent } from './Componentes/Armazem/armazens/armazens.component';
import { ArmazemDetalhosComponent } from './Componentes/Armazem/armazem-detalhos/armazem-detalhos.component';
import { ArmazemProcuraComponent } from './Componentes/Armazem/armazem-procura/armazem-procura.component';
import { ListarArmazemComponent } from './Componentes/Armazem/listarArmazem/listarArmazem.component';
import { CamiaoDetalhesComponent } from './Componentes/Camiao/camiao-detalhes/camiao-detalhes.component';
import { CamiaoCriarComponent } from './Componentes/Camiao/camiao-criar/camiao-criar.component';
import { CamiaoProcuraComponent } from './Componentes/Camiao/camiao-procura/camiao-procura.component';
import { CamiaoListarComponent } from './Componentes/Camiao/camiao-listar/camiao-listar.component';
import { PercursoDetalhesComponent } from './Componentes/Percurso/percurso-detalhes/percurso-detalhes.component';
import { PercursoCriarComponent } from './Componentes/Percurso/percurso-criar/percurso-criar.component';
import { PercursoProcuraComponent } from './Componentes/Percurso/percurso-procura/percurso-procura.component';
import { PercursoListarComponent } from './Componentes/Percurso/percurso-listar/percurso-listar.component';

//import { ArmazemFormularioComponent } from './Componentes/Armazem/armazem-formulario/armazem-formulario.component';

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
   /*  HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ) */
  ],
  declarations: [
    AppComponent,
    ArmazensComponent,
    ArmazemDetalhosComponent,
    ArmazemProcuraComponent,
    ListarArmazemComponent,
    CamiaoDetalhesComponent,
    CamiaoCriarComponent,
    CamiaoProcuraComponent,
    CamiaoListarComponent,
    PercursoDetalhesComponent,
    PercursoCriarComponent,
    PercursoProcuraComponent,
    PercursoListarComponent,
  //  ArmazemFormularioComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
