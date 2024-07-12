/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, Image, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, KeyboardAvoidingView, useColorScheme } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

import API from "../../apis";
import Toast from "../common/Toast";

import { FONT, SIZES, ALIGNMENT } from "../../assets/constants";
import { Utility } from '../../utility';

import LoginBg from "../../assets/images/login-bg2.png";

const WINDOW_WIDTH = Dimensions.get("window").width;
const initialFormData = {
    school_code: "",
    contact_no: "",
    password: ""
};
const validations = [
    { field: 'school_code', message: 'School Code must be specified' },
    { field: 'password', message: 'Password is required' },
    { field: 'contact_no', message: 'Contact Number is required' },
];

const LoginScreen = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const toastInfo = useSelector(state => state.toastInfo);

    const colorScheme = useColorScheme();
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const router = useRouter();
    const theme = useTheme();
    const { getAsyncStorage, setAsyncStorage, toastAndNavigate } = Utility();

    const handleFormDataChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        const getAuthInfo = async () => {
            try {
                const authInfo = await getAsyncStorage("auth");
                if (authInfo?.token) {
                    router.push({
                        pathname: '/(tabs)/(homeTabDrawer)/home', params: authInfo
                    });
                }
            } catch (error) {
                console.error("Error getting auth info from storage:", error);
            }
        }
        getAuthInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = () => {
        validations.forEach(({ field, message }) => {
            if (!formData[field]) {
                toastAndNavigate(dispatch, true, message, theme.colors.grayishGreen[400], theme.colors.white[100]);
            }
        });
        if (formData.school_code && (formData.contact_no && formData.password)) {
            setLoading(true);
            API.UserAPI.login(formData)
                .then(async response => {
                    console.log(response, 'api response login')
                    setLoading(false);
                    if (response.status === 'Success' &&
                        (response.data === "User does not exist" || response.data === "Username and Password do not match")) {
                        toastAndNavigate(dispatch, true, response.data, theme.colors.grayishGreen[400], theme.colors.white[100]);
                    } else if (response.status === 'Success' &&
                        (response.data === "School Code must be specified" || response.data === "School code is incorrect")) {
                        toastAndNavigate(dispatch, true, response.data, theme.colors.grayishGreen[400], theme.colors.white[100]);
                        inputRef.current.focus();
                    }
                    else {
                        const authInfo = {
                            id: response.data.id,
                            token: response.data.token,
                            role: response.data.role,
                            designation: response.data.designation,
                            username: response.data.username,
                            school: response.data.school_name,
                            school_id: response.data.school_id
                        };
                        setAsyncStorage("auth", authInfo);
                        response.data?.school_info ? setAsyncStorage("schoolInfo", response.data.school_info) : null;
                        // Navigate to the home screen
                        router.push({
                            pathname: '/(tabs)/(homeTabDrawer)/home', params: authInfo
                        });
                    }
                })
                .catch(err => {
                    setLoading(false);
                    setFormData({
                        ...formData,
                        password: ''
                    });
                    toastAndNavigate(dispatch, true, 'Error Occurred While Connecting To Server', theme.colors.red[400],
                        colorScheme === 'light' ? theme.colors.white[600] : theme.colors.black[600]);
                    console.log(err.message, 'Error Occurred In User Api');
                });
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: SIZES.large,
            backgroundColor: colorScheme === 'light' ? theme.colors.white[600] :
                theme.colors.black[600]
        },
        scrollViewContent: {
            flexGrow: 1,
            justifyContent: 'flex-start'
        },
        submitButton: {
            backgroundColor: theme.colors.blue[400],
            margin: SIZES.xSmall,
            marginLeft: SIZES.smallMedium,
            marginRight: SIZES.smallMedium,
            padding: SIZES.xSmall,
            borderRadius: SIZES.xSmall
        },
        buttonText: {
            color: theme.colors.whiteSmoke[600],
            fontSize: SIZES.large,
            fontFamily: FONT.bold,
            fontWeight: FONT.boldStyle,
            textAlign: ALIGNMENT.centered
        },
        inputContainer: {
            flexDirection: ALIGNMENT.rowDirection,
            alignItems: ALIGNMENT.centered,
            height: SIZES.xxxLarge,
            borderWidth: 2,
            borderRadius: SIZES.xSmall,
            borderColor: theme.colors.blue[400],
            margin: SIZES.smallMedium,
            marginTop: SIZES.xSmall,
            paddingHorizontal: SIZES.xSmall,
        },
        icon: {
            height: SIZES.xmLarge,
            width: 27,
            marginRight: SIZES.xSmall
        },
        signUpStyle: {
            fontSize: 13,
            color: theme.colors.white[200]
        },
        termsStyle: {
            fontSize: 12,
            color: theme.colors.white[200]
        }
    });

    return (
        <KeyboardAvoidingView style={styles.container} behavior="height">
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                <View style={{
                    flex: 1, height: 300, justifyContent: 'center', alignItems: 'center',
                }}>
                    <Toast
                        alerting={toastInfo.alerting}
                        message={toastInfo.message}
                        backgroundColor={toastInfo.backgroundColor}
                        textColor={toastInfo.textColor || theme.colors.white[200]}
                    />
                    <Image source={LoginBg} style={{
                        height: '65%', width: '100%', objectFit: 'contain',
                    }} />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome5 name='school' color={theme.colors.blue[400]} size={22}
                        style={styles.icon}
                    />
                    <TextInput
                        style={{ flex: 1, color: theme.colors.white[100] }}
                        placeholder="School Code*"
                        placeholderTextColor={theme.colors.white[200]}
                        ref={inputRef}
                        value={formData.school_code}
                        onChangeText={(value) => handleFormDataChange("school_code", value)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome5 name='user-circle' color={theme.colors.blue[400]} size={22}
                        style={styles.icon}
                    />
                    <TextInput
                        style={{ flex: 1, color: theme.colors.white[100] }}
                        placeholder="Contact*"
                        placeholderTextColor={theme.colors.white[200]}
                        keyboardType="numeric"
                        value={formData.contact_no}
                        onChangeText={(value) => handleFormDataChange("contact_no", value)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome5 name='unlock' color={theme.colors.blue[400]} size={22}
                        style={styles.icon}
                    />
                    <TextInput
                        style={{ flex: 1, color: theme.colors.white[100] }}
                        placeholder="Password*"
                        placeholderTextColor={theme.colors.white[200]}
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
                            color={theme.colors.blue[300]}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator animating={true} color={theme.colors.whiteSnow[400]} />
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>

                <View style={{
                    flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 4
                }}>
                    <Text style={styles.signUpStyle}> By continuing, you agree to our </Text>
                </View>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', width: WINDOW_WIDTH - 40, paddingBottom: 4
                }}>
                    <Text style={styles.termsStyle}> Terms of Service</Text>
                    <Text style={styles.termsStyle}>      Privacy Policy</Text>
                    <Text style={styles.termsStyle}>      Content Policy</Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
