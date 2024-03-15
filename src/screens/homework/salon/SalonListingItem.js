import { View, Text, StyleSheet, Dimensions, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';

import { COLORS, SIZES, ALIGNMENT } from "../../assets/constants";

export const WINDOW_WIDTH = Dimensions.get('window').width;

const WINDOW_HEIGHT = Dimensions.get('window').height;
const ITEM_HEIGHT = Math.round(WINDOW_HEIGHT * 0.6);
const ITEM_WIDTH = Math.round(WINDOW_WIDTH * 0.9);

const SalonListingItem = ({ item, index }) => {

    const router = useRouter();
    let salonType;
    let leftPad;
    let leftMargin;
    let iconName;

    if (item.type === 'male') {
        salonType = 'Male only';
        leftPad = 3;
        leftMargin = 6;
        iconName = 'male';
    } else if (item.type === 'female') {
        salonType = 'Female only';
        leftPad = 3;
        leftMargin = 5;
        iconName = 'female';
    } else if (item.type === 'unisex') {
        salonType = 'Unisex salon';
        leftMargin = -4;
        iconName = 'restroom';
    }

    const handleSalonPress = (item) => {
        console.log("code", item.salon_code);

        router.push({
            pathname: '/salonDetail',
            params: {
                code: item.salon_code
            }
        });
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={() => handleSalonPress(item)}>

                <Image
                    source={{ uri: item.banner_image }}
                    style={styles.image}
                />

                <View style={styles.heartContainer}>
                    <Image
                        source={require('../../assets/icons/heart-ol.png')}
                        style={styles.heartIcon}
                    />
                </View>

                <View style={styles.starContainer}>
                    <FontAwesome5 name="star" solid style={styles.starIcon} />
                    <Text style={{ color: COLORS.moonstoneBlue }}> {index + 2}.2
                        <Text style={{ color: COLORS.white[700] }}>   (699)</Text>
                    </Text>
                </View>

                <Text style={styles.nameText}>{item.name} Salon </Text>
                <Text style={styles.subText}> {item.street}, Bareilly </Text>

                <View style={[styles.typeContainer]}>
                    <FontAwesome5 name={iconName} style={[styles.typeIcon,
                    { paddingLeft: leftPad, marginRight: leftMargin }
                    ]} />
                    <Text style={styles.typeText}> {salonType} </Text>
                </View>

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
    )
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

export default SalonListingItem;
