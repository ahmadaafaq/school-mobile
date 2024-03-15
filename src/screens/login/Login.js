/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, Image, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

import API from "../../apis";
import Toast from "../common/Toast";

import { setMenuItem } from "../../redux/actions/MenuItemAction";
import { SIZES, ALIGNMENT } from "../../assets/constants";
import { Utility } from '../../utility';

import LoginBg from "../../assets/images/login-bg2.png";

const WINDOW_WIDTH = Dimensions.get("window").width;
const initialFormData = {
    school_code: "",
    email: "",
    password: ""
};

const LoginScreen = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const toastInfo = useSelector(state => state.toastInfo);

    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const router = useRouter();
    const theme = useTheme();
    const { getAsyncStorage, remAsyncStorage, setAsyncStorage, toastAndNavigate } = Utility();

    const handleFormDataChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        if (!formData.school_code) {
            toastAndNavigate(dispatch, true, 'School Code must be specified', theme.colors.yaleBlue[500], theme.colors.lightBlue[600]);
        }
        if (formData.school_code && (formData.email && formData.password)) {
            setLoading(true);
            console.log('ander aaya login m')
            API.UserAPI.login(formData)
                .then(async response => {
                    console.log(response, 'api resoonse login')
                    setLoading(false);
                    if (response.status === 'Success' &&
                        (response.data === "User does not exist" || response.data === "Username and Password do not match")) {
                        toastAndNavigate(dispatch, true, response.data, theme.colors.yaleBlue[500], theme.colors.lightBlue[600]);
                    } else if (response.status === 'Success' &&
                        (response.data === "School Code must be specified" || response.data === "School code is incorrect")) {
                        toastAndNavigate(dispatch, true, response.data, theme.colors.yaleBlue[500], theme.colors.lightBlue[600]);
                        inputRef.current.focus();
                    }
                    else {
                        const authInfo = {
                            id: response.data.id,
                            token: response.data.token,
                            role: response.data.role,
                            designation: response.data.designation,
                            username: response.data.username,
                            school: response.data.school_name
                        };
                        const navigatedPath = await getAsyncStorage("navigatedPath");
                        console.log(authInfo, 'authinfo')
                        setAsyncStorage("auth", authInfo);
                        response.data?.school_info ? setAsyncStorage("schoolInfo", response.data.school_info) : null;
                        if (navigatedPath) {
                            const splittedPath = navigatedPath.split('/');
                            setAsyncStorage("menu", { selected: splittedPath[splittedPath.length - 2] });
                            dispatch(setMenuItem(splittedPath[splittedPath.length - 2]));
                            router.push(`/${navigatedPath}`);
                            remAsyncStorage("navigatedPath");       //removing path after navigating user
                        } else {
                            router.push('/(tabs)/(homeTabDrawer)/home');
                        }
                    }
                })
                .catch(err => {
                    setLoading(false);
                    setFormData({
                        ...formData,
                        password: ''
                    });
                    toastAndNavigate(dispatch, true, err.message, theme.colors.red[500], theme.colors.lightBlue[600]);
                    console.log(err, 'Error Occurred In User Api');
                });
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: SIZES.large,
            backgroundColor: theme.colors.grayishWhite[500]
        },
        scrollViewContent: {
            flexGrow: 1,
            justifyContent: 'flex-start'
        },
        submitButton: {
            backgroundColor: theme.colors.yaleBlue[500],
            margin: SIZES.xSmall,
            marginLeft: SIZES.smallMedium,
            marginRight: SIZES.smallMedium,
            padding: SIZES.xSmall,
            borderRadius: SIZES.xSmall
        },
        buttonText: {
            color: theme.colors.whiteSmoke[400],
            fontSize: SIZES.mediumLarge,
            textAlign: ALIGNMENT.centered
        },
        inputContainer: {
            flexDirection: ALIGNMENT.rowDirection,
            alignItems: ALIGNMENT.centered,
            height: SIZES.xxxLarge,
            borderWidth: 1,
            borderRadius: SIZES.xSmall,
            borderColor: theme.colors.yaleBlue[500],
            margin: SIZES.smallMedium,
            marginTop: SIZES.xSmall,
            paddingHorizontal: SIZES.xSmall
        },
        icon: {
            height: SIZES.xmLarge,
            width: 27,
            marginRight: SIZES.xSmall
        },
        signUpStyle: {
            fontSize: 12,
            color: theme.colors.blackish[500]
        }
    });

    return (
        <KeyboardAvoidingView style={styles.container} behavior="height">
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                <View style={{ height: 400 }}>
                    <Image source={LoginBg} style={{ height: '95%', width: '100%', objectFit: 'contain' }} />
                    <Toast
                        alerting={toastInfo.alerting}
                        message={toastInfo.message}
                        actionText={toastInfo.actionText}
                        actionTextColor={toastInfo.actionTextColor}
                        backgroundColor={toastInfo.backgroundColor}
                        textColor={toastInfo.textColor}
                    />
                </View>
                {/* <Text style={{ color: theme.colors.spanishPink[500], fontSize: 25 }}> mode: {theme} </Text> */}
                <View style={styles.inputContainer}>
                    <FontAwesome5 name='school' color={theme.colors.yaleBlue[500]} size={22}
                        style={styles.icon}
                    />
                    <TextInput
                        style={{ flex: 1, color: theme.colors.yaleBlue[500] }}
                        placeholder="School Code*"
                        placeholderTextColor={theme.colors.white[700]}
                        ref={inputRef}
                        value={formData.school_code}
                        onChangeText={(value) => handleFormDataChange("school_code", value)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome5 name='user-circle' color={theme.colors.yaleBlue[500]} size={22}
                        style={styles.icon}
                    />
                    <TextInput
                        style={{ flex: 1, color: theme.colors.yaleBlue[500] }}
                        placeholder="Username*"
                        placeholderTextColor={theme.colors.white[700]}
                        keyboardType="email-address"
                        value={formData.email}
                        onChangeText={(value) => handleFormDataChange("email", value)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome5 name='unlock' color={theme.colors.yaleBlue[500]} size={22}
                        style={styles.icon}
                    />
                    <TextInput
                        style={{ flex: 1, color: theme.colors.yaleBlue[500] }}
                        placeholder="Password*"
                        placeholderTextColor={theme.colors.white[700]}
                        value={formData.password}
                        secureTextEntry={!showPassword}      // To type hidden password
                        onChangeText={(value) => handleFormDataChange("password", value)}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={{ paddingRight: 4 }}
                    >
                        <FontAwesome5
                            name={showPassword ? 'eye-slash' : 'eye'}
                            color={theme.colors.yaleBlue[500]}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator animating={true} color={theme.colors.whiteSnow[500]} />
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>

                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 4 }}>
                    <Text style={styles.signUpStyle}> By continuing, you agree to our </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: WINDOW_WIDTH - 40, paddingBottom: 4 }}>
                    <Text style={{ color: theme.colors.white[700], fontSize: 11 }}> Terms of Service</Text>
                    <Text style={{ color: theme.colors.white[700], fontSize: 11 }}>      Privacy Policy</Text>
                    <Text style={{ color: theme.colors.white[700], fontSize: 11 }}>      Content Policy</Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
