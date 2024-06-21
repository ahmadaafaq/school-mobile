/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import PropTypes from "prop-types";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRouter } from "expo-router";
import { Formik } from "formik";

import API from "../../../apis";
import CustomInputBox from "../../common/CustomInputBox";
import LoadingAnimationModal from "../../common/LoadingAnimationModal";
import HomeworkValidation from "./Validation";
import Toast from "../../common/Toast";

import { SIZES, FONT } from "../../../assets/constants";
import { Utility } from "../../../utility";

const initialValues = {
    title: "",
    description: "",
    status: "active",
    teacher_id: "",
    class_id: "",
    section_id: "",
    subject_id: ""
};

const FormComponent = () => {
    const [initialState, setInitialState] = useState(initialValues);
    const [loading, setLoading] = useState(false);
    const toastInfo = useSelector(state => state.toastInfo);
    const teacherData = useSelector(state => state.someTeachers);
    const { classData, sectionData, subjectData } = useSelector(state => state.teacherHomework);

    const dispatch = useDispatch();
    const router = useRouter();
    const theme = useTheme();

    const { toastAndNavigate } = Utility();

    const handleSubmit = (values) => {
        setInitialState(prevState => ({
            ...prevState,
            title: values.title,
            description: values.description,
            teacher_id: teacherData?.listData?.rows?.[0]?.id,
            class_id: classData?.class_id,
            section_id: sectionData?.section_id,
            subject_id: subjectData?.id || ''
        }));
        createHomework();
    };

    const createHomework = () => {
        setLoading(true);
        if (initialState.title.length > 0 && initialState.description.length > 2) {
            console.log(initialState, 'inside if condition')
            API.HomeworkAPI.createHomework(initialState)
                .then(({ data: homework }) => {
                    console.log(homework, 'created homework')
                    if (homework?.status === "Success") {
                        setLoading(false);
                        toastAndNavigate(dispatch, true, "Successfully Created", theme.colors.yaleBlue[500], theme.colors.lightBlue[600]);
                        setTimeout(() => {
                            router.push('/(homework)/homeworkListing');
                        }, 2000);
                    } else {
                        setLoading(false);
                        toastAndNavigate(dispatch, true, "An Error Occurred, Please Try Again", theme.colors.yaleBlue[500], theme.colors.lightBlue[600]);
                    }
                })
                .catch(err => {
                    console.log(err, 'error in homework API')
                    setLoading(false);
                    toastAndNavigate(dispatch, true, err ? err.response?.data?.msg : "An Error Occurred", theme.colors.yaleBlue[500], theme.colors.lightBlue[600]);
                    throw err;
                });
        } else {
            setLoading(false);
        }
    };
    console.log('Formdata:', initialState);

    return (
        <View style={{ margin: 20 }}>
            <Toast
                alerting={toastInfo.alerting}
                message={toastInfo.message}
                actionText={toastInfo.actionText}
                actionTextColor={toastInfo.actionTextColor}
                backgroundColor={toastInfo.backgroundColor}
                textColor={toastInfo.textColor || theme.colors.yaleBlue[500]}
            />
            <ScrollView>
                <Formik
                    initialValues={initialValues}
                    validationSchema={HomeworkValidation}
                >
                    {({
                        values,
                        errors,
                        touched,
                        dirty,
                        handleBlur,
                        handleChange
                    }) => (
                        <View style={{ width: "21vw" }}>
                            <CustomInputBox
                                name="title"
                                placeholder="Title*"
                                placeholderTextColor={theme.colors.white[700]}
                                value={values.title}
                                onChangeText={handleChange("title")}
                                onBlur={handleBlur("title")}
                                error={!!touched.title && !!errors.title}
                                helperText={touched.title && errors.title}
                                underlineColor={theme.colors.white[700]}
                                activeUnderlineColor={theme.colors.blue[400]}
                            />
                            {/* <Text>
                                    {touched.title && errors.title}
                                </Text> */}
                            <CustomInputBox
                                name="description"
                                placeholder="Description*"
                                placeholderTextColor={theme.colors.white[700]}
                                value={values.description}
                                onChangeText={handleChange("description")}
                                onBlur={handleBlur("description")}
                                error={!!touched.description && !!errors.description}
                                helperText={touched.description && errors.description}
                                underlineColor={theme.colors.white[700]}
                                activeUnderlineColor={theme.colors.blue[400]}
                            />
                            {/* here pressable should be */}
                            <TouchableOpacity
                                disabled={!dirty}
                                onPress={() => handleSubmit(values)}
                                style={{
                                    marginTop: 20,
                                    padding: 10,
                                    backgroundColor: theme.colors.grayishRed[500],
                                    borderRadius: 18
                                }}
                            >
                                <Text style={{
                                    color: !dirty ? theme.colors.white[700] : theme.colors.whiteSnow[400],
                                    fontSize: SIZES.large,
                                    fontFamily: FONT.regular,
                                    textAlign: 'center'
                                }}> Submit </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </ScrollView>
            {loading ? <LoadingAnimationModal /> : null}
        </View>
    );
};

FormComponent.propTypes = {
    userId: PropTypes.number
};

export default FormComponent;
