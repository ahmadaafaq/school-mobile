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

export const PaymentAPI = {
  /** Get Payments from the database that meets the specified query parameters
   */
  getAll: async (conditionObj = false, page = 0, size = 5, search = false, authInfo, cancel = false) => {
    const queryParam = conditionObj ? `&${conditionObj.key}=${conditionObj.value}` : '';
    const searchParam = search ? `&search=${search}` : '';
    const { data: response } = await api.request({
      url: `/get-payments?page=${page}&size=${size}${queryParam}${searchParam}`,
      headers: {
        "x-access-token": getAsyncStorage("auth")?.token
      },
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined
    });
    return response;
  },

  /** Create Payment in the database
   */
  createPayment: async (payment, cancel = false) => {
    return await api.request({
      url: `/create-payment`,
      headers: {
        "x-access-token": getAsyncStorage("auth").token
      },
      method: "POST",
      data: payment,
      signal: cancel ? cancelApiObject[this.createPayment.name].handleRequestCancellation().signal : undefined
    });
  },

  /** Update Payment in the database
   */
  updatePayment: async (fields, cancel = false) => {
    return await api.request({
      url: `/update-payment`,
      headers: {
        "x-access-token": getAsyncStorage("auth").token
      },
      method: "PATCH",
      data: fields,
      signal: cancel ? cancelApiObject[this.updatePayment.name].handleRequestCancellation().signal : undefined
    });
  }
};

// defining the cancel API object for PaymentAPI
const cancelApiObject = defineCancelApiObject(PaymentAPI);
