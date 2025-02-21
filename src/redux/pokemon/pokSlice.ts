import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Pokemon {
  id: number;
  name: string;
  ability: string;
}

interface PokemonState {
  pokemons: Pokemon[];
  pokProfile: Pokemon | null;
  searchTerm: string;
}

const initialState: PokemonState = {
  pokemons: [],
  pokProfile: null,
  searchTerm: "",
};

export const pokSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    addPokemon: (
      state,
      action: PayloadAction<{ name: string; ability: string }>
    ) => {
      const newPokemon: Pokemon = {
        id: Date.now(),
        name: action.payload.name,
        ability: action.payload.ability,
      };
      state.pokemons.push(newPokemon);
    },
    addMultiplePokemons: (state, action: PayloadAction<Pokemon[]>) => {
      state.pokemons.push(...action.payload);
    },
    pokDetails: (state, action: PayloadAction<number>) => {
      const pok = state.pokemons.find(
        (pokemon) => pokemon.id === action.payload
      );
      if (pok) {
        state.pokProfile = pok;
      }
    },
  },
});

export const { addPokemon, pokDetails, addMultiplePokemons } = pokSlice.actions;
export default pokSlice.reducer;
