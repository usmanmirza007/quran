import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { Audio } from 'expo-av';

class AyahDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AyahDetail: [],
            ayahNumber: this.props.navigation.state.params.number,
            showMe: false,
            audioBar: false,
            playingStatus: 'nosound',
            isPlay: false,
            audioURL: '',
            audioArray: []
        }
    }

    async componentDidMount() {
        await axios.get(`http://api.alquran.cloud/v1/surah/${this.state.ayahNumber}/en.asad`)
            .then((translationResponse) => {
                if (translationResponse.data.code === 200) {
                    var trans = translationResponse.data.data.ayahs;
                    axios.get(`http://api.alquran.cloud/v1/surah/${this.state.ayahNumber}`)
                        .then((response) => {
                            if (response.data.code === 200) {
                                var scores = response.data.data.ayahs;
                                var keys = Object.keys(scores);
                                let array = [];
                                for (var i = 0; i < keys.length; i++) {

                                    var k = keys[i];
                                    let obj = {
                                        data: scores[k],
                                        engData: trans[k],
                                    }
                                    array.push(obj)
                                }
                                this.setState({ AyahDetail: array })

                            }
                        })
                        .catch((error) => {
                            Alert.alert("Please Check Your Internet Connection");
                        });
                }
            });
    }

    renderRow = ({ item }) => {
        return (
            <View style={{ marginHorizontal: 15, borderBottomWidth: 1, flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 5 }}>{item.data.numberInSurah}</Text>
                    <SimpleLineIcons style={{ color: 'black', }} name="options" size={25}
                        onPress={() => this.showModal(item)} />
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 15 }}>{item.data.text}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 10 }}>{item.engData.text}</Text>
            </View>
        )
    }
    showModal(item) {
        this.setState({ audioURL: item.data.number, showMe: true, })
       
    }


    // ##########################################################################################################
    // ################################## Audio Portion #########################################################
    // ##########################################################################################################
    async _playRecording() {
        // for (var i = this.state.audioURL; i < this.state.AyahDetail.length; i++) {
        const { sound } = await Audio.Sound.createAsync(


            { uri: `https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/${this.state.audioURL}` },
            {
                shouldPlay: true,
                isLooping: true,
            },
            this._updateScreenForSoundStatus,
        );
        this.sound = sound;
        this.setState({
            playingStatus: 'playing',
        });
        // }
    }

    _updateScreenForSoundStatus = (status) => {
        if (status.isPlaying && this.state.playingStatus !== "playing") {
            this.setState({ playingStatus: "playing" });
        } else if (!status.isPlaying && this.state.playingStatus === "playing") {
            this.setState({ playingStatus: "donepause" });
        }
    };

    async _pauseAndPlayRecording() {
        if (this.sound != null) {
            if (this.state.playingStatus == 'playing') {
                console.log('pausing...');
                await this.sound.pauseAsync();
                console.log('paused!');
                this.setState({
                    playingStatus: 'donepause',
                });
            } else {
                console.log('playing...');
                await this.sound.playAsync();
                console.log('playing!');
                this.setState({
                    playingStatus: 'playing',
                });
            }
        }
    }

    _syncPauseAndPlayRecording() {
        if (this.sound != null) {
            if (this.state.playingStatus == 'playing') {
                this.sound.pauseAsync();
            } else {
                this.sound.playAsync();
            }
        }
    }

    _playAndPause = () => {
        switch (this.state.playingStatus) {
            case 'nosound':
                this._playRecording();
                break;
            case 'donepause':
            case 'playing':
                this._pauseAndPlayRecording();
                break;
        }
    }
    PlayPauseButton() {
        if (this.state.playingStatus === "playing") {
            return (
                <Entypo style={{ color: 'white' }} name="controller-paus" size={25}
                    onPress={this._playAndPause} />
            )
        }
        else {
            return (
                <Entypo style={{ color: 'white' }} name="controller-play" size={25}
                    onPress={this._playAndPause} />
            )
        }
    }
    PlayNext() {
        const increase = this.state.audioURL;
        const next = increase + 1;
        this.setState({ audioURL: next });
        this._playRecording()
    }
    // ################################################################################################

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ height: 70, backgroundColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Ionicons style={{ color: 'white', marginLeft: 15, marginTop: 30 }} name="md-arrow-back" size={30}
                        onPress={() => this.props.navigation.navigate('Tab')}
                    />
                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{this.props.navigation.state.params.number}-</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{this.props.navigation.state.params.name}</Text>
                    </View>
                    <View style={{ height: 70, backgroundColor: 'black' }}>
                        <Feather style={{ color: 'white', marginRight: 15, marginTop: 30 }} name="settings" size={30} />
                    </View>
                </View>
                <Text style={{ alignSelf: 'center', fontSize: 16 }}>{this.props.navigation.state.params.translation}</Text>
                <Text style={{ alignSelf: 'flex-end', fontSize: 16, marginTop: 10, marginRight: 30 }}>Ayahs: {this.props.navigation.state.params.ayah}</Text>
                <Text style={{ alignSelf: 'center', fontSize: 22, fontWeight: 'bold' }}>بِسْمِ ٱللّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيم</Text>

                <FlatList
                    style={{ padding: 10 }}
                    showsHorizontalScrollIndicator={false}
                    data={this.state.AyahDetail}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showMe}
                    onRequestClose={() => this.setState({ showMe: false })}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}></View>
                        <View style={styles.ModalMainView}>
                            <View style={styles.OuterView}>
                                <View style={styles.InnerView}>
                                    <FontAwesome style={styles.ModalIcon} name="book" size={30} />
                                    <Text style={styles.ModalText}>Vue Tafsir/Note</Text>
                                </View>
                                <View style={styles.InnerView}>
                                    <FontAwesome style={styles.ModalIcon} name="bookmark" size={30} />
                                    <Text style={styles.ModalText}>Ajouter un marque</Text>
                                </View>
                                <View style={styles.InnerView}>
                                    <MaterialCommunityIcons style={styles.ModalIcon} name="content-copy" size={30} />
                                    <Text style={styles.ModalText}>Copier</Text>
                                </View>
                            </View>
                            <View style={styles.OuterView}>
                                <View style={styles.InnerView}>
                                    <Ionicons style={styles.ModalIcon} name="md-share" size={30} />
                                    <Text style={styles.ModalText}>Partager</Text>
                                </View>
                                <View style={styles.InnerView}>
                                    <FontAwesome style={styles.ModalIcon} name="play" size={30}
                                        onPress={() => this.setState({ showMe: false, audioBar: true, })}
                                    />
                                    <Text style={styles.ModalText}>Jouer cette Ayah</Text>
                                </View>
                                <View style={styles.InnerView}>
                                    <AntDesign style={styles.ModalIcon} name="checkcircle" size={30} />
                                    <Text style={styles.ModalText}>Quran Planner</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.audioBar}
                    onRequestClose={() => this.setState({ audioBar: false, playingStatus: 'nosound' })}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}></View>
                        <View style={styles.AudioModal}>

                            <View style={styles.AudioModalRow}>
                                <AntDesign style={{ color: 'white' }} name="stepbackward" size={25} />
                                {this.PlayPauseButton()}
                                <AntDesign style={{ color: 'white' }} name="stepforward" size={25}
                                    // onPress={() => this.PlayNext()}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ModalMainView: {
        backgroundColor: 'white', height: 200,
    },
    OuterView: {
        flexDirection: 'row', justifyContent: 'space-evenly', marginHorizontal: 15, marginVertical: 20
    },
    ModalText: {
        alignSelf: 'center', fontSize: 12
    },
    InnerView: {
        width: '30%'
    },
    ModalIcon: {
        color: 'black', alignSelf: 'center'
    },
    AudioModal: {
        backgroundColor: 'black', height: 60,
    },
    AudioModalRow: {
        flexDirection: 'row', justifyContent: 'space-evenly', marginHorizontal: 15, marginVertical: 20
    },

});
export default AyahDetail;

