/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, ScrollView, StyleSheet, View, ImageBackground } from 'react-native';
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import API from '../../apis';
import Box from '../common/BoxComponent';
import LoadingAnimationModal from "../common/LoadingAnimationModal";
import TopSection from './TopSection';
// import ElevatedListing from './ElevatedListing';
// import Search from '../common/Search';

import { setTeachers } from '../../redux/actions/TeacherAction';
import { useCommon } from "../../hooks/common";
import { Utility } from '../../utility';

const HomePage = () => {
    const dispatch = useDispatch();
    const [schoolName, setSchoolName] = useState('');
    const { listData, loading } = useSelector(state => state.someTeachers);
    const theme = useTheme();
    const router = useRouter();
    const { getPaginatedData } = useCommon();
    const { capitalizeAlphabet, getAsyncStorage } = Utility();

    // const handleHomeworkPress = () => {
    //     router.push('/(homework)/homeworkListing');
    // }

    const handleStudentPress = () => {
        router.push('/(student)/studentListing');
    };

    useEffect(() => {
        if (!listData?.rows?.length) {
            getPaginatedData(0, 1, setTeachers, API.TeacherAPI);
        }
    }, [listData?.rows?.length]);

    useEffect(() => {
        const getSelectedMenu = async () => {
            getAsyncStorage('auth')
                .then(({ school: school }) => {
                    setSchoolName(school);
                });
        };
        getSelectedMenu();
    }, []);
    console.log(listData?.rows?.[0]?.teacherName, 'teacherName')

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        background: {
            flex: 1,
            resizeMode: 'cover', // or 'stretch
            justifyContent: 'center'
        },
        boxContainer: {
            flexDirection: 'row',
            marginVertical: 10
        },
        cornerStyle: {
            position: "absolute",
            backgroundColor: theme.colors.blue[600],
            width: 500,
            height: 400,
            top: -55,
            left: -125,
            zIndex: -1,
            transform: [
                { rotateZ: '-170deg' },
                { rotateX: '80deg' }
            ],
        }
    });

    return (
        <ImageBackground
            source={require('../../assets/images/listBG.jpg')} // Replace with the path to your image
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={theme.colors.indigo[600]} />
                <ScrollView showsVerticalScrollIndicator={false} style={{ flexGrow: 1 }}>
                    {/* <Search /> */}

                    <TopSection schoolName={schoolName}
                        title={capitalizeAlphabet(listData?.rows?.[0]?.teacherName)}
                        content={12} bg={theme.colors.blue[600]}
                        imageSource={''} rollno={200087} teacherName="savita devi" />
                    <View style={styles.cornerStyle}></View>
                    <View style={styles.boxContainer}>
                        <Box title='Students' bg={theme.colors.grayishGreen[500]} mb={10} iconName="people" handlePress={handleStudentPress} />
                        {/* <Box title='Homework' bg={theme.colors.grayishGreen[500]} mb={10} iconName="menu-book" handlePress={handleHomeworkPress} /> 
                         <Box title='Attendence' bg={theme.colors.grayishRed[500]} mb={10} iconName="check-circle" />
                        <Box title='Examination' bg={theme.colors.grayishRed[500]} mb={10} iconName="receipt-long" /> */}
                    </View>
                    {/* <View style={styles.boxContainer}>
                        <Box title='Results' bg={theme.colors.grayishYellow[500]} mb={10} iconName="fact-check" />
                        <Box title='Time-Table' bg={theme.colors.blue[500]} mb={10} iconName="insert-invitation" />
                        <Box title='Fees' bg={theme.colors.blue[500]} mb={10} iconName="payment" />
                    </View>
                    <View style={styles.boxContainer}>
                        <Box title='Bus' bg={theme.colors.grayishYellow[500]} mb={10} iconName="directions-bus" />
                    </View> */}


                    {/* <ElevatedListing /> */}
                </ScrollView>

                {loading ? <LoadingAnimationModal /> : null}
            </SafeAreaView>
        </ImageBackground>
    );
};

export default HomePage;
