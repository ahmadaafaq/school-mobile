/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView, ScrollView, StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
import { Paragraph, IconButton, useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from "expo-image-picker";

import API from '../../apis';
import Box from '../common/BoxComponent';
import CustomModal from '../common/CustomModal';
import ElevatedListing from './ElevatedListing';
import LoadingAnimationModal from "../common/LoadingAnimationModal";
import TopSection from './TopSection';

import { setHolidays } from '../../redux/actions/HolidayAction';
import { setSchoolStudents } from "../../redux/actions/StudentAction";
import { setTeachers } from '../../redux/actions/TeacherAction';
import { useCommon } from "../../hooks/common";
import { Utility } from '../../utility';

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const HomePage = () => {
    const [image, setImage] = useState(null);       //for top section
    const [_uploading, setUploading] = useState(false);      // For modal
    const [visible, setVisible] = useState(false);      // For modal

    const allHolidays = useSelector(state => state.allHolidays);
    // const { listData, loading } = useSelector(state => userRole === "teacher" ? state.someTeachers : userRole === "parent" ? state.schoolStudents : []);

    const theme = useTheme();
    const router = useRouter();
    const params = useLocalSearchParams();
    const { getPaginatedData } = useCommon();
    const { capitalizeAlphabet, uploadImg } = Utility();

    const userRole = params.role == 4 ? 'teacher' : params.role == 5 ? 'parent' : null;

    const selectedState = useMemo(() => {
        if (userRole === "teacher") {
            return state => state.someTeachers;
        } else if (userRole === "parent") {
            return state => state.schoolStudents;
        } else {
            // eslint-disable-next-line no-unused-vars
            return state => [];
        }
    }, [userRole]);

    const { listData, loading } = useSelector(selectedState);
    const item = {
        school_id: params.school_id,
        id: listData?.rows?.[0]?.id
    };
    const name = userRole === 'teacher' ? listData?.rows?.[0]?.teacherName : userRole === 'parent' ? listData?.rows?.[0]?.studentName : null;
    const className = userRole === 'teacher' ? listData?.rows?.[0]?.classnames : userRole === 'parent' ? listData?.rows?.[0]?.className : null;
    const isClassTeacher = listData?.rows?.[0]?.is_class_teacher?.data[0];
    const awsFolderName = userRole === 'teacher' ? 'teacher' : userRole === 'parent' ? 'student' : null;


    // Function to capture an image using the device's camera 
    const pickImageCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your photos!");
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            base64: true,
            allowsMultipleSelection: false,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // Function to pick an image from the device's gallery 
    const pickImageGallery = async () => {
        let result =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes:
                    ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                base64: true,
                allowsMultipleSelection: false, //check if works with multiple images
            });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // ROUTES
    const handleAttendancePress = () => {
        router.push({
            pathname: `/${userRole}/(attendance)/${userRole === 'teacher' ? 'attendanceListing'
                : userRole === 'parent' ? 'attendanceCalendar' : ''}`,
            params: {
                class_id: listData?.rows?.[0]?.class_id,
                section: listData?.rows?.[0]?.section_id,
                id: listData?.rows?.[0]?.id
            }
        });
    };

    const handleHomeworkPress = () => {
        router.push({
            pathname: `/${userRole}/(homework)/homeworkListing`,
            params: {
                class_id: listData?.rows?.[0]?.class_id,
                section: listData?.rows?.[0]?.section_id,
                userRole
            }
        });
    };

    const handleNoticeBoardPress = () => {
        router.push(`/${userRole}/(noticeBoard)/noticeBoardListing`);
    };

    const handleMarkAttendancePress = () => {
        router.push(`/${userRole}/(markAttendance)/markAttendanceListing`);
    };

    const handleStudentPress = () => {
        router.push({
            pathname: `/${userRole}/(student)/studentListing`,
            params: {
                school_id: params.school_id,
                school: params.school,
                userRole
            }
        });
    };

    const handleTimeTablePress = () => {
        router.push({
            pathname: `/${userRole}/(timeTable)/timeTableListing`,
            params: {
                id: listData?.rows?.[0]?.id,
                class_id: listData?.rows?.[0]?.class_id,
                section: listData?.rows?.[0]?.section_id,
                userRole
            }
        })
    };

    useEffect(() => {
        if (!allHolidays?.listData?.rows?.length) {
            getPaginatedData(0, 50, setHolidays, API.HolidayAPI);
        }
    }, [getPaginatedData, allHolidays?.listData?.rows?.length]);

    useEffect(() => {
        if (!listData?.rows?.length && params.id) {
            console.log('inside teacher get paginated data in home screen')
            if (userRole === "teacher") {
                getPaginatedData(0, 1, setTeachers, API.TeacherAPI, { key: "parent_id", value: params.id });
            } else if (userRole === "parent") {
                getPaginatedData(0, 1, setSchoolStudents, API.StudentAPI, { key: "parent_id", value: params.id });
            }
        }
    }, [getPaginatedData, listData?.rows?.length, params.id, userRole]);
    console.log(params, listData, 'home me');

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        background: {
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center'
        },
        boxContainer: {
            flexDirection: 'row',
            marginVertical: 15
        },
        cornerStyle: {
            position: "absolute",
            backgroundColor: theme.colors.blue[600],
            width: WINDOW_WIDTH * 1.4,
            height: WINDOW_HEIGHT / 1.4,
            top: WINDOW_HEIGHT / -9.57,
            left: -140,
            zIndex: -1,
            transform: [
                { rotateZ: '-170deg' },
                { rotateX: '75deg' }
            ]
        },
        headerText: {
            color: theme.colors.black[500],
            fontSize: 18,
            letterSpacing: 0.2,
            marginBottom: 10,
            fontWeight: '700'
        }
    });

    return (
        <ImageBackground
            source={require('../../assets/images/listBG.jpg')}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={theme.colors.indigo[600]} />
                <ScrollView showsVerticalScrollIndicator={false} style={{ flexGrow: 1 }}>
                    {/* <Search /> */}

                    <TopSection schoolName={params.school}
                        title={capitalizeAlphabet(name)}
                        classes={className}
                        subjects={listData?.rows?.[0]?.subjects}
                        bg={theme.colors.blue[600]}
                        image={image || listData?.rows?.[0]?.image_src}
                        setVisible={setVisible}
                        userRole={userRole}
                    />
                    <View style={styles.cornerStyle}></View>
                    <View style={styles.boxContainer}>
                        {(isClassTeacher || userRole === 'parent') &&
                            <Box title='Attendance' bg={theme.colors.blue[500]} mb={10} iconName="clipboard-list" handlePress={handleAttendancePress} />
                        }
                        <Box title='Homework' bg={theme.colors.grayishRed[500]} mb={10} iconName="book" handlePress={handleHomeworkPress} />
                        <Box title='Notice Board' bg={theme.colors.grayishYellow[500]} mb={10} iconName="comment-alt" handlePress={handleNoticeBoardPress} />
                        {(isClassTeacher) &&
                            <Box title='Mark Attendance' bg={theme.colors.grayishYellow[500]} mb={10} iconName="clipboard-list" handlePress={handleMarkAttendancePress} />
                        }
                    </View>
                    <View style={styles.boxContainer}>
                        {userRole === 'teacher' &&
                            <Box title='Students' bg={theme.colors.blue[500]} mb={10} iconName="users" handlePress={handleStudentPress} />}
                        <Box title='Time Table' bg={theme.colors.grayishGreen[500]} mb={10} iconName="th-list" handlePress={handleTimeTablePress} />
                    </View>
                    {/* <View style={styles.boxContainer}>
                        <Box title='Examination' bg={theme.colors.grayishRed[500]} mb={10} iconName="receipt-long" />
                        <Box title='Results' bg={theme.colors.grayishYellow[500]} mb={10} iconName="fact-check" />
                        <Box title='Fees' bg={theme.colors.blue[500]} mb={10} iconName="payment" />
                    </View>*/}

                    <ElevatedListing data={allHolidays?.listData?.rows} />
                </ScrollView>

                {visible && (
                    <View style={{
                        width: '100%', position: 'absolute', left: 0, top: 0, zIndex: 11
                    }}>
                        <CustomModal
                            heightNumber={!image ? 1.4 : 1.5}
                            showModal={visible}
                            setShowModal={setVisible}
                        >
                            {
                                <SafeAreaView
                                    visible={visible}
                                    onDismiss={() => setVisible(false)}
                                    style={{
                                        zIndex: 1
                                    }}
                                >
                                    {image ? <Paragraph style={styles.headerText}>Options</Paragraph>
                                        : null}

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        {!image ? (
                                            <>
                                                <View>
                                                    <IconButton
                                                        icon="camera"
                                                        size={35}
                                                        onPress={pickImageCamera}
                                                    />
                                                    <Paragraph style={{ paddingLeft: 11 }}>Camera</Paragraph>
                                                </View>
                                                <View>
                                                    <IconButton
                                                        icon="folder"
                                                        size={35}
                                                        onPress={pickImageGallery}
                                                    />
                                                    <Paragraph style={{ paddingLeft: 11 }}>Gallery</Paragraph>
                                                </View>
                                            </>
                                        ) : (
                                            <>
                                                <View>
                                                    <IconButton
                                                        icon="camera"
                                                        size={35}
                                                        onPress={pickImageCamera}
                                                    />
                                                    <Paragraph style={{ paddingLeft: 11 }}>Retake</Paragraph>
                                                </View>
                                                <View>
                                                    <IconButton
                                                        icon="upload"
                                                        size={35}
                                                        onPress={() => uploadImg(setUploading, image, awsFolderName, API.CommonAPI, params?.school, item)}
                                                    />
                                                    <Paragraph style={{ paddingLeft: 11 }}>Upload</Paragraph>
                                                </View>
                                            </>
                                        )}
                                    </View>

                                </SafeAreaView>}
                        </CustomModal>
                    </View>
                )}
                {loading ? <LoadingAnimationModal /> : null}
            </SafeAreaView>
        </ImageBackground>
    );
};

export default HomePage;
