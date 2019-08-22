import React, {Component} from 'react';
import {
  AsyncStorage,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
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
    };
  }

  handleUsername = text => {
    this.setState({username: text});
  };

  handlePassword = text => {
    this.setState({password: text});
  };

  render() {
    const {username, password} = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Content>
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
                  onChangeText={text => {
                    this.handlePassword(text);
                  }}
                />
              </Item>
              <Button
                block
                info
                style={styles.entrar}
                onPress={this._signInAsync}>
                <TouchableOpacity>
                  <Text>ENTRAR</Text>
                </TouchableOpacity>
              </Button>
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
  },
});
