import React, { useState, useEffect} from 'react'
import { StyleSheet } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Content, Body, Container, Text } from 'native-base'

import { CameraHeader, LoadingHeader, ProductInfoHeader } from './src/components/header.js'
import { LoadingBody, CameraBody, ProductInfoBody } from './src/components/body.js'
import { CameraFooter, ProductInfoFooter } from './src/components/footer.js'

const URL_BASE = 'http://flask-env.eba-rxtextsp.us-east-2.elasticbeanstalk.com'
console.disableYellowBox = true;

const App = () => {
	const [hasPermission, setHasPermission] = useState(null)
	const [barcodeScanned, setBarcodeScanned] = useState(false)
	const [loaded, setLoaded] = useState(false)
	const [productFound, setProductFound] = useState(true)
	const [ingredients, setIngredients] = useState([])
	const [productName, setProductName] = useState('Product Name Here')

	const handleBarcodeScanned = ({ type, data }) => {
		setBarcodeScanned(true)

		fetch(`${URL_BASE}/${data}`)
			.then((response) => response.json())
			.catch((error) => {
				setProductFound(false)
			})
			.then((json) => {
				if(json.ingredients && json.name) {
					setIngredients(json.ingredients)
					setProductName(json.name)
				}
				else {
					setProductFound(false)
				}
			})

		setLoaded(true)
	}

	useEffect(() => {
			(async () => {
				const { status } = await BarCodeScanner.requestPermissionsAsync();
				setHasPermission(status === 'granted');
			})();
		}, []);

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>
	}

	if (!barcodeScanned) {
		return (
			<>
				<CameraHeader />
				<CameraBody handleBarcodeScanned={handleBarcodeScanned} />
				<CameraFooter />
			</>
		);
	}

	if (!loaded) {
		return (
		<>
			<LoadingHeader/>
		</>
		)
	}

	if (!productFound) {
		return (
		<>
			<ProductInfoHeader productName="No Product Found"/>
			<Body>
				<Text>Sorry, this product was not found in our database</Text>
			</Body>
			<ProductInfoFooter
				setBarcodeScanned={setBarcodeScanned}
				setLoaded={setLoaded}
				setProductFound={setProductFound}
			/>
		</>
		)
	}

	if (productFound) {
		return (
			<>
				<ProductInfoHeader productName={productName}/>
				<ProductInfoBody ingredients={ingredients}/>
				<ProductInfoFooter
					setBarcodeScanned={setBarcodeScanned}
					setLoaded={setLoaded}
					setProductFound={setProductFound}
				/>
			</>
		)
	}
}

export default App
