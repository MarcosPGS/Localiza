import React, {Component} from 'react';
import {
  AsyncStorage,
  View,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import {fetchTest} from '../servicos/main';
import {Card, CardItem, Body, Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class DetalheDoProfessor extends Component {
  static navigationOptions = {
    title: 'Detalhes',
  };
  keyExtractor = (item, index) => index.toString();
  renderItemGradeHoraria = ({item}) => {
    const x = this.props.navigation.getParam('article');
    return (
      <Card>
        <CardItem style={styles.curso}>
          <View style={styles.nomeCurso}>
            <Text style={styles.nomeCurso2}>{x.nome}</Text>
          </View>
        </CardItem>

        <CardItem>
          <View style={styles.horario}>
            <Text style={styles.horarioEntrada}>{x.horarioEntrada}</Text>
            <Text style={styles.horarioSaida}>{x.horarioSaida}</Text>
          </View>
          <View style={styles.informacoes}>
            <Text style={styles.nomeDisciplina}>{x.disciplina}</Text>
            <Text style={styles.semestre}>{x.semestre}° Semestre</Text>
            <Text style={styles.local}>
              Bloco: {x.bloco} Sala: {x.sala}
            </Text>
          </View>
        </CardItem>

        <CardItem style={styles.cardObservacao}>
          <View style={{marginTop: 9}}>
            <View>
              <Text style={styles.anotacao}>
                <Icon name="exclamation-triangle" size={20} color="black" />{' '}
                ANOTAÇÕES:
              </Text>
            </View>
            <View>
              <Text style={styles.textoObservacao}>
                {x.professores[0].anotacao}
              </Text>
            </View>
          </View>
        </CardItem>
      </Card>
    );
  };
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  render() {
    const x = this.props.navigation.getParam('article');
    return (
      <ScrollView>
        <View style={styles.imagenProfessor}>
          <View style={{width: '30%'}}>
            <Image
              source={require('../../assets/images/usuario_anonimo.jpg')}
              style={styles.nerdImage}
            />
          </View>
          <View style={{width: '60%', marginTop: 20, marginLeft: 20}}>
            <Text style={styles.itemThreeSubtitle} numberOfLines={1}>
              Prof.
              <Text style={styles.itemThreeTitle}>{x.professores[0].nome}</Text>
            </Text>
          </View>
        </View>

        <View style={{padding: 5, marginTop: 10}}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.renderItemGradeHoraria}
            renderItem={this.renderItemGradeHoraria}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  nerdImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imagenProfessor: {
    alignItems: 'center',
    marginTop: 15,
  },
  availableText: {
    color: 'white',
    fontSize: 24,
  },
  textContainer: {
    alignItems: 'center',
  },
  itemThreeSubtitle: {
    fontSize: 12,
    color: '#a4a4a4',
    paddingLeft: 30,
  },
  itemThreeTitle: {
    fontSize: 16,
    color: '#5F5F5F',
  },
  button: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  nomeDisciplina: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
  },
  nomeCurso: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nomeCurso2: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Lato',
    textAlign: 'justify',
  },
  semestre: {
    fontSize: 12,
  },
  local: {
    color: 'black',
    backgroundColor: '#edcc0e',
    borderRadius: 14,
    padding: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  cardObservacao: {
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  textoObservacao: {
    marginTop: 10,
    fontFamily: 'Lato-Thin',
    fontSize: 15,
    textAlign: 'justify',
  },
  horario: {
    width: 90,
    alignItems: 'center',
    borderRightWidth: 1,
    marginRight: 1,
  },
  horarioEntrada: {
    fontSize: 18,
    color: '#fff',
    borderRadius: 14,
    borderColor: 'black',
    backgroundColor: 'rgb(72,160,220)',
    padding: 6,
    marginBottom: 2,
  },
  horarioSaida: {
    fontSize: 18,
    color: '#fff',
    borderRadius: 14,
    backgroundColor: 'rgb(74,164,92)',
    padding: 6,
  },
  informacoes: {
    marginLeft: 10,
    textAlign: 'justify',
  },
  curso: {
    backgroundColor: 'rgb(72,160,220)',
  },
});
