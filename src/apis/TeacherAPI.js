/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { api } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";
// import { Utility } from "../components/utility";

// const { getLocalStorage } = Utility();

export const TeacherAPI = {
  /** Get teachers from the database that meets the specified query parameters
   */
  getAll: async (conditionObj = false, page = 0, size = 5, search = false, authInfo, cancel = false) => {
    const queryParam = conditionObj ? `&${conditionObj.key}=${conditionObj.value}` : '';
    const searchParam = search ? `&search=${search}` : '';
    const { data: response } = await api.request({
      url: `/get-teachers?page=${page}&size=${size}${queryParam}${searchParam}`,
      // headers: {
      //   "x-access-token": getLocalStorage("auth")?.token
      // },
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    });
    return response;
  },

  /** Create teacher in the database
   */
  createTeacher: async (teacher, cancel = false) => {
    return await api.request({
      url: `/create-teacher`,
      // headers: {
      //   "x-access-token": getLocalStorage("auth").token
      // },
      method: "POST",
      data: teacher,
      signal: cancel ? cancelApiObject[this.createTeacher.name].handleRequestCancellation().signal : undefined,
    });
  },

  /** Update teacher in the database
   */
  updateTeacher: async (fields, cancel = false) => {
    return await api.request({
      url: `/update-teacher`,
      // headers: {
      //   "x-access-token": getLocalStorage("auth").token
      // },
      method: "PATCH",
      data: fields,
      signal: cancel ? cancelApiObject[this.updateTeacher.name].handleRequestCancellation().signal : undefined,
    });
  },

  /** Insert data into teacher_class_subject mapping table in the database
   */
  insertIntoMappingTable: async (data, cancel = false) => {
    console.log('api data=>', data)
    return await api.request({
      url: `/create-teacher-class-mapping`,
      // headers: {
      //   "x-access-token": getLocalStorage("auth").token
      // },
      method: "POST",
      data: data,
      signal: cancel ? cancelApiObject[this.insertIntoMappingTable.name].handleRequestCancellation().signal : undefined,
    });
  },

  /** Get teacher class and section detail from database
   */
  getTeacherDetail: async (teacher_id, cancel = false) => {
    const { data: response } = await api.request({
      url: `/get-teacher-detail/${teacher_id}`,
      // headers: {
      //   "x-access-token": getLocalStorage("auth").token
      // },
      method: "GET",
      signal: cancel ? cancelApiObject[this.getTeacherDetail.name].handleRequestCancellation().signal : undefined,
    });
    return response;
  }
};

// defining the cancel API object for TeacherAPI
const cancelApiObject = defineCancelApiObject(TeacherAPI);
