const { resolve } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const setEnvironments = (configs, internal) => {
	const { webpack } = internal.modules;
	const { DefinePlugin } = webpack;
	const env = internal.configs.env();
	const isProduction = internal.configs.isProduction(env);

	configs.plugins[0] = new DefinePlugin({
		process: { env: {} },
		__DEV__: !isProduction,
		ENV: JSON.stringify(env),
	});

	return configs;
};

const copyAssets = (configs) => {
	configs.plugins.push(
		new CopyPlugin({
			patterns: [
				{
					from: resolve(process.cwd(), 'game/build/web-desktop'),
					to: './game/',
				},
				{
					from: resolve(process.cwd(), 'assets/'),
					to: './',
					filter: (uri) => {
						return !(uri.endsWith('.ejs') || uri.endsWith('.sass'));
					},
				},
			],
		}),
	);

	return configs;
};

const splitBundle = (configs) => {
	configs.entry = {
		app: {
			...configs.entry.app,
			dependOn: 'react-core',
		},
		'react-core': {
			import: [
				'react',
				'react-dom',
				'react-native',
				'react-art',
				'@react-native-async-storage/async-storage',
			],
		},
	};

	return configs;
};

module.exports = {
	useBabel: true,
	buildId: () => 'app',
	webpackMiddlewares: [setEnvironments, copyAssets, splitBundle],
	moduleAlias: {
		global: {
			'react-native': 'react-native-web',
		},
	},
};
