import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Dimensions
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
        }
    }

    handleSubmit = async () => {
        await auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                firestore()
                    .collection('TeacherCreated')
                    .doc(this.state.email)
                    .set({
                        email: this.state.email,
                        password: this.state.password,
                        subjects: []
                    })
                    .then(() => {
                        console.log('Teacher added!');
                        alert("Teacher added!")
                        this.props.navigation.navigate("Home")
                    });
            })


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