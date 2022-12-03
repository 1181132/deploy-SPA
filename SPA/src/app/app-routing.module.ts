import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArmazemListarComponent } from './Componentes/Armazem/armazem-listar/armazem-listar.component';
import { ArmazemCriarComponent } from './Componentes/Armazem/armazem-criar/armazem-criar.component';
import { ArmazemDetalhosComponent } from './Componentes/Armazem/armazem-detalhos/armazem-detalhos.component';

import { EntregaCriarComponent } from './Componentes/Entrega/entrega-criar/entrega-criar.component';
import { EntregaDetalhesComponent } from './Componentes/Entrega/entrega-detalhes/entrega-detalhes.component';
import { EntregaListarComponent } from './Componentes/Entrega/entrega-listar/entrega-listar.component';

import { CamiaoCriarComponent } from './Componentes/Camiao/camiao-criar/camiao-criar.component';
import { CamiaoListarComponent } from './Componentes/Camiao/camiao-listar/camiao-listar.component';
import { CamiaoDetalhesComponent } from './Componentes/Camiao/camiao-detalhes/camiao-detalhes.component';
import { PercursoListarComponent } from './Componentes/Percurso/percurso-listar/percurso-listar.component';
import { PercursoDetalhesComponent } from './Componentes/Percurso/percurso-detalhes/percurso-detalhes.component';
import { PercursoCriarComponent } from './Componentes/Percurso/percurso-criar/percurso-criar.component';
<<<<<<< HEAD
//import { RedeViariaComponent } from './Componentes/Rede-viaria/rede-viaria.component';

const routes: Routes = [
//  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
=======
import { RedeViariaComponent } from './Componentes/Rede-viaria/rede-viaria.component';
//import { HomeComponent } from './home/home.component';

const routes: Routes = [
//  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
 // { path: 'home' , component: HomeComponent},
>>>>>>> 13f52092bcb9408c743aa5c3e791356ae96aa3f3
  { path: 'listarArmazem', component: ArmazemListarComponent },
  { path: 'detail/:id', component: ArmazemDetalhosComponent },
  { path: 'criarArmazem', component: ArmazemCriarComponent },
 // { path: 'armzens', loadChildren: () => import('./Componentes/Armazem/armazem.module').then(m => m.ArmazemModule)},
  { path: 'listarEntrega', component: EntregaListarComponent},
  { path: 'detail/id', component :EntregaDetalhesComponent},
  { path: 'criarEntrega', component: EntregaCriarComponent},
  { path: 'criarCamião', component: CamiaoCriarComponent },
  { path: 'listarCamião', component: CamiaoListarComponent },
  { path: 'detalhe/:matricula', component: CamiaoDetalhesComponent},
  { path: 'listarPercurso', component: PercursoListarComponent },
  { path: 'detalhe/:armazem1', component: PercursoDetalhesComponent},
  { path: 'criarPercurso', component: PercursoCriarComponent },
  { path: 'redeViaria', component: RedeViariaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
