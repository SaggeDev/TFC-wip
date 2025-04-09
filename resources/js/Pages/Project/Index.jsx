import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index() {//Si algo falla con autenticación, puede ser por AuthenticatedLayout 1:02:33
    return (
        <AuthenticatedLayout //Este componente solo se muestra si el que lo soliccita es un usuario real y logeado
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Projects
                </h2>
            }
        >
            <Head title='Projects'></Head>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Jelou
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>

    )
} 
