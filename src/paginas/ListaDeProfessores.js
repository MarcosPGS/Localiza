import React, {Component} from 'react';
import {
  AsyncStorage,
  Button,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {fetchTest} from '../servicos/main';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ListaDeProfessores extends Component {
  static navigationOptions = {
    title: 'Lista de Professores',
    headerStyle: {
      backgroundColor: 'rgb(72,160,220)',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      professores: [],
      disciplinas: [],
    };
  }
  componentDidMount = async () => {
    const professores = await fetchTest();
    this.setState({
      professores: professores.data,
    });
  };

  keyExtractor = (item, index) => index.toString();

  _openArticle = article => {
    this.props.navigation.navigate('DetalheDoProfessor', {
      article,
    });
  };

  renderRowOne = ({item}) => {
    const nomeDisicplina = item.disciplinas.reduce((value, current) => {
      return `${value} ${current.nome}`;
    }, '');

    const semestre = item.disciplinas.reduce((value, current) => {
      return `${value} ${current.semestre}`;
    }, '');

    const curso = item.disciplinas.reduce((value, current) => {
      return `${value} ${current.curso}`;
    }, '');
    const turno = item.disciplinas.reduce((value, current) => {
      return `${value} ${current.turno}`;
    }, '');
    return (
      <TouchableOpacity
        style={styles.itemThreeContainer}
        onPress={() => this._openArticle(item)}>
        <View style={styles.itemThreeSubContainer}>
          <Image
            source={require('../../assets/images/usuario_anonimo.jpg')}
            style={styles.itemThreeImage}
          />
          <View style={styles.itemThreeContent}>
            <Text style={styles.itemThreeBrand} numberOfLines={1}>
              {/* {`Prof. ${nomes}`} */}
              {item.nome}
            </Text>
            <View>
              <Text style={styles.itemThreeSubtitle}>{`${curso}`}</Text>
              <Text style={styles.itemThreeTitle}>{`${nomeDisicplina}`}</Text>
              <Text style={styles.semestre}>
                {`${semestre}° Semestre - ${turno}`}
              </Text>
            </View>
            <View style={styles.itemThreePrice}>
              <Icon name="chevron-right" size={20} color="black" />
            </View>
          </View>
        </View>
        <View style={styles.itemThreeHr} />
      </TouchableOpacity>
    );
  };

  render() {
    // console.warn(this.state.disciplina);

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(_, index) => `${index}`}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{backgroundColor: 'white', paddingHorizontal: 15, flex: 1}}
          data={this.state.professores}
          renderItem={this.renderRowOne}
        />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemThreeContainer: {
    backgroundColor: 'white',
  },
  itemThreeSubContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  itemThreeImage: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#617ae1',
  },
  itemThreeTitle: {
    fontSize: 16,
    color: '#5F5F5F',
  },
  itemThreeSubtitle: {
    fontSize: 12,
    color: '#a4a4a4',
  },
  itemThreePrice: {
    // fontSize: 31,
    // color: '#cccccc',
    position: 'absolute',
    top: 50,
    right: 0,
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  semestre: {
    fontSize: 10,
  },
});
