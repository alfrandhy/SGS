import './bootstrap';
import Alpine from 'alpinejs';
import {createRoot} from 'react-dom/client';

import MyApp from './SGS/Layouts/MyApp';
const root = createRoot(document.getElementById('App'));
root.render(<MyApp />);

window.Alpine = Alpine;
Alpine.start();
