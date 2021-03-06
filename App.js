import React, { Fragment, Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import ListaDeProfessores from './src/paginas/ListaDeProfessores';
import ListaProfessorLogado from './src/paginas/ListaProfessorLogado';
import DetalheDoProfessor from './src/paginas/DetalheDoProfessor';
import EditarProgramacao from './src/paginas/EditarProgramacao';
import Login from './src/paginas/Login';

class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppStack = createStackNavigator({
  ListaDeProfessores: ListaDeProfessores,
  DetalheDoProfessor: DetalheDoProfessor,
  Login: Login
});

const AppStackAfterLogin = createStackNavigator({
  ListaProfessorLogado: ListaProfessorLogado,
  EditarProgramacao: EditarProgramacao
});

const AuthStack = createStackNavigator({ SignIn: ListaDeProfessores });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      AppLogado: AppStackAfterLogin,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
