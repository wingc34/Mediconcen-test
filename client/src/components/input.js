import React from 'react';
import styled from 'styled-components/native';

const SInput = styled.TextInput`
    height: 40px;
    width: 200px;
    margin: 12px;
    padding: 5px;
    border-width: 1px;
`;

const SErrorText = styled.Text`
    color: red;
    font-size: 12px;
`;

export default ({ value, type, onChange, placeholder, errorMsg }) => {
    const isPassword = type === 'password' ? true : false;
    return (
        <>
            <SInput
                value={value}
                type={type}
                onChangeText={onChange}
                placeholder={placeholder}
                secureTextEntry={isPassword}
            />
            <SErrorText>{errorMsg}</SErrorText>
        </>
    );
};
