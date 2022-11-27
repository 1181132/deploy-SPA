import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArmazemListarComponent } from './Componentes/Armazem/armazem-listar/armazem-listar.component';
import { ArmazemCriarComponent } from './Componentes/Armazem/armazem-criar/armazem-criarcomponent';
import { ArmazemDetalhosComponent } from './Componentes/Armazem/armazem-detalhos/armazem-detalhos.component';

const routes: Routes = [
//  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'listarArmazem', component: ArmazemListarComponent },
  { path: 'detail/:id', component: ArmazemDetalhosComponent },
  { path: 'criarArmazem', component: ArmazemCriarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
