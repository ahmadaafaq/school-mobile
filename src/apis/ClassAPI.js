/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { api } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const ClassAPI = {
    /** Get classes from the database that meets the specified query parameters
     */
    getAll: async (conditionObj = false, page = 0, size = 5, search = false, authInfo, cancel = false) => {
        const queryParam = conditionObj ? `&${conditionObj.key}=${conditionObj.value}` : '';
        const searchParam = search ? `&search=${search}` : '';
        const { data: response } = await api.request({
            url: `/get-classes?page=${page}&size=${size}${queryParam}${searchParam}`,
            method: "GET",
            signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined
        });
        return response;
    },

    /** Create class in the database
     */
    createClass: async (classs, cancel = false) => {
        return await api.request({
            url: `/create-class`,
            method: "POST",
            data: classs,
            signal: cancel ? cancelApiObject[this.createClass.name].handleRequestCancellation().signal : undefined
        });
    },

    /** Update class in the database
     */
    updateClass: async (fields, cancel = false) => {
        return await api.request({
            url: `/update-class`,
            method: "PATCH",
            data: fields,
            signal: cancel ? cancelApiObject[this.updateClass.name].handleRequestCancellation().signal : undefined
        });
    },

    /** Get class and section list by joining 2 tables from the database
     */
    getClassSectionList: async (cancel = false) => {
        const { data: response } = await api.request({
            url: `/get-class-section-list`,
            method: "GET",
            signal: cancel ? cancelApiObject[this.getClassSectionList.name].handleRequestCancellation().signal : undefined
        });
        return response;
    }
};

// defining the cancel API object for ClassAPI
const cancelApiObject = defineCancelApiObject(ClassAPI);
