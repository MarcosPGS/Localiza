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
  ActivityIndicator,
} from 'react-native';
import {fetchTest} from '../servicos/main';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SearchBar} from 'react-native-elements';

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
  // state = {
  //   search: '',
  // };

  updateSearch = search => {
    // eslint-disable-next-line no-undef
    this.setState({search: this.state});
  };
  constructor(props) {
    super(props);
    this.state = {
      professores: [],
      disciplinas: [],
      search: '',
      isLoading: true,
    };
    this.arrayholder = [];
  }
  componentDidMount = async () => {
    const professores = await fetchTest();
    this.setState(
      {
        isLoading: false,
        professores: professores.data,
      },
      function() {
        this.arrayholder = professores.data;
      },
    );
  };

  search = text => {
    console.warn(text);
  };

  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    //passando o texto inserido em textInput
    const newData = this.arrayholder.filter(function(item) {
      //aplicando o filtro ao texto inserido na barra de pesquisa
      const itemData = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //configurando o newData filtrando na fonte de dados
      // depois de definir os dados, ele rederiza automaticamente novamente a exibiçao
      professores: newData,
      search: text,
    });
  }

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
              Prof. {item.nome}
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
    if (this.state.isLoading) {
      return (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <SearchBar
          // round
          lightTheme
          searchIcon={{size: 24}}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Nome Professor..."
          value={this.state.search}
        />
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
