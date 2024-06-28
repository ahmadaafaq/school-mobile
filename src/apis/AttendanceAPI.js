/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { api } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const AttendanceAPI = {
  /** Get attendance from the database that meets the specified query parameters
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
    console.log('queryParam=>', queryParam);

    const { data: response } = await api.request({
      url: `/get-attendance?page=${page}&size=${size}${queryParam}${searchParam}`,
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined
    });
    return response;
  },

  /** Create Attendance in the database
   */
  createAttendance: async (attendance, cancel = false) => {
    console.log('inside attendance API', attendance)
    return await api.request({
      url: `/create-attendance`,
      method: "POST",
      data: attendance,
      signal: cancel ? cancelApiObject[this.createAttendance.name].handleRequestCancellation().signal : undefined,
    });
  }
};

// defining the cancel API object for AttendanceAPI
const cancelApiObject = defineCancelApiObject(AttendanceAPI);
