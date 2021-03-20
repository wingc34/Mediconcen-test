import React from 'react';
import { NativeRouter, Route, Redirect } from 'react-router-native';
import LoginPage from './src/page/Login';
import RegistrationPage from './src/page/Registration';
import ConsultationRecordPage from './src/page/ConsultationRecord';

export default function App() {
    return (
        <NativeRouter>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/registration" component={RegistrationPage} />
            <Route exact path="/consultation-record" component={ConsultationRecordPage} />
            <Redirect to="/login" />
        </NativeRouter>
    );
}
