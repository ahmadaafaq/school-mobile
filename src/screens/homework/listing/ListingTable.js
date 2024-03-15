/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { DataTable, useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';

import LoadingAnimationModal from '../../common/LoadingAnimationModal';
import { FONT } from "../../../assets/constants";

const ListingTable = ({
    action,
    api,
    getQuery,
    condition = false,
    rows,
    count,
    loading,
    selected
}) => {
    const theme = useTheme();
    const numberOfItemsPerPageList = [5, 10, 20];

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(
        numberOfItemsPerPageList[0]
    );

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, count);

    useEffect(() => {
        getQuery(page, itemsPerPage, action, api, condition);
        setPage(0);
    }, [selected, page, itemsPerPage, action, api, condition, getQuery]);

    // Override default styles for DataTable.Pagination
    const paginationStyles = StyleSheet.create({
        pagination: {
            // width: '40%',
            backgroundColor: theme.colors.magicMint[200]
        }
    });
    const ColoredText = ({ text }) => {
        const styles = StyleSheet.create({
            text: {
                color: theme.colors.magicMint[600], fontSize: 12, fontFamily: FONT.medium
            }
        });
        console.log('label text', text)
        return <Text style={styles.text}>{text}</Text>;
    };
    console.log('Listing Table rows & count', rows, count);

    return (
        <SafeAreaView style={{ paddingHorizontal: 10 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 1 }}>
                <DataTable
                    style={{
                        borderWidth: 2, borderColor: theme.colors.magicMint[500], borderTopLeftRadius: 8, borderTopRightRadius: 8
                    }}>
                    <DataTable.Header
                        style={{
                            backgroundColor: theme.colors.magicMint[500], borderBottomColor: theme.colors.magicMint[500]
                        }}>
                        <DataTable.Title
                            textStyle={{
                                width: 120, paddingLeft: 45, color: theme.colors.blue[400], fontSize: 14, fontFamily: FONT.bold, borderRightWidth: 0.8, borderRightColor: theme.colors.moonstoneBlue[500]
                            }}
                        >Class</DataTable.Title>
                        <DataTable.Title
                            textStyle={{
                                width: 130, paddingLeft: 35, color: theme.colors.grayishRed[400], fontSize: 14, fontFamily: FONT.bold, borderRightWidth: 0.8, borderRightColor: theme.colors.moonstoneBlue[500]
                            }}
                        >Title</DataTable.Title>
                        <DataTable.Title
                            textStyle={{
                                width: 140, paddingLeft: 25, color: theme.colors.blue[400], fontSize: 14, fontFamily: FONT.bold, borderRightWidth: 0.8, borderRightColor: theme.colors.moonstoneBlue[500]
                            }}
                        >Description</DataTable.Title>
                        <DataTable.Title
                            textStyle={{
                                width: 130, paddingLeft: 35, color: theme.colors.blue[400], fontSize: 14, fontFamily: FONT.bold
                            }}
                        >Status</DataTable.Title>
                    </DataTable.Header>

                    {rows?.length && rows.slice(from, to).map((row, index) => (
                        <DataTable.Row key={row.id}
                            style={{
                                borderBottomColor: theme.colors.moonstoneBlue[500], backgroundColor: index % 2 !== 0 ? theme.colors.moonstoneBlue[100] : theme.colors.whiteSnow[500]
                            }}
                        >
                            <DataTable.Cell
                                textStyle={{
                                    width: 100, paddingLeft: 40, color: theme.colors.grayishRed[400], fontSize: 13, fontFamily: FONT.bold, borderRightWidth: 0.8, borderRightColor: theme.colors.moonstoneBlue[500]
                                }}
                            >{row.class_id}{row.section_id}</DataTable.Cell>
                            <DataTable.Cell
                                textStyle={{
                                    width: 140, paddingLeft: 55, color: theme.colors.blue[400], fontSize: 13, fontFamily: FONT.bold, borderRightWidth: 0.8, borderRightColor: theme.colors.moonstoneBlue[500]
                                }}
                            >{row.title}</DataTable.Cell>
                            <DataTable.Cell
                                textStyle={{
                                    width: 130, paddingLeft: 25, color: theme.colors.grayishRed[400], fontSize: 13, fontFamily: FONT.bold, borderRightWidth: 0.8, borderRightColor: theme.colors.moonstoneBlue[500]
                                }}
                            >{row.description}</DataTable.Cell>
                            <DataTable.Cell
                                textStyle={{
                                    width: 130, paddingLeft: 40, color: theme.colors.blue[400], fontSize: 13, fontFamily: FONT.bold
                                }}
                            >{row.status}</DataTable.Cell>
                        </DataTable.Row>
                    ))}

                    <DataTable.Pagination
                        style={paginationStyles.pagination}
                        page={page}
                        showFastPaginationControls
                        numberOfPages={Math.ceil(count / itemsPerPage)}
                        onPageChange={page => {
                            console.log('this is the page change', page)
                            setPage(page)
                        }}
                        label={<ColoredText text={`${from + 1}-${to} of ${count}`} />}
                        numberOfItemsPerPage={itemsPerPage}
                        numberOfItemsPerPageList={numberOfItemsPerPageList}
                        onItemsPerPageChange={(e, numberOfItemsPerPage) => {
                            console.log('Items per page changed:', numberOfItemsPerPage);
                            setItemsPerPage(numberOfItemsPerPage);
                        }}
                        selectPageDropdownLabel={<ColoredText text="Rows Per Page" />}
                    // selectPageDropdownRippleColor='yellow'
                    />
                </DataTable>
                {loading ? <LoadingAnimationModal /> : null}
            </ScrollView>
        </SafeAreaView>
    );
};

ListingTable.propTypes = {
    action: PropTypes.func,
    api: PropTypes.object,
    getQuery: PropTypes.func,
    condition: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    columns: PropTypes.array,
    rows: PropTypes.array,
    count: PropTypes.number,
    loading: PropTypes.bool,
    selected: PropTypes.string,
    text: PropTypes.string
};

export default ListingTable;
