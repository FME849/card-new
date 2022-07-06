import { FC } from 'react';
import { View, ViewStyle } from 'react-native';
import Text from 'components/Text';
import { navigate } from 'stacks/Browser/shared';
import { useSnapshot } from 'utils/hook';
import { ThemeState, themeState } from 'utils/state/theme';

import NavigationItem from './NavigationItem';
import { NavigationConfig, navigationItems, styles } from './shared';

interface Props {
	style?: ViewStyle;
}

export const TopNavigation: FC<Props> = ({ style }) => {
	const { sizes } = useSnapshot<ThemeState>(themeState);
	const contentContainerStyle = [
		styles.contentContainer,
		{ height: sizes.topNavigationSize },
	];

	const onNavigation = ({ route }: NavigationConfig) => {
		navigate(route.name);
	};

	return (
		<View style={[styles.container, style]}>
			<View style={contentContainerStyle}>
				<Text style={styles.branding}>StormGate</Text>
				<View style={styles.navContainer}>
					{navigationItems.map((item, i) => {
						return (
							<NavigationItem key={i} config={item} onPress={onNavigation} />
						);
					})}
				</View>
			</View>
		</View>
	);
};

export default TopNavigation;
