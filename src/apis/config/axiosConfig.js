/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import axios from "axios";
import { BASE_URL } from '@env';
import { Utility } from "../../utility";

const baseURL = BASE_URL;
const { getAsyncStorage } = Utility();

export const api = axios.create({
  withCredentials: true,
  baseURL: baseURL,
  validateStatus: (status) => (status >= 200 && status < 300) || status == 404
});
console.log(baseURL, 'url')

// defining a custom error handler for all APIs
const errorHandler = (error) => {
  const statusCode = error.response?.status;

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    throw error;
  }
  return Promise.reject(error);
};

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});

//ask for token on every request made
api.interceptors.request.use(async req => {
  req.headers['Type'] = "school-mobile";
  try {
    const schoolInfo = await getAsyncStorage("schoolInfo");
    const authToken = await getAsyncStorage("auth");

    if (schoolInfo) {
      req.headers['School_info'] = JSON.stringify(schoolInfo);
    }
    if (authToken) {
      req.headers["x-access-token"] = authToken?.token;
    }
  } catch (error) {
    console.log("Error retrieving data from AsyncStorage in interceptor:", error);
  }

  return req;
});
