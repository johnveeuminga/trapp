import React, { Component } from 'react'
import { View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import SnapComponent from '../components/SnapComponent';
import { Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Tts from 'react-native-tts'
import AsyncStorage from '@react-native-community/async-storage';

class SnapScreen extends Component {
  constructor() {
    super() 

    this.state = {
      image: null,
    }
  }

  async componentDidMount() {
    const imageData = this.props.navigation.getParam('data')
    const imageUri = this.props.navigation.getParam('uri')

    console.log(imageData)

    this.setState((state) => {
      return {
        ...state,
        image: imageUri
      }
    })

    this.fetchLabels()
  }

  async fetchLabels() {
    this.setState((state) => {
      return {
        ...state,
        isTranslating: true,
      }
    })
    const imageData = this.props.navigation.getParam('data')

    const body = JSON.stringify({
      requests: [
        {
          features: [
            { type: "LABEL_DETECTION", maxResults: 10 },
          ],
          image: {
            content: imageData
          }
        }
      ] 
    })

    const res = await fetch(
      "https://vision.googleapis.com/v1/images:annotate?key=" +
        "AIzaSyBI-LkO6gh1jLay752SVlDzWwzskqvgiZg",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: body
      }
    )

    const visionResult = await res.json()
    const term = visionResult.responses[0].labelAnnotations[0].description

    await this.translate(term)

    this.setState((state) => {
      return {
        ...state,
        isTranslating: false,
        isLoading: false,
      }
    })
  }

  async translate(term) {
    
    const transRes = await fetch(
      `https://www.googleapis.com/language/translate/v2?q=${term}&source=en&target=es&key=`+"AIzaSyBI-LkO6gh1jLay752SVlDzWwzskqvgiZg",
    )

    const translation = await transRes.json();

    this.setState((state) => {
      return {
        ...state,
        translation: {
          source: {
            lang: 'en',
            term: term
          },
          target: {
            lang: 'es',
            term: translation.data.translations[0].translatedText
          }
        },
      }
    })
  }

  speak() {
    const translation = this.state.translation.target.term

    Tts.speak(translation, {
      language: 'es-ES',
      androidParams: {
        language: 'es-ES',
      }
    })
  }

  async saveSearch() {
    const imageUri = this.props.navigation.getParam('uri')

    this.setState((state) => {
      return {
        ...state,
        isLoading: true,
      }
    })

    const searchesRaw = await AsyncStorage.getItem('@trapp_searches')
    let searches = []

    if (searchesRaw) {
      
      searches = [
        ...JSON.parse(searchesRaw)
      ]
    }

    const item = {
      img: imageUri,
      translation: this.state.translation
    }

    searches.push(item)

    await AsyncStorage.setItem('@trapp_searches', JSON.stringify(searches))

    this.setState((state) => {
      return {
        ...state,
        isLoading: false,
      }
    })

    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black', position: 'relative' }}
      >
        <View>
          {
            this.state.image &&
            <Image 
              source={{
                uri: this.state.image
              }}
              style={{     
                width: '100%',
                height: undefined,
                aspectRatio: 1,
              }}
            />
          }
        </View>
        {
          this.state.isTranslating || this.state.isLoading &&
            <View style={{ position: 'absolute', height: '100%', width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(52, 52, 52, 0.8)'}}>
              <ActivityIndicator 
                size="large"
              />
            </View>
        }
        {
          !this.state.isTranslating && this.state.translation &&
          <View
            style={{ position: 'absolute', height: '100%', width: '100%', flex: 1, flexDirection: 'column', alignItems: 'center', paddingVertical: 64}}
          >
            <View
              style={{ width: '100%', marginBottom: 'auto', alignItems: 'center'}}
            >
              <Text style={{ color: 'white'}} h4>{ this.state.translation.source.term }</Text>
              <Text style={{ color: '#edb02e' }}>English</Text>
            </View>
            <View
              style={{ width: '100%', alignItems: 'center' }}
            >
              <Text style={{ color: 'white', width: '100%', textAlign: 'center'}} h4>{ this.state.translation.target.term } </Text>
              <Text style={{ color: '#edb02e' }}>Spanish</Text>
            </View>
          </View>
        }
        <Button 
          icon={
            <Icon 
              name="music"
              size={24}
              color="white"
            />
          }
          raised
          containerStyle={{ position: 'absolute',  bottom: 15, right: 10 }}
          style={{ marginBottom: 32, }}
          buttonStyle={{ borderRadius: 200, padding: 12, }}
          onPress={() => this.speak()}
        />
         <Button
          title='Save Search' 
          raised
          containerStyle={{ position: 'absolute',  top: 20, right: 10 }}
          style={{ marginBottom: 32, }}
          buttonStyle={{ borderRadius: 50, padding: 10, }}
          onPress={() => this.saveSearch()}
        />
      </View>
    )
  }
}

export default SnapScreen
