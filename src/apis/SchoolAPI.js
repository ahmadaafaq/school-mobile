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

export const SchoolAPI = {
  /** Get schools from the database that meets the specified query parameters
   */
  getAll: async (conditionObj = false, page = 0, size = 5, search = false, authInfo, cancel = false) => {
    const queryParam = conditionObj ? `&${conditionObj.key}=${conditionObj.value}` : '';
    const searchParam = search ? `&search=${search}` : '';
    const { data: response } = await api.request({
      url: `/get-schools?page=${page}&size=${size}${queryParam}${searchParam}`,
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined
    });
    return response;
  },

  /** Get school class and section detail from database
   */
  getSchoolClasses: async (school_id, cancel = false) => {
    const userRole = await getAsyncStorage("auth");
    const { data: response } = await api.request({
      url: `/get-school-classes`,
      method: "GET",
      params: userRole?.role === 1 ? { school_id: school_id } : null,    //this is included in backend req.query
      signal: cancel ? cancelApiObject[this.getSchoolClasses.name].handleRequestCancellation().signal : undefined
    });
    return response;
  },

  /** Get school details for idCard
   */
  getDetailsForICard: async (cancel = false) => {
    const { data: response } = await api.request({
      url: 'get-icard-details',
      method: "GET",
      signal: cancel ? cancelApiObject[this.getDetailsForICard.name].handleRequestCancellation().signal : undefined
    });
    return response;
  }
};

// defining the cancel API object for SchoolAPI
const cancelApiObject = defineCancelApiObject(SchoolAPI);
