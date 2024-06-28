/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import PropTypes from 'prop-types';

import { useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { FlatList, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Chip, MD2Colors, MD3Colors, useTheme } from 'react-native-paper';

import API from '../../../apis';
import Toast from '../../common/Toast';

import { ListingTable, WINDOW_WIDTH } from './ListingTable';
import { FONT, SIZES } from "../../../assets/constants";
import { Utility } from '../../../utility';

const ListingComponent = ({ class_id, section_id }) => {
    const [studentAttendance, setStudentAttendance] = useState([]);
    const toastInfo = useSelector(state => state.toastInfo);
    const { listData } = useSelector(state => state.schoolStudents);
    const dispatch = useDispatch();
    const router = useRouter();
    const theme = useTheme();
    const flatListRef = useRef(null);

    const { toastAndNavigate } = Utility();

    listData?.rows?.forEach(obj => {
        obj.attendance = 'absent'
    });

    const flatListOptimizationProps = {
        maxToRenderPerBatch: 1,
        scrollEventThrottle: 16,
        windowSize: 2,
        keyExtractor: useCallback(e => e.id, []),
        getItemLayout: useCallback(
            (_, index) => ({
                index,
                length: WINDOW_WIDTH,
                offset: index * WINDOW_WIDTH
            }),
            []
        )
    };

    const getCurrentDateFormatted = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');     // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        console.log(`${year}-${month}-${day}`, 'this is date')
        return `${year}-${month}-${day}`;
    };

    getCurrentDateFormatted();
    const handleAttendanceChange = (index, attendance) => {
        listData.rows[index].attendance = attendance;

        if (studentAttendance[index]) {
            studentAttendance[index].status = attendance;
        } else {
            studentAttendance.push({
                parent: 'student',
                parent_id: listData.rows[index].id,
                status: attendance,
                date: getCurrentDateFormatted(),
                class_id,
                section_id
            });
        }
        setStudentAttendance([...studentAttendance]);
    };

    const handleSubmit = async () => {
        let promise;
        promise = studentAttendance.map(student => {
            API.AttendanceAPI.createAttendance(student);
        });
        try {
            await Promise.all(promise);
            toastAndNavigate(dispatch, true, "Successfully Submitted", theme.colors.yaleBlue[500], theme.colors.lightBlue[600]);
            setTimeout(() => {
                router.back();
            }, 2000);
        } catch (err) {
            toastAndNavigate(dispatch, true, err ? err.response?.data?.msg : "An Error Occurred", theme.colors.yaleBlue[500], theme.colors.lightBlue[600]);
            throw err;
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
        touchableOpacityStyles: {
            alignItems: 'center',
            justifyContent: 'center',
            width: '30%',
            height: 40,
            borderRadius: 18,
            marginBottom: 15,
            backgroundColor: theme.colors.blue[500]
        },
        touchableOpacityText: {
            color: theme.colors.white[500],
            fontFamily: FONT.regular,
            fontSize: 16,
            letterSpacing: 0.12,
            fontWeight: '500'
        },
        headerText: {
            color: theme.colors.brightBlue[500],
            fontSize: SIZES.mediumLarge,
            fontFamily: FONT.medium,
            marginBottom: 20,
            letterSpacing: 0.12,
            fontWeight: '400'
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <Chip icon="school" style={{ backgroundColor: MD2Colors.grey400, marginVertical: 10 }} selectedColor={MD3Colors.error70} type="flat">
                <Text style={{ color: MD2Colors.black }}>{listData?.count || 0} Students Found</Text>
            </Chip>
            <Toast
                alerting={toastInfo.alerting}
                message={toastInfo.message}
                actionText={toastInfo.actionText}
                actionTextColor={toastInfo.actionTextColor}
                backgroundColor={toastInfo.backgroundColor}
                textColor={toastInfo.textColor || theme.colors.yaleBlue[500]}
            />
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ width: "100%" }} ref={flatListRef}>
                <FlatList
                    data={listData?.rows}
                    renderItem={({ item, index }) => (
                        <ListingTable
                            item={item}
                            index={index}
                            theme={theme}
                            handleAttendanceChange={handleAttendanceChange}
                        />
                    )}
                    pagingEnabled={true}
                    keyExtractor={(item) => item.id.toString()}
                    {...flatListOptimizationProps}
                />
            </ScrollView>
            <TouchableOpacity style={styles.touchableOpacityStyles} onPress={handleSubmit}>
                <Text style={styles.touchableOpacityText}>
                    Submit
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

ListingComponent.propTypes = {
    class_id: PropTypes.string,
    section_id: PropTypes.string
};

export default ListingComponent;
