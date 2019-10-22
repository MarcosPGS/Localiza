import React, { Component } from 'react';
import {
  AsyncStorage,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';
import { fetchTest } from '../servicos/main';
const logo = require('../../assets/images/logo.png');

export default class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showMessage: false,
      isLoading: false
    };
  }

  handleUsername = text => {
    this.setState({ username: text });
  };

  handlePassword = text => {
    this.setState({ password: text });
  };

  enableMessageError = () => {
    this.setState({ showMessage: true });
    setTimeout(() => this.setState({ showMessage: false }), 2000);
  };

  loginAction = async () => {
    const { username, password } = this.state;

    const professores = await fetchTest();
    let professor = null;


    for (let index = 0; index < professores.data.length; index++) {
      const element = professores.data[index];
      if (username === element.cpf && password === element.cpf) {
        professor = element;
      }
    }

    if (professor === null) {
      this.enableMessageError();
    } else {
      this.props.navigation.navigate('ListaProfessorLogado', {
        professor: professor,
      });
    }
  };

  render() {
    const { username, password, showMessage } = this.state;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Content>
            {showMessage && (
              <View style={styles.bxMessage}>
                <Text style={styles.textMessage}>
                  Usuário ou senha inválido.
                </Text>
              </View>
            )}
            <View style={styles.bxLogo}>
              <Image style={styles.stretch} source={logo} />
            </View>
            <Form>
              <Item floatingLabel>
                <Label>Usuário</Label>
                <Input
                  value={username}
                  onChangeText={text => {
                    this.handleUsername(text);
                  }}
                />
              </Item>
              <Item floatingLabel last>
                <Label>Senha</Label>
                <Input
                  value={password}
                  secureTextEntry={true}
                  onChangeText={text => {
                    this.handlePassword(text);
                  }}
                />
              </Item>
              <TouchableOpacity
                style={styles.entrar}
                onPress={() => this.loginAction()}>
                <Text style={styles.textButton}>ENTRAR</Text>
              </TouchableOpacity>
            </Form>
          </Content>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: 'rgba(210, 210, 210, 0.3)',
  },
  textInputUsername: {
    marginTop: 70,
  },
  textInputPassword: {
    marginTop: 5,
  },
  bxLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  stretch: {
    width: 150,
    height: 150,
  },
  btnLogin: {
    marginTop: 30,
    height: 50,
  },
  entrar: {
    marginTop: 25,
    backgroundColor: 'rgb(102, 0, 255)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  bxMessage: {
    position: 'absolute',
    top: 0,
    height: 30,
    width: '100%',
    backgroundColor: 'rgba(255, 97, 97, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMessage: {
    fontWeight: 'bold',
    color: 'white',
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
  },
});
