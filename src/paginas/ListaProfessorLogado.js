import React, { Component } from 'react';
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
import { fetchTest } from '../servicos/main';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ListaProfessorLogado extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            professor: []
        };
        this.arrayholder = [];
        this.professor = props.navigation.getParam('professor');

    }

    componentDidMount = async () => {
        const professor = this.props.navigation.getParam('professor');

        this.setState(
            {
                isLoading: false,
                professor: professor.disciplinas,
            },
            function () {
                this.arrayholder = professor.disciplinas;
            },
        );
    };

    keyExtractor = (item, index) => index.toString();

    _openArticle = (professor, disciplina) => {
        this.props.navigation.navigate('EditarProgramacao', { professor: professor, disciplina: disciplina });
    };

    renderRowOne = ({ item, index }) => {

        const programacao = `Programação ${index + 1}`;
        const localizacao = `Bloco: ${item.bloco} Sala: ${item.sala}`

        return (
            <TouchableOpacity
                style={styles.itemThreeContainer}
                onPress={() => this._openArticle(this.professor, item)}>
                <View style={styles.itemThreeSubContainer}>
                    <View style={styles.itemThreeContent}>
                        <Text style={styles.itemThreeBrand} numberOfLines={1}>{`${programacao}`} </Text>
                        <View>
                            <Text style={styles.itemThreeSubtitle}>{`${item.semestre}º Semestre`}</Text>
                            <Text style={styles.itemThreeTitle}>{`${item.diaSemana}`}</Text>
                            <View style={{ backgroundColor: 'gold', padding: 7, borderRadius: 5, width: '50%' }}>
                                <Text style={styles.semestre}> {`${localizacao}`} </Text>
                            </View>
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
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={(_, index) => `${index}`}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{ backgroundColor: 'white', paddingHorizontal: 15, flex: 1 }}
                    data={this.state.professor}
                    renderItem={this.renderRowOne}
                />
            </View>
        );
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };


    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.getParam('professor').nome,
        headerStyle: {
            backgroundColor: 'rgb(72,160,220)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerRight: (
            <View style={{ marginRight: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate('ListaDeProfessores')}>
                    <Icon name="sign-out" size={30} color="white" /><Text style={{ color: 'white' }}>Sair</Text>
                </TouchableOpacity>
            </View>
        ),
    });

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
        fontSize: 13,
        color: '#5F5F5F',
    },
    itemThreeSubtitle: {
        fontSize: 12,
        color: '#a4a4a4',
    },
    itemThreePrice: {
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
        fontSize: 13,
        color: '#000',
        fontWeight: 'bold'
    },
});
