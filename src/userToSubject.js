import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Dimensions,
    Checkbox,
} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const height = Dimensions.get('window').height

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chap: [],
            chapterName: "",
            email: "",
            subject: "",
            sub: [],
            subUser: []
        }
    }

    componentDidMount = async () => {
        await firestore()
            .collection('UsersCreated')
            .onSnapshot(querySnapshot => {
                const users = [];

                querySnapshot.forEach(documentSnapshot => {

                    users.push(
                        documentSnapshot.data(),
                        // key: documentSnapshot.id,
                    );
                });

                console.log(users);
                this.setState({ chap: users })
                // console.log("newchap", users)
            })

        await firestore()
            .collection('subject')
            .onSnapshot(querySnapshot => {
                const users = [];

                querySnapshot.forEach(documentSnapshot => {

                    users.push(
                        documentSnapshot.data().sub,
                        // key: documentSnapshot.id,
                    );
                });

                console.log("sub", users);
                this.setState({ sub: users })
                // console.log("newchap", users)
            })
    }

    getUserEnrolled = async () => {

        await firestore()
            .collection('UsersCreated')
            .doc(this.state.email)
            .get()
            .then(documentSnapshot => {
                console.log('User exists: ', documentSnapshot.exists);

                if (documentSnapshot.exists) {
                    console.log('User data: ', documentSnapshot.data().chapters);
                    this.setState({ subUser: documentSnapshot.data().chapters })
                }
            });

        console.log("subnew", this.state.subUser)
    }

    handleSubmit = async () => {

        await this.getUserEnrolled()

        if (this.state.subUser.includes(this.state.subject) == false) {
            this.state.subUser.push(this.state.subject)
            console.log("NEW");
            console.log("subnew", this.state.subUser)

            await firestore()
                .collection('UsersCreated')
                .doc(this.state.email)
                .update({
                    chapters: this.state.subUser,
                })
                .then(() => {
                    console.log('User updated!');
                });
        }
        else {
            console.log("already exists");
        }


    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontWeight: "bold" }}>
                    Select email
                </Text>
                <Picker
                    selectedValue={this.state.email}
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({ email: itemValue })

                    }
                    }
                >
                    {
                        this.state.chap.map((x, i) => {
                            return (
                                <Picker.Item label={x.email} value={x.email} key={i} />
                            )
                        })
                    }
                </Picker>
                <View style={styles.tab1}>
                    <TouchableOpacity
                        style={[styles.button,
                        {
                            marginRight: 30,
                            height: height * 0.05,
                            width: height * 0.20,

                        }]}
                        onPress={() => this.getUserEnrolled()}
                    >
                        <Text
                            style={styles.buttonText}
                        >
                            Get Enrolled users
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ fontWeight: "bold", paddingTop: 15 }}>
                    {`Subject enrolled : ${this.state.subUser.join()} `}
                    {/* {console.log("sub user", this.state.subUser)} */}
                </Text>
                <Picker
                    selectedValue={this.state.subject}
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ subject: itemValue })
                    }
                >
                    {
                        this.state.sub.map((x, i) => {
                            return (
                                <Picker.Item label={x} value={x} key={i} />
                            )
                        })
                    }
                </Picker>


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