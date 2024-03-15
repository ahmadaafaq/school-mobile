/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
// import dayjs from "dayjs";

import API from "../../../apis";
import AddressForm from "../../address/AddressForm";
// import ImagePicker from "../image/ImagePicker";
// import Loader from "../common/Loader";
import StudentForm from "./StudentForm";

import { FONT } from "../../../theme/theme";
import { setMenuItem } from "../../../redux/actions/MenuItemAction";
import { Utility } from "../../../utility";

const MainForm = () => {
    const [title, setTitle] = useState("Create");
    const [_loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        studentData: { values: null, validated: false },
        addressData: { values: null, validated: false },
        imageData: { values: null, validated: true }
    });
    const [updatedValues, setUpdatedValues] = useState(null);
    // const [deletedImage, setDeletedImage] = useState([]);
    // const [preview, setPreview] = useState([]);
    const [dirty, setDirty] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [reset, setReset] = useState(false);
    // const [allSubjects, setAllSubjects] = useState([]);

    const studentFormRef = useRef();
    const addressFormRef = useRef();
    // const imageFormRef = useRef();

    const dispatch = useDispatch();
    const router = useRouter();
    const theme = useTheme();
    // const userParams = useParams();

    const selected = useSelector(state => state.menuItem.selected);
    // const toastInfo = useSelector(state => state.toastInfo);
    // const { state } = useLocation();
    const { getAsyncStorage } = Utility();

    //after page refresh the id in router state becomes undefined, so getting student id from url params
    // let id = state?.id || userParams?.id;

    useEffect(() => {
        const selectedMenu = getAsyncStorage("menu");
        dispatch(setMenuItem(selectedMenu.selected));
    }, []);

    const updateStudentAndAddress = useCallback(formData => {
        console.log("formdataABCD", formData)
        const dataFields = [
            { ...formData.studentData.values },
            { ...formData.addressData.values }
        ];
        const paths = ["/update-student", "/update-address"];
        setLoading(true);

        API.CommonAPI.multipleAPICall("PATCH", paths, dataFields)
            .then(responses => {
                let status = true;
                responses.forEach(response => {
                    if (response.data.status !== "Success") {
                        status = false;
                    }
                });
                if (status) {
                    setLoading(false);
                    // toastAndNavigate(dispatch, true, "info", "Successfully Updated", navigateTo, `/student/listing/${getLocalStorage('class')}`);
                }
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                // toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                console.log("Error in Student Update", err);
            });
    }, [formData]);

    const populateStudentData = useCallback(id => {
        setLoading(true);
        const paths = [`/get-by-pk/student/${id}`, `/get-address/student/${id}`];

        API.CommonAPI.multipleAPICall("GET", paths)
            .then(responses => {
                if (responses[0].data.data) {
                    // responses[0].data.data.subjects = findSubjectsById(responses[0].data.data.subjects, allSubjects)
                    // responses[0].data.data.dob = dayjs(responses[0].data.data.dob);
                    // responses[0].data.data.admission_date = dayjs(responses[0].data.data.admission_date);
                }
                const dataObj = {
                    studentData: responses[0].data.data,
                    addressData: responses[1]?.data?.data
                };
                setUpdatedValues(dataObj);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                // toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                throw err;
            });
    }, []);

    const createStudent = useCallback(formData => {
        setLoading(true);

        formData.studentData.values = {
            ...formData.studentData.values,
            // subjects: getIdsFromObjects(formData.studentData.values?.subjects)
        }
        API.StudentAPI.createStudent({ ...formData.studentData.values })
            .then(({ data: student }) => {
                if (student?.status === 'Success') {
                    API.AddressAPI.createAddress({
                        ...formData.addressData.values,
                        parent_id: student.data.id,
                        parent: 'student',
                    })
                        .then(() => {
                            setLoading(false);
                            // toastAndNavigate(dispatch, true, "success", "Successfully Created", navigateTo, `/student/listing/${getLocalStorage('class')}`);
                        })
                        .catch(err => {
                            setLoading(false);
                            // toastAndNavigate(dispatch, true, err ? err : "An Error Occurred");
                            throw err;
                        });
                };
            })
            .catch(err => {
                setLoading(false);
                // toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                throw err;
            });
    }, []);

    // useEffect(() => {
    //     API.SubjectAPI.getAll(false, 0, 20)
    //         .then(data => {
    //             if (data.status === 'Success') {
    //                 setAllSubjects(data.data.rows);
    //                 console.log(data.data.rows, 'sub')
    //             } else {
    //                 console.error("Error fetching classes. Please Try Again");
    //             }
    //         })
    //         .catch(err => {
    //             console.error("Error fetching classes:", err);
    //         });
    // }, []);

    //Create/Update/Populate student
    useEffect(() => {
        if (id && !submitted) {
            setTitle("Update");
            populateStudentData(id);
        }
        if (formData.studentData.validated && formData.addressData.validated) {
            formData.studentData.values?.id ? updateStudentAndAddress(formData) : createStudent(formData);
        } else {
            setSubmitted(false);
        }
    }, [id, submitted]);

    const handleSubmit = async () => {
        await studentFormRef.current.Submit();
        await addressFormRef.current.Submit();
        // await imageFormRef.current.Submit();
        setSubmitted(true);
    };

    const handleFormChange = (data, form) => {
        if (form === 'student') {
            setFormData({ ...formData, studentData: data });
        } else if (form === 'address') {
            setFormData({ ...formData, addressData: data });
        }
    };

    const styles = StyleSheet.create({
        textStyle: {
            color: theme.colors.grayishWhite[600],
            display: "inline-block",
            fontFamily: FONT.medium,
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: 0.12,
            marginLeft: 20
        }
    });

    return (
        <SafeAreaView m="10px">
            <Text style={styles.textStyle}>
                {`${title} ${selected}`}
            </Text>
            <StudentForm
                onChange={(data) => {
                    handleFormChange(data, 'student');
                }}
                refId={studentFormRef}
                setDirty={setDirty}
                reset={reset}
                setReset={setReset}
                userId={id}
                updatedValues={updatedValues?.studentData}
            />
            <AddressForm
                onChange={(data) => {
                    handleFormChange(data, 'address');
                }}
                refId={addressFormRef}
                update={id ? true : false}
                setDirty={setDirty}
                reset={reset}
                setReset={setReset}
                updatedValues={updatedValues?.addressData}
            />
            {/* <ImagePicker
                key="image"
                onChange={data => handleFormChange(data, 'parent')}
                refId={imageFormRef}
                reset={reset}
                setReset={setReset}
                setDirty={setDirty}
                preview={preview}
                setPreview={setPreview}
                // updatedValues={updatedValues?.imageData.filter(img => img.type === "normal")}
                deletedImage={deletedImage}
                setDeletedImage={setDeletedImage}
                imageType="Guardian"
            // azurePath={`${ENV.VITE_SAS_URL}/${ENV.VITE_PARENT_SALON}`}
            // ENV={ENV}
            /> */}

            <View style={{ display: "flex", justifyContent: "end", margin: "20px" }}>
                {   //hide reset button on student update  type="reset" color="warning" variant="contained"
                    title === "Update" ? null :
                        <Button style={{ marginRight: 3 }}
                            disabled={!dirty || submitted}
                            onPress={() => {
                                if (window.confirm("Do You Really Want To Reset?")) {
                                    setReset(true);
                                }
                            }}
                        >
                            Reset
                        </Button>
                }
                <Button color="error" variant="contained" sx={{ mr: 3 }}
                    onPress={() => router.push(`/student/listing/${getAsyncStorage('class') || ''}`)}>
                    Cancel
                </Button>
                <Button type="submit" onPress={() => handleSubmit()} disabled={!dirty}
                    color={title === "Update" ? "info" : "success"} variant="contained"
                >
                    Submit
                </Button>
                {/* <Toast alerting={toastInfo.toastAlert}
                    severity={toastInfo.toastSeverity}
                    message={toastInfo.toastMessage}
                /> */}
            </View>
            {/* {loading === true ? <Loader /> : null} */}
        </SafeAreaView>
    );
};

export default MainForm;
