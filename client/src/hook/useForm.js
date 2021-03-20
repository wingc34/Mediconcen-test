import { useState, useMemo } from 'react';

export default (formElements = []) => {
    const initialValues = useMemo(() => {
        return formElements.reduce(
            (initialValues, fieldInfo) => ({ ...initialValues, [fieldInfo.name]: fieldInfo.defaultValue || '' }),
            {},
        );
    }, [formElements]);

    const [values, setValues] = useState(initialValues);

    const handleChange = (name) => (eOrValue) => {
        let finalValue = eOrValue;

        if (finalValue) {
            finalValue = finalValue.target ? finalValue.target.value : finalValue;
        }

        setValues({ ...values, [name]: finalValue });
    };

    const registerInput = (name) => ({
        onChange: handleChange(name),
        value: values[name],
    });

    const resetForm = () => {
        setValues(initialValues);
    };

    return {
        registerInput,
        handleChange,
        resetForm,
    };
};
