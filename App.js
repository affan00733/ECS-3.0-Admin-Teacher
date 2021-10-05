import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/home'
import Subject from './src/Subject'
import ChapPoint from './src/chapPoint'
import Meet from './src/meet'
import UsersCreated from './src/addUser'
import Lecture from "./src/lecture"
import userToSubject from "./src/userToSubject"
import addTeacher from "./src/addTeacher"
import teacherToSubject from "./src/teacherToSubject"
import login from "./src/login"

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="login" component={login} />

      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen name="ChapterPoint" component={ChapPoint} />

      <Stack.Screen name="Meet" component={Meet} />
      <Stack.Screen name="Lecture" component={Lecture} />



    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}