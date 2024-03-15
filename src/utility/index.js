/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

import API from "../apis";
import { displayToast } from "../redux/actions/ToastAction";

export const Utility = () => {
    /** Adds the keyword "Class" to a number, creating a formatted class representation.
     * @param {number} num - The number to be formatted.
     * @returns {string|number} - The formatted class representation with the keyword "Class" or the original number if not a valid number.
     */
    const addClassKeyword = (num) => {
        return isNaN(num) ? num : `Class ${num}`;
    };

    /** Appends a suffix to a number or converts specific string values to abbreviations.
     * @param {string|number} num - The number or string value to which the suffix or abbreviation will be appended.
     * @returns {string} - The original input with an appended suffix or abbreviation.
     */
    const appendSuffix = (num) => {
        if (isNaN(num)) {
            return num.toLowerCase() === "lower kindergarten" ? "LKG" :
                num.toLowerCase() === "upper kindergarten" ? "UKG" : num;
        }
        const specialCase = num >= 10 && num <= 20;
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

    /** Creates a school code based on the provided name.
     * @param {string} name - The name used to generate the school code.
     * @returns {string} - The generated school code.
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

    /** Creates an array of academic sessions based on the current year.
     * @returns {Array} - An array containing three academic session strings.
     *                    [previousSession, currentSession, nextSession]
     */
    const createSession = () => {
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;
        const previousYear = currentYear - 1;

        return [`${previousYear - 1}-${previousYear}`, `${previousYear}-${currentYear}`, `${currentYear}-${nextYear}`]
    };

    /** Custom sorting function for sorting objects based on the class_name property, prioritizes non-numeric classnames.
    * @param {Object} a - The first object to compare.
    * @param {Object} b - The second object to compare.
    * @returns {number} - A negative value if a should be sorted before b, a positive value if b should be sorted before a, or 0 if they are equal.
    */
    const customSort = (a, b) => {
        // Check if both class names are non-numeric
        const isANonNumeric = isNaN(a.class_name);
        const isBNonNumeric = isNaN(b.class_name);

        // Sort non-numeric classes to the top
        if (isANonNumeric && !isBNonNumeric) {
            return -1;
        } else if (!isANonNumeric && isBNonNumeric) {
            return 1;
        }

        // If both are numeric or both are non-numeric, use localeCompare
        return a.class_name.localeCompare(b.class_name);
    };

    /** Creates a unique data array based on specified keys from the dataArray.
     * @param {Array} dataArray - The array of objects.
     * @param {string} key1 - The first key to consider for uniqueness.
     * @param {string} key2 - The second key to consider for uniqueness.
     * @returns {Array} - An array of unique objects based on the specified keys.
     */
    const createUniqueDataArray = (dataArray, key1, key2, key3 = null) => {
        const uniqueDataArray = new Set();

        dataArray.forEach(obj => {
            let combinedKeys = `${obj[key1]}-${obj[key2]}`;
            uniqueDataArray.add(key3 ? `${combinedKeys}-${obj[key3]}` : combinedKeys);
        });
        // Convert the Set back to an array of unique objects
        return Array.from(uniqueDataArray).map(compoundKey => {
            const [id, name, sub] = compoundKey.split('-');
            let obj = {
                [key1]: parseInt(id),
                [key2]: name
            };
            return key3 ? { ...obj, [key3]: sub } : obj;
        });
    };

    /** Fetches data from the specified API, dispatches the data to a Redux action and updates the state
     * @param {function} dispatch - The dispatch function from the Redux store.
     * @param {function} action - The Redux action to be dispatched with the fetched data.
     * @param {object} api - An object containing methods for interacting with the API.
     */
    const fetchAndSetAll = (dispatch, action, api) => {
        api.getAll(false, 0, 50)
            .then(res => {
                if (res?.status === 'Success') {
                    dispatch(action(res.data.rows));
                } else {
                    console.log("An Error Occurred, Please Try Again");
                }
            })
            .catch(err => {
                console.log('fetchandsetall function error:', err);
            });
    };

    /**Fetches school data (classes and optionally sections) from API and dispatches actions to update the Redux store.
     * @param {function} dispatch - The Redux dispatch function.
     * @param {function} setClassesAction - The Redux action to set classes in the store.
     * @param {function} [setSectionsAction] - The optional Redux action to set sections in the store.
     * @param {function} [setClassData] - The optional local state to set the data fetched from API call.
     */
    const fetchAndSetSchoolData = (dispatch, setClassesAction = false, setSectionsAction = false, setClassData = false) => {
        API.SchoolAPI.getSchoolClasses()
            .then(classData => {
                if (classData.status === 'Success') {
                    if (setClassesAction) {
                        const uniqueClassDataArray = createUniqueDataArray(classData.data, 'class_id', 'class_name');
                        dispatch(setClassesAction(uniqueClassDataArray));
                    }
                    if (setSectionsAction) {        //why is this required, needs to be tested
                        const uniqueSectionsDataArray = createUniqueDataArray(classData.data, 'section_id', 'section_name');
                        console.log(uniqueSectionsDataArray, 'unique')
                        dispatch(setSectionsAction(uniqueSectionsDataArray));
                    }
                    if (setClassData) {    //setting all classData in local state then filtering subjects according to class sections
                        setClassData(classData.data);
                    }
                } else {
                    console.log("Error Fetching School Data, Please Try Again");
                }
            })
            .catch(err => {
                console.log("Error Fetching School Class Section Info:", err);
            });
    };

    /** Finds an object in a collection by its ID.
     * @param {number} id - The ID to search for.
     * @param {Array} model - The collection (array of objects) to search within.
     * @returns {Object|string} - The found object with the specified ID, or an empty string if not found.
     */
    const findById = (id, model) => {
        if (!model || !id) {
            return [];
        }
        return model.find((obj => obj.id === id || obj.class_id === id || obj.section_id === id));
    };

    /** Finds multiple objects in a collection by their IDs.
     * @param {Array} ids - The array of IDs to search for.
     * @param {Array} model - The collection (array of objects) to search within.
     * @returns {Array} - An array containing the found objects with the specified IDs.
     */
    const findMultipleById = (ids, model) => {
        if (!ids || !model) {
            return [];
        }
        return model.filter(obj => ids.split(',').indexOf(obj.id.toString()) > -1);
    };

    /** Formats an image name by appending a random number and removing special characters.
     * @param {string} name - The original image name.
     * @returns {string} - The formatted image name.
     */
    const formatImageName = (name) => {
        const formattedName = Math.ceil(Math.random() * 100000000) + name
            .toLowerCase()
            .trim()
            .replace(/[!@#$%^&*();:'"`~`'$]/g, "")
            .replace(/\s+/g, "_");
        return formattedName;
    };

    /** Gets user initials from the first and last name stored in auth information.
     * @returns {string} - User initials.
     */
    const getInitials = async () => {
        const authInfo = await getAsyncStorage("auth");
        if (authInfo?.username) {
            const [firstName, lastName] = authInfo.username.split(" ");
            const firstNameInitial = firstName?.[0]?.toUpperCase() || '';
            const lastNameInitial = lastName?.[0]?.toUpperCase() || '';

            return `${firstNameInitial} ${lastNameInitial}`;
        }
        return;
    };

    /** Gets formatted username and role based on the provided role name.
     * @param {string} roleName - The role name to be formatted.
     * @returns {Object} - An object containing formatted username and role.
     */
    const getNameAndType = async (roleName) => {
        const authInfo = await getAsyncStorage("auth");
        const fullName = (authInfo?.username || '').split(" ");
        const firstName = fullName[0]?.charAt(0).toUpperCase() + fullName[0]?.slice(1) || '';
        const lastName = fullName[1]?.charAt(0).toUpperCase() + fullName[1]?.slice(1) || '';
        const formattedRole = (roleName || '').charAt(0).toUpperCase() + (roleName || '').slice(1);

        return {
            username: `${firstName} ${lastName}`.trim(),
            role: formattedRole,
        };
    };

    /** Extracts and concatenates IDs from array of objects.
     * @param {Array} array - The array of objects from which to extract IDs.
     * @returns {string} - A comma-separated string of IDs.
     */
    const getIdsFromObject = (array) => {
        let arrayId = [];
        if (Array.isArray(array)) {
            array.forEach(arr => {
                arrayId.push(arr.id);
            });
        }
        return arrayId.toString();
    };

    /** Retrieves user role and priority information by making an asynchronous API call.
     * @returns {Promise<Object|null>} - A promise that resolves to an object containing user role and priority information,
     *                                   or null if there is an error during the API call.
     */
    const getRoleAndPriorityById = async () => {
        return API.UserRoleAPI.getRoleById({ id: getRole() })
            .then(res => {
                if (res.status === 'Success') {
                    return res.data;
                } else if (res.status === 'Error') {
                    console.log('Error Getting User Role And Priority')
                }
            })
            .catch(err => {
                console.error('Error fetching user role and priority:', err);
            })
    };

    /** Gets the value associated with a key from local storage.
     * @param {string} key - The key for which to retrieve the value from local storage.
     * @returns {any|null} - The value associated with the key, or null if the key is not found.
     */
    const getAsyncStorage = (key) => {
        return AsyncStorage.getItem(key)
            .then(storedValue => {
                if (typeof storedValue !== 'undefined' && storedValue !== null && storedValue !== 'undefined') {
                    return JSON.parse(storedValue);
                }
                return null;
            })
            .catch(error => {
                console.log('Error retrieving data from AsyncStorage:', error);
                return null;
            });
    };

    /** Retrieves the user's role from Async Storage.
     * @returns {string|null} - The user's role, or null if the role is not available in Async Storage.
     */
    const getRole = async () => {
        const authData = await getAsyncStorage("auth");
        if (authData && authData.role !== undefined) {
            return authData.role;
        }
        return null;
    };

    /** Checks if an object is empty (has no own enumerable properties).
    * @param {Object} obj - The object to be checked for emptiness.
    * @returns {boolean} - True if the object is empty, false otherwise.
    */
    const isObjEmpty = (obj) => {
        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
                return false;
            }
        }
        return true;
    };

    /** Removes a key-value pair from Async Storage.
     * @param {string} key - The key to be removed from Async Storage.
     * @returns {void} - This function does not return any value.
     */
    const remAsyncStorage = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            console.log(`${key} successfully removed in AsyncStorage`);
        } catch (err) {
            console.error(`Error removing ${key} from AsyncStorage:`, err);
        }
    };

    /** Sets a key-value pair in the Async Storage.
      * @param {string} key - The key to be set in Async Storage.
      * @param {any} value - The value associated with the key.
      * @returns {void} - This function does not return any value.
      */
    const setAsyncStorage = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
            console.log(`${key} successfully set in AsyncStorage`);
        } catch (err) {
            console.error(`Error setting ${key} in AsyncStorage:`, err);
        }
    };


    /** Displays a toast alert, sets its color and message, and navigates to a specified path (optional) after a delay.
     * @param {function} dispatch - The Redux dispatch function.
     * @param {boolean} display - Whether to display the toast alert.
     * @param {string} ccolor - The severity level of the toast alert (e.g., 'success', 'info', 'warning', 'error').
     * @param {string} msg - The message to be displayed in the toast alert.
     * @param {function} navigateTo - The navigation function to be called after the delay.
     * @param {string|null} path - The optional path to navigate to after hiding the toast alert.
     * @returns {void} - This function does not return any value.
     */
    const toastAndNavigate = (dispatch, display, msg, bgColor, fontColor, navigateTo, path = null) => {
        dispatch(displayToast({ alerting: display, message: msg, backgroundColor: bgColor, textColor: fontColor }));

        setTimeout(() => {
            dispatch(displayToast({ alerting: !display, message: '', backgroundColor: '', textColor: '' }));
            if (path) {
                navigateTo(path);
            }
        }, 2000);
    };

    /** Verifies a token using an asynchronous API call.
     * @returns {Promise<boolean|string>} - A promise that resolves to a boolean indicating whether the token is verified,
     *                                       or a string containing an error message if verification fails.
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

    return {
        addClassKeyword,
        appendSuffix,
        createSchoolCode,
        createSession,
        customSort,
        createUniqueDataArray,
        fetchAndSetAll,
        fetchAndSetSchoolData,
        findById,
        findMultipleById,
        formatImageName,
        getInitials,
        getNameAndType,
        getAsyncStorage,
        getRole,
        getRoleAndPriorityById,
        getIdsFromObject,
        isObjEmpty,
        remAsyncStorage,
        setAsyncStorage,
        toastAndNavigate,
        verifyToken
    };
};
