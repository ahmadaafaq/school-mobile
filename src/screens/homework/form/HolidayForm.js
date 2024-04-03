/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

import PropTypes from "prop-types";
import { Formik } from "formik";

import CustomInputBox from "../../common/CustomInputBox";
import HomeworkValidation from "./Validation";

import CustomDropdown from "../../common/CustomDropdown";
import { SIZES, ALIGNMENT, FONT } from "../../../assets/constants";

const initialValues = {
    title: "",
    description: "",
    status: "inactive"
};

const HolidayForm = () => {
    const [formData, setFormData] = useState(initialValues);
    const theme = useTheme();

    const handlePress = (values) => {
        console.log('Form submitted:', formData);
        // Perform any action with form values, e.g., submit to server
        // Reset form after submission
        // setFormData({
        //     ...formData,
        //     ...values
        // });
    };
    console.log('Form not submitted:', formData);

    return (
        <View style={{ margin: 20 }}>
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
                                onPress={() => handlePress(values)}
                                style={{
                                    marginTop: 20,
                                    padding: 10,
                                    backgroundColor: theme.colors.green[500],
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
        </View>
    );
};

HolidayForm.propTypes = {
    onChange: PropTypes.func,
    refId: PropTypes.shape({
        current: PropTypes.any
    }),
    setDirty: PropTypes.func,
    reset: PropTypes.bool,
    setReset: PropTypes.func,
    classData: PropTypes.array,
    setClassData: PropTypes.func,
    allSubjects: PropTypes.array,
    userId: PropTypes.number,
    updatedValues: PropTypes.object,
    iCardDetails: PropTypes.object,
    setICardDetails: PropTypes.func
};

export default HolidayForm;
