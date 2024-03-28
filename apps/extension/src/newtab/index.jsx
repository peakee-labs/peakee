import { createRoot } from 'react-dom/client';
import {} from 'react-native-reanimated';

import Newtab from './Newtab';
console.log('Hello from the newtab index.js');

const container = document.getElementById('app-container');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Newtab />);
