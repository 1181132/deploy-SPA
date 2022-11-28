import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarArmazemComponent } from './Componentes/Armazem/listarArmazem/listarArmazem.component';
import { ArmazensComponent } from './Componentes/Armazem/armazens/armazens.component';
import { ArmazemDetalhosComponent } from './Componentes/Armazem/armazem-detalhos/armazem-detalhos.component';
import { CamiaoCriarComponent } from './Componentes/Camiao/camiao-criar/camiao-criar.component';
import { CamiaoListarComponent } from './Componentes/Camiao/camiao-listar/camiao-listar.component';
import { CamiaoDetalhesComponent } from './Componentes/Camiao/camiao-detalhes/camiao-detalhes.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'listarArmazem', component: ListarArmazemComponent },
  { path: 'detail/:id', component: ArmazemDetalhosComponent },
  { path: 'criarArmazem', component: ArmazensComponent },
  { path: 'criarCamião', component: CamiaoCriarComponent },
  { path: 'listarCamião', component: CamiaoListarComponent },
  { path: 'detalhe/:matricula', component: CamiaoDetalhesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
