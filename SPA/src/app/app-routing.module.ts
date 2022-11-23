import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarArmazemComponent } from './Componentes/Armazem/listarArmazem/listarArmazem.component';
import { ArmazensComponent } from './Componentes/Armazem/armazens/armazens.component';
import { ArmazemDetalhosComponent } from './Componentes/Armazem/armazem-detalhos/armazem-detalhos.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'listarArmazem', component: ListarArmazemComponent },
  { path: 'detail/:id', component: ArmazemDetalhosComponent },
  { path: 'criarArmazem', component: ArmazensComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
