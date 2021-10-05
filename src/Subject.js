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

const height = Dimensions.get('window').height

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sub: "",
            thumbnail: ""
        }
    }

    handleSubmit = async () => {
        await firestore()
            .collection('subject')
            .doc(this.state.sub)
            .set({
                sub: this.state.sub,
                thumbnail: this.state.thumbnail,
                
            })
            .then(() => {
                console.log('sub added!');
                alert("subject added!")
                this.props.navigation.navigate("Home")
            });

    }

    render() {
        return (
            <View style={styles.container}>

                <TextInput
                    style={styles.input}
                    placeholder="Enter subject name"
                    underlineColorAndroid="blue"
                    onChangeText={(text) => this.setState({ sub: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Thumbnail in two words"
                    underlineColorAndroid="blue"
                    onChangeText={(text) => this.setState({ thumbnail: text })}
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