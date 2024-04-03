/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from 'expo-router';

import API from '../../../apis';
import CustomModal from '../../common/CustomModal';
import CustomPressable from '../../common/CustomPressable';
import LoadingAnimationModal from "../../common/LoadingAnimationModal";
import ListingComponent from './ListingComponent';

import { SIZES } from '../../../assets/constants';
import { setSchoolClasses } from "../../../redux/actions/ClassAction";
import { setSchoolSections } from "../../../redux/actions/SectionAction";
import { setSchoolSubjects } from "../../../redux/actions/SubjectAction";
import { setAllSubjects } from "../../../redux/actions/SubjectAction";
import { setTeacherHomeworks } from "../../../redux/actions/HomeworkAction";
import { useCommon } from "../../../hooks/common";
import { Utility } from "../../../utility";

const HomeworkListing = () => {
    const [classData, setClassData] = useState([]);
    const [selectedClassObj, setSelectedClassObj] = useState({
        selectedClass: {
            class_id: '',
            class_name: ''
        },
        selectedSection: {
            section_id: '',
            section_name: ''
        },
        selectedSubject: {
            id: '',
            name: ''
        }
    });
    const [showClassModal, setShowClassModal] = useState(false);      //for modal visibility
    const [showSectionModal, setShowSectionModal] = useState(false);
    const [showSubjectModal, setShowSubjectModal] = useState(false);

    const schoolClasses = useSelector(state => state.schoolClasses);
    const schoolSections = useSelector(state => state.schoolSections);
    const schoolSubjects = useSelector(state => state.schoolSubjects);
    const allSubjects = useSelector(state => state.allSubjects);
    const teacherHomework = useSelector(state => state.teacherHomework);

    const dispatch = useDispatch();
    const theme = useTheme();
    const { getPaginatedData } = useCommon();
    const { fetchAndSetSchoolData, fetchAndSetAll, findMultipleById, setAsyncStorage } = Utility();

    // writing this function separately because an effect function must no return anything besides a function, used for cleanup, 
    // you are returning promise, getting this error when calling directly
    const setMenuInAsyncStorage = useCallback(() => {
        setAsyncStorage('menu', { selected: 'Homework' });
    }, []);

    useFocusEffect(
        useCallback(() => {
            setMenuInAsyncStorage();
        }, [])
    );

    useEffect(() => {
        if (!teacherHomework?.listData?.length) {
            getPaginatedData(0, 10, setTeacherHomeworks, API.HomeworkAPI);
        }
    }, [teacherHomework?.listData?.length]);

    useEffect(() => {
        if (!allSubjects?.listData?.length) {
            fetchAndSetAll(dispatch, setAllSubjects, API.SubjectAPI);
        }
    }, []);

    useEffect(() => {
        if ((!schoolSubjects?.listData?.length || !schoolClasses?.listData?.length || !schoolSections?.listData?.length)) {
            fetchAndSetSchoolData(dispatch, setSchoolClasses, setSchoolSections, setClassData);
        }
    }, []);

    useEffect(() => {
        const getAndSetSections = () => {
            const classSections = classData?.filter(obj => obj.class_id === selectedClassObj?.selectedClass?.class_id);
            const selectedSections = classSections.map(({ section_id, section_name }) => ({ section_id, section_name }));
            dispatch(setSchoolSections(selectedSections));
            console.log('getandsetsections called', selectedSections, classSections);
        };
        getAndSetSections();
    }, [selectedClassObj?.selectedClass?.class_id, classData?.length]);

    useEffect(() => {
        const getAndSetSubjects = () => {
            const sectionSubjects = classData?.filter(obj => obj.class_id === selectedClassObj?.selectedClass?.class_id && obj.section_id === selectedClassObj?.selectedSection?.section_id);
            const selectedSubjects = sectionSubjects ? findMultipleById(sectionSubjects[0]?.subject_ids, allSubjects?.listData) : [];
            dispatch(setSchoolSubjects(selectedSubjects));
            console.log('getandsetsubjects called', selectedSubjects, sectionSubjects);
        };
        getAndSetSubjects();
    }, [selectedClassObj?.selectedClass?.class_id, selectedClassObj?.selectedSection?.section_id, allSubjects?.listData?.length, classData.length]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.grayishWhite[500]
        },
        icon: {
            height: SIZES.medium,
            width: SIZES.medium,
            marginTop: SIZES.xSmall,
            tintColor: theme.colors.brightBlue[300]
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={theme.colors.magicMint[500]} />
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}
                style={{ flexGrow: 1 }}
            >
                <View>
                    <View style={{ flexDirection: 'row', shadowColor: theme.colors.brightBlue[500], marginBottom: 20 }}>
                        <CustomPressable
                            onPress={() => setShowClassModal(!showClassModal)}
                            title="Class"
                            value={selectedClassObj.selectedClass?.class_name}
                            iconSource={require('../../../assets/icons/down-arrow-lite.png')}
                        />
                        <CustomPressable
                            onPress={() => setShowSectionModal(!showSectionModal)}
                            title="Section"
                            value={selectedClassObj.selectedSection?.section_name}
                            iconSource={require('../../../assets/icons/down-arrow-lite.png')}
                        />
                        <CustomPressable
                            onPress={() => setShowSubjectModal(!showSubjectModal)}
                            title="Subject"
                            value={selectedClassObj.selectedSubject?.name}
                            iconSource={require('../../../assets/icons/down-arrow-lite.png')}
                        />
                    </View>
                </View>
                <ListingComponent class_id={selectedClassObj.selectedClass?.class_id}
                    class_name={selectedClassObj.selectedClass?.class_name}
                    section_id={selectedClassObj.selectedSection?.section_id}
                    section_name={selectedClassObj.selectedSection?.section_name}
                    subject_id={selectedClassObj.selectedSubject?.id}
                    subject_name={selectedClassObj.selectedSubject?.name}
                />
            </ScrollView>

            {showClassModal && (
                <View style={{
                    width: '100%', position: 'absolute', left: 0, top: 0, zIndex: 1
                }}>
                    <CustomModal
                        heightNumber={1.6}
                        data={schoolClasses.listData}
                        headerText="Classes"
                        obj='selectedClass'
                        objId='class_id'
                        objValue='class_name'
                        showModal={showClassModal}
                        setShowModal={setShowClassModal}
                        setSelectedObj={setSelectedClassObj}
                    />
                </View>
            )}
            {showSectionModal && (
                <View style={{
                    width: '100%', position: 'absolute', left: 0, top: 0, zIndex: 1
                }}>
                    <CustomModal
                        heightNumber={1.5}
                        data={schoolSections.listData}
                        headerText="Sections"
                        obj='selectedSection'
                        objId='section_id'
                        objValue='section_name'
                        showModal={showSectionModal}
                        setShowModal={setShowSectionModal}
                        setSelectedObj={setSelectedClassObj}
                    />
                </View>
            )}
            {showSubjectModal && (
                <View style={{
                    width: '100%', position: 'absolute', left: 0, top: 0, zIndex: 1
                }}>
                    <CustomModal
                        heightNumber={2}
                        data={schoolSubjects.listData}
                        headerText="Subjects"
                        obj='selectedSubject'
                        objId='id'
                        objValue='name'
                        showModal={showSubjectModal}
                        setShowModal={setShowSubjectModal}
                        setSelectedObj={setSelectedClassObj}
                    />
                </View>
            )}
            {teacherHomework?.loading ? <LoadingAnimationModal /> : null}
        </SafeAreaView>
    );
};

export default HomeworkListing;
