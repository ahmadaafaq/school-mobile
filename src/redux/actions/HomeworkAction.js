/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { ActionTypes } from "../constants/action-types";

export const setTeacherHomeworks = (teacherHw) => {
    return {
        type: ActionTypes.SET_TEACHER_HOMEWORK,
        payload: teacherHw
    };
};

export const setHomeworkClassData = (dataObj) => {
    return {
        type: ActionTypes.SET_HOMEWORK_CLASS_DATA,
        payload: dataObj
    };
};

export const setHomeworkSectionData = (dataObj) => {
    return {
        type: ActionTypes.SET_HOMEWORK_SECTION_DATA,
        payload: dataObj
    };
};

export const setHomeworkSubjectData = (dataObj) => {
    return {
        type: ActionTypes.SET_HOMEWORK_SUBJECT_DATA,
        payload: dataObj
    };
};
