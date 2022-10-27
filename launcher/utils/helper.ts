import { LayoutRectangle } from 'react-native';
import { Amount } from '@metaplex-foundation/js';
import BN from 'bn.js';
import dayjs, { Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import numeral from 'numeral';

export const resourceUri = (url: string): string => `/${url}`;

export const shortenAddress = (address: string, length = 11): string => {
	const innerLength = length - 3;
	const headIndex = innerLength / 2;
	const tailIndex = address.length - innerLength / 2;

	return `${address.substring(0, headIndex)}...${address.substring(tailIndex)}`;
};

export const memiToUSD = (amount = 0, exchangeRate = 0.03): number => {
	return amount * exchangeRate;
};

export const formatNumber = (
	amount = 0,
	prefix = '',
	format = '0,0',
): string => {
	return `${prefix}${numeral(amount).format(format)}`;
};

export const parseAmount = (value?: Amount, forceDecimals?: number): number => {
	if (!value) return 0;
	const power = new BN(10).pow(
		new BN(forceDecimals || value.currency.decimals),
	);

	return value.basisPoints.div(power).toNumber();
};

export const idleLayout: LayoutRectangle = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
};

dayjs.extend(relativeTime);
export const day = dayjs;
export type DayJs = Dayjs;
