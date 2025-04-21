import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading"
import { useState, useEffect } from "react";
import { PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP } from "@/constants.jsx";
import ResetButton from "@/Pages/Project/ResetButton";



export default function Index({ projects, queryParams = null, success, usersOnProject, auth }) {//Cada que llame a este componente, voy a tener que mandarle la lista de proyectos

    const hasNoParams = Object.keys(queryParams || {}).length === 0;
    const checkParams = (hasNoParams) => {
        hasNoParams = Object.keys(queryParams || {}).length === 0;
    }
    const { page, ...nonPageParams } = queryParams || {};
    const queryString = new URLSearchParams(nonPageParams).toString();

    //Para poder buscar los campos
    queryParams = queryParams || {};//El valor por defecto que toma al cargar la página es null
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("project.index"), queryParams, {
            preserveState: true,
            replace: true,
            preserveScroll: true,
        });

    };

    const onKeyPress = (name, e) => {
        checkParams()
        if (e.key !== "Enter") return;//Solo cuando presiona Enter

        searchFieldChanged(name, e.target.value);
    };

    //Para cambiar el orden de los resultados
    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("project.index"), queryParams);
    };
    return (




        <AuthenticatedLayout //Este componente solo se muestra si el que lo solicita es un usuario real y logueado
            header={
                <h2 className="text-xl font-semibold leading-tight text-blue-800 dark:text-gray-200">
                    Proyectos
                </h2>
            }
        >
            <Head title='Proyectos' ></Head>
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
                                    <tr className="text-nowrap dark:bg-gray-800  ">
                                        <th className="px-3 py-3" />
                                        <th className="px-3 py-3">
                                            <TextInput
                                                className="w-11  bg-blue-100 "
                                                defaultValue={queryParams.id}
                                                placeholder="ID"
                                                onBlur={(e) =>
                                                    searchFieldChanged("id", e.target.value)
                                                }
                                                onKeyPress={(e) => {
                                                    onKeyPress("id", e);
                                                    getParams();
                                                }}
                                            />
                                        </th>
                                        <th className="px-3 py-3 ">
                                            <TextInput
                                                className="w-full  bg-blue-100 "
                                                defaultValue={queryParams.name}
                                                placeholder="Nombre"
                                                onBlur={(e) =>
                                                    searchFieldChanged("name", e.target.value)
                                                }
                                                onKeyPress={(e) => {
                                                    onKeyPress("name", e);
                                                    getParams();
                                                }}
                                            />
                                        </th>
                                        <th className="px-3 py-3">
                                            <SelectInput
                                                className="w-full bg-blue-100"
                                                defaultValue={queryParams.status}
                                                onChange={(e) =>
                                                    searchFieldChanged("status", e.target.value)
                                                }
                                            >
                                                <option className="text-gray-400" value="">Todos</option>
                                                <option value="pending">Pendiente</option>
                                                <option value="in_progress">En progreso</option>
                                                <option value="completed">Completado</option>
                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-3">
                                            <TextInput
                                                className="w-full bg-blue-100"
                                                defaultValue={queryParams.created_by}
                                                placeholder="Buscar creador"
                                                onBlur={(e) =>
                                                    searchFieldChanged("created_by", e.target.value)
                                                }
                                                onKeyPress={(e) => onKeyPress("created_by", e)}
                                            />
                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3">
                                            {(queryString != "") && <ResetButton link="project.index" queryString={queryString} />}

                                        </th>
                                    </tr>
                                    <tr className="text-nowrap ">
                                        {/* <th className="p-4">ID</th> */}
                                        <th className="p-3">Imagen</th> {/*Imagen*/}
                                        <TableHeading
                                            name="id"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            ID
                                        </TableHeading>
                                        <TableHeading
                                            name="name"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Nombre
                                        </TableHeading>
                                        <th className="p-3 text-center">Estado</th>
                                        <TableHeading
                                            name="created_by"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Creador
                                        </TableHeading>
                                        {/* //^Cabe mencionar que por la naturaleza de las relaciones de las tablas, se filtra por orden numérico del id de usuario(Lo que viene a se un orden de creación de usuario) */}
                                        <TableHeading
                                            name="created_at"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Fecha de creación
                                        </TableHeading>
                                        <TableHeading
                                            name="due_date"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Fecha límite
                                        </TableHeading>

                                        <th className="p-3 text-center">Total: {projects.meta.total}</th>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500" />
                                {/* //^Esto es para el bordecito  */}
                                {/*Fin menu/índice de tabla */}
                                {/*Inicio contenidos de tabla */}
                                <tbody>

                                    {
                                        projects.data.map((project) => {//? Una arrow function que hace algo parecido a un foreach
                                            return (
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-md"
                                                    key={project.id}>
                                                    <td className="px-3 py-2">
                                                        {/* <img src={project.image} alt="" style={{ width: 60 }} /> */}
                                                    </td>
                                                    {/* //! Hay un problema con las imágenes generadas por el seeder, hay que sutituirlas porquye la API de la página no funciona
                                            //! https://fastly.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4  */}
                                                    <th className="px-3 py-2 text-center">{project.id}</th>
                                                    <td className="px-3 py-2 !text-blue-900 hover:underline">
                                                        <Link href={route("project.show", project = project)} >{project.name}</Link>
                                                        {/* //?La razon por la que aqui estoy usando href es porque 
                                                        // ?1. Estoy redirigiendo de mi página a mi página
                                                        // ?2. Quiero que ocurran los eventos default */}
                                                    </td>
                                                    {/* //TODO Poner el Link a la página del proyecto en el nombre */}
                                                    <div className="px-1 py-1 text-center content-center">
                                                        <td className={"px-2 py-1 rounded-lg text-white  " + PROJECT_STATUS_CLASS_MAP[project.status]}>{PROJECT_STATUS_TEXT_MAP[project.status]}</td>
                                                    </div>
                                                    <td className="px-3 py-2">{project.createdBy.name}</td>
                                                    <td className="px-3 py-2">{project.created_at}</td>
                                                    <td className="px-3 py-2">{project.due_date}</td>

                                                    <td className="px-3 py-2 text-center">
                                                        {(
                                                            (Array.isArray(usersOnProject) && usersOnProject.some(user => user.id === auth.user.id)) ||
                                                            (project.createdBy.id === auth.user.id) ||
                                                            auth.user.role === 'admin'
                                                        ) && (
                                                                <Link
                                                                    onClick={route('project.edit', project.id)}
                                                                    className="text-yellow-700 bg-yellow-300 dark:text-yellow-300 dark:bg-yellow-700 mx-1 py-1 px-5 hover:shadow-sm rounded-md size-3 text-base"
                                                                >
                                                                    Editar
                                                                </Link>
                                                            )}
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
                            <Pagination pagLinks={projects.meta} activeParam={queryString} >
                            </Pagination>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >

    )
} 
