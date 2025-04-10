import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ projects }) {//Cada que llame a este componente, voy a tener que mandarle la lista de proyectos
    //Si algo falla con autenticación, puede ser por AuthenticatedLayout 
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
                             {/* <pre>{JSON.stringify(projects,undefined,2)}</pre> */}
                             {/* //TODO:Dejarlo bonito */}
                            {/*//? Esto devuelve un texto con el contenido simple, perfecto para json */}

                            {/*//*Display de los proyectos */}
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                {/*Inicio menu/índice de tabla */}
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2">
                                            ID
                                        </th>
                                        <th className="px-3 py-2">
                                            Image
                                        </th>
                                        <th className="px-3 py-2">
                                            Name
                                        </th>
                                        <th className="px-3 py-2">
                                            Status
                                        </th>
                                        <th className="px-3 py-2">
                                            Creation date
                                        </th>
                                        <th className="px-3 py-2">
                                            Due date
                                        </th>
                                        <th className="px-3 py-2">
                                            Created by
                                        </th>
                                        <th className="px-3 py-2">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                {/*Fin menu/índice de tabla */}
                                {/*Inicio contenidos de tabla */}
                                <tbody>
                                    {projects.data.map((project) => {//? Una arrow function que hace algo parecido a un foreach
                                    return(
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th className="px-3 py-2">{project.id}</th>
                                            <td className="px-3 py-2">
                                                <img src={project.image} alt="" />
                                            </td>
                                            <td className="px-3 py-2">{project.name}</td>
                                            <td className="px-3 py-2">{project.status}</td>
                                            <td className="px-3 py-2">{project.created_at}</td>
                                            <td className="px-3 py-2">{project.due_date}</td>
                                            <td className="px-3 py-2">{project.createdBy.name}</td>
                                            {/* El MegaUltraProblema es que estaba intentando acceder a created_by.name y laravel explotaba */}

                                            <td className="px-3 py-2"></td>
                                            {/* //^Parte de Actions */}
                                        </tr>
                                    )})}

                                </tbody>
                                {/*Fin contenidos de tabla */}
                            </table>
                            {/*//*Fin display de los proyectos */}

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>

    )
} 
