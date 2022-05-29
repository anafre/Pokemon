import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { BackendPokemonService } from 'src/app/services/backendPokemon.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poke-table-fav',
  templateUrl: './poke-table-fav.component.html',
  styleUrls: ['./poke-table-fav.component.css']
})
export class PokeTableFavComponent implements OnInit {

  displayedColumns: string[] = ['position, name'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private pokeService: PokemonService, private backendPokeService: BackendPokemonService , private router: Router ) { }

  ngOnInit(): void {
    this.getFavoritePokemons();
  }

  getFavoritePokemons() {
    this.backendPokeService.getFavoritePokemons().subscribe(res => {
      let pokemonData;

      console.log(res)
      for(let i=0; i < res.pokemones.length; i++){
          pokemonData = {
            position: i,
            name: res.pokemones[i].nombre
          };

          this.data.push(pokemonData);
        }
        this.dataSource = new MatTableDataSource<any>(this.data);
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource)
    })
  }
}
