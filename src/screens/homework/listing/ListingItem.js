/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { View, Text, StyleSheet, Dimensions, Image, Pressable } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { COLORS, SIZES } from "../../../assets/constants";

export const WINDOW_WIDTH = Dimensions.get('window').width;

const WINDOW_HEIGHT = Dimensions.get('window').height;
const ITEM_HEIGHT = Math.round(WINDOW_HEIGHT * 0.6);
const ITEM_WIDTH = Math.round(WINDOW_WIDTH * 0.9);

const ListingItem = ({ item, index }) => {


    const handleSalonPress = (item) => {
        console.log("item", item);
        // router.push({
        //     pathname: '/salonDetail',
        //     params: {
        //         code: item.salon_code
        //     }
        // });
    };

    const styles = StyleSheet.create({
        container: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            height: WINDOW_HEIGHT - 340,
            width: WINDOW_WIDTH
        },
        image: {
            width: ITEM_WIDTH,
            height: ITEM_HEIGHT - 240,
            borderRadius: SIZES.xSmall
        },
        heartContainer: {
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '4%',
            right: '4%',
            backgroundColor: 'white',
            borderRadius: 50
        },
        heartIcon: {
            height: 16,
            width: 16,
            tintColor: COLORS.moonstoneBlue
        },
        starContainer: {
            width: 110,
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: 12,
            paddingLeft: 4
        },
        starIcon: {
            fontFamily: 'FontAwesome5Free-Solid',
            color: COLORS.yellow[600],
            verticalAlign: 'middle'
        },
        nameText: {
            color: COLORS.moonstoneBlue,
            fontSize: SIZES.medium,
            paddingTop: SIZES.xSmall,
            paddingLeft: 4,
            letterSpacing: 0.62,
            fontWeight: '400',
            textTransform: 'capitalize'
        },
        subText: {
            color: COLORS.white[700],
            fontSize: SIZES.smallMedium,
            paddingLeft: 4,
            paddingTop: 6,
            textTransform: 'capitalize'
        },
        typeContainer: {
            flexDirection: 'row',
            paddingTop: 12,
            paddingLeft: 8
        },
        typeIcon: {
            fontFamily: 'FontAwesome5Free-Light',
            verticalAlign: 'middle',
            color: COLORS.hotPink,
            fontSize: 16,
            paddingRight: 10
        },
        typeText: {
            color: COLORS.hotPink,
            fontSize: SIZES.smallMedium,
            textTransform: 'capitalize'
        },
    });

    return (
        <View style={styles.container}>
            <Pressable onPress={() => handleSalonPress(item)}>
                {/* <Image
                    source={{ uri: item.banner_image }}
                    style={styles.image}
                /> */}

                <View style={styles.heartContainer}>
                    <Image
                        // source={require('../../assets/icons/heart-ol.png')}
                        style={styles.heartIcon}
                    />
                </View>

                <View style={styles.starContainer}>
                    <FontAwesome5 name="star" solid style={styles.starIcon} />
                    <Text style={{ color: COLORS.moonstoneBlue }}> {index + 2}.2
                        <Text style={{ color: COLORS.white[700] }}>   (699)</Text>
                    </Text>
                </View>

                <Text style={styles.nameText}>{item.title} </Text>
                <Text style={styles.subText}> {item.description} </Text>

                <View style={styles.typeContainer}>
                    <FontAwesome5 name="thumbs-up" style={styles.typeIcon} />
                    <Text style={styles.typeText}> Rated high for quality of service </Text>
                </View>

                <View style={styles.typeContainer}>
                    <FontAwesome5 name="wallet" style={styles.typeIcon} />
                    <Text style={styles.typeText}> services starting from &#8377; 299 </Text>
                </View>

            </Pressable>
        </View>
    );
};

ListingItem.propTypes = {
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    index: PropTypes.number
};

export default ListingItem;
