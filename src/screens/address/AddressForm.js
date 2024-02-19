/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useFormik } from "formik";

import API from "../../apis";
import addressValidation from "./Validation";
import CustomCheckBox from "../common/CustomCheckBox";
import CustomInputBox from "../common/CustomInputBox";

const initialValues = {
    street: "",
    landmark: "",
    zipcode: "",
    country: 0,
    state: 0,
    city: 0
};

const AddressFormComponent = ({
    onChange,
    refId,
    update,
    setDirty,
    reset,
    setReset,
    updatedValues = null
}) => {

    const [initialState, setInitialState] = useState(initialValues);
    const [countries, setCountries] = useState([]);
    const [countryId, setCountryId] = useState(null);
    const [states, setStates] = useState([]);
    const [stateId, setStateId] = useState(null);
    const [cities, setCities] = useState([]);
    const [cityId, setCityId] = useState(null);

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: addressValidation,
        enableReinitialize: true,
        onSubmit: () => watchForm(),
    });

    React.useImperativeHandle(refId, () => ({
        Submit: async () => {
            await formik.submitForm();
        }
    }));

    const watchForm = () => {
        if (onChange) {
            onChange({
                values: formik.values,
                validated: formik.isSubmitting
                    ? Object.keys(formik.errors).length === 0
                    : false
            });
        };
    };

    useEffect(() => {
        if (reset) {
            formik.resetForm();
            setReset(false);
        }
    }, [reset]);

    useEffect(() => {
        if (formik.dirty) {
            setDirty(true);
        }
    }, [formik.dirty]);

    useEffect(() => {
        if (updatedValues) {
            setInitialState(updatedValues);
        }
    }, [updatedValues]);

    useEffect(() => {
        const getCountry = () => {
            API.CountryAPI.getCountries()
                .then(country => {
                    if (country?.status === 'Success') {
                        setCountries(country.data.list);
                    } else {
                        console.log("An Error Occurred, Please Try Again");
                    }
                })
                .catch(err => {
                    throw err;
                });
        };
        getCountry();
    }, []);

    useEffect(() => {
        const getStates = () => {
            if (formik.values.country || countryId) {
                API.StateAPI.getStates(formik.values.country || countryId)
                    .then(data => {
                        if (data?.status === 'Success') {
                            setStates(data.data.list);
                            setCities([]);
                            if (update) {
                                getCities();
                            }
                        } else {
                            setStates([]);
                            setCities([]);
                            formik.setFieldValue("state", 0);
                            formik.setFieldValue("city", 0);
                        };
                    })
                    .catch(err => {
                        throw err;
                    });
            };
        }
        getStates();
    }, [formik.values.country, countryId]);

    useEffect(() => {
        if (stateId) {
            getCities();
        }
    }, [stateId]);

    const getCities = useCallback(() => {
        API.CityAPI.getCities(formik.values.state || stateId)
            .then(cities => {
                if (cities?.status === 'Success') {
                    setCities(cities.data.list);
                } else {
                    setCities([]);
                    formik.setFieldValue("city", 0);
                };
            })
            .catch(err => {
                setCities([]);
                formik.setFieldValue("city", 0);
                throw err;
            });
    }, [formik.values.state, stateId]);

    return (
        <Box m="20px" marginBottom="60px">
            <form ref={refId}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    position='relative'
                    id='box-shadow'
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        transform: 'translate(0)',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="street"
                        label="Street*"
                        autoComplete="new-street"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.street}
                        error={!!formik.touched.street && !!formik.errors.street}
                        helperText={formik.touched.street && formik.errors.street}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="landmark"
                        label="Landmark"
                        autoComplete="new-landmark"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.landmark}
                        error={!!formik.touched.landmark && !!formik.errors.landmark}
                        helperText={formik.touched.landmark && formik.errors.landmark}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="zipcode"
                        label="Zipcode*"
                        autoComplete="new-zipcode"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.zipcode}
                        error={!!formik.touched.zipcode && !!formik.errors.zipcode}
                        helperText={formik.touched.zipcode && formik.errors.zipcode}
                        sx={{ gridColumn: "span 1" }}
                    />
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.country && !!formik.errors.country}
                    >
                        <InputLabel id="countryField">--Select Country*--</InputLabel>
                        <Select
                            autoComplete="new-country"
                            name="country"
                            variant="filled"
                            value={formik.values.country}
                            onChange={event => {
                                const getCountryId = event.target.value;
                                setCountryId(getCountryId);
                                formik.setFieldValue("country", event.target.value);
                            }}
                        >
                            {countries.map(item => (
                                <MenuItem value={item.id} name={item.name} key={item.name}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{formik.touched.country && formik.errors.country}</FormHelperText>
                    </FormControl>
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.state && !!formik.errors.state}
                    >
                        <InputLabel id="stateField">--Select State*--</InputLabel>
                        <Select
                            autoComplete="new-state"
                            defaultValue={null}
                            name="state"
                            variant="filled"
                            value={formik.values.state}
                            onChange={event => {
                                const getStateId = event.target.value;
                                setStateId(getStateId);
                                formik.setFieldValue("state", event.target.value);
                            }}
                        >
                            {states.map(item => (
                                <MenuItem value={item.id} name={item.name} key={item.name}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{formik.touched.state && formik.errors.state}</FormHelperText>
                    </FormControl>
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.city && !!formik.errors.city}
                    >
                        <InputLabel id="cityField">--Select City*--</InputLabel>
                        <Select
                            autoComplete="new-city"
                            defaultValue=""
                            name="city"
                            variant="filled"
                            value={formik.values.city}
                            onChange={event => {
                                const getCityId = event.target.value;
                                setCityId(getCityId);
                                formik.setFieldValue("city", event.target.value);
                            }}
                        >
                            {cities.map(item => (
                                <MenuItem value={item.id} key={item.name} name={item.name}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{formik.touched.city && formik.errors.city}</FormHelperText>
                    </FormControl>
                </Box>
            </form>
        </Box>
    );
};

export default AddressFormComponent;
