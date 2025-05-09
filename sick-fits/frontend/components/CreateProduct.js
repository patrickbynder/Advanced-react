import { useState } from 'react';
import gql from 'graphql-tag';

import { useMutation } from '@apollo/client';
import Router from 'next/router';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';

const CREATE_PRODUCT_MUTATION = gql`
    mutation CREATE_PRODUCT_MUTATION(
        # Which variables are getting passed in? And what types are they?
        $name: String!
        $description: String!
        $price: Int!
        $image: Upload
    ) {
        createProduct(
            data: {
                name: $name
                description: $description
                price: $price
                status: "AVAILABLE"
                photo: { create: { image: $image, altText: $name } }
            }
        ) {
            id
            price
            description
            name
        }
    }
`;

export default function CreateProduct() {
    const { inputs, handleChange, resetForm, clearForm } = useForm({
        name: 'nice shoes',
        price: 34234,
        description: 'these are the best shoes!',
    });

    const [createProduct, { loading, error, data }] = useMutation(
        CREATE_PRODUCT_MUTATION,
        {
            variables: inputs,
            refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
        }
    );

    async function handleSubmit(e) {
        e.preventDefault();

        // Submit the input fields to the backend:
        const res = await createProduct();

        clearForm();

        // go to the product page
        Router.push({
            pathname: `/product/${res.data?.createProduct?.id}`,
        });
    }

    return (
        <Form onSubmit={(e) => handleSubmit(e)}>
            <DisplayError error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="image">
                    Image
                    <input
                        required
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                    />
                </label>
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
                <button type="submit">Add Product</button>
            </fieldset>
        </Form>
    );
}
