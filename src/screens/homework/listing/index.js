/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import PropTypes from 'prop-types';

import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import API from '../../../apis';
import CustomModal from '../../common/CustomModal';
import CustomPressable from '../../common/CustomPressable';
import LoadingAnimationModal from "../../common/LoadingAnimationModal";
import ListingComponent from './ListingComponent';
import Toast from '../../common/Toast';

import { SIZES } from '../../../assets/constants';
import { setSchoolClasses } from "../../../redux/actions/ClassAction";
import { setSchoolSections } from "../../../redux/actions/SectionAction";
import { setAllSubjects, setSchoolSubjects } from "../../../redux/actions/SubjectAction";
import {
    setTeacherHomeworks, setHomeworkClassData,
    setHomeworkSectionData, setHomeworkSubjectData
} from "../../../redux/actions/HomeworkAction";
import { useCommon } from "../../../hooks/common";
import { Utility } from "../../../utility";

const HomeworkListing = () => {
    const [dbClassObj, setDbClassObj] = useState([]);
    const [showClassModal, setShowClassModal] = useState(false);      //for modal visibility
    const [showSectionModal, setShowSectionModal] = useState(false);
    const [showSubjectModal, setShowSubjectModal] = useState(false);

    const allSubjects = useSelector(state => state.allSubjects);
    const schoolClasses = useSelector(state => state.schoolClasses);
    const schoolSections = useSelector(state => state.schoolSections);
    const schoolSubjects = useSelector(state => state.schoolSubjects);
    const toastInfo = useSelector(state => state.toastInfo);
    const homework = useSelector(state => state.teacherHomework);
    const { classData, sectionData, subjectData } = useSelector(state => state.teacherHomework);

    const dispatch = useDispatch();
    const theme = useTheme();
    const params = useLocalSearchParams();
    const { getPaginatedData } = useCommon();
    const { fetchAndSetSchoolData, fetchAndSetAll, findMultipleById, setAsyncStorage, toastAndNavigate } = Utility();

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

    // to fetch students based on selected class & section from dropdown
    useEffect(() => {
        if (params.userRole === 'teacher') {
            if (!classData.class_id && !sectionData.section_id && !subjectData.id) {
                toastAndNavigate(dispatch, true, "Please Select Class, Section and Subject From the Dropdown", theme.colors.yaleBlue[500], theme.colors.lightBlue[600]);
            }
            else if (classData.class_id && sectionData.section_id && subjectData.id) {
                getPaginatedData(0, 10, setTeacherHomeworks, API.HomeworkAPI, { class_id: classData.class_id, section: sectionData.section_id, subjectId: subjectData.id });
            }
        }
    }, [classData.class_id, sectionData.section_id, subjectData.id]);


    useEffect(() => {
        if (params.userRole === 'teacher') {
            if (!allSubjects?.listData?.length) {
                fetchAndSetAll(dispatch, setAllSubjects, API.SubjectAPI);
            }
        }
    }, []);

    useEffect(() => {
        if (params.userRole === 'teacher') {
            if ((!schoolSubjects?.listData?.length || !schoolClasses?.listData?.length || !schoolSections?.listData?.length)) {
                fetchAndSetSchoolData(dispatch, setSchoolClasses, setSchoolSections, setDbClassObj, API.SchoolAPI);
            }
        }
    }, [schoolSections?.listData?.length]);

    useEffect(() => {
        // if (Object.values(sectionData) && Object.values(subjectData)) {
        //     dispatch(setHomeworkSectionData({}));
        //     dispatch(setHomeworkSubjectData({}));
        //     console.log(pathname, 'pathname')
        // }
        const getAndSetSections = () => {
            const classSections = dbClassObj?.filter(obj => obj.class_id === classData.class_id);
            const selectedSections = classSections.map(({ section_id, section_name }) => ({ section_id, section_name }));
            dispatch(setSchoolSections(selectedSections));
            // console.log('getandsetsections called listing', selectedSections, classSections);
        };
        getAndSetSections();
    }, [classData?.class_id, dbClassObj?.length]);

    useEffect(() => {
        // if (Object.values(sectionData)) {
        //     dispatch(setHomeworkSubjectData({}));
        // }
        const getAndSetSubjects = () => {
            const sectionSubjects = dbClassObj?.filter(obj => obj.class_id === classData?.class_id && obj.section_id === sectionData?.section_id);
            const selectedSubjects = sectionSubjects ? findMultipleById(sectionSubjects[0]?.subject_ids, allSubjects?.listData) : [];
            dispatch(setSchoolSubjects(selectedSubjects));
            console.log('getandsetsubjects called', selectedSubjects, sectionSubjects);
        };
        getAndSetSubjects();
    }, [classData?.class_id, sectionData?.section_id, allSubjects?.listData?.length, dbClassObj.length]);

    //this function is used for modals
    const handlePress = (item, objValue, action, objId) => {
        if (objValue === "class_name") {
            setShowClassModal(!showClassModal);
        } else if (objValue === 'section_name') {
            setShowSectionModal(!showSectionModal);
        } else if (objValue === 'name') {
            setShowSubjectModal(!showSubjectModal);
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
                {params.userRole === 'teacher' &&
                    <View>
                        <View style={{ flexDirection: 'row', shadowColor: theme.colors.brightBlue[500], marginBottom: 20 }}>
                            <CustomPressable
                                onPress={() => setShowClassModal(!showClassModal)}
                                title="Class"
                                value={classData.class_name}
                                iconSource={require('../../../assets/icons/down-arrow-lite.png')}
                                width='33%'
                            />
                            <CustomPressable
                                onPress={() => setShowSectionModal(!showSectionModal)}
                                title="Section"
                                value={sectionData.section_name}
                                iconSource={require('../../../assets/icons/down-arrow-lite.png')}
                                width='33%'
                            />
                            <CustomPressable
                                onPress={() => setShowSubjectModal(!showSubjectModal)}
                                title="Subject"
                                value={subjectData.name}
                                iconSource={require('../../../assets/icons/down-arrow-lite.png')}
                                width='33%'
                            />
                        </View>
                    </View>
                }

                <Toast
                    alerting={toastInfo.alerting}
                    message={toastInfo.message}
                    backgroundColor={toastInfo.backgroundColor}
                    textColor={toastInfo.textColor || theme.colors.yaleBlue[500]}
                />

                <ListingComponent userRole={params.userRole} />
            </ScrollView>

            {params.userRole === 'teacher' && showClassModal && (
                <View style={{
                    width: '100%', position: 'absolute', left: 0, top: 0, zIndex: 1
                }}>
                    <CustomModal
                        heightNumber={schoolClasses?.listData?.length / 2.2 || 2}
                        headerText="Classes"
                        showModal={showClassModal}
                        setShowModal={setShowClassModal}
                    >
                        {schoolClasses.listData.map((item, index) =>
                            <TouchableOpacity onPress={() => handlePress(item, "class_name", setHomeworkClassData, "class_id")} key={index}>
                                <Text style={styles.textStyle}>{`${item["class_name"]}\n`} </Text>
                            </TouchableOpacity>

                        )}
                    </CustomModal>
                </View>
            )}
            {params.userRole === 'teacher' && showSectionModal && (
                <View style={{
                    width: '100%', position: 'absolute', left: 0, top: 0, zIndex: 1
                }}>
                    <CustomModal
                        heightNumber={1.9}
                        headerText="Sections"
                        showModal={showSectionModal}
                        setShowModal={setShowSectionModal}
                    >
                        {schoolSections.listData.map((item, index) =>
                            <TouchableOpacity onPress={() => handlePress(item, "section_name", setHomeworkSectionData, "section_id")} key={index}>
                                <Text style={styles.textStyle}>{`${item["section_name"]}\n`} </Text>
                            </TouchableOpacity>

                        )}
                    </CustomModal>
                </View>
            )}
            {params.userRole === 'teacher' && showSubjectModal && (
                <View style={{
                    width: '100%', position: 'absolute', left: 0, top: 0, zIndex: 1
                }}>
                    <CustomModal
                        heightNumber={2}
                        headerText="Subjects"
                        showModal={showSubjectModal}
                        setShowModal={setShowSubjectModal}
                    >
                        {schoolSubjects.listData.map((item, index) =>
                            <TouchableOpacity onPress={() => handlePress(item, "name", setHomeworkSubjectData, "id")} key={index}>
                                <Text style={styles.textStyle}>{`${item["name"]}\n`} </Text>
                            </TouchableOpacity>

                        )}
                    </CustomModal>
                </View>
            )}
            {homework?.loading ? <LoadingAnimationModal /> : null}
        </SafeAreaView>
    );
};

HomeworkListing.propTypes = {
    userRole: PropTypes.string
};

export default HomeworkListing;
