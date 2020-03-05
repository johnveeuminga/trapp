import React from 'react'
import { View, StyleSheet, Text, Picker, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { setLanguage } from '../redux/actions/language'
import { connect } from 'react-redux'

class SelectLanguage extends React.Component {
  constructor() {
    super()

    this.state = {
      selectedLanguage: 'en'
    }
  }

  async setLanguage() {
    try {
      await AsyncStorage.setItem('@trapp_defaultLanguage', this.state.selectedLanguage)
      this.props.setLanguageState(this.state.selectedLanguage)

      this.props.navigation.navigate('Home')
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    return (
      <View style={ styles.view }>
        <Text style={ styles.heading }>Select translation language</Text>
        <Picker
          selectedValue={ this.state.selectedLanguage }
          style={{height: 50, width: 115, fontSize: 24, marginBottom: 16}}
          onValueChange={(itemValue) => {
            this.setState((state) => {
              return {
                ...state,
                selectedLanguage: itemValue
              }
            })
          }}
        >
          <Picker.Item label='English' value='en'/>
          <Picker.Item label='Spanish' value='es'/>
          <Picker.Item label='Japanese' value='jp'/>
          <Picker.Item label='Chinese' value='ch'/>
          <Picker.Item label='Dutch' value='dc'/>
          <Picker.Item label='German' value='de'/> 
        </Picker>
        <Button
          title='Submit'
          onPress={() => this.setLanguage()}
        />
      </View>
    )
  }   
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectLanguage)