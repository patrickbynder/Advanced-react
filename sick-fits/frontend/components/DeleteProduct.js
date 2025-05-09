import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELETE_PRODUCT_MUTATION = gql`
    mutation DELTE_PRODUCT_MUTATATION($id: ID!) {
        deleteProduct(id: $id) {
            id
            name
        }
    }
`;

function update(cache, payload) {
    // delete product from cache
    cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
    const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
        variables: { id },
        update,
    });

    return (
        <button
            type="button"
            disabled={loading}
            onClick={() => {
                if (confirm('are you sure you want to delete this item?')) {
                    // go ahead and delete it
                    console.log('DELETING');
                    deleteProduct().catch((err) => alert(err.message));
                }
            }}
        >
            {children}
        </button>
    );
}
