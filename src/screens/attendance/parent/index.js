/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { useLocalSearchParams } from 'expo-router';

import API from '../../../apis';

const AttendanceIndex = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [holidayData, setHolidayData] = useState([]);
    const [markedDates, setMarkedDates] = useState({});
    const [holidayCount, setHolidayCount] = useState(0);
    const [presentCount, setPresentCount] = useState(0);
    const [absentCount, setAbsentCount] = useState(0);
    const [disableArrow, setDisableArrow] = useState(true);
    const [month, setMonth] = useState(new Date().getMonth() + 1);     // Because starting index is 0
    const allHolidays = useSelector(state => state.allHolidays);

    const theme = useTheme();
    const params = useLocalSearchParams();

    const handleMonthChange = (newMonth) => {
        setMonth(newMonth.month);
        newMonth.month >= (new Date().getMonth() + 1) ? setDisableArrow(true)
            : setDisableArrow(false);
    };

    const getMarkedDates = () => {
        const markedDates = {};
        attendanceData.forEach(att => {
            markedDates[att.date] = {
                selected: true,
                selectedColor: att.status === 'present' ?
                    theme.colors.grayishGreen[500] : theme.colors.grayishRed[500]
            };
        });
        holidayData.forEach(holiday => {
            markedDates[holiday.startDate] = {
                selected: true,
                selectedColor: theme.colors.grayishYellow[500]
            };
        });
        return markedDates;
    };

    const fetchAttendanceData = (month) => {
        API.AttendanceAPI.getAll({ month: month, parentId: params?.id }, 0, 31)
            .then(data => {
                if (data.status === 'Success') {
                    setAttendanceData(data.data.rows);
                } else if (data.status === 'Error') {
                    setAttendanceData([]);
                }
            })
            .catch(err => {
                console.log(err, 'attendance api err');
            })
    };

    const fetchHolidayData = (month) => {
        if (!allHolidays?.listData?.rows?.length) {
            API.HolidayAPI.getAll({ month: month }, 0, 31)
                .then(data => {
                    if (data.status === 'Success') {
                        setHolidayData(data.data.rows);
                        setHolidayCount(data.data.rows.length);
                    }
                })
                .catch(err => {
                    console.log(err, 'attendance api err');
                })
        } else {
            const currentMonthHolidays = allHolidays?.listData?.rows.filter(holiday => {
                const holidayDate = new Date(holiday.startDate);
                return holidayDate.getMonth() + 1 === month;
            });
            setHolidayData(currentMonthHolidays);
            setHolidayCount(currentMonthHolidays.length);
        }
    };

    useEffect(() => {
        fetchAttendanceData(month);
    }, [month]);

    useEffect(() => {
        fetchHolidayData(month);
    }, [month, allHolidays]);

    useEffect(() => {
        setMarkedDates(getMarkedDates());
        setPresentCount(attendanceData.filter(att => att.status === 'present').length);
        setAbsentCount(attendanceData.filter(att => att.status === 'absent').length);
    }, [attendanceData.length]);

    return (
        <View style={{
            flex: 1,
            paddingVertical: 12,
            backgroundColor: theme.colors.white[500]
        }}>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginVertical: 30,
            }}>
                <View style={{
                    alignItems: 'center',
                    backgroundColor: theme.colors.grayishGreen[200],
                    borderRadius: 12,
                    padding: 12,
                    width: 120
                }}>
                    <Text style={{
                        color: theme.colors.grayishGreen[600],
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}>{presentCount}</Text>
                    <Text style={{
                        fontSize: 13,
                        color: theme.colors.grayishGreen[600]
                    }}>Present</Text>
                </View>
                <View style={{
                    alignItems: 'center',
                    backgroundColor: theme.colors.red[200],
                    borderRadius: 12,
                    padding: 8,
                    width: 110
                }}>
                    <Text style={{
                        color: theme.colors.red[500],
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}>{absentCount}</Text>
                    <Text style={{
                        fontSize: 13,
                        color: theme.colors.red[500]
                    }}>Absent</Text>
                </View>
                <View style={{
                    alignItems: 'center',
                    backgroundColor: theme.colors.grayishYellow[200],
                    borderRadius: 12,
                    padding: 8,
                    width: 110
                }}>
                    <Text style={{
                        color: theme.colors.grayishYellow[600],
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}>{holidayCount}</Text>
                    <Text style={{
                        fontSize: 13,
                        color: theme.colors.grayishYellow[600]
                    }}>Holiday</Text>
                </View>
            </View>

            <Calendar
                disableArrowRight={disableArrow}
                markingType={'simple'}
                markedDates={markedDates}
                onMonthChange={handleMonthChange}
                theme={{
                    selectedDayBackgroundColor: 'lightgreen',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'orange',
                    monthTextColor: theme.colors.blue[500],
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 17
                }}
            />
        </View>
    );
};

export default AttendanceIndex;


// <View style={{
//     width: 160,
//     borderRadius: 18,
//     borderWidth: 3,
//     borderColor: theme.colors.blue[500],
//     padding: 8,
//     paddingLeft: 16,
//     marginLeft: 20,
//     marginVertical: 20,
// }}>
//     <Text style={{
//         fontSize: 28,
//         fontWeight: '500',
//         letterSpacing: 1,
//         marginBottom: 16,
//         color: theme.colors.blue[500],
//     }}>20 Days</Text>
//     <View style={styles.legendItem}>
//         <View style={[styles.legendColor, { backgroundColor: 'red' }]} />
//         <Text style={styles.legendText}>3 days missed</Text>
//     </View>
//     <View style={styles.legendItem}>
//         <View style={[styles.legendColor, { backgroundColor: 'yellow' }]} />
//         <Text style={styles.legendText}>2 days holiday</Text>
//     </View>
// </View>