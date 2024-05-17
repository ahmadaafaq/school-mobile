/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { ActionTypes } from "../constants/action-types";

const initialState = {
    classData: {
        class_id: '',
        class_name: '',
    },
    sectionData: {
        section_id: '',
        section_name: '',
    },
    subjectData: {
        id: '',
        name: ''
    },
    listData: [],
    loading: true
};

export const setTeacherHomeworksReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_HOMEWORK_CLASS_DATA:
            return {
                ...state,
                classData: action.payload
            };
        case ActionTypes.SET_HOMEWORK_SECTION_DATA:
            return {
                ...state,
                sectionData: action.payload
            };
        case ActionTypes.SET_HOMEWORK_SUBJECT_DATA:
            return {
                ...state,
                subjectData: action.payload
            };
        case ActionTypes.SET_TEACHER_HOMEWORK:
            return {
                ...state,
                listData: action.payload.listData,
                loading: action.payload.loading
            };
        default:
            return state;
    }
};
