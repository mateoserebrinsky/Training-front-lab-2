import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useQuery} from '@tanstack/react-query';
import type {Pokemon} from '../types.ts';

import {
    CenteredContainerForList,
    Description,
    MainContainer,
    PageButton,
    PageNumber,
    PokemonCard,
    PokemonImage,
    SubTitle,
    Title,
    PokemonType
} from "../styledComponnets/styledIndex.ts";

async function getPokemon(page: number) {
    const limit = 5;
    const offset = page * limit;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

async function getPokemonDataByName(name: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

function Home() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);

    const { data, isLoading, error } = useQuery({ //Sirve para reemplazar el useEffect, devuelve un objeto con la data, el estado de carga y el error
        queryKey: ['pokemonList', page], //Clave única para la consulta, incluye la página actual. La usa para identificar y almacenar en caché los resultados de la consulta.
        queryFn: async () => {//Fue la librería que más me costó entender
            const data = await getPokemon(page);
            const detailedList = await Promise.all(
                data.results.map((pokemon: Pokemon) => getPokemonDataByName(pokemon.name))
            );
            console.log(detailedList);
            return detailedList;
        }
    });

    const handlePageChange = (newPage: number) => {
        if (newPage < 0) return;
        setPage(newPage);
    }

    return (
    <MainContainer>
      <Title>The Pokemon Library</Title>
      <Description>Here you can find any Pokémon you want</Description>
        <div>
            <div>
                <SubTitle>Pokemon List</SubTitle>
                <ul>
                    {isLoading && <div>Loading...</div>} {/* Aca se ven explícitamente las 3 variables definidas por el useQuery*/}
                    {error && <div>Error loading Pokémon</div>}
                    {data && data.map((pokemon: Pokemon) => (
                        <PokemonCard key={pokemon.id} onClick={() => navigate('Pokemon-Profile/'+pokemon.name)}>
                            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}<br/>
                            <span>ID: {pokemon.id}</span><br/>
                            <span>Height: {pokemon.height / 10}m</span><br/>
                            <span>Weight: {pokemon.weight/10}kg</span>
                            <ol>
                                {pokemon.types && pokemon.types.map(({ type, slot }) => (
                                    <PokemonType key={slot}>{type.name.charAt(0).toUpperCase()+type.name.slice(1)}</PokemonType>
                                ))}
                            </ol>
                           <PokemonImage src={pokemon.sprites.other.showdown.front_default} alt={pokemon.name} />
                        </PokemonCard>
                    ))}
                </ul>
                <CenteredContainerForList>
                    <PageButton onClick={() => handlePageChange(page-1)}>Previous</PageButton>
                    <PageNumber>{page}</PageNumber>
                    <PageButton onClick={() => handlePageChange(page+1)}>Next</PageButton>
                </CenteredContainerForList>
            </div>
        </div >
    </MainContainer>
  );
}

export default Home;
