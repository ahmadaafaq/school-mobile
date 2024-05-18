/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import PropTypes from 'prop-types';

import { useEffect, useRef, useState } from 'react';
import { Alert, SafeAreaView, View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';

import API from "../../../apis";
import { COLORS, FONT, SIZES } from "../../../assets/constants";
import { Utility } from "../../../utility";

export const WINDOW_WIDTH = Dimensions.get('window').width;

const WINDOW_HEIGHT = Dimensions.get('window').height;

export const ListingTable = ({ item, index, theme }) => {
    // const [hasPermission, setHasPermission] = useState(null);
    const [cameraVisible, setCameraVisible] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false);
    const cameraRef = useRef(null);
    const { formatImageName } = Utility();

    const handleOpenCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === 'granted') {
            setCameraVisible(true);
        } else {
            Alert.alert('Permission Denied', 'Camera permission is required to use this feature.');
        }
    };

    const clickPhoto = async () => {
        console.log('click photo');
        if (cameraRef.current) {
            let photo = await cameraRef.current.takePictureAsync();
            setCameraVisible(false);
            setCapturedImage(photo);
            setPreviewVisible(true);
            console.log(photo.uri, 'photo url')
        }
    };

    const uploadImg = () => {
        let nameArray = capturedImage.uri.split("/");
        let name = nameArray[nameArray.length - 1];
        console.log('name', name);

        let formattedName = formatImageName(name);
        const formBody = new FormData();
        formBody.append('image', {
            uri: capturedImage.uri,
            name: formattedName,
            type: "image/jpeg",
        });

        console.log('capturedImage', formBody._parts[0]);

        API.ImageAPI.uploadMobileImage({ image: formBody, imageName: formattedName });
        // API.ImageAPI.createImage({
        //     image_src: formattedName,
        //     parent_id: item.id,
        //     parent: 'student',
        //     type: 'normal'
        // });
    }

    const styles = StyleSheet.create({
        plusBox: {
            height: WINDOW_HEIGHT / 4,
            width: WINDOW_WIDTH - 250,
            borderRadius: 5,
            backgroundColor: '#d4ebf2',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            margin: 7

        },
        plusButton: {
            width: 40,
            height: 40,
            borderRadius: 30,
            backgroundColor: 'grey',
            justifyContent: 'center',
            alignItems: 'center',

        },
        camera: {
            flex: 1,
        },
        cameraButtonContainer: {
            flex: 1,
            width: '90%',
            height: 500,
            backgroundColor: 'transparent',
            // flexDirection: 'row',
            margin: 20,
        },
        titleText: {
            color: theme.colors.blue[700],
            fontFamily: FONT.regular,
            fontSize: SIZES.medium,
            paddingTop: SIZES.small,
            paddingLeft: SIZES.xSmall,
            letterSpacing: 0.22,
            fontWeight: 'bold',
            textTransform: 'capitalize'
        },
        detailBtn: {
            borderWidth: 1,
            top: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end',
            width: '25%',
            height: 40,
            borderRadius: 4,
            backgroundColor: theme.colors.green[500],
            marginBottom: 10,
            zIndex: 1
        },
        detailText: {
            color: theme.colors.white[500],
            fontFamily: FONT.regular,
            fontSize: 15,
            letterSpacing: 0.12,
            fontWeight: '400'
        },
        icon: {
            color: theme.colors.white[500]
        },
    });

    const CameraPreview = ({ photo }) => {
        console.log('sdsfds', photo)
        return (
            <View
                style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    width: '100%',
                    height: '100%'
                }}
            >
                <ImageBackground
                    source={{ uri: photo && photo.uri }}
                    style={{
                        flex: 1
                    }}
                />
            </View>
        )
    }
    // console.log('hellllllooooooooooooo',item);

    return (
        <SafeAreaView style={{
            display: "flex",
            flexDirection: 'row',
            justifyContent: 'space-between',
            // height: WINDOW_HEIGHT / 5.5,
            width: WINDOW_WIDTH - 25,
            borderWidth: 2,
            borderColor: 'grey',
            paddingHorizontal: 10,
            backgroundColor: COLORS.indigo[200],
            borderRadius: 5,
            margin: 10,
        }}>
            {cameraVisible ? (
                <Camera ref={cameraRef} style={styles.camera} type={Camera.Constants.Type.back} >
                    <View style={styles.cameraButtonContainer}>
                        <View style={{
                            position: 'absolute',
                            bottom: 0,
                            flex: 1,
                            width: '100%',
                            justifyContent: 'space-between',
                        }}>
                            <View style={{
                                alignSelf: 'center',
                                flex: 1,
                                alignItems: 'center',
                            }}>
                                <TouchableOpacity
                                    style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 50,
                                        backgroundColor: '#fff',
                                    }}
                                    onPress={clickPhoto} />
                            </View>
                        </View>
                    </View>
                </Camera >
            ) : (
                <>
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <View style={styles.plusBox}>
                            {previewVisible && capturedImage ? (
                                <CameraPreview photo={capturedImage} />
                            ) : (
                                <TouchableOpacity style={styles.plusButton} onPress={handleOpenCamera}>
                                    <MaterialIcons name="add" size={28} color="white" />
                                </TouchableOpacity>
                            )}
                        </View>
                        {previewVisible && capturedImage &&
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10 }}>
                                <TouchableOpacity onPress={() => {
                                    setCapturedImage(null);
                                    setPreviewVisible(false);
                                    handleOpenCamera();
                                }}>
                                    <Text style={{ borderWidth: 1, padding: 10, borderRadius: 20, backgroundColor: "white" }}>
                                        Retake
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={uploadImg}>
                                    <Text style={{ borderWidth: 1, padding: 10, borderRadius: 20, backgroundColor: "#15f4ee" }}>
                                        Upload
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                    <View style={{ borderWidth: 1, width: '50%', margin: 7, backgroundColor: "white", borderRadius: 5, }}>
                        <Text style={styles.titleText}>{item.firstname} {item.lastname}</Text>
                        <Text style={styles.titleText}> Class: {item.class} </Text>
                        <Text style={styles.titleText}> Father Name: {item.father_name}</Text>
                        <Text style={styles.titleText}> Gender: {item.gender}</Text>
                        <Text style={styles.titleText}> blood Group: {item.blood_group}</Text>
                        {/* <Text style={styles.subText}>Due date</Text> */}
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};

ListingTable.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    theme: PropTypes.object
};

export default ListingTable;
