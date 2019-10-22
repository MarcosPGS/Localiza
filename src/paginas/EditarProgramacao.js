import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Input, Label, Form, Item, Textarea } from 'native-base';
import { fetchTest, putAnotacao } from '../servicos/main';
import AwesomeAlert from 'react-native-awesome-alerts';
// const fetchTest = require('../mock/lista_professor.json');
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from 'react-native-elements';
let propsStatic = null;

export default class ListaDeProfessores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert: false,
      professores: [],
      disciplinas: [],
      bloco: props.navigation.state.params.disciplina.bloco,
      sala: props.navigation.state.params.disciplina.sala,
      anotacao: props.navigation.state.params.professor.anotacao,
      isLoading: false,
    };
  }
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
 
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };
  handlerSala = sala => {
    this.setState({ sala });
  };

  handleAnotacao = anotacao => {
    this.setState({ anotacao });
  };

  handlerBloco = bloco => {
    this.setState({ bloco });
  };

  editarProgramacao = () => {
    let EditarAnotacaoProfessor = this.props.navigation.getParam('professor');
    EditarAnotacaoProfessor.anotacao = this.state.anotacao;
    putAnotacao(EditarAnotacaoProfessor).then(resp => {
      // alert('Altecao feita com sucesso!');
      this.showAlert();
    }).catch(err => {
      alert('Erro ao fazer alteração');
    });
  }

  render() {
    const {showAlert} = this.state;
    const { bloco, sala, anotacao } = this.state;
    const { navigation } = this.props;
    const disciplina = navigation.getParam('disciplina');

    return (
      <View style={styles.container}>
        <View>
          <Text style={{ backgroundColor: '#e2e2e2', padding: 2, width: '15%' }}>
            Curso:
          </Text>
          <Text style={styles.textEstatico}>{disciplina.curso}</Text>

        </View>
        <View style={{ flexDirection: 'row', marginTop: 3 }}>
          <View style={{ width: '50%' }}>
            <Text
              style={{ backgroundColor: '#e2e2e2', padding: 5, width: '50%' }}>
              Semestre
            </Text>
            <Text style={styles.textEstatico}>{`${disciplina.semestre}º`}</Text>
          </View>
          <View style={{ width: '50%' }}>
            <Text
              style={{ backgroundColor: '#e2e2e2', padding: 5, width: '50%'}}>
              Turno
            </Text>
            <Text style={styles.textEstatico}>{disciplina.turno}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 3 }}>
          <View style={{ width: '50%' }}>
            <Text
              style={{ backgroundColor: '#e2e2e2', padding: 5, width: '50%' }}>
              Bloco
          </Text>
          <Text style={styles.textEstatico}>{bloco}</Text>
          </View>
          <View style={{ width: '50%' }}>
            <Text
              style={{ backgroundColor: '#e2e2e2', padding: 5, width: '50%' }}>
              Sala:
          </Text>
          <Text style={styles.textEstatico}>{sala}</Text>
          </View>
        </View>

        {/* <View>
          <Text style={{ backgroundColor: '#e2e2e2', padding: 5, width: '25%' }}>
            Bloco
          </Text>
          <Text>{bloco}</Text>
        </View>

        <View>
          <Text style={{ backgroundColor: '#e2e2e2', padding: 5, width: '25%' }}>
            Sala:
          </Text>
          <Text>{sala}</Text>
          
        </View> */}

        <Form style={{ marginTop: 10 }}>
          {/* <Item style={{ marginTop: 5 }} regular> */}
            <Textarea
              style={{ width: '100%' }}
              rowSpan={5}
              value={anotacao}
              bordered
              placeholder="Anotação"
              onChangeText={text => {
                this.handleAnotacao(text);
              }}
            />
          {/* </Item> */}

          <TouchableOpacity
            style={styles.entrar}
            onPress={() => this.editarProgramacao() }>
            <Text style={styles.textButton}>Concluir</Text>
          </TouchableOpacity>
        </Form>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Concluida!"
          message="Alteração feita Com Sucesso!"
          showConfirmButton={true}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          confirmButtonColor="#53b771"
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
    );
  }

  static navigationOptions = {
    title: 'Edição de programação',
    headerStyle: {
      backgroundColor: 'rgb(72,160,220)',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  entrar: {
    marginTop: 25,
    backgroundColor: 'rgb(102, 0, 255)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
  },
  textEstatico:{
    fontWeight: 'bold' 
  },
  nome: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Lato',
    textAlign: 'justify',

    backgroundColor: '#e2e2e2',
     padding: 5,
      width: '50%' 
  },
});
