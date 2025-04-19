import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

//! 1*(Explicación más adelante)
const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  
export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-gray-900">
            <div>
                <Link onClick={() => openInNewTab('https://linktr.ee/alexolle')}>
                {/* //^Meramente para demostrar que se puede hacer funcional pongo mi enlace de linktree 
                //!1*
                //&Según un usuario de stackOverflow en https://stackoverflow.com/questions/45046030/maintaining-href-open-in-new-tab-with-an-onclick-handler-in-react,
                //&Existe una vulnerabilidad al usar href solo, porque esta página puede(En pocas palabras) usar la conexión establecida entre las 2 ventanas para manipular la anterior
                //?Para solucionarlo usaré la aplicación de https://stackoverflow.com/users/974045/gibolt en este mismo post, mediante la cual se encarga de solamente crear una nueva pestaña y buscar la dirección.   */}
                    <ApplicationLogo className="h-20 w-20 fill-current text-blue-500 dark:text-blue-600" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
}
