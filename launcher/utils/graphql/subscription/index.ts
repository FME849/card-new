import { gql } from '@apollo/client';

export const counterIncreased = gql`
	subscription CounterIncreased {
		counterIncreased
	}
`;

export const gameInvitation = gql`
	subscription GameInvitation($opponent: String!) {
		gameInvitation(opponent: $opponent) {
			opponent
			game
			owner
			timestamp
		}
	}
`;