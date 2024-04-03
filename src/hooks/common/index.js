/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Utility } from "../../utility";

export const useCommon = () => {
    const dispatch = useDispatch();
    const selected = useSelector(state => state.menuItem.selected);
    const { getAsyncStorage } = Utility();

    /** Get data for pagination according to given parameters to be used in API call
     */
    const getPaginatedData = useCallback(async (page = 0, size, action, api, condition = false, search = false) => {
        const authInfo = await getAsyncStorage("auth");

        api.getAll(condition, page, size, search, authInfo)
            .then(res => {
                console.log('getall response', res.data.rows)
                if (res.status === 'Success') {
                    dispatch(action({ listData: res.data, loading: false }));
                } else if (res.status === 'Error') {
                    dispatch(action({ listData: [], loading: false }));
                }
            })
            .catch(err => {
                dispatch(action({ listData: [], loading: false }));
                console.error("An error occurred in getPaginated Data: ", err);
            });
    }, [selected]);

    return {
        getPaginatedData
    };
};
