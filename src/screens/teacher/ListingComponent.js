/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import API from '../../apis';
import ServerPaginationGrid from './ListingTable';

import { setMenuItem } from "../../redux/actions/MenuItemAction";
import { setTeachers } from "../../redux/actions/TeacherAction";
import { useCommon } from "../../hooks/common";
import { Utility } from "../../utility";

const ListingComponent = () => {
    const dispatch = useDispatch();
    const { listData, loading } = useSelector(state => state.allTeachers);
    const selected = useSelector(state => state.menuItem.selected);

    const { getPaginatedData } = useCommon();
    const { getAsyncStorage } = Utility();

    useEffect(() => {
        const getSelectedMenu = async () => {
            const selectedMenu = await getAsyncStorage('menu');
            console.log('inside useEffect listing', selectedMenu);
            dispatch(setMenuItem(selectedMenu?.selected));
        };
        getSelectedMenu();
    }, []);

    return (
        <View style={styles.container}>
            <ServerPaginationGrid
                action={setTeachers}
                api={API.TeacherAPI}
                getQuery={getPaginatedData}
                rows={listData.rows}
                count={listData.count}
                selected={selected}
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 20,
        color: "#000000"
    }
});

export default ListingComponent;
