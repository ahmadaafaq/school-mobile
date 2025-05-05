import { useEffect, useRef, useState } from 'react';
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
    contact_no: "",
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

    // Create default color values in case theme colors are missing
    const getThemeColor = (colorPath, defaultColor) => {
        try {
            const pathParts = colorPath.split('.');
            let current = theme.colors;
            
            for (const part of pathParts) {
                if (current && current[part]) {
                    current = current[part];
                } else {
                    return defaultColor;
                }
            }
            
            return current;
        } catch (error) {
            return defaultColor;
        }
    };

    const handleFormDataChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        const getAuthInfo = async () => {
            const authInfo = await getAsyncStorage("auth");
            if (authInfo?.token) {
                console.log('auth no no 1')
                router.push({ pathname: '/(tabs)/(homeTabDrawer)/home', params: authInfo });
            }
        }
        getAuthInfo();
    }, []);

    const handleSubmit = () => {
        if (!formData.school_code) {
            toastAndNavigate(
                dispatch, 
                true, 
                'School Code must be specified', 
                getThemeColor('yaleBlue.500', '#0A3161'), 
                getThemeColor('lightBlue.600', '#76B6E1')
            );
            return;
        }
        if (formData.school_code && (formData.contact_no && formData.password)) {
            setLoading(true);
            console.log('inside login m')
            API.UserAPI.login(formData)
                .then(async response => {
                    console.log(response, 'api response login')
                    setLoading(false);
                    if (response.status === 'Success' &&
                        (response.data === "User does not exist" || response.data === "Username and Password do not match")) {
                        toastAndNavigate(
                            dispatch, 
                            true, 
                            response.data, 
                            getThemeColor('yaleBlue.500', '#0A3161'), 
                            getThemeColor('lightBlue.600', '#76B6E1')
                        );
                    } else if (response.status === 'Success' &&
                        (response.data === "School Code must be specified" || response.data === "School code is incorrect")) {
                        toastAndNavigate(
                            dispatch, 
                            true, 
                            response.data, 
                            getThemeColor('yaleBlue.500', '#0A3161'), 
                            getThemeColor('lightBlue.600', '#76B6E1')
                        );
                        inputRef.current.focus();
                    }
                    else {
                        console.log('coming in else, means no error');
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
                        const navigatedPath = await getAsyncStorage("navigatedPath");
                        response.data?.school_info ? setAsyncStorage("schoolInfo", response.data.school_info) : null;
                        if (navigatedPath) {
                            const splittedPath = navigatedPath.split('/');
                            setAsyncStorage("menu", { selected: splittedPath[splittedPath.length - 2] });
                            dispatch(setMenuItem(splittedPath[splittedPath.length - 2]));
                            router.push(`/${navigatedPath}`);
                            remAsyncStorage("navigatedPath");       //removing path after navigating user
                        } else {
                            router.push({ pathname: '/(tabs)/(homeTabDrawer)/home', params: authInfo });
                        }
                    }
                })
                .catch(err => {
                    setLoading(false);
                    setFormData({
                        ...formData,
                        password: ''
                    });
                    toastAndNavigate(
                        dispatch, 
                        true, 
                        err.message, 
                        getThemeColor('red.500', '#FF0000'), 
                        getThemeColor('lightBlue.600', '#76B6E1')
                    );
                    console.log(err, 'Error Occurred In User Api');
                });
        }
    };

    // Define safe color values
    const yaleBlue = getThemeColor('yaleBlue.500', '#0A3161');
    const whiteSmoke = getThemeColor('whiteSmoke.400', '#F5F5F5');
    const grayishWhite = getThemeColor('grayishWhite.500', '#F8F8F8');
    const white700 = getThemeColor('white.700', '#CCCCCC');
    const whiteSnow = getThemeColor('whiteSnow.500', '#FFFAFA');
    const blackish = getThemeColor('blackish.500', '#333333');

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: SIZES.large,
            backgroundColor: grayishWhite
        },
        scrollViewContent: {
            flexGrow: 1,
            justifyContent: 'flex-start'
        },
        submitButton: {
            backgroundColor: yaleBlue,
            margin: SIZES.xSmall,
            marginLeft: SIZES.smallMedium,
            marginRight: SIZES.smallMedium,
            padding: SIZES.xSmall,
            borderRadius: SIZES.xSmall
        },
        buttonText: {
            color: whiteSmoke,
            fontSize: SIZES.mediumLarge,
            textAlign: ALIGNMENT.centered
        },
        inputContainer: {
            flexDirection: ALIGNMENT.rowDirection,
            alignItems: ALIGNMENT.centered,
            height: SIZES.xxxLarge,
            borderWidth: 1,
            borderRadius: SIZES.xSmall,
            borderColor: yaleBlue,
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
            color: blackish
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
                        textColor={toastInfo.textColor || yaleBlue}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome5 name='school' color={yaleBlue} size={22}
                        style={styles.icon}
                    />
                    <TextInput
                        style={{ flex: 1, color: yaleBlue }}
                        placeholder="School Code*"
                        placeholderTextColor={white700}
                        ref={inputRef}
                        value={formData.school_code}
                        onChangeText={(value) => handleFormDataChange("school_code", value)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome5 name='user-circle' color={yaleBlue} size={22}
                        style={styles.icon}
                    />
                    <TextInput
                        style={{ flex: 1, color: yaleBlue }}
                        placeholder="Contact*"
                        placeholderTextColor={white700}
                        keyboardType="numeric"
                        value={formData.contact_no}
                        onChangeText={(value) => handleFormDataChange("contact_no", value)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome5 name='unlock' color={yaleBlue} size={22}
                        style={styles.icon}
                    />
                    <TextInput
                        style={{ flex: 1, color: yaleBlue }}
                        placeholder="Password*"
                        placeholderTextColor={white700}
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
                            color={yaleBlue}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator animating={true} color={whiteSnow} />
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>

                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 4 }}>
                    <Text style={styles.signUpStyle}> By continuing, you agree to our </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: WINDOW_WIDTH - 40, paddingBottom: 4 }}>
                    <Text style={{ color: white700, fontSize: 11 }}> Terms of Service</Text>
                    <Text style={{ color: white700, fontSize: 11 }}>      Privacy Policy</Text>
                    <Text style={{ color: white700, fontSize: 11 }}>      Content Policy</Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;