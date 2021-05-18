import { gql } from '@apollo/client';

export const query = gql`
query allPokemons {
  pokemon_v2_pokemon(order_by: {id: asc}) {
    name
    id
    pokemon_v2_pokemonspecy {
      generation_id
    }
    weight
    height
    base_experience
  }
}
`;