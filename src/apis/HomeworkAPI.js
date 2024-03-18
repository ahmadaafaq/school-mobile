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
getAsyncStorage('auth')
    .then(data => {
        console.log('Retrieved auth data:', data);
    })
    .catch(error => {
        console.log('Error retrieving data:', error);
    });

export const HomeworkAPI = {
    /** Get homeworks from the database that meets the specified query parameters
     */
    getAll: async (conditionObj = false, page = 0, size = 5, search = false, authInfo, cancel = false) => {
        // Send the data that is used in where condition
        let queryParam = '';
        if (conditionObj) {
            Object.keys(conditionObj).map(key => {
                queryParam += `&${key}=${conditionObj[key]}`
            })
        }
        // Send the data that is used in listing page search
        const searchParam = search ? `&search=${search}` : '';

        const { data: response } = await api.request({
            url: `/get-homeworks?page=${page}&size=${size}${queryParam}${searchParam}`,
            method: "GET",
            signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined
        });
        return response;
    },

    /** Create homework in the database
     */
    createHomework: async (homework, cancel = false) => {
        return await api.request({
            url: `/create-homework`,
            method: "POST",
            data: homework,
            signal: cancel ? cancelApiObject[this.createHomework.name].handleRequestCancellation().signal : undefined
        });
    },

    /** Update homework in the database
     */
    updateHomework: async (fields, cancel = false) => {
        return await api.request({
            url: `/update-homework`,
            method: "PATCH",
            data: fields,
            signal: cancel ? cancelApiObject[this.updateHomework.name].handleRequestCancellation().signal : undefined
        });
    }
};

// defining the cancel API object for HomeworkAPI
const cancelApiObject = defineCancelApiObject(HomeworkAPI);
