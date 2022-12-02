import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArmazemListarComponent } from './Componentes/Armazem/armazem-listar/armazem-listar.component';
import { ArmazemCriarComponent } from './Componentes/Armazem/armazem-criar/armazem-criar.component';
import { ArmazemDetalhosComponent } from './Componentes/Armazem/armazem-detalhos/armazem-detalhos.component';
import { CamiaoCriarComponent } from './Componentes/Camiao/camiao-criar/camiao-criar.component';
import { CamiaoListarComponent } from './Componentes/Camiao/camiao-listar/camiao-listar.component';
import { CamiaoDetalhesComponent } from './Componentes/Camiao/camiao-detalhes/camiao-detalhes.component';
import { PercursoListarComponent } from './Componentes/Percurso/percurso-listar/percurso-listar.component';
import { PercursoDetalhesComponent } from './Componentes/Percurso/percurso-detalhes/percurso-detalhes.component';
import { PercursoCriarComponent } from './Componentes/Percurso/percurso-criar/percurso-criar.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
//  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'home' , component: HomeComponent},
  { path: 'listarArmazem', component: ArmazemListarComponent },
  { path: 'detail/:id', component: ArmazemDetalhosComponent },
  { path: 'criarCamião', component: CamiaoCriarComponent },
  { path: 'listarCamião', component: CamiaoListarComponent },
  { path: 'detalhe/:matricula', component: CamiaoDetalhesComponent},
  { path: 'criarArmazem', component: ArmazemCriarComponent },
  { path: 'listarPercurso', component: PercursoListarComponent },
  { path: 'detalhe/:armazem1', component: PercursoDetalhesComponent},
  { path: 'criarPercurso', component: PercursoCriarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
