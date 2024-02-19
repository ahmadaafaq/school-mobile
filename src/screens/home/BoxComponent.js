/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { Dimensions, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

import { SIZES, FONT } from "../../assets/constants";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const BoxComponent = ({ title, content, growth, bg, ml = 25, mr = 10 }) => {
    const theme = useTheme();

    const styles = {
        container: {
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            width: WINDOW_WIDTH / 2.5,
            height: WINDOW_HEIGHT / 6,
            marginLeft: ml,
            marginRight: mr,
            padding: 15,
            backgroundColor: bg
        },
        titleStyle: {
            color: theme.colors.whiteSmoke[200],
            fontFamily: FONT.bold,
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 30
        },
        contentStyle: {
            color: theme.colors.whiteSmoke[200],
            fontFamily: FONT.bold,
            fontSize: SIZES.large,
            marginBottom: 4
        },
        subContainer: {
            flexDirection: 'row'
        },
        icon: {
            height: 16,
            width: 16,
            marginRight: 4,
            color: theme.colors.whiteSmoke[200]
        },
        subContentStyle: {
            color: theme.colors.whiteSmoke[200],
            fontFamily: FONT.bold,
            fontSize: 13
        }
    };

    return (
        <Card
            mode=''
            style={styles.container}
        >
            <Text style={styles.titleStyle}>{title}</Text>
            <Text style={styles.contentStyle}>{content}</Text>
            <View style={styles.subContainer}>
                <FontAwesome5 name='arrow-up' size={16}
                    style={styles.icon}
                />
                <Text style={styles.subContentStyle}>{growth}</Text>
            </View>
        </Card>
    );
};

export default BoxComponent;
