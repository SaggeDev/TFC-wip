import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP } from "@/constants.jsx";
export default function Index({ projects }) {//Cada que llame a este componente, voy a tener que mandarle la lista de proyectos
    return (
        <AuthenticatedLayout //Este componente solo se muestra si el que lo solicita es un usuario real y logueado
            header={
                <h2 className="text-xl font-semibold leading-tight text-blue-800 dark:text-gray-200">
                    Proyectos
                </h2>
            }
        >
            <Head title='Projects' ></Head>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-400 rounded-b-md">
                            {/* <pre>{JSON.stringify(projects,undefined,2)}</pre> */}
                            {/*//? Esto devuelve un texto con el contenido simple, perfecto para json */}

                            {/*//*Display de los proyectos */}
                            <table className="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400 ">
                                {/*Inicio menu/índice de tabla */}
                                <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        {/* <th className="p-4">ID</th> */}
                                        <th className="p-3"></th> {/*Imagen*/}
                                        <th className="p-3">ID</th>
                                        <th className="p-3">Nombre</th>
                                        <th className="p-3">Estado</th>
                                        <th className="p-3">Fecha de creación</th>
                                        <th className="p-3">Fecha límite</th>
                                        <th className="p-3">Creador</th>
                                        <th className="p-3 text-center">Aciones</th>
                                    </tr>
                                </thead>
                                {/*Fin menu/índice de tabla */}
                                {/*Inicio contenidos de tabla */}
                                <tbody>
                                    {projects.data.map((project) => {//? Una arrow function que hace algo parecido a un foreach
                                        return (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-md"
                                                key={project.id}>
                                                <td className="px-3 py-2">
                                                    <img src={project.image} alt="" style={{ width: 60 }} />
                                                </td>
                                                {/* //! Hay un problema con las imágenes generadas por el seeder, hay que sutituirlas porquye la API de la página no funciona
                                            //! https://fastly.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4  */}
                                                <th className="px-3 py-2 text-center">{project.id}</th>
                                                <td className="px-3 py-2">{project.name}</td>
                                                {/* //TODO Poner el Link a la página del proyecto en el nombre */}
                                                <div className="px-1 py-1">
                                                    <td className={"px-2 py-1 rounded-lg text-white  " + PROJECT_STATUS_CLASS_MAP[project.status]}>{PROJECT_STATUS_TEXT_MAP[project.status]}</td>
                                                </div>
                                                <td className="px-3 py-2">{project.created_at}</td>
                                                <td className="px-3 py-2">{project.due_date}</td>
                                                <td className="px-3 py-2">{project.createdBy.name}</td>
                                                <td className="px-3 py-2 text-center">
                                                    <Link href={route('project.edit', project.id)} className="text-yellow-700 bg-yellow-300 dark:text-yellow-300 dark:bg-yellow-700 mx-1 py-1 px-5 hover:shadow-sm rounded-md size-3 text-base">
                                                        Editar
                                                    </Link>
                                                </td>
                                                {/* //^Parte de Actions */}
                                                {/* //TODO: Hacer que solo el admin pueda ver el botón */}
                                            </tr>
                                        )
                                    })}

                                </tbody>
                                {/*Fin contenidos de tabla */}
                            </table>
                            {/*//*Fin display de los proyectos */}
                            {/*//* Menu de Paginación */}
                            <Pagination pagLinks={projects.meta}>
                            </Pagination>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>

    )
} 
