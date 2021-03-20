import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import useRecordsInit from './hook';

const STitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin: 8% 5% 0;
`;

const SItemContent = styled.ScrollView`
    background-color: lightgrey;
    height: 60%;
    width: 100%;
    padding: 20px;
`;

const SEmptyRecordText = styled.Text`
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
`;

const SDateText = styled.Text`
    font-size: 22px;
    font-weight: bold;
    margin-left: 5%;
`;

const SRecordListContainer = styled.TouchableHighlight`
    margin: 5%;
    width: 90%;
    background-color: white;
    padding: 5%;
`;

const SRecordText = styled.Text`
    font-size: 16px;
`;

const SExpandText = styled(SRecordText)`
    text-align: right;
    color: red;
    margin-top: 5px;
`;

const RecordList = ({ records }) => {
    const [isExpanded, setisExpanded] = useState(false);
    const onClick = useCallback(() => {
        setisExpanded(!isExpanded);
    }, [isExpanded, setisExpanded]);

    return records.map((record, i) => {
        return (
            <SRecordListContainer
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                key={`record-card-${i}`}
                onPress={onClick}>
                <>
                    <SRecordText>{`Doctor: ${record.doctorname}`}</SRecordText>
                    <SRecordText>{`Patient: ${record.patientname}`}</SRecordText>
                    <SRecordText>{`Date and Time: ${record.datetime}`}</SRecordText>
                    {!isExpanded && <SExpandText>Click to see detail</SExpandText>}
                    {isExpanded && (
                        <>
                            <SRecordText>{`Diagnosis: ${record.diagnosis}`}</SRecordText>
                            <SRecordText>{`Medication: ${record.medication}`}</SRecordText>
                            <SRecordText>{`Consultation Fee: ${record.consultationfee}`}</SRecordText>
                            <SRecordText>{`Follow up: ${record.followup === 0 ? 'no' : 'yes'}`}</SRecordText>
                            <SExpandText>Click to close</SExpandText>
                        </>
                    )}
                </>
            </SRecordListContainer>
        );
    });
};

export default ({ location }) => {
    const { markedDates, displayRecords, selectedrecords, selectedDate } = useRecordsInit(location.state.email);
    return (
        <SafeAreaView>
            <STitle>Consultation Records</STitle>
            <Calendar
                markedDates={markedDates}
                onDayPress={displayRecords}
                theme={{ selectedDayBackgroundColor: 'red', selectedDayTextColor: '#ffffff' }}
            />
            <SItemContent>
                {selectedrecords <= 0 ? (
                    <>
                        <SDateText>{selectedDate}</SDateText>
                        <SEmptyRecordText>This day has no records.</SEmptyRecordText>
                    </>
                ) : (
                    <>
                        <SDateText>{selectedDate}</SDateText>
                        <RecordList records={selectedrecords} />
                    </>
                )}
            </SItemContent>
        </SafeAreaView>
    );
};
