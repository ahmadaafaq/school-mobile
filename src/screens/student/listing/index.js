/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useFocusEffect } from 'expo-router';

import API from '../../../apis';
import CustomModal from '../../common/CustomModal';
import CustomPressable from '../../common/CustomPressable';
import LoadingAnimationModal from "../../common/LoadingAnimationModal";
import ListingComponent from './ListingComponent';

import { setSchoolClasses } from "../../../redux/actions/ClassAction";
import { setSchoolSections } from "../../../redux/actions/SectionAction";
import { setSchoolStudents } from "../../../redux/actions/StudentAction";
import { setHomeworkClassData, setHomeworkSectionData } from "../../../redux/actions/HomeworkAction";
import { useCommon } from "../../../hooks/common";
import { Utility } from "../../../utility";

const StudentListing = () => {
    const [dbClassObj, setDbClassObj] = useState([]);
    const [showClassModal, setShowClassModal] = useState(false);      //for modal visibility
    const [showSectionModal, setShowSectionModal] = useState(false);
    const schoolClasses = useSelector(state => state.schoolClasses);
    const schoolSections = useSelector(state => state.schoolSections);
    const schoolStudents = useSelector(state => state.schoolStudents);
    const { classData, sectionData } = useSelector(state => state.teacherHomework);

    const dispatch = useDispatch();
    const theme = useTheme();
    const params = useLocalSearchParams();
    const { getPaginatedData } = useCommon();
    const { fetchAndSetSchoolData, setAsyncStorage } = Utility();

    // writing this function separately because an effect function must no return anything besides a function, used for cleanup, 
    // you are returning promise, getting this error when calling directly
    const setMenuInAsyncStorage = useCallback(() => {
        setAsyncStorage('menu', { selected: 'Student' });
    }, []);

    useFocusEffect(
        useCallback(() => {
            setMenuInAsyncStorage();
        }, [])
    );

    useEffect(() => {
        if (classData.class_id && sectionData.section_id) {
            console.log('fetch CLASS students');
            getPaginatedData(0, 100, setSchoolStudents, API.StudentAPI,
                { class_id: classData.class_id, section: sectionData.section_id, school_id: params.school_id });
        } else {
            console.log('fetch ALL students')
            getPaginatedData(0, 100, setSchoolStudents, API.StudentAPI);
        }
    }, [classData.class_id, sectionData.section_id]);

    useEffect(() => {
        if (!schoolClasses?.listData?.length || !schoolSections?.listData?.length) {
            fetchAndSetSchoolData(dispatch, setSchoolClasses, setSchoolSections, setDbClassObj, API.SchoolAPI);
        }
    }, []);

    useEffect(() => {
        const getAndSetSections = () => {
            const classSections = dbClassObj?.filter(obj => obj.class_id === classData.class_id);
            const selectedSections = classSections.map(({ section_id, section_name }) => ({ section_id, section_name }));
            dispatch(setSchoolSections(selectedSections));
        };
        getAndSetSections();
    }, [dbClassObj?.length, classData?.class_id]);

    //this function is used for modals
    const handlePress = (item, objValue, action, objId) => {
        if (objValue === "class_name") {
            setShowClassModal(!showClassModal);
        } else if (objValue === 'section_name') {
            setShowSectionModal(!showSectionModal);
        }
        if (action) {
            dispatch(action({
                [objId]: item[objId],
                [objValue]: item[objValue]
            }));
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingVertical: 2,
            backgroundColor: theme.colors.grayishWhite[500]
        },
        boxContainer: {
            flexDirection: 'row',
            marginVertical: 10
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={theme.colors.magicMint[500]} />
            <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]} style={{ flexGrow: 1 }}>
                <View>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'center',
                        shadowColor: theme.colors.brightBlue[500], marginBottom: 20
                    }}>
                        <CustomPressable
                            onPress={() => setShowClassModal(!showClassModal)}
                            title="Class"
                            value={classData.class_name}
                            iconSource={require('../../../assets/icons/down-arrow-lite.png')}
                        />
                        <CustomPressable
                            onPress={() => setShowSectionModal(!showSectionModal)}
                            title="Section"
                            value={sectionData.section_name}
                            iconSource={require('../../../assets/icons/down-arrow-lite.png')}
                        />
                    </View>
                </View>
                <ListingComponent />
            </ScrollView>

            {showClassModal && (
                <View style={{
                    width: '100%', position: 'absolute', left: 0, top: 0, zIndex: 1
                }}>
                    <CustomModal
                        heightNumber={schoolClasses.listData.length / 2.2}
                        headerText="Classes"
                        showModal={showClassModal}
                        setShowModal={setShowClassModal}
                    >
                        {schoolClasses.listData.map((item, index) =>
                            <TouchableOpacity onPress={() => handlePress(item, "class_name", setHomeworkClassData, "class_id")} key={index}>
                                <Text style={styles.textStyle}>{item["class_name"]} </Text>
                            </TouchableOpacity>

                        )}
                    </CustomModal>
                </View>
            )}
            {showSectionModal && (
                <View style={{
                    width: '100%', position: 'absolute', left: 0, top: 0, zIndex: 1
                }}>
                    <CustomModal
                        heightNumber={schoolSections.listData.length / 1.2 || 1.5}
                        headerText="Sections"
                        showModal={showSectionModal}
                        setShowModal={setShowSectionModal}
                    >
                        {schoolSections.listData.map((item, index) =>
                            <TouchableOpacity onPress={() => handlePress(item, "section_name", setHomeworkSectionData, "section_id")} key={index}>
                                <Text style={styles.textStyle}>{item["section_name"]} </Text>
                            </TouchableOpacity>

                        )}
                    </CustomModal>
                </View>
            )}

            {schoolStudents?.loading ? <LoadingAnimationModal /> : null}
        </SafeAreaView>
    )
};

export default StudentListing;
