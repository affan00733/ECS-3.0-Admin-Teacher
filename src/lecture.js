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
import { Picker } from '@react-native-picker/picker';
import auth from '@react-native-firebase/auth';

const height = Dimensions.get('window').height

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sub: [],
            chap: [],
            chapterName: "",
            subject: "",
            lecture: "",
            lectureLink: "",
            chapter: [],
            ch: [],
            userEmail : ""
        }
    }

    componentDidMount = async () => {

        await auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user.email)
                this.setState({ userEmail: user.email })
            }

        })


        // await firestore()
        //     .collection('subject')
        //     .onSnapshot(querySnapshot => {
        //         const users = [];

        //         querySnapshot.forEach(documentSnapshot => {

        //             users.push(
        //                 documentSnapshot.data().sub,
        //                 // key: documentSnapshot.id,
        //             );
        //         });

        //         console.log(users);
        //         this.setState({ sub: users })
        //         // console.log("newchap", users)
        //     })
        
        
        await firestore()
            .collection('TeacherCreated')
            .doc(this.state.userEmail)
            .get()
            .then(documentSnapshot => {
                console.log('User exists: ', documentSnapshot.exists);

                if (documentSnapshot.exists) {
                    console.log('User data: ', documentSnapshot.data().subjects);
                    this.setState({ sub: documentSnapshot.data().subjects })
                }
            });


    

        await firestore()
            .collection('chapter')
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
                // console.log("newchap", this.state.chap)
            })
    }


    handleSubmit = async () => {
        console.log(this.state.subject);
        let timestamp = Date.now()
        console.log(this.state.chapterName);
        await firestore()
            .collection('lecture')
            .add({
                sub: this.state.subject,
                chapterName: this.state.chapterName,
                lecture: this.state.lecture,
                lectureLink: this.state.lectureLink,
                timestamp: Date.now()
            })
            .then(() => {
                console.log('chapter added!');
                alert("chapter  added!")
                this.props.navigation.navigate("Home")

            });
    }

    render = () => {
        return (
            <View style={styles.container}>
                <Text style={{ fontWeight: "bold" }}>
                    Select Subject
                </Text>
                <Picker
                    selectedValue={this.state.subject}
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({ subject: itemValue })

                    }
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

                <Text style={{ fontWeight: "bold" }}>
                    Select Chapter
                </Text>


                <Picker

                    selectedValue={this.state.chapterName}
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({ chapterName: itemValue })
                    }
                    }
                >
                    <Picker.Item label={"select item"} value={"select item"} key={101} />
                    {
                        // console.log(this.state.chap.includes(this.state.subject))
                        this.state.chap.filter(x => this.state.subject == x.sub).map((x, i) => {
                            return (
                                <Picker.Item label={x.chapterName} value={x.chapterName} key={i} />
                            )

                        })

                    }
                </Picker>
                <TextInput
                    style={styles.input}
                    placeholder="Enter lecture  name"
                    underlineColorAndroid="blue"
                    onChangeText={(text) => this.setState({ lecture: text })}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter lecture link"
                    underlineColorAndroid="blue"
                    onChangeText={(text) => this.setState({ lectureLink: text })}
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