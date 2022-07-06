import { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Avatar from 'components/Avatar';
import Text from 'components/Text';
import { Profile } from 'utils/types';

import { styles } from './internal';

interface Props {
	profile: Profile;
	onPress?: () => void;
	onAvatarPress?: () => void;
}

export const Account: FC<Props> = ({ profile, onPress, onAvatarPress }) => {
	const { address, name, avatarUrl } = profile;

	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<Avatar
				size={38}
				imageUri={avatarUrl}
				characters={address}
				onPress={onAvatarPress}
			/>
			<View style={styles.infoContainer}>
				<Text style={styles.primaryText}>{name}</Text>
				<View style={styles.onlineContainer}>
					<View style={styles.onlineDot} />
					<Text style={styles.onlineText}>Online</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Account;