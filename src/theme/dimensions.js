/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { Dimensions } from "react-native";

export const { height, width } = Dimensions.get("window");

const getWindowHeight = () => {
    let numerator;
    const denominator = 850;
    if (height < 600) numerator = 600;
    else if (height > 1100) numerator = 1100;
    else numerator = height;

    return Math.floor((numerator / denominator) * 100) / 100;
};

export const dimensions = (value, suffix) => {
    const size = value * getWindowHeight();
    return size + suffix;
};
