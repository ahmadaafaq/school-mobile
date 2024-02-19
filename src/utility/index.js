/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

import API from "../apis";
// import { displayToast } from "../../redux/actions/ToastAction";

export const Utility = () => {
    /** Get initials of logged in user
     */
    const getInitials = () => {
        let firstNameInitial = '';
        let lastNameInitial = '';
        const authInfo = getAsyncStorage("auth");

        let fullName = authInfo?.username?.split(" ");
        if (fullName?.length) {
            firstNameInitial = fullName[0][0].toUpperCase();
            if (fullName[1]?.[0] !== undefined) {
                lastNameInitial = fullName[1][0].toUpperCase();
            };
        };
        return `${firstNameInitial} ${lastNameInitial}`;
    };

    /** Get the formatted name and role of the logged in user
     */
    const getNameAndType = (roleName) => {
        const authInfo = getAsyncStorage("auth");
        const fullName = (authInfo?.username || '').split(" ");
        const firstName = fullName[0]?.charAt(0).toUpperCase() + fullName[0]?.slice(1) || '';
        const lastName = fullName[1]?.charAt(0).toUpperCase() + fullName[1]?.slice(1) || '';
        const formattedRole = (roleName || '').charAt(0).toUpperCase() + (roleName || '').slice(1);

        return {
            username: `${firstName} ${lastName}`.trim(),
            role: formattedRole,
        };
    };

    /** Generates unique School Code by taking the initial letters of each word in the school name (excluding the word "school") and
     *  appending a random three-digit number
     */
    const createSchoolCode = (name) => {
        let school = name.toLowerCase().split(" ");
        let code = '';

        for (let name of school) {
            if (name !== 'school')
                code += name.charAt(0).toUpperCase();
        }
        return `${code}S${Math.floor(Math.random() * 1000)}`;
    };

    /** Set AsyncStorage with specified key value pair
     */
    const setAsyncStorage = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.error(`Error setting ${key} in AsyncStorage:`, err);
        }
    };

    /** Get the specified key from app's AsyncStorage if it is present
     */
    const getAsyncStorage = async (key) => {
        const storedValue = await AsyncStorage.getItem(key);
        if (typeof storedValue !== 'undefined' && storedValue !== null && storedValue !== 'undefined') {
            return JSON.parse(storedValue);
        }
        // handling the absence of the key in AsyncStorage
        return null;
    };

    /** Remove the specified key value pair from AsyncStorage
     */
    const remAsyncStorage = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (err) {
            console.error(`Error removing ${key} from AsyncStorage:`, err);
        }
    };

    /** Verifying the token authenticity by making API call
     */
    const verifyToken = async () => {
        return API.CommonAPI.verifyToken()
            .then(verified => {
                if (verified) {
                    return verified.data === "Verified";
                }
            })
            .catch(err => {
                return err;
            });
    };

    /** Display toast message and navigate to the path if provided 
     */
    const toastAndNavigate = (dispatch, display, severity, msg, navigateTo, path = null) => {
        dispatch(displayToast({ toastAlert: display, toastSeverity: severity, toastMessage: msg }));

        setTimeout(() => {
            dispatch(displayToast({ toastAlert: !display, toastSeverity: "", toastMessage: "" }));
            if (path) {
                navigateTo(path);
            }
        }, 2000);
    };

    /** Get user role from AsyncStorage 
    */
    const getRole = () => {
        const authData = getAsyncStorage("auth");
        if (authData && authData.role !== undefined) {
            return authData.role;
        }
        return null;
    };

    /** Converts a given number to its Roman numeral representation
     */
    const convertToRoman = (num) => {
        const romanNumerals = ["Ist", "IInd", "IIIrd", "IVth", "Vth", "VIth", "VIIth", "VIIIth", "IXth", "Xth", "XIth", "XIIth"];
        return isNaN(num) ? num : romanNumerals[num - 1];
    };

    /** Adds the "class" keyword to a valid number
     */
    const addClassKeyword = (num) => {
        return isNaN(num) ? num : `Class ${num}`;
    };

    /** Finds and returns the name of a class based on its ID from an array of class objects
     */
    const findClassById = (classId, classData) => {
        let found = '';
        if (classData) {
            found = classData.find(cls => cls.id === classId);
        }
        return found ? found.name : null;
    };

    /** Finds and returns the name of a section based on its ID from an array of section objects
     */
    const findSectionById = (sectionId, sectionData) => {
        let found = '';
        if (sectionData) {
            found = sectionData.find(sect => sect.id === sectionId);
        }
        return found ? found.name : null;
    };

    /** Finds and returns the name of a subject based on its ID from an array of subject objects
     */
    const findSubjectById = (subjectId, subjectData) => {
        let found = '';
        if (subjectData) {
            found = subjectData.find(sub => sub.id === subjectId);
        }
        return found ? found.name : null;
    };

    /** Appends the appropriate suffix ('th', 'rd', 'nd', 'st') to a given number
     */
    const appendSuffix = (num) => {
        if (isNaN(num)) {
            return num.toLowerCase() === "lower kindergarten" ? "LKG" :
                num.toLowerCase() === "upper kindergarten" ? "UKG" : num;
        }

        const specialCase = num >= 10 && num <= 20;
        // Determine the appropriate suffix based on the last digit of the number
        const lastDigit = num % 10;

        switch (true) {
            case specialCase:
                return `${num}th`;
            case lastDigit === 1:
                return `${num}st`;
            case lastDigit === 2:
                return `${num}nd`;
            case lastDigit === 3:
                return `${num}rd`;
            default:
                return `${num}th`;
        }
    };

    /** Fetches role and priority by the id of the user logged in
     */
    const getRoleAndPriorityById = async () => {
        return API.UserRoleAPI.getRoleById({ id: getRole() })
            .then(res => {
                if (res.status === 'Success') {
                    console.log(res.data, 'api');
                    return res.data;
                } else if (res.status === 'Error') {
                    console.log('error')
                }
            })
            .catch(err => {
                console.error('Error fetching user role and priority:', err);
            })
    };

    return {
        addClassKeyword,
        appendSuffix,
        convertToRoman,
        createSchoolCode,
        findClassById,
        findSectionById,
        findSubjectById,
        getInitials,
        getNameAndType,
        getAsyncStorage,
        getRole,
        getRoleAndPriorityById,
        remAsyncStorage,
        setAsyncStorage,
        toastAndNavigate,
        verifyToken
    };
};
