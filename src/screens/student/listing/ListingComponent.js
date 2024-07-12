/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import PropTypes from 'prop-types';

import { useRef, useEffect, useState, memo } from 'react';
import { FlatList, Text, SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { Chip, MD2Colors, MD3Colors, useTheme, Button } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

import { ListingTable } from './ListingTable';

import { useCommon } from "../../../hooks/common";
import { setSchoolStudents } from "../../../redux/actions/StudentAction";

const ListingComponent = ({ class_id, section_id, api, page, setPage }) => {
    const theme = useTheme();
    const flatListRef = useRef(null);
    const params = useLocalSearchParams();
    const { getPaginatedData } = useCommon();
    const [studentData, setStudentData] = useState([]);
    const { listData } = useSelector(state => state.schoolStudents);
    let SIZE = 10;

    useEffect(() => {
        console.log("USE EFFECT");
        if (page > 0 && listData?.rows?.length) {
            setStudentData([
                ...studentData,
                ...listData.rows
            ]);
        } else if (listData?.rows?.length) {
            setStudentData(listData.rows);
            console.log('scroll to top')
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
         else if (class_id && section_id && !listData?.rows?.length) {
            setStudentData([]);
        }
    }, [listData?.rows]);

    useEffect(() => {
        if (class_id && section_id) {
            console.log('fetch CLASS students', page);
            getPaginatedData(page, SIZE, setSchoolStudents, api.StudentAPI,
                { class_id: class_id, section: section_id, school_id: params.school_id }, false);
        } else {
            console.log('fetch ALL students', page)
            getPaginatedData(page, SIZE, setSchoolStudents, api.StudentAPI, {}, false);
        }
    }, [class_id, section_id, page]);

    console.log("new listdata", studentData, page, listData?.rows)

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <Chip icon="school" style={{ backgroundColor: MD2Colors.grey400, marginBottom: 10 }}
                selectedColor={MD3Colors.error70} type="flat">
                <Text style={{ color: MD2Colors.black }}>{listData?.count || studentData?.length} Students Found</Text>
            </Chip>
            <FlatList
                ref={flatListRef}
                data={studentData}
                renderItem={({ item }) => <ListingTable item={item} />}
                extraData={class_id}
                keyExtractor={(item) => item.id.toString()}
                scrollsToTop={!page}
                scrollToIndex
            />
            {/* {!isFetchingNextPage ? */}
            {listData?.count && listData?.count !== studentData?.length &&
                <Button
                    mode='outlined'
                    buttonColor='#72A0C1'
                    theme={{ colors: { primary: 'white' } }}
                    onPress={() => setPage(page + 1)}
                    style={{ marginBottom: 20 }}
                >
                    Load More
                </Button>
            }
            {/* :
                <ActivityIndicator />
            } */}
        </SafeAreaView>
    );
};

ListingComponent.propTypes = {
    class_id: PropTypes.any,
    section_id: PropTypes.any,
    api: PropTypes.any,
    page: PropTypes.number,
    setPage: PropTypes.func
};

export default memo(ListingComponent);
