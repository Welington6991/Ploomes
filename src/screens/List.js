import React, { Component, memo, useState, useEffect } from 'react';

import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity, Image, Platform } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

const List = ({ navigation }) => {
    const perPage = 20;
    const searchTerm = 'react';
    const baseURL = 'https://api.github.com';

    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [connection, setConnection] = useState(true);

    useEffect(() => {
        unsubscribe()
        loadRepositories()
    }, []);

    const unsubscribe = () => {
        NetInfo.addEventListener(state => {
            setConnection(state.isConnected)
        });
    }

    const loadRepositories = async () => {
        if(connection){
            if (loading) return;

            setLoading(true)

            const response = await fetch(`https://api2.ploomes.com/Contacts?$filter=TypeId eq 2&$top=${perPage}&$skip=${page}`, { headers: { "user-key": "2BD1197FDBD2D798ACC4C9622C14023EE755E195C6078D7B81D436D612D9522AD9E7780F6D67A74C78C76C9D36579121B162630C3C484A3E153455389BEF4269" } });
            const repositories = await response.json();

            if (repositories.value['length']) {
                setData([...data, ...repositories.value]);
                setPage(page + perPage);
                await AsyncStorage.setItem('pessoas', JSON.stringify(data));
                if (repositories.value['length'] < 20)
                    setLoading(true)
                else
                    setLoading(false)
            }
        }else{
            var pessoas = await AsyncStorage.getItem('pessoas')
            if(pessoas){
                pessoas = JSON.parse(pessoas)
                setData(pessoas)
            }
            return
        }
    }

    const renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <Text style={styles.text}>{item.Name}</Text>
            <TouchableOpacity style={styles.edit} onPress={() => navigation.navigate('Form', {id: item.Id})}>
                <Image style={[styles.image, { resizeMode: 'contain' }]} source={require('../assets/icons/edit.png')} />
            </TouchableOpacity>
        </View>
    );

    const renderFooter = () => {
        if (loading) return null;
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#6759c0" />
            </View>
        );
    };

    const FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#fff",
                }}
            />
        );
    }

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                        <Image style={[styles.image, { resizeMode: 'contain' }]} source={require('../assets/icons/arrow.png')} />
                    </TouchableOpacity>

                    <Text style={styles.title}>Pessoas</Text>

                    <TouchableOpacity style={styles.add} onPress={() => navigation.navigate('Form', {id: ''})}>
                        <Image style={styles.image} source={require('../assets/icons/add.png')} />
                        <Text style={styles.textAdicionar}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
                {connection ? null : <View style={styles.offline}>
                    <Text style={styles.textOffline}>Você está offline</Text>
                </View>}
                <FlatList
                    style={{ marginTop: 30 }}
                    contentContainerStyle={styles.list}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.Id}
                    onEndReached={loadRepositories}
                    onEndReachedThreshold={0}
                    ListFooterComponent={renderFooter}
                    ItemSeparatorComponent={FlatListItemSeparator}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#6759c0',
        width: '100%',
        height: 150
    },
    offline: {
        backgroundColor: 'red',
        width: '100%',
        height: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textOffline: {
        color: '#fff',
        textAlign: 'center'
    },
    list: {
        paddingHorizontal: 20,
    },
    text: {
        color: '#000',
        fontWeight: 'bold'
    },
    title: {
        color: '#fff',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    add: {
        width: '50%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row'
    },
    back: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20
    },
    textAdicionar: {
        color: '#fff',
        fontWeight: 'bold',
        paddingLeft: 10
    },
    image: {
        width: 24,
        height: 24
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    listItem: {
        backgroundColor: '#eee',
        padding: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    loading: {
        alignSelf: 'center',
        marginVertical: 20,
    },
    safe: {
        flex: 1,
        backgroundColor: '#6759c0'
    },
});

export default memo(List);