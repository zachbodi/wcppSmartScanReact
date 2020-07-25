import React from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { StyleSheet, FlatList, Linking } from 'react-native'
import { Content, Left, Right, Text, Spinner, ListItem } from 'native-base'

const WIKIPEDIA_BASE = 'https://en.wikipedia.org/w/index.php?search='

export const LoadingBody = () => {
  return (
    <Content contentContainerStyle={{ flexGrow: 1 }}>
      <Spinner color="blue" style={StyleSheet.absoluteFillObject} />
    </Content>
  )
}

export const CameraBody = (props) => {
	return (
		<Content contentContainerStyle={{ flexGrow: 1 }}>
			<BarCodeScanner
				onBarCodeScanned={props.handleBarcodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>
		</Content>
	)
}

const ingredientListItem = (item) => {
  return (
    <ListItem
      button={true}
      onPress={() => {
        Linking.openURL(`${WIKIPEDIA_BASE}${item.name}`)
      }}>
      <Left>
        <Text>{item.name}</Text>
      </Left>
      {item.carcinogen == 1 && (
        <Right>
          <Text style={{ color: '#FF0000' }}>X</Text>
        </Right>
      )}
    </ListItem>
  )
}

export const ProductInfoBody = (props) => {
  return (
    <Content>
      <Text style={{ padding: 10 }}>
        Following is a list of ingredients in the product you scanned. Any ingredients marked with a
        red &apos;X&apos; have been flagged as carcinogenic. Please click any ingredient to learn
        more.
      </Text>

      <FlatList
        data={props.ingredients}
        renderItem={({ item }) => ingredientListItem(item)}
        keyExtractor={(item) => item.id}
      />
    </Content>
  )
}
