/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { api } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";
// import { Utility } from "../components/utility";

// const { getLocalStorage } = Utility();

export const StateAPI = {
    /** Get states from the database based on city_id
     */
    getStates: async (parent_id, cancel = false) => {
        const { data: response } = await api.request({
            url: `/get-states/${parent_id}`,
            method: "GET",
            // headers: {
            //     "x-access-token": getLocalStorage("auth").token
            // },
            signal: cancel ? cancelApiObject[this.getStates.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    }
};

// defining the cancel API object for StateAPI
const cancelApiObject = defineCancelApiObject(StateAPI);
