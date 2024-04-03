/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { ActionTypes } from "../constants/action-types";

const initialSchoolState = {
    listData: []
};

const initialState = {
    listData: []
};

export const setSchoolSubjectsReducer = (state = initialSchoolState, action) => {
    switch (action.type) {
        case ActionTypes.SET_SCHOOL_SUBJECTS:
            return {
                ...state,
                listData: action.payload
            };
        default:
            return state;
    }
};

export const setAllSubjectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_ALL_SUBJECTS:
            return {
                ...state,
                listData: action.payload
            };
        default:
            return state;
    }
};
