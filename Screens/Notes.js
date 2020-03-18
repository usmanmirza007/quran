import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TextInput, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
const { width: WIDTH } = Dimensions.get('window')


class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
            Month: [],
            Date: [],
            Year: []
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>

                <View style={{ height: 70, backgroundColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                    {/* <Entypo style={{ color: 'white', marginLeft: 15, marginTop: 30 }} name="menu" size={30}/> */}
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white', marginTop: 35, marginLeft: 15 }}>20-Jan-2020</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginTop: 30 }}>SEARCH AL-QURAN</Text>
                    <View style={{ height: 70, backgroundColor: 'black' }}>
                        <Feather style={{ color: 'white', marginRight: 15, marginTop: 30 }} name="settings" size={30} />
                    </View>
                </View>

                {/*<TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1 }}
                    onPress={() => this.props.navigation.navigate('QiblaDatails',{City:'Islamabad' })}>
                    <View style={{ marginVertical: 15, marginLeft: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Islamabad City</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1 }}
                    onPress={() => this.props.navigation.navigate('QiblaDatails',{City:'Karachi' })}>
                    <View style={{ marginVertical: 15, marginLeft: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Karachi City</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1 }}
                    onPress={() => this.props.navigation.navigate('QiblaDatails',{City:'Gujranwala' })}>
                    <View style={{ marginVertical: 15, marginLeft: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Gujranwala City</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1 }}
                    onPress={() => this.props.navigation.navigate('QiblaDatails',{City:'Peshawar' })}>
                    <View style={{ marginVertical: 15, marginLeft: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Peshawar City</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1 }}
                    onPress={() => this.props.navigation.navigate('QiblaDatails',{City:'Multan' })}>
                    <View style={{ marginVertical: 15, marginLeft: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Multan City</Text>
                    </View>
                </TouchableOpacity>
        */}
                <View style={styles.input}>
                    <TextInput
                        placeholder={'Enter city name'}
                        style={{ marginLeft: 15, fontSize: 15 }}
                        placeholderTextColor={'#000'} />
                </View>
                <TouchableOpacity style={styles.loginButton}
                    onPress={() => this.props.navigation.navigate('tab')}>
                        <Text style={styles.loginText}>
                            Login
                                    </Text>
                </TouchableOpacity>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Font: { fontSize: 18 },
    ViewTimings: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30, marginTop: 5 },
    input: {
        backgroundColor: '#cccccc',
        marginTop: 20,
        height: 50,
        justifyContent: 'center',
        width: WIDTH - 50,
        marginLeft: 25,
        borderRadius: 30
    },
    loginButton: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#000',
        borderRadius: 30,
        width: WIDTH - 150,
    },
    loginText: {
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#fff',
    },
});
export default Notes;