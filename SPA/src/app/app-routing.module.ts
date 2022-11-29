import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArmazemListarComponent } from './Componentes/Armazem/armazem-listar/armazem-listar.component';
import { ArmazemCriarComponent } from './Componentes/Armazem/armazem-criar/armazem-criarcomponent';
import { ArmazemDetalhosComponent } from './Componentes/Armazem/armazem-detalhos/armazem-detalhos.component';
import { EntregaCriarComponent } from './Componentes/Entrega/entrega-criar/entrega-criar.component';
import { EntregaDetalhesComponent } from './Componentes/Entrega/entrega-detalhes/entrega-detalhes.component';
import { EntregaListarComponent } from './Componentes/Entrega/entrega-listar/entrega-listar.component';


const routes: Routes = [
//  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'listarArmazem', component: ArmazemListarComponent },
  { path: 'detail/:id', component: ArmazemDetalhosComponent },
  { path: 'criarArmazem', component: ArmazemCriarComponent },
  { path: 'listarEntrega', component: EntregaListarComponent},
  { path: 'detail/id', component :EntregaDetalhesComponent},
  { path: 'criarEntrega', component: EntregaCriarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
