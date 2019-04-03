import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  public pokemon: IPokemon[];
  public displayedColumns;
  public dataSource: MatTableDataSource<IPokemon>;

  constructor(private http: HttpClient) {
    this.loadPokemon();
    this.displayedColumns = ['name', 'url'];
    this.dataSource = new MatTableDataSource(this.pokemon);
  }

  async loadPokemon() {
    let result: IResult = await this.http.get<IResult>('https://pokeapi.co/api/v2/pokemon/?limit=1000').toPromise();
    console.log(result);
    this.pokemon = result.results;
    for (let index = 0; index < this.pokemon.length; index++) {
      let tabs = this.pokemon[index].url.split("/");
      this.pokemon[index].url = tabs[tabs.length - 2];
    }
    this.dataSource.data = this.pokemon;
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }
  ngOnInit() {
  }

}

interface IResult {
  results: IPokemon[];
}
interface IPokemon {
  name: string;
  url: any;
}