import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!) {
        sendUserPasswordResetLink(email: $email) {
            code
            message
        }
    }
`;

export default function RequestRest() {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
    });
    const [signup, { data, loading, error }] = useMutation(
        REQUEST_RESET_MUTATION,
        {
            variables: inputs,
            // // refetch the currently logged in user
            // refetchQueries: [{ query: CURRENT_USER_QUERY }],
        }
    );
    async function handleSubmit(e) {
        e.preventDefault(); // stop the form from submitting
        console.log(inputs);
        const res = await signup().catch(console.error);
        console.log(res);
        resetForm();
        // Send the email and password to the graphqlAPI
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Request a password reset</h2>
            <Error error={error} />
            <fieldset>
                {data?.sendUserPasswordResetLink === null && (
                    <p>Success! Check your email for a link!</p>
                )}

                {data?.createUser && (
                    <p>
                        Singed up with {data.createUser.email} please go ahead
                        and sign in!
                    </p>
                )}

                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email Address"
                        autoComplete="email"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">Request Reset</button>
            </fieldset>
        </Form>
    );
}
