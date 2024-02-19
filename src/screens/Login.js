/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useState } from 'react';
import { Image, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { Dimensions } from "react-native";
import { useTheme } from 'react-native-paper';

import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

import { COLORS, SIZES, ALIGNMENT } from "../assets/constants";
import LoginBg from "../assets/images/login-bg2.png";

const WINDOW_WIDTH = Dimensions.get("window").width;

const LoginScreen = () => {
    const [isValid, setIsValid] = useState(null);       //to validate entered phone number
    const router = useRouter();
    const theme = useTheme();

    const validateAndContinue = () => {
        setIsValid(true);
        router.push('/(tabs)/(homeTabDrawer)/home');
    };


    const styles = {
        container: {
            flex: 1,
            padding: SIZES.large,
            backgroundColor: theme.colors.grayishWhite[500]
        },
        scrollViewContent: {
            flexGrow: 1,
            justifyContent: 'flex-start',
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
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="height">
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                <View style={{ height: 400 }}>
                    <Image source={LoginBg} style={{ height: '95%', width: '100%', objectFit: 'contain' }} />
                </View>
                {/* <Text style={{ color: theme.colors.spanishPink[500], fontSize: 25 }}> mode: {theme} </Text> */}
                <View style={styles.inputContainer}>
                    <FontAwesome5 name='school' color={COLORS.yaleBlue} size={22}
                        style={styles.icon}
                    />
                    <TextInput
                        style={{ flex: 1, color: COLORS.yaleBlue }}
                        placeholder="School Code"
                        placeholderTextColor={COLORS.white[700]}
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <FontAwesome5 name='user-circle' color={COLORS.yaleBlue} size={22}
                        style={styles.icon}
                    />
                    <TextInput
                        style={{ flex: 1, color: COLORS.yaleBlue }}
                        placeholder="Username*"
                        placeholderTextColor={COLORS.white[700]}
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <FontAwesome5 name='unlock' color={COLORS.yaleBlue} size={22}
                        style={styles.icon}
                    />
                    <TextInput
                        style={{ flex: 1, color: COLORS.yaleBlue }}
                        placeholder="Password*"
                        placeholderTextColor={COLORS.white[700]}
                        keyboardType="numeric"
                    />
                </View>

                <TouchableOpacity onPress={validateAndContinue} style={styles.submitButton}>
                    <Text style={styles.buttonText}> Continue </Text>
                </TouchableOpacity>

                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 4 }}>
                    <Text style={styles.signUpStyle}> By continuing, you agree to our </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: WINDOW_WIDTH - 40, paddingBottom: 4 }}>
                    <Text style={{ color: COLORS.white[700], fontSize: 11 }}> Terms of Service</Text>
                    <Text style={{ color: COLORS.white[700], fontSize: 11 }}>      Privacy Policy</Text>
                    <Text style={{ color: COLORS.white[700], fontSize: 11 }}>      Content Policy</Text>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    )
};

export default LoginScreen;
