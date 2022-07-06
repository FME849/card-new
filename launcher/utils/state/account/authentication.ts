import { graphQlClient } from 'utils/graphql';
import * as queries from 'utils/graphql/query';
import { extractJwt } from 'utils/lib/auth';

import { accountState, Profile } from './internal';

export const syncProfile = async (): Promise<Profile | null> => {
	const jwt = await extractJwt();
	accountState.loading = !!jwt;

	if (!jwt) return null;

	try {
		const { data } = await graphQlClient.query({ query: queries.account });
		const profile = data?.account || {};
		accountState.profile = profile;

		return profile;
	} catch (e) {
		console.log(e);
	} finally {
		accountState.loading = false;
	}

	return null;
};

export const clearProfile = (): void => {
	accountState.profile = {};
};