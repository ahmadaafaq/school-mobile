/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, ImageBackground } from 'react-native';
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
import { setTeachers } from '../../redux/actions/TeacherAction';
import { useCommon } from "../../hooks/common";
import { Utility } from '../../utility';

const HomePage = () => {
    const [image, setImage] = useState(null);       //for top section
    const [uploading, setUploading] = useState(false);      // For modal
    const [visible, setVisible] = useState(false);      // For modal
    const allHolidays = useSelector(state => state.allHolidays);
    const { listData, loading } = useSelector(state => state.someTeachers);

    const theme = useTheme();
    const router = useRouter();
    const params = useLocalSearchParams();
    const { getPaginatedData } = useCommon();
    const { capitalizeAlphabet, uploadImg } = Utility();

    const item = {
        school_id: params.school_id,
        id: listData?.rows?.[0]?.id
    };

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
    const handleHomeworkPress = () => {
        router.push('/(homework)/homeworkListing');
    };

    const handleNoticeBoardPress = () => {
        router.push('/(noticeBoard)/noticeBoardListing');
    };

    const handleStudentPress = () => {
        router.push({ pathname: '/(student)/studentListing', params: params });
    };

    const handleTimeTablePress = () => {
        router.push('/(timeTable)/timeTableListing');
    };

    useEffect(() => {
        if (!allHolidays?.listData?.rows?.length) {
            getPaginatedData(0, 10, setHolidays, API.HolidayAPI);
        }
    }, [getPaginatedData, allHolidays?.listData?.rows?.length]);

    useEffect(() => {
        if (!listData?.rows?.length && params.id) {
            console.log('inside teacher get paginated data in home screen')
            getPaginatedData(0, 1, setTeachers, API.TeacherAPI, { key: "parent_id", value: params.id });
        }
    }, [getPaginatedData, listData?.rows?.length, params.id]);

    console.log(listData, params, 'home params');
    console.log(image, 'image');

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
            ]
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
                        title={capitalizeAlphabet(listData?.rows?.[0]?.teacherName)}
                        classes={listData?.rows?.[0]?.classnames}
                        subjects={listData?.rows?.[0]?.subjects}
                        bg={theme.colors.blue[600]}
                        image={image || listData?.rows?.[0]?.image_src}
                        setVisible={setVisible}
                    />
                    <View style={styles.cornerStyle}></View>
                    <View style={styles.boxContainer}>
                        <Box title='Students' bg={theme.colors.blue[500]} mb={10} iconName="users" handlePress={handleStudentPress} />
                        <Box title='Homework' bg={theme.colors.grayishRed[500]} mb={10} iconName="book" handlePress={handleHomeworkPress} />
                        <Box title='Notice Board' bg={theme.colors.grayishYellow[500]} mb={10} iconName="comment-alt" handlePress={handleNoticeBoardPress} />
                    </View>
                    <View style={styles.boxContainer}>
                        <Box title='Time Table' bg={theme.colors.grayishGreen[500]} mb={10} iconName="th-list" handlePress={handleTimeTablePress} />
                    </View>
                    {/* <View style={styles.boxContainer}>
                        <Box title='Examination' bg={theme.colors.grayishRed[500]} mb={10} iconName="receipt-long" />
                        <Box title='Results' bg={theme.colors.grayishYellow[500]} mb={10} iconName="fact-check" />
                        <Box title='Time-Table' bg={theme.colors.blue[500]} mb={10} iconName="insert-invitation" />
                        <Box title='Fees' bg={theme.colors.blue[500]} mb={10} iconName="payment" />
                    </View>*/}

                    <ElevatedListing data={allHolidays?.listData?.rows} />
                </ScrollView>

                {visible && (
                    <View style={{
                        width: '100%', position: 'absolute', left: 0, top: 0, zIndex: 11
                    }}>
                        <CustomModal
                            heightNumber={2}
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
                                    <Paragraph>{image ? 'Options' : 'Choose From'}</Paragraph>

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        {!image ? (
                                            <>
                                                <View>
                                                    <IconButton
                                                        icon="camera"
                                                        size={40}
                                                        onPress={pickImageCamera}
                                                    />
                                                    <Paragraph style={{ paddingLeft: 10 }}>Camera</Paragraph>
                                                </View>
                                                <View>
                                                    <IconButton
                                                        icon="folder"
                                                        size={40}
                                                        onPress={pickImageGallery}
                                                    />
                                                    <Paragraph style={{ paddingLeft: 10 }}>Gallery</Paragraph>
                                                </View>
                                            </>
                                        ) : (
                                            <>
                                                <View>
                                                    <IconButton
                                                        icon="camera"
                                                        size={40}
                                                        onPress={pickImageCamera}
                                                    />
                                                    <Paragraph style={{ paddingLeft: 10 }}>Retake</Paragraph>
                                                </View>
                                                <View>
                                                    <IconButton
                                                        icon="upload"
                                                        size={40}
                                                        onPress={() => uploadImg(setUploading, image, 'teacher', API.CommonAPI, params?.school, item)}
                                                    />
                                                    <Paragraph style={{ paddingLeft: 10 }}>Upload</Paragraph>
                                                </View>
                                            </>
                                        )}
                                    </View>

                                    <View style={{
                                        justifyContent: 'center'
                                    }}>
                                        <TouchableOpacity
                                            style={{
                                                justifyContent: 'center', alignItems: 'center',
                                                backgroundColor: theme.colors.blue[500], padding: 10, borderWidth: 1
                                            }}
                                            onPress={() => setVisible(false)}
                                        >
                                            <Paragraph>Cancel</Paragraph>
                                        </TouchableOpacity>
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
