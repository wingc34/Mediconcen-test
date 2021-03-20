import { useCallback, useMemo, useState } from 'react';
import useFormInit from '../../hook/useForm';
import { useHistory } from 'react-router-dom';
import { apiPost } from '../../utils/api';

const logInFormElements = [
    {
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        defaultValue: '',
        validator: 'email',
    },
    {
        name: 'password',
        type: 'password',
        placeholder: 'password',
        defaultValue: '',
        validator: 'password',
    },
];

export default () => {
    const history = useHistory();
    const { handleChange, registerInput } = useFormInit(logInFormElements);
    const [isLoginFail, setIsLoginFail] = useState(false);
    const onSubmit = useCallback(() => {
        const bodyValue = { email: registerInput('email').value, password: registerInput('password').value };
        apiPost(`http://localhost:5001/users/login`, bodyValue).then((res) => {
            if (res.success) {
                history.push('/consultation-record', { email: registerInput('email').value });
            } else {
                setIsLoginFail(true);
            }
        });
    }, [logInFormElements, registerInput, setIsLoginFail]);

    const inputElements = useMemo(() => {
        return logInFormElements.map((input) => {
            return {
                name: input.name,
                type: input.type,
                otherProps: {
                    placeholder: input.placeholder,
                    ...registerInput(input.name),
                },
            };
        });
    }, [logInFormElements, registerInput]);

    return {
        onSubmit,
        handleChange,
        inputElements,
        isLoginFail,
    };
};
