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
