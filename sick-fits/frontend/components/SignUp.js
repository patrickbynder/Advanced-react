import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $email: String!
        $name: String!
        $password: String!
    ) {
        createUser(data: { email: $email, name: $name, password: $password }) {
            id
            name
            email
        }
    }
`;

export default function SignUp() {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        name: '',
        password: '',
    });
    const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
        variables: inputs,
        // // refetch the currently logged in user
        // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });
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
            <h2>Sign up for an Account</h2>
            <Error error={error} />
            <fieldset>
                {data?.createUser && (
                    <p>
                        Singed up with {data.createUser.email} please go ahead
                        and sign in!
                    </p>
                )}

                <label htmlFor="name">
                    Your Name
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        autoComplete="name"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>
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

                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="password"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Sign up!</button>
            </fieldset>
        </Form>
    );
}
