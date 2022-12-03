import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './in-memory-data.service';
//import { NgtCursorModule} from '@angular-three/core';
//import { NgtMeshModule} from '@angular-three/core/meshes';
//import { NgtMeshBasicMaterialModule} from '@angular-three/core/materials';
//import { NgtBufferGeometryModule} from '@angular-three/core/geometries';

import { AppRoutingModule } from './app-routing.module';
import {MatTableModule} from '@angular/material/table';
import { AppComponent } from './app.component';
import { ArmazemCriarComponent } from './Componentes/Armazem/armazem-criar/armazem-criar.component';
import { ArmazemDetalhosComponent } from './Componentes/Armazem/armazem-detalhos/armazem-detalhos.component';
import { ArmazemProcuraComponent } from './Componentes/Armazem/armazem-procura/armazem-procura.component';
import { ArmazemListarComponent } from './Componentes/Armazem/armazem-listar/armazem-listar.component';
import { EntregaCriarComponent } from './Componentes/Entrega/entrega-criar/entrega-criar.component';
import { EntregaDetalhesComponent } from './Componentes/Entrega/entrega-detalhes/entrega-detalhes.component';
import { EntregaListarComponent } from './Componentes/Entrega/entrega-listar/entrega-listar.component';
import { EntregaProcuraComponent } from './Componentes/Entrega/entrega-procura/entrega-procura.component';
import { CamiaoDetalhesComponent } from './Componentes/Camiao/camiao-detalhes/camiao-detalhes.component';
import { CamiaoCriarComponent } from './Componentes/Camiao/camiao-criar/camiao-criar.component';
import { CamiaoProcuraComponent } from './Componentes/Camiao/camiao-procura/camiao-procura.component';
import { CamiaoListarComponent } from './Componentes/Camiao/camiao-listar/camiao-listar.component';
import { PercursoDetalhesComponent } from './Componentes/Percurso/percurso-detalhes/percurso-detalhes.component';
import { PercursoCriarComponent } from './Componentes/Percurso/percurso-criar/percurso-criar.component';
import { PercursoProcuraComponent } from './Componentes/Percurso/percurso-procura/percurso-procura.component';
import { PercursoListarComponent } from './Componentes/Percurso/percurso-listar/percurso-listar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import {MatSortModule} from '@angular/material/sort';

import { MatButtonModule } from '@angular/material/button';
//import { RedeViariaComponent } from './Componentes/Rede-viaria/rede-viaria.component';
//import { ArcoComponent } from './Componentes/Rede-viaria/arco/arco.component';
//import { ElementoLigacaoComponent } from './Componentes/Rede-viaria/elemento-ligacao/elemento-ligacao.component';



@NgModule({
  imports: [
    BrowserModule,
    MatSortModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatButtonModule
    //NgtCursorModule,
    //NgtMeshModule,
    //NgtMeshBasicMaterialModule,
    //NgtBufferGeometryModule,
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
    EntregaCriarComponent,
    EntregaDetalhesComponent,
    EntregaListarComponent,
    EntregaProcuraComponent,
    CamiaoDetalhesComponent,
    CamiaoCriarComponent,
    CamiaoProcuraComponent,
    CamiaoListarComponent,
    PercursoDetalhesComponent,
    PercursoCriarComponent,
    PercursoProcuraComponent,
    PercursoListarComponent,
  //  ArmazemFormularioComponent,
    ArmazemListarComponent,  
    
//    RedeViariaComponent,
//    ArcoComponent,
//    ElementoLigacaoComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
