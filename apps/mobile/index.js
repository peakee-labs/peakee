import { AppRegistry } from 'react-native';
import { initApp } from 'utils/bootstrap';

import 'react-native-gesture-handler';
import 'utils/ioc';

import App from './src/index';
import { name as appName } from './app.json';

initApp();
AppRegistry.registerComponent(appName, () => App);
