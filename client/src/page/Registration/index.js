import React from 'react';
import styled from 'styled-components/native';
import { useHistory } from 'react-router-dom';
import Button from '../../components/button';
import Input from '../../components/input';
import useRegInit from './hook';

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

const SLoginText = styled.Text`
    color: blue;
    font-size: 12px;
    margin-top: 5px;
    text-decoration: underline;
`;

const SRegFailText = styled.Text`
    color: red;
    margin-bottom: 5px;
`;

export default () => {
    const history = useHistory();
    const { inputElements, onSubmit, isRegFail } = useRegInit();

    return (
        <SPageContainer>
            <STitle>Registration</STitle>
            {inputElements.map((item) => {
                return <Input type={item.type} {...item.otherProps} key={`log-in-form-input-${item.name}`} />;
            })}
            {isRegFail && <SRegFailText>Still have missing field</SRegFailText>}
            <Button onClick={onSubmit}>Create Account</Button>
            <SLoginText
                onPress={() => {
                    history.push('login');
                }}>
                Have an Account?
            </SLoginText>
        </SPageContainer>
    );
};
