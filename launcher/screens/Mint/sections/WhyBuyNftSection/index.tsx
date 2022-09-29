import React, { FC } from 'react';
import { Image, Linking, ScaledSize, TextStyle, View } from 'react-native';
import { Text } from '@metacraft/ui';
import UnderRealmButton from 'launcher/components/Marketplace/Button';
import resources from 'launcher/utils/resources';
import { iStyles } from 'launcher/utils/styles';

import { styles, whyBuyNft } from './internal';

interface Props {
	dimensions: ScaledSize;
}

export const WhyBuyNftSection: FC<Props> = ({ dimensions }) => {
	const titleStyle = {
		flexBasis: 600,
		paddingLeft: dimensions.width < 1120 ? 0 : 120,
		paddingRight: 50,
		paddingTop: 30,
	} as TextStyle;

	return (
		<View style={[iStyles.contentContainer, styles.container]}>
			<Image
				source={resources.marketplace.mintWhyBuyNft.background}
				style={styles.background}
			/>
			<Image
				source={resources.marketplace.mintWhyBuyNft.borderTop}
				style={styles.borderTop}
				resizeMode={'repeat'}
			/>
			<Image
				source={resources.marketplace.mintWhyBuyNft.borderBottom}
				style={styles.borderBottom}
				resizeMode={'repeat'}
			/>
			<Image
				source={resources.marketplace.mintWhyBuyNft.borderLeft}
				style={styles.borderLeft}
				resizeMode={'repeat'}
			/>
			<Image
				source={resources.marketplace.mintWhyBuyNft.borderRight}
				style={styles.borderRight}
				resizeMode={'repeat'}
			/>
			<Image
				source={resources.marketplace.mintWhyBuyNft.edgeTopLeft}
				style={styles.edgeTopLeft}
			/>
			<Image
				source={resources.marketplace.mintWhyBuyNft.edgeTopRight}
				style={styles.edgeTopRight}
			/>
			<Image
				source={resources.marketplace.mintWhyBuyNft.edgeBottomLeft}
				style={styles.edgeBottomLeft}
			/>
			<Image
				source={resources.marketplace.mintWhyBuyNft.edgeBottomRight}
				style={styles.edgeBottomRight}
			/>
			<Image
				source={resources.marketplace.mintWhyBuyNft.patternTopLeft}
				style={styles.patternTopLeft}
			/>
			<Image
				source={resources.marketplace.mintWhyBuyNft.patternTopRight}
				style={styles.patternTopRight}
			/>
			<Image
				source={resources.marketplace.mintWhyBuyNft.patternBottomLeft}
				style={styles.patternBottomLeft}
			/>
			<Image
				source={resources.marketplace.mintWhyBuyNft.patternBottomRight}
				style={styles.patternBottomRight}
			/>
			<View style={styles.contentContainer}>
				<Text
					responsiveSizes={[35, 35, 30, 25]}
					style={[styles.title, titleStyle]}
				>
					Why buy Genesis NFT Card now?
				</Text>
				<View
					style={{
						flex: 1,
						flexBasis: 400,
						paddingRight: dimensions.width < 1120 ? 0 : 100,
						maxWidth: 600,
					}}
				>
					{whyBuyNft.map((item, index) => (
						<View key={index} style={{ flexDirection: 'row' }}>
							<Image
								source={resources.marketplace.mintWhyBuyNft.bloodDrop}
								style={{ width: 24, height: 35, marginRight: 10 }}
							/>
							<View style={{ flex: 1, marginBottom: 40 }}>
								<Text
									responsiveSizes={[20]}
									style={{
										paddingVertical: 5,
										color: '#beafa6',
										marginBottom: 10,
									}}
								>
									{item.title}
								</Text>
								<Text>{item.detail}</Text>
							</View>
						</View>
					))}
					<UnderRealmButton
						style={{
							width: 250,
							marginLeft: 30,
						}}
						onPress={() =>
							Linking.openURL(
								'https://stormgate.substack.com/?utm_source=substack&utm_medium=web&utm_campaign=reader2&utm_source=%2Fsearch%2Fstormgate&utm_medium=reader2',
							)
						}
					>
						<View style={{ alignItems: 'center' }}>
							<Text responsiveSizes={[13]}>Read details</Text>
							<Text responsiveSizes={[13]}>on Substack</Text>
						</View>
					</UnderRealmButton>
				</View>
			</View>
		</View>
	);
};

export default WhyBuyNftSection;
