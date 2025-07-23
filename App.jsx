import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Mainapp from './Mainapp'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
 
 
  return (
    <>
    <SafeAreaProvider>
    <Mainapp/>

    </SafeAreaProvider>

    </>
  )
}

export default App

const styles = StyleSheet.create({})