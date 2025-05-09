import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const CURRENT_USER_QUERY = gql`
    query {
        authenticatedItem {
            ... on User {
                id
                email
                name
                cart {
                    id
                    quantity
                    product {
                        id
                        name
                        price
                        description
                        photo {
                            image {
                                publicUrlTransformed
                            }
                        }
                    }
                }
            }
        }
    }
`;

export function useUser() {
    const data = useQuery(CURRENT_USER_QUERY);

    return data?.authenticatedItem;
}

export { CURRENT_USER_QUERY };
