// Components //
import { Button } from "./components/Button";
import { Card } from "./components/Card";
// Styles //
import "./sass/APP.scss"
// Icons //
import { TiArrowLeftOutline } from "react-icons/ti";
import { TiArrowRightOutline } from "react-icons/ti";
//Hooks //
import { useEffect, useState } from "react";

const APP = () => {

// useStates //
  const [pokemonId, setPokemonId] = useState (1);
  const [pokemonEvolutions, setPokemonEvolutions] = useState([]);

// Pokemon Evolutions //

  useEffect(()=>{
    getEvolutions(pokemonId);
  }, [pokemonId])

  async function getEvolutions (id) {
    const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
    const data = await response.json()

    let pokemonEvoArray = []
    
    let pokemonlvl1 = data.chain.species.name;
    let pokemonlvl1Img = await getPokemonImgs(pokemonlvl1);
    pokemonEvoArray.push([pokemonlvl1 , pokemonlvl1Img ]);

    if (data.chain.evolves_to.length !== 0) {
      let pokemonlvl2 = data.chain.evolves_to[0].species.name;
      let pokemonlvl2Img = await getPokemonImgs(pokemonlvl2);
      pokemonEvoArray.push([pokemonlvl2 , pokemonlvl2Img ]);

    if (data.chain.evolves_to[0].evolves_to.length !== 0) {
      let pokemonlvl3 = data.chain.evolves_to[0].evolves_to[0].species.name;
      let pokemonlvl3Img = await getPokemonImgs(pokemonlvl3);
      pokemonEvoArray.push([pokemonlvl3 , pokemonlvl3Img ]);
      }
    }
    setPokemonEvolutions(pokemonEvoArray)
  }

// Images //
  async function getPokemonImgs(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    const data = await response.json()
    return data.sprites.other["official-artwork"].front_default;
  }
// Buttons //
  function prevClick() {
      (pokemonId === 1)?
        setPokemonId(1) :
        setPokemonId(pokemonId - 1)
  } 

  function nextClick() {
    setPokemonId(pokemonId + 1)
  }
// Components //
  return(
    <div className="app">
      <div className={`card-container card${pokemonEvolutions.length}`}>
        {pokemonEvolutions.map(pokemon => 
          <Card 
            key={pokemon[0]}
            name={pokemon[0]}
            img={pokemon[1]}
          />
        )}
      </div>
      <div className="buttons-container">
      <Button 
        icon={<TiArrowLeftOutline />} 
        hanleclick={prevClick}
      />
      <Button 
        icon={<TiArrowRightOutline />} 
        hanleclick={nextClick}
      />
      </div>
  </div>
  )
   
}

export {APP};