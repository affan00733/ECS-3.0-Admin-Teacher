import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Dimensions,
    ToastAndroid
} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const height = Dimensions.get('window').height

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            teacher: []
        }
    }
    componentDidMount = async () => {

        await auth().onAuthStateChanged((user) => {
            if (user) {

                console.log("user.email",user.email)
                this.props.navigation.navigate("Home")


            }
            else {
                console.log("user in else ", user);
            }
        })

        await firestore()
            .collection('TeacherCreated')
            .onSnapshot(querySnapshot => {
                const users = [];

                querySnapshot.forEach(documentSnapshot => {

                    users.push(
                        documentSnapshot.data().email,
                        // key: documentSnapshot.id,
                    );
                });

                console.log(users);
                this.setState({ teacher: users })
                // console.log("newchap", users)
            })

    }

    handleSubmit = async () => {
        // this.props.navigation.navigate("Home")
        console.log("teacher ",this.state.teacher);
        if (this.state.teacher.includes(this.state.email) == true) {
            console.log("teacher email");
            this.firebaseauthenticate()
        }
        else {
            console.log("not teacher email");
        }


    }

    firebaseauthenticate = async () => {
        const { email, password } = this.state

        await auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {

                console.log('Teacher account signed in!');
                ToastAndroid.showWithGravityAndOffset(
                    `User ${email} account signed in!`,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                this.props.navigation.navigate("Home")

            })
            .catch(error => {
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    ToastAndroid.showWithGravityAndOffset(
                        'That email address is invalid!',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                }
                if (error.code === 'auth/user-not-found') {
                    console.log('That user is not available!');
                    ToastAndroid.showWithGravityAndOffset(
                        'That user is not available!',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                }
                if (error.code === 'auth/wrong-password') {
                    console.log('That password is incorrect!');
                    ToastAndroid.showWithGravityAndOffset(
                        'That password is incorrect!',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                }
            });
    }

    render() {
        return (
            <View style={styles.container}>

                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    underlineColorAndroid="blue"
                    onChangeText={(text) => this.setState({ email: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    underlineColorAndroid="blue"
                    onChangeText={(text) => this.setState({ password: text })}
                />

                <View style={styles.tab1}>
                    <TouchableOpacity
                        style={[styles.button,
                        {
                            marginRight: 30
                        }]}
                        onPress={() => this.handleSubmit()}
                    >
                        <Text
                            style={styles.buttonText}
                        >
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignSelf: "center"

    },
    tab1: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 20
    },
    button: {
        borderColor: "#3498DB",
        backgroundColor: "#3498DB",
        borderRadius: 25,
        height: height * 0.1,
        width: height * 0.20,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    input: {
        width: 250,
        height: 44,
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#e8e8e8',
        color: "#3498DB",
    },
    buttonText: {
        fontWeight: "bold",
        color: "white"
    }
})