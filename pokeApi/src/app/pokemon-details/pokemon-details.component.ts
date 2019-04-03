import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent {
  public pokemonId: number;
  public pokemon: IPokemon;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    route.paramMap.subscribe(map => {
      this.pokemonId = parseInt(map.get('id'));
      this.getPokemonDetails();
    });
  }

  async getPokemonDetails() {
    let result = await this.http.get<any>('https://pokeapi.co/api/v2/pokemon/' + this.pokemonId).toPromise();
    console.log(result);
    let name = result.name;
    let abilities = [];
    for (let index = 0; index < result.abilities.length; index++) {
      console.log(result.abilities[index].ability.name);
      abilities.push(result.abilities[index].ability.name);
    }
    this.pokemon = { name: name, abilityNames: abilities };
  }
}

interface IPokemon {
  name: string;
  abilityNames: string[];
}
