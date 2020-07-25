import React from 'react'
import { Footer, FooterTab, Button, Text } from 'native-base'

export const CameraFooter = () => {
	return(
		<Footer>
			<FooterTab>
				<Button full>
					<Text>Searching for barcode...</Text>
				</Button>
			</FooterTab>
		</Footer>
	);
}

export const ProductInfoFooter = (props) => {
	return(
		<Footer>
			<FooterTab>
				<Button rounded info onPress={() => {
					props.setLoaded(false)
					props.setBarcodeScanned(false)
					props.setProductFound(true)
					}
				}>
					<Text>Scan another product</Text>
				</Button>
			</FooterTab>
		</Footer>
	);
}
