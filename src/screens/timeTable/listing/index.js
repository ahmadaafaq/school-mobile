/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from 'expo-router';

import CustomModal from '../../common/CustomModal';
import ListingComponent from './ListingComponent';

import { SIZES } from '../../../assets/constants';
import { Utility } from "../../../utility";

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TimeTableListing = () => {
    const [showDayModal, setShowDayModal] = useState(false);
    const [selected, setSelected] = useState("");
    const theme = useTheme();
    const { setAsyncStorage } = Utility();

    // writing this function separately because an effect function must no return anything besides a function, used for cleanup, 
    // you are returning promise, getting this error when calling directly
    const setMenuInAsyncStorage = useCallback(() => {
        setAsyncStorage('menu', { selected: 'Homework' });
    }, []);

    useFocusEffect(
        useCallback(() => {
            setMenuInAsyncStorage();
        }, [])
    );

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.grayishWhite[500]
        },
        icon: {
            height: SIZES.medium,
            width: SIZES.medium,
            marginTop: SIZES.xSmall,
            tintColor: theme.colors.brightBlue[300]
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={theme.colors.magicMint[500]} />
            <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]} style={{ flexGrow: 1 }}>
                <ListingComponent
                    daysOfWeek={daysOfWeek}
                    selected={selected}
                    showDayModal={showDayModal}
                    setShowDayModal={setShowDayModal}
                />
            </ScrollView>

            {showDayModal && (
                <View style={{
                    width: '100%', position: 'absolute', left: 0, top: 0, zIndex: 1
                }}>
                    <CustomModal
                        heightNumber={2.2}
                        headerText="Days"
                        showModal={showDayModal}
                        setShowModal={setShowDayModal}
                    >
                        {daysOfWeek.map((item, index) =>
                            <TouchableOpacity key={index} onPress={() => {
                                setSelected(item);
                                setShowDayModal(false);
                            }}>
                                <Text style={styles.textStyle}>{`${item}\n`}</Text>
                            </TouchableOpacity>
                        )}
                    </CustomModal>
                </View>
            )}
        </SafeAreaView>
    );
};

export default TimeTableListing;
