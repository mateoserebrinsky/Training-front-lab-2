export type Pokemon = {
    name: string;
    url: string;
    id: number;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
        other: {
            showdown: {
                front_default: string;
            }
        }
    };
    types: Array <{
        type: {
            name: string;
            url: string;
        }
        slot: number;
    }>

    evolution_chain?: {
        chain: {
            evolves_to: Array<{
                species: {
                    name: string;
                    url: string;   }
            }>
        }
    }

    abilities: Array<{
        ability: {
            name: string;
            url: string;
        }
        slot: number;
        is_hidden: boolean;
    }>;

    stats: Array<{
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        }
    }>;

}


