import { useCallback, useMemo, useState } from 'react';
import useFormInit from '../../hook/useForm';
import { useHistory } from 'react-router-dom';
import { apiPost } from '../../utils/api';

const regFormElements = [
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
    {
        name: 'clinicname',
        type: 'text',
        placeholder: 'Clinic Name',
        defaultValue: '',
        validator: 'name',
    },
    {
        name: 'phone',
        type: 'text',
        placeholder: 'Phone Number',
        defaultValue: '',
        validator: 'phone',
    },
    {
        name: 'address',
        type: 'text',
        placeholder: 'Address',
        defaultValue: '',
        validator: 'address',
    },
];

export default () => {
    const history = useHistory();
    const { handleChange, registerInput } = useFormInit(regFormElements);
    const [isRegFail, setIsRegFail] = useState(false);

    const onSubmit = useCallback(() => {
        const bodyValue = {
            email: registerInput('email').value,
            password: registerInput('password').value,
            clinicname: registerInput('clinicname').value,
            phonenumber: registerInput('phone').value,
            address: registerInput('address').value,
        };

        apiPost('http://localhost:5001/users/registration', bodyValue).then((res) => {
            if (
                Object.values(bodyValue).every((item) => {
                    return item !== '';
                })
            ) {
                history.push('/consultation-record', { email: registerInput('email').value });
            } else {
                setIsRegFail(true);
            }
        });
    }, [regFormElements, registerInput, setIsRegFail]);

    const inputElements = useMemo(() => {
        return regFormElements.map((input) => {
            return {
                name: input.name,
                type: input.type,
                otherProps: {
                    placeholder: input.placeholder,
                    ...registerInput(input.name),
                },
            };
        });
    }, [regFormElements, registerInput]);

    return {
        onSubmit,
        handleChange,
        inputElements,
        isRegFail,
    };
};
