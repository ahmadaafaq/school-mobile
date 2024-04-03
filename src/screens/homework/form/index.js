/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useState } from 'react';
import { useSelector } from "react-redux";
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';

import CustomModal from '../../common/CustomModal';
import CustomPressable from '../../common/CustomPressable';
import HolidayForm from './HolidayForm';

import { SIZES } from '../../../assets/constants';

const HomeworkForm = () => {
    const [showClassModal, setShowClassModal] = useState(false);      //for modal visibility
    const [showSectionModal, setShowSectionModal] = useState(false);
    const [showSubjectModal, setShowSubjectModal] = useState(false);

    const schoolClasses = useSelector(state => state.schoolClasses);
    const schoolSections = useSelector(state => state.schoolSections);
    const schoolSubjects = useSelector(state => state.schoolSubjects);

    const theme = useTheme();
    const URLParams = useLocalSearchParams();

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
                            value={URLParams.class_name}
                            iconSource={require('../../../assets/icons/down-arrow-lite.png')}
                        />
                        <CustomPressable
                            onPress={() => setShowSectionModal(!showSectionModal)}
                            title="Section"
                            value={URLParams.section_name}
                            iconSource={require('../../../assets/icons/down-arrow-lite.png')}
                        />
                        <CustomPressable
                            onPress={() => setShowSubjectModal(!showSubjectModal)}
                            title="Subject"
                            value={URLParams.subject_name}
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
                        obj='selectedClass'
                        objId='class_id'
                        objValue='class_name'
                        showModal={showClassModal}
                        setShowModal={setShowClassModal}
                    // setSelectedObj={setSelectedClassObj}
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
                        obj='selectedSection'
                        objId='section_id'
                        objValue='section_name'
                        showModal={showSectionModal}
                        setShowModal={setShowSectionModal}
                    // setSelectedObj={setSelectedClassObj}
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
                        obj='selectedSubject'
                        objId='id'
                        objValue='name'
                        showModal={showSubjectModal}
                        setShowModal={setShowSubjectModal}
                    // setSelectedObj={setSelectedClassObj}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

export default HomeworkForm;
