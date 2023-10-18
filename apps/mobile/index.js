/**
 * @format
 */

import { AppRegistry } from 'react-native';

import { App } from './src/index';
import { injectIOC } from './src/utils/ioc';
import { name as appName } from './app.json';

injectIOC().then(() => {
	AppRegistry.registerComponent(appName, () => App);
});
