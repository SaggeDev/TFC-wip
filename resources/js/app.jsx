import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import  "@/i18n/manager.jsx"
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Nombre Substituto';//??Aqui se define el nombre de la página que los componentes van a usar y donde se define en caso de no encontrarlo


createInertiaApp({
    title: (title) => `${appName} - ${title}`,//Cargará esto como el título
    //Y esto como los contenidos
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`,//La página principal
         import.meta.glob('./Pages/**/*.jsx')),//Los recursos que usará posteriormente
    setup({ el, App, props }) {
        const root = createRoot(el);//Crea un elemento de html root

        root.render(<App {...props} />);// que usa para renderizar todo
    },
    progress: {//Color de barra de probreso arriba cuando pasa de página(dentro de inertia)
        color: '#4B5563',
    },
});
