import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

const routes: Routes = [
  { path: 'pokelist', component: PokemonListComponent },
  { path: 'pokelist/:id', component: PokemonDetailsComponent },
  {
    path: '',
    redirectTo: '/pokelist',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
