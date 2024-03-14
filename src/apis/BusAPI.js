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

export const BusAPI = {
    /** Get buses from the database that meets the specified query parameters
     */
    getAll: async (conditionObj = false, page = 0, size = 5, search = false, authInfo, cancel = false) => {
        const queryParam = conditionObj ? `&${conditionObj.key}=${conditionObj.value}` : '';
        const searchParam = search ? `&search=${search}` : '';
        const { data: response } = await api.request({
            url: `/get-buses?page=${page}&size=${size}${queryParam}${searchParam}`,
            headers: {
                "x-access-token": getAsyncStorage("auth")?.token
            },
            method: "GET",
            signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined
        });
        return response;
    },

    /** Create bus in the database
     */
    createBus: async (bus, cancel = false) => {
        return await api.request({
            url: `/create-bus`,
            headers: {
                "x-access-token": getAsyncStorage("auth").token
            },
            method: "POST",
            data: bus,
            signal: cancel ? cancelApiObject[this.createBus.name].handleRequestCancellation().signal : undefined
        });
    },

    /** Update bus in the database
     */
    updateBus: async (fields, cancel = false) => {
        return await api.request({
            url: `/update-bus`,
            headers: {
                "x-access-token": getAsyncStorage("auth").token
            },
            method: "PATCH",
            data: fields,
            signal: cancel ? cancelApiObject[this.updateBus.name].handleRequestCancellation().signal : undefined
        });
    }
}

// defining the cancel API object for BusAPI
const cancelApiObject = defineCancelApiObject(BusAPI);
