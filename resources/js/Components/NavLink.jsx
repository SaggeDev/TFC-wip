import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt- text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active //Ternaria con las clases                              
                    ? 'border-sky-600 text-sky-700  dark:focus:border-blue-900 dark:border-blue-600 dark:text-gray-100'
                    : 'border-transparent text-gray-500 hover:border-sky-400 hover:text-sky-600 focus:border-sky-400 focus:text-sky-600 dark:text-gray-400 dark:hover:border-blue-400 dark:hover:text-gray-300 dark:focus:border-gray-400 dark:focus:text-gray-300') 
                    +className
            }
        >
            {children}
        </Link>
    );
}
