import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Dimensions, AppState } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import axios from 'axios';

const UPSTASH_URL = 'https://ready-sheepdog-43739-us1-vector.upstash.io';
const UPSTASH_TOKEN = 'ABgFMHJlYWR5LXNoZWVwZG9nLTQzNzM5LXVzMWFkbWluTkRjME56ZzBOVGN0TlRVMU55MDBObVJpTFRrMFlqZ3RNV1kxTXpJNFl6RTVOakl5';
const VECTOR_SIZE = 32; // Fixed vector size

const { width } = Dimensions.get('window');

const MarkAttendance = () => {
    const [currentTab, setCurrentTab] = useState('add');
    const [studentName, setStudentName] = useState('');
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cameraActive, setCameraActive] = useState(true);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [faces, setFaces] = useState([]);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();

        // Monitor app state changes
        const appStateSubscription = AppState.addEventListener(
            'change',
            nextAppState => {
                if (nextAppState === 'active') {
                    setCameraActive(true);
                } else if (nextAppState === 'background') {
                    setCameraActive(false);
                }
            }
        );

        // Keep focus and prevent sleep to maintain camera functionality
        return () => {
            // Clean up when component unmounts
            appStateSubscription.remove();
            setCameraActive(false);
        };
    }, []);

    const handleFacesDetected = ({ faces }) => {
        if (faces && faces.length > 0) {
            setFaces(faces);
        }
    };

    // Process face and resize to 32 dimensions
    const processFace = async (face) => {
        try {
            if (!face) {
                return null;
            }

            // Extract face landmarks and features into a vector
            const faceFeatures = [
                // Landmarks
                face.BOTTOM_MOUTH?.x || 0,
                face.BOTTOM_MOUTH?.y || 0,
                face.LEFT_CHEEK?.x || 0,
                face.LEFT_CHEEK?.y || 0,
                face.LEFT_EAR?.x || 0,
                face.LEFT_EAR?.y || 0,
                face.LEFT_EYE?.x || 0,
                face.LEFT_EYE?.y || 0,
                face.LEFT_MOUTH?.x || 0,
                face.LEFT_MOUTH?.y || 0,
                face.NOSE_BASE?.x || 0,
                face.NOSE_BASE?.y || 0,
                face.RIGHT_CHEEK?.x || 0,
                face.RIGHT_CHEEK?.y || 0,
                face.RIGHT_EAR?.x || 0,
                face.RIGHT_EAR?.y || 0,
                face.RIGHT_EYE?.x || 0,
                face.RIGHT_EYE?.y || 0,
                face.RIGHT_MOUTH?.x || 0,
                face.RIGHT_MOUTH?.y || 0,

                // Face bounds
                face.bounds?.origin?.x || 0,
                face.bounds?.origin?.y || 0,
                face.bounds?.size?.width || 0,
                face.bounds?.size?.height || 0,

                // Facial features and angles
                face.rollAngle || 0,
                face.yawAngle || 0,
                face.leftEyeOpenProbability || 0,
                face.rightEyeOpenProbability || 0,
                face.smilingProbability || 0,

                // Additional features to reach 32 dimensions
                // Using normalized values from existing features
                face.bounds?.origin?.x / (width || 1),
                face.bounds?.origin?.y / (width || 1),
                face.bounds?.size?.width / (width || 1)
            ];

            // Ensure we have exactly 32 dimensions
            if (faceFeatures.length > VECTOR_SIZE) {
                return faceFeatures.slice(0, VECTOR_SIZE);
            } else if (faceFeatures.length < VECTOR_SIZE) {
                // Pad with zeros if needed
                return [...faceFeatures, ...Array(VECTOR_SIZE - faceFeatures.length).fill(0)];
            }

            return faceFeatures;
        } catch (error) {
            console.error('Face processing error:', error);
            return null;
        }
    };

    // Reset camera function
    const resetCamera = () => {
        setCameraActive(false);
        setTimeout(() => setCameraActive(true), 500);
    };

    const addStudent = async () => {
        if (!studentName) {
            Alert.alert('Error', 'Please enter student name');
            return;
        }

        if (faces.length === 0) {
            Alert.alert('Error', 'No face detected. Please position your face in the camera.');
            return;
        }

        setLoading(true);
        try {
            const faceVector = await processFace(faces[0]);

            if (!faceVector) {
                Alert.alert('Error', 'Failed to process face data');
                return;
            }

            // Generate a unique student identifier
            const studentIdentifier = `student_${Date.now()}_${studentName.replace(/\s+/g, '_').toLowerCase()}`;

            // Save to Upstash Vector Database
            const upstashResponse = await axios.post(
                `${UPSTASH_URL}/upsert`,
                {
                    id: studentIdentifier,
                    vector: faceVector,
                    metadata: {
                        name: studentName.trim(),
                        createdAt: new Date().toISOString(),
                        vectorVersion: "2.0" // Add version tracking for future upgrades
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${UPSTASH_TOKEN}`,
                        'Content-Type': 'application/json'
                    },
                    timeout: 15000 // Longer timeout
                }
            );

            if (upstashResponse.status === 200 || upstashResponse.status === 201) {
                Alert.alert('Success', 'Student added successfully');
                setStudentName('');
            } else {
                Alert.alert('Error', 'Failed to add student to database');
            }
        } catch (error) {
            console.error('Add student error:', error);
            Alert.alert('Error', `Failed to add student: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const markAttendance = async () => {
        if (faces.length === 0) {
            Alert.alert('Error', 'No face detected. Please position your face in the camera.');
            return;
        }

        setLoading(true);
        try {
            const normalizedVector = await processFace(faces[0]);

            if (!normalizedVector) {
                Alert.alert('Error', 'Failed to process face data');
                return;
            }

            // Step 1: Query the vector database for similar faces
            const listResponse = await axios.post(
                `${UPSTASH_URL}/query`,
                {
                    vector: normalizedVector,
                    topK: 5,
                    includeVectors: true,
                    includeMetadata: true
                },
                {
                    headers: {
                        'Authorization': `Bearer ${UPSTASH_TOKEN}`,
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000,
                },
            );
            console.log("listResponse", listResponse);

            if (!listResponse.data?.result || listResponse.data.result?.length === 0) {
                Alert.alert(
                    'No Students Found',
                    'There are no registered students in the database.',
                    [{ text: 'OK' }]
                );
                setLoading(false);
                return;
            }

            // Step 2: Fetch the full student data for the matches
            console.log(`Fetching ${listResponse.data.result.length} student vectors...`,
                listResponse.data.result.map(student => student.id), listResponse.data.result);

            const fetchResponse = await axios.post(
                `${UPSTASH_URL}/fetch`,
                {
                    ids: listResponse.data.result.map(student => student.id),
                    includeVectors: true,
                    includeMetadata: true
                },
                {
                    headers: {
                        'Authorization': `Bearer ${UPSTASH_TOKEN}`,
                        'Content-Type': 'application/json'
                    },
                    timeout: 15000
                }
            );

            // Process results
            if (listResponse.data.result?.length > 0) {
                console.log('top match data>>>', fetchResponse);
                // Get the top match
                const topMatch = listResponse.data.result[0];
                const similarity = topMatch.score || 0;

                if (similarity > 0.997) { // Threshold for matching
                    const studentName = topMatch.metadata?.name || "Unknown";
                    Alert.alert(
                        'Present',
                        `${studentName} is present!\nSimilarity score: ${(similarity * 100).toFixed(1)}%`
                    );
                } else {
                    Alert.alert('No Match', 'No matching student found with sufficient confidence');
                }
            } else {
                Alert.alert('No Results', 'Could not retrieve student data');
            }
        } catch (error) {
            console.error('Attendance error:', error);
            Alert.alert('Error', `Failed to process attendance: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // This function is no longer needed as Upstash handles similarity calculations
    // But keeping a utility function for local testing if needed
    const calculateSimilarity = (vecA, vecB) => {
        if (vecA.length !== vecB.length) return 0;

        const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
        const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
        const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

        return dotProduct / (magnitudeA * magnitudeB || 1);
    };

    const flipCamera = () => {
        setType(
            type === Camera.Constants.Type.front
                ? Camera.Constants.Type.back
                : Camera.Constants.Type.front
        );

        // Briefly turn off camera during flip to prevent freezing
        setCameraActive(false);
        setTimeout(() => setCameraActive(true), 300);
    };

    if (hasCameraPermission === null) {
        return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
    }

    if (hasCameraPermission === false) {
        return <View style={styles.container}><Text>No access to camera. Please enable camera permissions.</Text></View>;
    }

    const renderFaceBox = () => {
        if (faces.length === 0) {
            return null;
        }

        return faces.map((face, index) => {
            // Check if bounds exists and has the expected properties
            if (!face.bounds || !face.bounds.origin || !face.bounds.size) {
                return null;
            }

            const { origin, size } = face.bounds;
            return (
                <View
                    key={index}
                    style={[
                        styles.faceBox,
                        {
                            left: origin.x,
                            top: origin.y,
                            width: size.width,
                            height: size.height,
                        },
                    ]}
                />
            );
        });
    };

    const setCurrentTabWithReset = (tab) => {
        setCurrentTab(tab);
        // Reset camera when switching tabs
        setTimeout(() => {
            resetCamera();
        }, 100);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, currentTab === 'add' && styles.activeTab]}
                    onPress={() => setCurrentTabWithReset('add')}
                >
                    <Text style={styles.tabText}>Add Student</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, currentTab === 'mark' && styles.activeTab]}
                    onPress={() => setCurrentTabWithReset('mark')}
                >
                    <Text style={styles.tabText}>Mark Attendance</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cameraContainer}>
                {cameraActive && (
                    <Camera
                        ref={cameraRef}
                        style={styles.camera}
                        type={type}
                        onFacesDetected={handleFacesDetected}
                        faceDetectorSettings={{
                            mode: FaceDetector.FaceDetectorMode.fast,
                            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                            runClassifications: FaceDetector.FaceDetectorClassifications.all,
                            minDetectionInterval: 100,
                            tracking: true,
                        }}
                    >
                        {renderFaceBox()}
                        <View style={styles.cameraControls}>
                            <TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
                                <Text style={styles.flipText}>Flip</Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                )}
            </View>

            <View style={styles.statusBar}>
                <Text style={styles.statusText}>
                    {faces.length > 0
                        ? `Face detected: ${faces.length}${faces[0]?.leftEyeOpenProbability ?
                            ` | Eyes: ${(faces[0].leftEyeOpenProbability * 100).toFixed(0)}%/${(faces[0].rightEyeOpenProbability * 100).toFixed(0)}%` : ''
                        }${faces[0]?.smilingProbability !== undefined ?
                            ` | Smile: ${(faces[0].smilingProbability * 100).toFixed(0)}%` : ''
                        }`
                        : 'No face detected. Position your face in the camera.'}
                </Text>
            </View>

            {currentTab === 'add' ? (
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Student Name"
                        value={studentName}
                        onChangeText={setStudentName}
                    />
                    <TouchableOpacity
                        style={[styles.button, styles.submitButton]}
                        onPress={addStudent}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? 'Processing...' : 'Add Student'}
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.formContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.attendanceButton]}
                        onPress={markAttendance}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? 'Processing...' : 'Mark Attendance'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    tabContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    tab: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: 'transparent',
    },
    activeTab: {
        borderColor: '#4287f5',
    },
    tabText: {
        fontWeight: '500',
        fontSize: 16,
    },
    cameraContainer: {
        height: width * 1.33, // Maintains aspect ratio
        overflow: 'hidden',
    },
    camera: {
        flex: 1,
    },
    faceBox: {
        position: 'absolute',
        borderWidth: 2,
        borderColor: '#32CD32',
        zIndex: 10,
    },
    cameraControls: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'row',
    },
    flipButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    resetButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 5,
    },
    flipText: {
        color: 'white',
    },
    statusBar: {
        padding: 10,
        backgroundColor: '#eee',
        alignItems: 'center',
    },
    statusText: {
        fontSize: 14,
    },
    formContainer: {
        padding: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: '#4CAF50',
    },
    attendanceButton: {
        backgroundColor: '#4287f5',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default MarkAttendance;