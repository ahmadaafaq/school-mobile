/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

import { useFormik } from "formik";

import API from "../../../../src/apis";
import CustomCheckBox from "../../../../src/screens/common/CustomCheckBox";
import CustomDatePicker from "../../../../src/screens/common/CustomDatePicker";
import CustomInputBox from "../../../../src/screens/common/CustomInputBox";
// import Loader from "../common/Loader";
import studentValidation from "./Validation";

import CustomDropdown, { MultipleDropdown } from "../../../../src/screens/common/CustomDropdown";
import { SIZES, FONT, ALIGNMENT } from "../../../../src/assets/constants";

const initialValues = {
    firstname: "",
    lastname: "",
    mother_name: "",
    father_name: "",
    guardian: "",
    contact_no: "",
    email: "",
    class: "",
    section: "",
    subjects: [],
    admission_date: null,
    dob: null,
    is_specially_abled: false,
    blood_group: "",
    birth_mark: "",
    religion: "",
    nationality: "",
    age: "",
    caste_group: "",
    gender: "",
    status: "inactive",
};

const StudentForm = ({
    onChange,
    refId,
    setDirty,
    reset,
    setReset,
    userId,
    updatedValues = null,
}) => {
    const [initialState, setInitialState] = useState(initialValues);
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    // const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();

    const [selected, setSelected] = useState("");

    const data = [
        { key: '1', value: 'Pre-Nursery' },
        { key: '2', value: 'Nursery' },
        { key: '3', value: 'Lower Kindergarten' },
        { key: '4', value: 'Upper Kindergarten' },
        { key: '5', value: '1' },
        { key: '6', value: '2' },
        { key: '7', value: '3' },
        { key: '8', value: '4' },
        { key: '9', value: '5' }
    ];

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: studentValidation,
        enableReinitialize: true,
        onSubmit: () => watchForm(),
    });

    React.useImperativeHandle(refId, () => ({
        Submit: async () => {
            await formik.submitForm();
        },
    }));

    const watchForm = () => {
        if (onChange) {
            onChange({
                values: formik.values,
                validated: formik.isSubmitting
                    ? Object.keys(formik.errors).length === 0
                    : false,
            });
        }
    };

    useEffect(() => {
        if (reset) {
            formik.resetForm();
            setReset(false);
        }
    }, [reset]);

    // useEffect(() => {
    //     if (formik.dirty) {
    //         setDirty(true);
    //     }
    // }, [formik.dirty]);

    useEffect(() => {
        if (updatedValues) {
            setInitialState(updatedValues);
        }
    }, [updatedValues]);

    // useEffect(() => {
    //     API.ClassAPI.getAll(false, 0, 20)
    //         .then((data) => {
    //             if (data.status === "Success") {
    //                 setClasses(data.data.rows);
    //             } else {
    //                 console.error("Error fetching classes. Please Try Again");
    //             }
    //         })
    //         .catch((err) => {
    //             console.error("Error fetching classes:", err);
    //         });
    // }, []);

    // useEffect(() => {
    //     API.SectionAPI.getAll(false, 0, 20)
    //         .then((data) => {
    //             if (data.status === "Success") {
    //                 setSections(data.data.rows);
    //             } else {
    //                 console.error("Error fetching classes. Please Try Again");
    //             }
    //         })
    //         .catch((err) => {
    //             console.error("Error fetching classes:", err);
    //         });
    // }, []);

    // const getSubjectsByClass = (classId) => {
    //     setLoading(true);
    //     API.SubjectAPI.getSubjectsByClass(classId)
    //         .then((subjects) => {
    //             console.log("data", subjects);
    //             if (subjects.status === "Success") {
    //                 setSubjects(subjects.data);
    //                 setLoading(false);
    //             } else {
    //                 setLoading(false);
    //                 console.log("Error, Please Try Again");
    //             }
    //         })
    //         .catch((err) => {
    //             setLoading(false);
    //             throw err;
    //         });
    // };

    const styles = StyleSheet.create({
        inputContainer: {
            flexDirection: ALIGNMENT.rowDirection,
            alignItems: ALIGNMENT.centered,
            height: 50,
            backgroundColor: theme.colors.white[500],
            margin: SIZES.smallMedium,
            marginTop: SIZES.xSmall
        },
    });

    return (
        <View style={{ margin: 20 }}>
            <ScrollView ref={refId}>

                <CustomInputBox
                    placeholder="Firstname*"
                    placeholderTextColor={theme.colors.white[700]}
                    value={formik.values.firstname}
                    onChangeText={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur("firstname")}
                    error={!!formik.touched.firstname && !!formik.errors.firstname}
                    underlineColor={`${theme.colors.white[700]}`}
                    activeUnderlineColor={`${theme.colors.blue[400]}`}
                />

                <View style={styles.inputContainer}>
                    <TextInput
                        style={{ flex: 1, color: theme.colors.white[500] }}
                        placeholder="Lastname*"
                        placeholderTextColor={theme.colors.white[700]}
                        value={formik.values.lastname}
                        onChangeText={formik.handleChange("lastname")}
                        onBlur={formik.handleBlur("lastname")}
                        error={!!formik.touched.lastname && !!formik.errors.lastname}
                        underlineColor={`${theme.colors.white[700]}`}
                        activeUnderlineColor={`${theme.colors.blue[400]}`}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={{ flex: 1, color: theme.colors.white[500] }}
                        placeholder="Mother's Name"
                        placeholderTextColor={theme.colors.white[700]}
                        value={formik.values.mother_name}
                        onChangeText={formik.handleChange("mother_name")}
                        onBlur={formik.handleBlur("mother_name")}
                        error={!!formik.touched.mother_name && !!formik.errors.mother_name}
                        underlineColor={`${theme.colors.white[700]}`}
                        activeUnderlineColor={`${theme.colors.blue[400]}`}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={{ flex: 1, color: theme.colors.white[500] }}
                        placeholder="Father's Name"
                        placeholderTextColor={theme.colors.white[700]}
                        value={formik.values.father_name}
                        onChangeText={formik.handleChange("father_name")}
                        onBlur={formik.handleBlur("father_name")}
                        error={!!formik.touched.father_name && !!formik.errors.father_name}
                        underlineColor={`${theme.colors.white[700]}`}
                        activeUnderlineColor={`${theme.colors.blue[400]}`}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={{ flex: 1, color: theme.colors.white[500] }}
                        placeholder="Guardian If Any"
                        placeholderTextColor={theme.colors.white[700]}
                        value={formik.values.guardian}
                        onChangeText={formik.handleChange("guardian")}
                        onBlur={formik.handleBlur("guardian")}
                        error={!!formik.touched.guardian && !!formik.errors.guardian}
                        underlineColor={`${theme.colors.white[700]}`}
                        activeUnderlineColor={`${theme.colors.blue[400]}`}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={{ flex: 1, color: theme.colors.white[500] }}
                        placeholder="Contact Number*"
                        placeholderTextColor={theme.colors.white[700]}
                        keyboardType="numeric"
                        value={formik.values.contact_no}
                        onChangeText={formik.handleChange("contact_no")}
                        onBlur={formik.handleBlur("contact_no")}
                        error={!!formik.touched.contact_no && !!formik.errors.contact_no}
                        underlineColor={`${theme.colors.white[700]}`}
                        activeUnderlineColor={`${theme.colors.blue[400]}`}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={{ flex: 1, color: theme.colors.white[500] }}
                        placeholder="Email*"
                        placeholderTextColor={theme.colors.white[700]}
                        keyboardType="email-address"
                        value={formik.values.email}
                        onChangeText={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                        error={!!formik.touched.email && !!formik.errors.email}
                        underlineColor={`${theme.colors.white[700]}`}
                        activeUnderlineColor={`${theme.colors.blue[400]}`}
                    />
                </View>

                <CustomDropdown placeholder="Class" data={data} selected={selected} setSelected={setSelected} />
                <CustomDropdown placeholder="Section" data={data} selected={selected} setSelected={setSelected} />
                <MultipleDropdown placeholder="Subjects" data={data} selected={selected} setSelected={setSelected} />

                <CustomDatePicker label="Select Date Of Birth" />
                <CustomDatePicker label="Select Admission Date" />
                <CustomCheckBox label="Is Specially Abled" />

                <View style={styles.inputContainer}>
                    <TextInput
                        style={{ flex: 1, color: theme.colors.white[500] }}
                        placeholder="Blood Group"
                        placeholderTextColor={theme.colors.white[700]}
                        value={formik.values.blood_group}
                        onChangeText={formik.handleChange("blood_group")}
                        onBlur={formik.handleBlur("blood_group")}
                        error={!!formik.touched.blood_group && !!formik.errors.blood_group}
                        underlineColor={`${theme.colors.white[700]}`}
                        activeUnderlineColor={`${theme.colors.blue[400]}`}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={{ flex: 1, color: theme.colors.white[500] }}
                        placeholder="Birth Mark"
                        placeholderTextColor={theme.colors.white[700]}
                        value={formik.values.birth_mark}
                        onChangeText={formik.handleChange("birth_mark")}
                        onBlur={formik.handleBlur("birth_mark")}
                        error={!!formik.touched.birth_mark && !!formik.errors.birth_mark}
                        underlineColor={`${theme.colors.white[700]}`}
                        activeUnderlineColor={`${theme.colors.blue[400]}`}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={{ flex: 1, color: theme.colors.white[500] }}
                        placeholder="Religion"
                        placeholderTextColor={theme.colors.white[700]}
                        value={formik.values.religion}
                        onChangeText={formik.handleChange("religion")}
                        onBlur={formik.handleBlur("religion")}
                        error={!!formik.touched.religion && !!formik.errors.religion}
                        underlineColor={`${theme.colors.white[700]}`}
                        activeUnderlineColor={`${theme.colors.blue[400]}`}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={{ flex: 1, color: theme.colors.white[500] }}
                        placeholder="Nationality"
                        placeholderTextColor={theme.colors.white[700]}
                        value={formik.values.nationality}
                        onChangeText={formik.handleChange("nationality")}
                        onBlur={formik.handleBlur("nationality")}
                        error={!!formik.touched.nationality && !!formik.errors.nationality}
                        underlineColor={`${theme.colors.white[700]}`}
                        activeUnderlineColor={`${theme.colors.blue[400]}`}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={{ flex: 1, color: theme.colors.white[500] }}
                        placeholder="Age"
                        placeholderTextColor={theme.colors.white[700]}
                        value={formik.values.age}
                        onChangeText={formik.handleChange("age")}
                        onBlur={formik.handleBlur("age")}
                        error={!!formik.touched.age && !!formik.errors.age}
                        underlineColor={`${theme.colors.white[700]}`}
                        activeUnderlineColor={`${theme.colors.blue[400]}`}
                    />
                </View>
                <CustomDropdown placeholder="Caste Group" data={data} selected={selected} setSelected={setSelected} />
                <CustomDropdown placeholder="Gender" data={data} selected={selected} setSelected={setSelected} />
                <CustomDropdown placeholder="Status" data={data} selected={selected} setSelected={setSelected} />

                {/* <DatePicker
                    value={formik.values.dob}
                    onChange={(newDob) => {
                        console.log("DOB=>", newDob);
                        formik.setFieldValue("dob", newDob);
                    }}
                />
                <DatePicker
                    value={formik.values.admission_date}
                    onChange={(new_admission_date) => {
                        console.log("admission_date=>", new_admission_date);
                        formik.setFieldValue("admission_date", new_admission_date);
                    }}
                /> */}
            </ScrollView >
            {/* {loading === true ? <Loader /> : null} */}
        </View >
    );
};

export default StudentForm;
