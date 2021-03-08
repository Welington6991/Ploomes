import React, { memo, useState, useEffect } from 'react';

import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity, Image, Alert, ScrollView, Button } from 'react-native';

import { nameValidator } from '../core/utils';

import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/FontAwesome';

import Input from './TextInput';

const ModalDepartment = ({toggle}) => {
    const [name, setName] = useState({ value: '', error: '' });

    const saveCompany = () => {
        const nameError = nameValidator(name.value);

        if (nameError || emailError) {
            setEmail({ ...name, error: nameError });
            return;
        }

        // navigation.navigate('Dashboard');
    };

    return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Novo Departamento</Text>
                </View>
                <ScrollView>
                    <Input
                        placeholder="Departamento"
                        returnKeyType="next"
                        value={name.value}
                        onChangeText={text => setName({ value: text, error: '' })}
                        error={!!name.error}
                        errorText={name.error}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                    />

                    <View style={styles.buttons}>
                    <TouchableOpacity style={styles.save} onPress={() => navigation.goBack()}>
                        <Text style={styles.textSave}>Salvar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancel} onPress={toggle}>
                        <Text style={styles.textCancel}>Cancelar</Text>
                    </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#6759c0',
        width: '100%',
        height: 120
    },
    title: {
        color: '#fff',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 25
    },
    image: {
        width: 24,
        height: 24
    },
    back: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20
    },
    container: {
        backgroundColor: '#eee'
    },
    safe: {
        flex: 1,
        backgroundColor: '#6759c0'
    },
    textInput: {
        width: '90%',
        alignSelf: 'center'
    },
    addRemove: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 20
    },
    save: {
        width: '50%',
        height: 50,
        backgroundColor: '#6759c0',
        padding: 3,
        borderRadius: 25,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    cancel: {
        width: '50%',
        height: 50,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#6759c0',
        padding: 3,
        borderRadius: 25,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    remove: {
        width: 25,
        height: 25,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#6759c0',
        padding: 3
    },
    textPhone: {
        textAlign: 'center'
    },
    textPhoneWhite: {
        textAlign: 'center',
        color: '#fff'
    },
    buttons: {
        alignItems: 'center'
    },
    textSave: {
        color: '#fff'
    },
    textCancel: {
        color: '#6759c0'
    }
});

export default memo(ModalDepartment);