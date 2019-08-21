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
  };

  constructor(props) {
    super(props);
    this.state = {
      cursos: [],
      professores: [],
    };
  }
  componentDidMount = async () => {
    const cursos = await fetchTest();
    this.setState({
      cursos: cursos.data,
    });
  };

  keyExtractor = (item, index) => index.toString();

  _openArticle = article => {
    this.props.navigation.navigate('Other', {
      article,
      abc: {
        a: 10,
      },
    });
  };

  renderRowOne = ({item}) => {
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
            <Text style={styles.itemThreeBrand}>{item.nome}</Text>
            <View>
              <Text style={styles.itemThreeSubtitle} numberOfLines={1}>
                Prof.
              </Text>
              <Text style={styles.itemThreeTitle}>Nome Professor</Text>
              <Text style={styles.itemThreeTitle}>
                {item.semestre}° {item.disciplina}
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
    // console.warn(this.state.professores);

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(_, index) => `${index}`}
          style={{backgroundColor: 'white', paddingHorizontal: 15}}
          data={this.state.cursos}
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
    height: 100,
    width: 100,
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
});
