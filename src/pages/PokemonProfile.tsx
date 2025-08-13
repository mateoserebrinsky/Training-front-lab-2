import {useParams, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";

import type { Pokemon } from "../types";

import {
    MainContainer,
    ProfileImageContainer,
    GoBackButton,
    ProfileSubTitle,
    CenteredContainerForProfileInfo,
    EvolutionChainContainer,
    EvolutionButton, SubTitle,
    WhiteP, StatsContainer
} from "../styledComponnets/styledIndex.ts";


const getEvolutionChain = async (id: number) => {
    const res = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
    if (!res.ok) {
        throw new Error("Failed to fetch evolution chain");
    }
    return res.json();
}


const getPokemonDetails = async (name: string | undefined) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

function PokemonProfile() {
    const navigate = useNavigate();
    const name = useParams().name;

    const {data, isLoading, error} = useQuery<Pokemon>({
        queryKey: ['PokemonDetails', name],
        queryFn: () => {
            return getPokemonDetails(name);
        }
    });
    console.log(data)

    const {data: evolutionChain} = useQuery({
        queryKey: ['evolutionChain', data?.id],
        queryFn: () => {
            if (data?.id) {
                return getEvolutionChain(data.id);
            }
            return null;
        }
    });


    return (
        <MainContainer>
            <GoBackButton onClick={() => navigate(-1)}>🡠</GoBackButton>
        <ProfileSubTitle>This is the profile of {name}</ProfileSubTitle>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && (
                <div key={data.id}>
                    <ProfileImageContainer>
                        <img src={data.sprites.front_default} alt={data.name} />
                    </ProfileImageContainer>
                    <CenteredContainerForProfileInfo>
                        <p>Height: {data.height/ 10}m</p>
                        <p>Weight: {data.weight/ 10}kg</p>
                        <p>Types:</p>
                        <ol>
                            {data.types && data.types.map(({ type, slot }) => (
                                <WhiteP key={slot}>-{type.name.charAt(0).toUpperCase()+type.name.slice(1)}</WhiteP>
                            ))}
                        </ol>
                        <p>Abilities:</p>
                        <ol>
                            {data.abilities && data.abilities.map(({ slot, ability }) => (
                                <WhiteP key={slot}>-{ability.name.charAt(0).toUpperCase()+ability.name.slice(1)}</WhiteP>
                            ))}
                        </ol>
                    </CenteredContainerForProfileInfo>
                    <StatsContainer>
                        <p>Stats:</p>
                        <ol>
                            {data.stats && data.stats.map(({ base_stat, stat }) => (
                                <WhiteP key={stat.name}>-{stat.name.charAt(0).toUpperCase()+stat.name.slice(1)}: {base_stat}</WhiteP>
                            ))}
                        </ol>
                    </StatsContainer>
                    <EvolutionChainContainer>
                        <SubTitle>Evolutions:</SubTitle>
                        <ul>
                            {(() => {
                                if (!evolutionChain || !evolutionChain.chain) return <li>No evolution data</li>;
                                const evolutionNames: string[] = [];
                                let current = evolutionChain.chain;
                                while (current) {//Mapeo los nombres, como es recursivo me recostó entenderlo
                                    evolutionNames.push(current.species.name);
                                    if (current.evolves_to && current.evolves_to.length > 0) {
                                        current = current.evolves_to[0];
                                    } else {
                                        current = null;
                                    }
                                }
                                return evolutionNames.map((name, idx) => (
                                    <li key={idx}>
                                        <EvolutionButton onClick={()=> navigate('/Pokemon-Profile/'+name)}>{name.charAt(0).toUpperCase() + name.slice(1)}</EvolutionButton>
                                    </li>
                                ));
                            })()}
                        </ul>
                    </EvolutionChainContainer>
                </div>
            )}
        </MainContainer>
    );
}

export default PokemonProfile;