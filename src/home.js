import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {

        


        firestore()
            .collection('subject')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                });
            });
    }


    logout =async () => {
      await  auth()
            .signOut()
          .then(() => {
              this.props.navigation.navigate("login")
              console.log('User signed out!')
          });
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        ECS Teacher  Admin
                    </Text>
                </View>

                <View style={styles.tab1}>
                   


                    <TouchableOpacity
                        style={[styles.button,
                        {
                            marginRight: 30
                        }]}
                        onPress={() => this.props.navigation.navigate("ChapterPoint")}

                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 16,
                                color: "white",
                                textAlign: "center"
                            }}
                        >
                            Chapter
                        </Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button,
                        {
                            // marginRight: 30
                        }]}

                        onPress={() => this.props.navigation.navigate("Lecture")}

                    >
                        <Text
                            style={styles.buttonText}
                        >
                            Lecture
                        </Text>

                    </TouchableOpacity>
                </View>
                <View style={styles.tab1}>
                    <TouchableOpacity
                        style={[styles.button,
                        {
                            marginRight: 30
                        }]}

                        onPress={() => this.props.navigation.navigate("Meet")}

                    >
                        <Text
                            style={styles.buttonText}
                        >
                            MEET
                        </Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button,
                        {
                        }]}

                        onPress={() => this.logout()}

                    >
                        <Text
                            style={styles.buttonText}
                        >
                            LOGOUT
                        </Text>

                    </TouchableOpacity>




                </View>
                <View style={styles.tab1}>
                   
                    
                  


                </View>
                {/* <View style={styles.tab1}>
                    <TouchableOpacity
                        style={[styles.button,
                        {
                            marginRight: 30
                        }]}

                        onPress={() => this.props.navigation.navigate("addTeacher")}

                    >
                        <Text
                            style={styles.buttonText}
                        >
                            Add Teacher
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button,
                        {
                        }]}

                        onPress={() => this.props.navigation.navigate("teacherToSubject")}

                    >
                        <Text
                            style={styles.buttonText}
                        >
                            Teacher to subject
                        </Text>

                    </TouchableOpacity>


                </View> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"

    },

    tab1: {
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "center",
    },
    button: {
        borderColor: "#3498DB",
        borderWidth: 2,
        backgroundColor: "#3498DB",
        borderRadius: 50,
        height: height * 0.15,
        width: height * 0.20,
        justifyContent: "center",
        // paddingLeft: height * 0.035,
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "white",

    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: height * 0.02,


    },

    headerText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "red"
    }


})

