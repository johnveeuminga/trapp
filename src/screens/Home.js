import React, { Component } from 'react';
import Container from '../components/Container';
import { Text, Button, Image, ListItem } from 'react-native-elements';
import { View, RefreshControl, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';

class HomeScreen extends Component {
  constructor() {
    super()

    this.state = {
      refreshing: false,
      searches: [],
    }
  }

  componentDidMount() {
    this.fetchSearches()

    console.log(this.props)
  }
  
  async fetchSearches() {
    const searchesRaw = await AsyncStorage.getItem('@trapp_searches')

    if(searchesRaw) {
      const searches = JSON.parse(searchesRaw)
      console.log(searches)

      this.setState((state) => {
        return {
          ...state,
          searches: searches
        }
      })
    }
  }

  async onRefresh() {
    await this.fetchSearches()

    this.setState((state) => {
      return {
        ...state,
        refreshing: false,
      }
    })
  }


  render() {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
      },
    };

    return (
      <View
        style={{ flex: 1, marginTop: 16, }}
      >
        <NavigationEvents 
          onWillFocus = { payload => console.log('Home focus') }
        />
          <ScrollView
            refreshControl={
              <RefreshControl 
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
              />
            }
          >
          {
            !this.state.searches.length &&
              <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: 400 }}
              >
                <Text>No recent searches</Text>
              </View>
          }
          {
            this.state.searches.map(({img, translation}, i) => (
              <ListItem
                key={i}
                leftElement={
                  <Image 
                    source={{ uri: img }}
                    style={{ width: 70, height: 70 }}
                  />
                }
                title={
                  translation.source.term
                }
                style={{ marginBottom: 8, }}
                bottomDivider
              />
            ))
          }
        </ScrollView>
        <Button 
          icon={
            <Icon 
              name="camera"
              size={32}
              color="white"
            />
          }
          raised
          containerStyle={{ position: 'absolute',  bottom: 15, right: 10 }}
          style={{ marginBottom: 32, }}
          buttonStyle={{ borderRadius: 150, padding: 12, }}
          onPress={() => ImagePicker.showImagePicker(options, (response) => {
            console.log(response)

            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const params = {
                data: response.data,
                uri: response.uri
              }
              this.props.navigation.navigate('Snap', params)
            }
          })}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    language: state.language,
  }
}

export default connect(mapStateToProps, ({}))(HomeScreen1)
