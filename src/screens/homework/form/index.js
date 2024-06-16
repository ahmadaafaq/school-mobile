/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { usePathname } from 'expo-router';

import API from '../../../apis';
import CustomModal from '../../common/CustomModal';
import CustomPressable from '../../common/CustomPressable';
import HolidayForm from './HolidayForm';

import { SIZES } from '../../../assets/constants';
import { setSchoolClasses } from "../../../redux/actions/ClassAction";
import { setSchoolSections } from "../../../redux/actions/SectionAction";
import { setSchoolSubjects } from "../../../redux/actions/SubjectAction";
import { setAllSubjects } from "../../../redux/actions/SubjectAction";
import { setHomeworkClassData, setHomeworkSectionData, setHomeworkSubjectData } from "../../../redux/actions/HomeworkAction";
import { Utility } from "../../../utility";

const HomeworkForm = () => {
    const [classsData, setClasssData] = useState([]);
    const [showClassModal, setShowClassModal] = useState(false);      //for modal visibility
    const [showSectionModal, setShowSectionModal] = useState(false);
    const [showSubjectModal, setShowSubjectModal] = useState(false);

    const schoolClasses = useSelector(state => state.schoolClasses);
    const schoolSections = useSelector(state => state.schoolSections);
    const schoolSubjects = useSelector(state => state.schoolSubjects);
    const allSubjects = useSelector(state => state.allSubjects);
    const { classData, sectionData, subjectData } = useSelector(state => state.teacherHomework);

    const dispatch = useDispatch();
    const theme = useTheme();
    const pathname = usePathname();
    const { fetchAndSetSchoolData, fetchAndSetAll, findMultipleById } = Utility();

    useEffect(() => {
        if (!allSubjects?.listData?.length) {
            fetchAndSetAll(dispatch, setAllSubjects, API.SubjectAPI);
        }
    }, []);

    useEffect(() => {
        if ((!schoolSubjects?.listData?.length || !schoolClasses?.listData?.length || !schoolSections?.listData?.length)) {
            fetchAndSetSchoolData(dispatch, setSchoolClasses, setSchoolSections, setClasssData, API.SchoolAPI);
        }
    }, []);

    useEffect(() => {
        const getAndSetSections = () => {
            const classSections = classsData?.filter(obj => obj.class_id === classData.class_id);
            const selectedSections = classSections.map(({ section_id, section_name }) => ({ section_id, section_name }));
            dispatch(setSchoolSections(selectedSections));
            // console.log('getandsetsections called form', selectedSections, classSections);
        };
        getAndSetSections();
    }, [classData?.class_id, classsData?.length]);

    useEffect(() => {
        const getAndSetSubjects = () => {
            const sectionSubjects = classsData?.filter(obj => obj.class_id === classData?.class_id && obj.section_id === sectionData?.section_id);
            const selectedSubjects = sectionSubjects ? findMultipleById(sectionSubjects[0]?.subject_ids, allSubjects?.listData) : [];
            dispatch(setSchoolSubjects(selectedSubjects));
            console.log('getandsetsubjects called form', selectedSubjects, sectionSubjects);
        };
        getAndSetSubjects();
    }, [classData?.class_id, sectionData?.section_id, allSubjects?.listData?.length, classsData.length]);

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
                            value={classData.class_name}
                            iconSource={require('../../../assets/icons/down-arrow-lite.png')}
                        />
                        <CustomPressable
                            onPress={() => setShowSectionModal(!showSectionModal)}
                            title="Section"
                            value={sectionData.section_name}
                            iconSource={require('../../../assets/icons/down-arrow-lite.png')}
                        />
                        <CustomPressable
                            onPress={() => setShowSubjectModal(!showSubjectModal)}
                            title="Subject"
                            value={subjectData.name}
                            iconSource={require('../../../assets/icons/down-arrow-lite.png')}
                        />
                    </View>
                </View>
                <HolidayForm />
            </ScrollView>

            {showClassModal && (
                <View style={{
                    width: '100%', position: 'absolute', left: 0, top: 0, zIndex: 1
                }}>
                    <CustomModal
                        heightNumber={1.7}
                        data={schoolClasses.listData}
                        headerText="Classes"
                        objId='class_id'
                        objValue='class_name'
                        showModal={showClassModal}
                        setShowModal={setShowClassModal}
                        action={setHomeworkClassData}
                    />
                </View>
            )}

            {showSectionModal && (
                <View style={{
                    width: '100%', position: 'absolute', left: 0, top: 0, zIndex: 1
                }}>
                    <CustomModal
                        heightNumber={1.6}
                        data={schoolSections.listData}
                        headerText="Sections"
                        objId='section_id'
                        objValue='section_name'
                        showModal={showSectionModal}
                        setShowModal={setShowSectionModal}
                        action={setHomeworkSectionData}
                    />
                </View>
            )}

            {showSubjectModal && (
                <View style={{
                    width: '100%', position: 'absolute', left: 0, top: 0, zIndex: 1
                }}>
                    <CustomModal
                        heightNumber={2.1}
                        data={schoolSubjects.listData}
                        headerText="Subjects"
                        objId='id'
                        objValue='name'
                        showModal={showSubjectModal}
                        setShowModal={setShowSubjectModal}
                        action={setHomeworkSubjectData}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

export default HomeworkForm;
