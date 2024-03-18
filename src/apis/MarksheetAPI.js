/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { api } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";
import { Utility } from "../utility";

const { getAsyncStorage } = Utility();

export const MarksheetAPI = {
    /** Get marksheet from the database that meets the specified query parameters
     */
    getAll: async (conditionObj = false, page = 0, size = 5, search = false, authInfo, cancel = false) => {
        let queryParam = '';
        if (conditionObj) {
            Object.keys(conditionObj).map(key => {
                queryParam += `&${key}=${conditionObj[key]}`
            })
        }
        const searchParam = search ? `&search=${search}` : '';
        const { data: response } = await api.request({
            url: `/get-marksheet?page=${page}&size=${size}${queryParam}${searchParam}`,
            headers: {
                "x-access-token": getAsyncStorage("auth")?.token
            },
            method: "GET",
            signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    },

    /** Create marksheet in the database
     */
    createMarksheet: async (marksheet, cancel = false) => {
        return await api.request({
            url: `/create-marksheet`,
            headers: {
                "x-access-token": getAsyncStorage("auth").token
            },
            method: "POST",
            data: marksheet,
            signal: cancel ? cancelApiObject[this.createMarksheet.name].handleRequestCancellation().signal : undefined,
        });
    },

    /** Update marksheet in the database
     */
    updateMarksheet: async (fields, cancel = false) => {
        return await api.request({
            url: `/update-marksheet`,
            headers: {
                "x-access-token": getAsyncStorage("auth").token
            },
            method: "PATCH",
            data: fields,
            signal: cancel ? cancelApiObject[this.updateMarksheet.name].handleRequestCancellation().signal : undefined,
        });
    }
};

// defining the cancel API object for marksheetAPI
const cancelApiObject = defineCancelApiObject(MarksheetAPI);
