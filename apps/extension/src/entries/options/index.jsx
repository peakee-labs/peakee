import { createRoot } from 'react-dom/client';

import 'react';

import Options from './Options';

const container = document.getElementById('app-container');
const root = createRoot(container);
root.render(<Options title={'Options'} />);
