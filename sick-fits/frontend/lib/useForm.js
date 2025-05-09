import { useState, useEffect } from 'react';

export default function useForm(initialState = {}) {
    // create a state object for our inputs
    const [inputs, setInputs] = useState(initialState);
    const initialValues = Object.values(initialState).join('');

    // {name: 'name input', price: 'price input', description: 'description input'}

    useEffect(() => {
        setInputs(initialState);
    }, [initialValues]);

    function handleChange(e) {
        let { value, name, type } = e.target;

        if (type === 'number') {
            value = parseInt(value);
        }

        if (type === 'file') {
            [value] = e.target.files;
        }
        setInputs({
            // copy the existing state
            ...inputs,
            // update the piece of state
            [name]: value,
        });
    }

    function resetForm() {
        setInputs(initialState);
    }

    function clearForm() {
        const blankState = Object.fromEntries(
            Object.entries(inputs).map(([key, value]) => [key, ''])
        );

        setInputs(blankState);
    }

    // return the things we want to surface from this custom hook
    return {
        inputs,
        handleChange,
        resetForm,
        clearForm,
    };
}
