import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm';
import Form from './styles/Form';

const SINGLE_PRODUCT_QUERY = gql`
    query SINGLE_PRODUCT_QUERY($id: ID!) {
        Product(where: { id: $id }) {
            id
            name
            description
            price
        }
    }
`;

const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION(
        $id: ID!
        $name: String
        $description: String
        $price: Int
    ) {
        updateProduct(
            id: $id
            data: { name: $name, description: $description, price: $price }
        ) {
            id
            name
            description
            price
        }
    }
`;

export default function UpdateProduct({ id }) {
    // 1. We need to get the existing product
    const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
        variables: { id },
    });

    console.log(data);

    // 2. We need to get the mutation to update the product

    const [
        updateProduct,
        { data: updateData, error: updateError, loading: updateLoading },
    ] = useMutation(UPDATE_PRODUCT_MUTATION);

    // 2.5 Create some state for the form inputs

    const { inputs, handleChange, resetForm, clearForm } = useForm(
        data?.Product
    );

    // 3. We need the form to handle the updates

    return (
        <Form
            onSubmit={async (e) => {
                e.preventDefault();
                const res = await updateProduct({
                    variables: {
                        id,
                        name: inputs.name,
                        description: inputs.description,
                        price: inputs.price,
                    },
                }).catch(console.error);
                console.log(res);
            }}
        >
            <DisplayError error={error || updateError} />
            <fieldset disabled={updateLoading} aria-busy={updateLoading}>
                <label htmlFor="name">
                    Name
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="name"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="price">
                    Price
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="price"
                        value={inputs.price}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="description">
                    description
                    <textarea
                        id="description"
                        name="description"
                        placeholder="description"
                        value={inputs.description}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Update Product</button>
            </fieldset>
        </Form>
    );
}
