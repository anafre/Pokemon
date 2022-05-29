import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendPokemonService {

  baseUrl: string = environment.backendUrl;

  constructor(private http: HttpClient) { }

  getFavoritePokemons(){
    return this.http.get<any>(`${this.baseUrl}/api/pokemones`);
  }

  setPokemonAsFavorite(data) {
    return this.http.post<any>(`${this.baseUrl}/api/pokemones`, data)
  }

  deleteFavoritePokemon(id) {
    return this.http.delete<any>(`${this.baseUrl}/api/pokemones/${id}`)
  }
}