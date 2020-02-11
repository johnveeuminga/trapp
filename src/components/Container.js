import React from 'react'
import { View, ScrollView } from 'react-native'

function Container(props) {
  const style = {
    ...props.viewStyle,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
  }
  return (
    <View
      style={style}
    >
      { props.children }
    </View>
  )
}

export default Container
