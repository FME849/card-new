import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';
import { play } from 'screens/Guide/content';
import Concept from 'screens/Guide/Dashboard/Concept';
import { headingSize, sharedStyle } from 'screens/Guide/shared';

const PlayingUnderRealm: React.FC = () => {
	const renderDescription = (des: string) => {
		return <Text>{des}</Text>;
	};

	return (
		<View style={sharedStyle.sectionContainer}>
			<Text
				responsiveSizes={headingSize}
				style={[sharedStyle.heading, sharedStyle.textShadow]}
			>
				Playing Under Realm
			</Text>
			<Text style={[sharedStyle.subHeading, styles.subHeading]}>
				{play.intro}
			</Text>
			<Concept
				content={play}
				containerStyle={{
					justifyContent: 'flex-start',
				}}
				renderDescription={renderDescription}
			/>
			{/*<Image source={resources.guide.battlefieldImage} style={imageStyle} />*/}
		</View>
	);
};

export default PlayingUnderRealm;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	subHeading: {
		textAlign: 'center',
	},
	conceptContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: 40,
	},
});
