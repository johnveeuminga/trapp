import React from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { setLanguage } from '../redux/actions/language'
import { connect } from 'react-redux'

class Preloading extends React.Component {
  componentDidMount() {
    this.getDefaultLanguage()
  }

  async getDefaultLanguage() {
    const navigation = this.props.navigation

    try {
      const defaultLanguage = await AsyncStorage.getItem('@trapp_defaultLanguage')
      console.log(defaultLanguage)

      if (defaultLanguage) {
        this.props.setLanguageState(defaultLanguage)
        navigation.navigate('Home')
      } else {
        navigation.navigate('SelectLanguage')
      }
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    return (
      <View style={ styles.view }>
        <ActivityIndicator size='large' />
        <Text>Please wait...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const mapDispatchToProps = dispatch => {
  return {
    setLanguageState: language => {
      dispatch(setLanguage(language))
    }
  }
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Preloading)
