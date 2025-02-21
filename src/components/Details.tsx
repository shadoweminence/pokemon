import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const pokemons = useSelector((state: RootState) => state.pokemon.pokProfile);
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <p>
          id:{pokemons?.id} <br />
          name:{pokemons?.name} <br />
          ability:{pokemons?.ability}
        </p>
        <button onClick={() => navigate("/")}>Go back</button>
      </div>
    </div>
  );
};

export default Details;
