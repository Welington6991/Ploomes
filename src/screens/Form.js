import React, { memo, useState, useEffect } from 'react';

import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity, Image, Alert, ScrollView, Button } from 'react-native';

import { nameValidator, emailValidator } from '../core/utils';

import { StackNavigator, NavigationActions, StackActions } from "react-navigation";

import Modal from 'react-native-modal';

import SelectPicker from 'react-native-form-select-picker';

import Icon from 'react-native-vector-icons/FontAwesome';

import Input from '../components/TextInput';
import ModalCompany from '../components/ModalCompany'

const List = ({ navigation }) => {
    const [selected, setSelected] = useState(0);
    const [modalCompany, setModalCompany] = useState(false);
    const [phone, setPhone] = useState([{ value: '', error: '' }]);
    const [lastPhone, setLastPhone] = useState(phone['length']);
    const [name, setName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [facebook, setFacebook] = useState({ value: '', error: '' });
    const [skype, setSkype] = useState({ value: '', error: '' });
    const [company, setCompany] = useState({ value: '', error: '' });
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);

    const { id } = navigation.state.params

    useEffect(() => {
        if(id){
            data()
        }
        companyRequest()
    }, []);

    const data = async () => {
        setLoading(true)
        const response = await fetch(`https://api2.ploomes.com/Contacts?$filter=Id eq ${id}`, { headers: { "user-key": "2BD1197FDBD2D798ACC4C9622C14023EE755E195C6078D7B81D436D612D9522AD9E7780F6D67A74C78C76C9D36579121B162630C3C484A3E153455389BEF4269" } });
        const repositories = await response.json();

        setSelected(repositories.value[0].CompanyId)
        setName({value: repositories.value[0].Name, error: ''})
        setEmail({value: repositories.value[0].Email, error: ''})
        setFacebook({value: repositories.value[0].Facebook, error: ''})
        setSkype({value: repositories.value[0].Skype, error: ''})
        setCompany({value: repositories.value[0].CompanyId, error: ''})
    };

    const companyRequest = async () => {
        const response = await fetch(`https://api2.ploomes.com/Contacts?$filter=TypeId eq 1`, { headers: { "user-key": "2BD1197FDBD2D798ACC4C9622C14023EE755E195C6078D7B81D436D612D9522AD9E7780F6D67A74C78C76C9D36579121B162630C3C484A3E153455389BEF4269" } });
        const repositories = await response.json();
        setCompanies(repositories.value)
        setLoading(false)
    };

    const newCampo = () => {
        const newPhone = { value: '', errors: '' };

        setPhone([...phone, newPhone]);
        setLastPhone(lastPhone + 1)
    };

    const removeCampo = (i) => {
        let phones = phone;
        setLastPhone(lastPhone - 1)
        setPhone(phone.filter((e)=>(e !== phones[i])));
    };

    const mphone = (v) => {
        var r = v.replace(/\D/g,"");
        if (r.length > 10) {
            // 11+ digits. Format as 5+4.
            r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/,"($1) $2$3");
        }
        else if (r.length > 5) {
            // 6..10 digits. Format as 4+4
            r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/,"($1) $2$3");
        }
        else if (r.length > 2) {
            // 3..5 digits. Add (..)
            r = r.replace(/^(\d\d)(\d{0,5})/,"($1) $2");
        }
        else {
            // 0..2 digits. Just add (
            r = r.replace(/^(\d*)/, "($1");
        }
        return r;
    }

    const alterPhone = async (text, i) => {
        let phones = await phone;

        let phoneMask = await mphone(text)

        phones[i].value = await phoneMask
        setPhone(phones.filter((e)=>(e)));
    }

    const toggleModalCompany = () => {
        setModalCompany(!modalCompany);
    };

    const savePerson = async () => {
        setLoading(true)
        let atual = this;
    
        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);

        if (nameError || emailError) {
            setName({ ...name, error: nameError });
            setEmail({ ...email, error: emailError });
            return;
        }

        var phones = [];

        await phone.map((r, i) => {
            phones.push(
                {
                    "PhoneNumber": r.value,
                    "TypeId": 0,
                    "CountryId": 0
                }
            )
        })

        const response = await fetch(`https://api2.ploomes.com/Contacts(${id})`, { method: 'PATCH', body: JSON.stringify({"Name":name.value,"OriginId":0,"CompanyId":company.value,"TypeId":2,"Email":email.value,"Phones": phones,"Skype":skype.value,"Facebook":facebook.value}),headers: { "user-key": "2BD1197FDBD2D798ACC4C9622C14023EE755E195C6078D7B81D436D612D9522AD9E7780F6D67A74C78C76C9D36579121B162630C3C484A3E153455389BEF4269" } });
        const repositories = await response.json();

        const resetAction = await StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'List' })
            ],
        });

        navigation.dispatch(resetAction);
    };

    return (
        loading ? <View style={styles.loading}>
                <ActivityIndicator size="large" color="#6759c0" />
            </View> : <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <Modal isVisible={modalCompany}>
                    <ModalCompany toggle={toggleModalCompany} select={setSelected} companyRequest={companyRequest}/>
                </Modal>

                <View style={styles.header}>
                    <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                        <Image style={[styles.image, { resizeMode: 'contain' }]} source={require('../assets/icons/arrow.png')} />
                    </TouchableOpacity>

                    <Text style={styles.title}>Nova Pessoa</Text>
                </View>
                <ScrollView>
                    <Input
                        placeholder="Nome"
                        returnKeyType="next"
                        value={name.value}
                        onChangeText={text => setName({ value: text, error: '' })}
                        error={!!name.error}
                        errorText={name.error}
                        autoCapitalize="none"
                        autoCompleteType="name"
                        textContentType="name"
                        keyboardType="default"
                    />

                    <View style={styles.paddingSelect}>
                        <SelectPicker
                            onValueChange={(value) => {
                                value == 0 ? setModalCompany(true) : setModalCompany(false)
                                setCompany({value: value, errors: ''});
                                setSelected(value);
                            }}
                            placeholder='Escolha uma empresa'
                            selected={selected}
                            doneButtonText='Selecionar'
                            style={styles.textInput}
                        >
                            <SelectPicker.Item label='Adicionar nova empresa' value={0} key={-1} />
                            {companies.map((val, index) => (
                                <SelectPicker.Item label={val.Name} value={val.Id} key={index} />
                            ))}

                        </SelectPicker>
                    </View>

                    {phone.map((r, i) => {
                        return <View>
                            <Input
                                placeholder="Telefone"
                                returnKeyType="next"
                                value={r.value}
                                onChangeText={text => alterPhone(text, i)}
                                error={!!r.error}
                                errorText={r.error}
                                autoCapitalize="none"
                                autoCompleteType="tel"
                                textContentType="telephoneNumber"
                                keyboardType="numeric"
    
                            />
                            <View style={styles.addRemove}>
                                {(lastPhone - 1) == i ? <TouchableOpacity
                                    style={styles.add}
                                    onPress={newCampo}
                                >
                                    <Text style={styles.textPhoneWhite}>+</Text>
                                </TouchableOpacity> : null}

                                {(i == 0 && (lastPhone - 1) == i ) ? null : <TouchableOpacity
                                    style={styles.remove}
                                    onPress={() => removeCampo(i)}
                                ><Text style={styles.textPhone}>-</Text></TouchableOpacity>}                                
                            </View>
                        </View>;
                    })}

                    <Input
                        placeholder="E-mail"
                        returnKeyType="next"
                        value={email.value}
                        onChangeText={text => setEmail({ value: text, error: '' })}
                        error={!!email.error}
                        errorText={email.error}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                    />

                    <Input
                        placeholder="Skype"
                        returnKeyType="next"
                        value={skype.value}
                        onChangeText={text => setSkype({ value: text, error: '' })}
                        error={!!skype.error}
                        errorText={skype.error}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        textContentType="URL"
                        keyboardType="default"
                    />

                    <Input
                        placeholder="Facebook"
                        returnKeyType="next"
                        value={facebook.value}
                        onChangeText={text => setFacebook({ value: text, error: '' })}
                        error={!!facebook.error}
                        errorText={facebook.error}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        textContentType="URL"
                        keyboardType="default"
                    />

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.save} onPress={() => savePerson()}>
                            <Text style={styles.textSave}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
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
        textAlign: 'center'
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
        flex: 1,
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
    add: {
        width: 25,
        height: 25,
        backgroundColor: '#6759c0',
        padding: 3,
        borderRadius: 25,
        marginRight: 10
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
    textInput: {
        paddingLeft: 20,
        paddingTop: 16,
        height: 50,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#182a2e',
        borderRadius: 50,
        marginBottom: 15,
        shadowColor: "#6759c0",
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: {
        height: 3,
        width: 0
        }
  },
  paddingSelect: {
      paddingLeft: 20,
      paddingRight: 20,
  },
  buttons: {
    alignItems: 'center'
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
    marginTop: 10,
    marginBottom: 20
  },
    textSave: {
        color: '#fff'
  },
  loading: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 20,
    },
});

export default memo(List);