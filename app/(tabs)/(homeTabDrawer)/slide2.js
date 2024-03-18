/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { View, Text, StyleSheet } from 'react-native';

const slide2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is Slide 2 Page</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#000000"
  },
  text: {
    fontSize: 20,
    color: "#ffffff"
  }
});

export default slide2;
