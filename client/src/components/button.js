import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const SButtonContainer = styled.TouchableHighlight`
    width: 200px;
    height: 50px;
    background-color: #fdf;
`;

export default ({ onClick, children }) => {
    return (
        <SButtonContainer activeOpacity={0.6} underlayColor="#DDDDDD" onPress={onClick}>
            <Text style={{ lineHeight: 45, textAlign: 'center' }}>{children}</Text>
        </SButtonContainer>
    );
};
