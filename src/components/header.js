import React from 'react'
import { Title, Header, Body } from 'native-base'

export const CameraHeader = () => {
  return(
	<Header>
    <Body>
      <Title>Scan a Food Product</Title>
    </Body>
  </Header>
	)
}

export const LoadingHeader = () => {
  return(
	<Header>
    <Body>
      <Title>Generating product info...</Title>
    </Body>
  </Header>
	)
}

export const ProductInfoHeader = (props) => {
  return(
	<Header>
		<Body>
			<Title>{props.productName}</Title>
		</Body>
	</Header>
	)
}
