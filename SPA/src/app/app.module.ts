import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './in-memory-data.service';
import { NgtCursorModule} from '@angular-three/core';
import { NgtMeshModule} from '@angular-three/core/meshes';
import { NgtMeshBasicMaterialModule} from '@angular-three/core/materials';
import { NgtBufferGeometryModule} from '@angular-three/core/geometries';

import { AppRoutingModule } from './app-routing.module';
import * as _ from 'underscore';

import { AppComponent } from './app.component';
import { ArmazemCriarComponent } from './Componentes/Armazem/armazem-criar/armazem-criar.component';
import { ArmazemDetalhosComponent } from './Componentes/Armazem/armazem-detalhos/armazem-detalhos.component';
import { ArmazemProcuraComponent } from './Componentes/Armazem/armazem-procura/armazem-procura.component';
import { ArmazemListarComponent } from './Componentes/Armazem/armazem-listar/armazem-listar.component';
import { CamiaoDetalhesComponent } from './Componentes/Camiao/camiao-detalhes/camiao-detalhes.component';
import { CamiaoCriarComponent } from './Componentes/Camiao/camiao-criar/camiao-criar.component';
import { CamiaoProcuraComponent } from './Componentes/Camiao/camiao-procura/camiao-procura.component';
import { CamiaoListarComponent } from './Componentes/Camiao/camiao-listar/camiao-listar.component';
import { PercursoDetalhesComponent } from './Componentes/Percurso/percurso-detalhes/percurso-detalhes.component';
import { PercursoCriarComponent } from './Componentes/Percurso/percurso-criar/percurso-criar.component';
import { PercursoProcuraComponent } from './Componentes/Percurso/percurso-procura/percurso-procura.component';
import { PercursoListarComponent } from './Componentes/Percurso/percurso-listar/percurso-listar.component';
import { RedeViariaComponent } from './Componentes/Rede-viaria/rede-viaria.component';
import { ArcoComponent } from './Componentes/Rede-viaria/arco/arco.component';
import { ElementoLigacaoComponent } from './Componentes/Rede-viaria/elemento-ligacao/elemento-ligacao.component';
//import { NoComponent } from './Componentes/Rede-viaria/no/no.component';



@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgtCursorModule,
    NgtMeshModule,
    NgtMeshBasicMaterialModule,
    NgtBufferGeometryModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
   /*  HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ) */
  ],
  declarations: [
    AppComponent,
    ArmazemCriarComponent,
    ArmazemDetalhosComponent,
    ArmazemProcuraComponent,
    ArmazemListarComponent,
    CamiaoDetalhesComponent,
    CamiaoCriarComponent,
    CamiaoProcuraComponent,
    CamiaoListarComponent,
    PercursoDetalhesComponent,
    PercursoCriarComponent,
    PercursoProcuraComponent,
    PercursoListarComponent,
    RedeViariaComponent,
    ArcoComponent,
    ElementoLigacaoComponent,
 //  NoComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
