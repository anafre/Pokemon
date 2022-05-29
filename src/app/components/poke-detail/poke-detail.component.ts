import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendPokemonService } from 'src/app/services/backendPokemon.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.css']
})
export class PokeDetailComponent implements OnInit {

  isFavorite = false;
  backendPokemon: any = '';
  pokemon: any = '';
  pokemonType = [];
  pokemonImg = '';

  constructor(private pokemonService: PokemonService, private backendPokemonService: BackendPokemonService,  private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params.subscribe(
      params => {
        this.getPokemon(params[`id`]);
      }
    )
   }

  ngOnInit(): void {
    this.backendPokemonService.getFavoritePokemons().subscribe(res => {
      this.backendPokemon = res?.pokemones?.filter((pokemon) => pokemon.nombre === this.pokemon.name)[0]?.id;
      this.isFavorite = Boolean(this?.backendPokemon)
    })
  }

  getPokemon(id){
    this.pokemonService.getPokemons(id).subscribe(
      res => {
          this.pokemon =  res;
          this.pokemonImg = this.pokemon.sprites.front_default;
          this.pokemonType = res.types[0].type.name;
      },
      err => {
          console.log(err);
      }
    );
  }

  toggleFavorite(){
    if (this.isFavorite) {
      this.backendPokemonService.deleteFavoritePokemon(this.backendPokemon).subscribe(res => console.log(res))
      this.isFavorite = false
      this.backendPokemon = null

    } else {
      this.backendPokemonService.setPokemonAsFavorite({ nombre: this.pokemon.name, region: 'Kanto' }).subscribe(res => {
        this.backendPokemon = res?.nuevoPokemon?.id
        console.log(res)

      })
      this.isFavorite = true
    }
  }
}
