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
        <CardItem>
          <View style={{width: '30%', marginTop: 9}}>
            <Text style={{fontSize: 26}}>{x.horarioEntrada}</Text>
            <Text style={{fontSize: 26}}>{x.horarioSaida}</Text>
          </View>
          <View>
            <Text style={styles.nomeCurso}>{x.nome}</Text>
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
                <Icon name="exclamation-triangle" size={20} color="black" /> ANOTAÇÕES:
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
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '30%'}}>
            <Image
              source={require('../../assets/images/usuario_anonimo.jpg')}
              style={styles.nerdImage}
            />
          </View>
          <View style={{width: '60%', marginTop: 20, marginLeft: 20}}>
            <Text style={styles.itemThreeSubtitle} numberOfLines={1}>
              Prof.
            </Text>
            <Text style={styles.itemThreeTitle}>{x.professores[0].nome}</Text>
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
  },
  itemThreeTitle: {
    fontSize: 16,
    color: '#5F5F5F',
  },
  button: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  nomeCurso: {
    color: '#4700b3',
  },
  nomeDisciplina: {
    fontSize: 12,
  },
  semestre: {
    fontSize: 12,
  },
  local: {
    color: '#b380ff',
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
  anotacao: {
  },
});
