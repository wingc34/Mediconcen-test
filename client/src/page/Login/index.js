import React from 'react';
import styled from 'styled-components/native';
import { useHistory } from 'react-router-dom';
import Button from '../../components/button';
import Input from '../../components/input';
import useLogInInit from './hook';

const SPageContainer = styled.SafeAreaView`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const STitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
`;

const SRegText = styled.Text`
    color: blue;
    font-size: 12px;
    margin-top: 5px;
    text-decoration: underline blue;
`;

const SLoginFailText = styled.Text`
    color: red;
`;

export default () => {
    const history = useHistory();
    const { inputElements, onSubmit, isLoginFail } = useLogInInit();

    return (
        <SPageContainer>
            <STitle>Login</STitle>
            {inputElements.map((item) => {
                return <Input type={item.type} {...item.otherProps} key={`log-in-form-input-${item.name}`} />;
            })}
            {isLoginFail && <SLoginFailText>Wrong email or password</SLoginFailText>}
            <Button onClick={onSubmit}>Log In</Button>
            <SRegText onPress={() => history.push('/registration')}>Not a user?</SRegText>
        </SPageContainer>
    );
};
