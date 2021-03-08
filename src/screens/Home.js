import React, { memo } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <View style={[styles.parent]}>
                    <TouchableOpacity style={[styles.child]} onPress={() => navigation.navigate('List')}>
                        <Text style={styles.textChild}>Pessoas</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={[styles.child]} onPress={() => navigation.navigate('List')}>
                    <Text style={styles.textChild}>Empresas</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#6759c0'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    parent: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    child: {
        width: '40%',
        height: 1,
        margin: '5%',
        borderRadius: 48,
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: '#6759c0',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textChild: {
        color: '#6759c0',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default memo(Home);