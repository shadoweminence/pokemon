import { useSelector, useDispatch } from "react-redux";
import "../App.css";
import type { RootState } from "../redux/store";
import {
  addPokemon,
  pokDetails,
  addMultiplePokemons,
} from "../redux/pokemon/pokSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const [ability, setAbility] = useState("");
  const dispatch = useDispatch();
  const pokemons = useSelector((state: RootState) => state.pokemon.pokemons);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const data = await response.json();

        const fetchedPokemons = await Promise.all(
          data.results.map(async (pokemon: { name: string; url: string }) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();

            return {
              id: pokemonData.id,
              name: pokemonData.name,
              ability: pokemonData.abilities[0].ability.name,
            };
          })
        );
        dispatch(addMultiplePokemons(fetchedPokemons));
      } catch (error) {
        console.error("Fetch error", error);
      }
    };
    fetchPokemons();
  }, []);

  const handleAddPokemon = () => {
    if (name.trim() && ability.trim()) {
      dispatch(addPokemon({ name, ability }));
    }
  };

  const handleDetails = (id: number) => {
    dispatch(pokDetails(id));

    navigate("/components/Details");
  };

  return (
    <div className="flex">
      <div className="left-side">
        <input
          type="text"
          placeholder="Enter pokemon name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id=""
        />{" "}
        <br />
        <input
          type="text"
          placeholder="Enter pokemon ability"
          value={ability}
          onChange={(e) => setAbility(e.target.value)}
          id=""
        />{" "}
        <br />
        <button onClick={handleAddPokemon}>Add</button>
      </div>
      <div className="right-side">
        {" "}
        <ul className="table">
          {pokemons.map((pokemon) => (
            <table>
              <li key={pokemon.id}>
                <tr>
                  <td>{pokemon.name}</td>
                  <td>
                    {" "}
                    <button
                      className="btn"
                      onClick={() => handleDetails(pokemon.id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              </li>
            </table>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Index;
