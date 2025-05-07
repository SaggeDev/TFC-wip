//& La página de listado de proyectos y tareas es casi la misma, asi que la reutilizo
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading"
import { useState, useEffect } from "react";
import { TASK_STATUS_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_PRIORITY_CLASS_MAP } from "@/constants.jsx";
import ResetButton from "@/Pages/Task/ResetButton";
import ConfirmationAlert from "@/Components/ConfirmationAlert"
import { Button } from "@mui/material";


export default function Index({ tasks, queryParams = null, success, auth }) {//Cada que llame a este componente, voy a tener que mandarle la lista de tareas

    // console.log(success)
    const { page, ...nonPageParams } = queryParams || {};
    const queryString = new URLSearchParams(nonPageParams).toString();
    const deleteTask = (task) => {
        if (!window.confirm("Estas seguro que quieres eliminar esta tarea?")) {
            return;
        }
        router.delete(route("task.destroy", task.id));
    };
    // const [myTasks, setMyTasks]=useState(false);

    //Para poder buscar los campos
    queryParams = queryParams || {};//El valor por defecto que toma al cargar la página es null
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("task.index"), queryParams, {
            preserveState: true,
            replace: true,
            preserveScroll: true,
        });

    };
    const hasNoParams = Object.keys(queryParams || {}).length === 0;
    const checkParams = (hasNoParams) => {
        hasNoParams = Object.keys(queryParams || {}).length === 0;
    }

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
        router.get(route("task.index"), queryParams);
    };
    return (




        <AuthenticatedLayout //Este componente solo se muestra si el que lo solicita es un usuario real y logueado
            header={
                <div>
                    <h2 className="text-xl font-semibold leading-tight text-blue-800 dark:text-gray-200">
                        Tareas
                    </h2>
                    <br />
                    <Link href={route('task.create')} className="bg-green-600 text-white p-1 rounded-md"> Crear Tarea
                    </Link>
                </div>
            }
        >
            <Head title='Tareas' ></Head>
            {success && <ConfirmationAlert text={success} />}
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-400 rounded-b-md shadow sm:rounded-lg">
                            {/* <pre>{JSON.stringify(tasks,undefined,2)}</pre> */}
                            {/*//? Esto devuelve un texto con el contenido simple, perfecto para json y revisar lo que devuelve el controlador*/}

                            {/*//*Display de las tareas */}
                            <table className="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400 ">
                                {/*Inicio menu/índice de tabla */}
                                <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap dark:bg-gray-800  ">
                                        <th className="px-1 py-3 ">
                                            <SelectInput
                                                className="w-auto bg-blue-100"
                                                defaultValue={queryParams.priority}
                                                onChange={(e) =>
                                                    searchFieldChanged("priority", e.target.value)
                                                }
                                            >
                                                <option className="text-gray-400" value="">Todo</option>
                                                <option value="low">Baja</option>
                                                <option value="high">Alta</option>
                                                <option value="urgent">Urgente</option>
                                            </SelectInput> </th>
                                        <th className="px-3 py-3 ">
                                            <TextInput
                                                className="w-11  bg-blue-100 "
                                                defaultValue={queryParams.id}
                                                placeholder="ID"
                                                onBlur={(e) =>
                                                    searchFieldChanged("id", e.target.value)
                                                }
                                                onKeyPress={(e) => {
                                                    onKeyPress("id", e);
                                                    // getParams();
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
                                                    // getParams();
                                                }}
                                            />
                                        </th>
                                        <th className=" py-3">
                                            <SelectInput
                                                className="w-24 bg-blue-100"
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
                                                placeholder="Proyecto"
                                                onBlur={(e) =>
                                                    searchFieldChanged("fromProject", e.target.value)
                                                }
                                                onKeyPress={(e) => onKeyPress("fromProject", e)}
                                            />
                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        {/* <th className="px-3 py-3">
                                           <Link className={"rounded-lg  p-3 "+ (myTasks?"bg-blue-200 text-blue-600":"bg-green-200 text-green-600")} onClick={
                                            ()=>{setMyTasks(!myTasks)}
                                           } color="inherit">Mis tareas</Link> 
                                        </th> */}
                                        {/* //TODO: Mejora */}
                                        
                                        <th className="px-3 py-3">
                                            {(queryString != "") && <ResetButton link="task.index" queryString={queryString} />}

                                        </th>
                                    </tr>
                                    <tr className="text-nowrap ">
                                        {/* <th className="p-4">ID</th> */}
                                        <th className="p-3">Prioridad</th> 
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
                                        <th className="">Estado</th>
                                        <TableHeading
                                            name="created_by"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Proyecto
                                        </TableHeading>
                                        {/* //^Cabe mencionar que por la naturaleza de las relaciones de las tablas, se filtra por orden numérico del id de usuario(Lo que viene a se un orden de creación de usuario) */}
                                        <TableHeading
                                            name="created_at"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Creación
                                        </TableHeading>
                                        <TableHeading
                                            name="due_date"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Fecha límite
                                        </TableHeading>

                                        <th className="p-3 text-center">Total: {tasks.meta.total}</th>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">

                                </thead>
                                {/*Fin menu/índice de tabla */}
                                {/*Inicio contenidos de tabla */}
                                <tbody>

                                    {
                                        tasks.data.map((task) => {//? Una arrow function que hace algo parecido a un foreach
                                            return (
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-md"
                                                    key={task.id}>
                                                    <div className="px-1 py-1 text-center content-center">
                                                        <div className={" py-1  rounded-lg text-white w-full  " + TASK_PRIORITY_CLASS_MAP[task.priority]}>{TASK_PRIORITY_TEXT_MAP[task.priority]}</div>
                                                    </div>
                                                    
                                                    <th className="px-3 py-2 text-center">{task.id}</th>
                                                    <td className="px-3 py-2 !text-blue-900 hover:underline">
                                                        <Link href={route("task.show", task.id)} >{task.name}</Link>
                                                    </td>
                                                    <div className="px-1 py-1 ">
                                                        <div className={" py-1 rounded-lg text-white w-full text-center content-center " + TASK_STATUS_CLASS_MAP[task.status]}>{TASK_STATUS_TEXT_MAP[task.status]}</div>
                                                    </div>
                                                    <td className="px-3 py-2 !text-blue-900 hover:underline">
                                                        <Link href={route("project.show", task.fromProject)} >{task.fromProject.name}</Link>
                                                    </td>
                                                    <td className="px-3 py-2">{task.created_at}</td>
                                                    <td className="px-3 py-2">{task.due_date}</td>

                                                    <td className="px-3 py-2 text-center">
                                                        {/* {console.log(task)}
                                                        {console.log(auth.user.id)} 
                                                        {console.log(task.createdBy.id)}  */}

                                                        {(task.createdFor?.id == auth.user.id || task.createdBy.id == auth.user.id || auth.user.role == 'admin') && <Link href={route('task.edit', task.id)} className="text-yellow-700 bg-yellow-300 dark:text-yellow-300 dark:bg-yellow-700 mx-1 py-1 px-5 hover:shadow-sm rounded-md size-3 text-base">
                                                            Editar
                                                        </Link>}
                                                        {(task.createdBy.id == auth.user.id || auth.user.role == 'admin') && (<button
                                                            onClick={() => deleteTask(task)}
                                                            className="text-red-800 bg-red-200 dark:text-red-200 dark:bg-red-800 mx-1 py-1 px-4 hover:shadow-md rounded-md"
                                                        >
                                                            Eliminar
                                                        </button>)}

                                                        {/* Solo si es el admin, el creador o el usuario asignado, se puede editar */}
                                                    </td>
                                                    

                                                </tr>
                                            )
                                        })}

                                </tbody>
                                {/*Fin contenidos de tabla */}
                            </table>
                            {/*//*Fin display de las tareas */}
                            {/*//* Menu de Paginación */}

                            <Pagination pagLinks={tasks.meta} activeParam={queryString}>
                            </Pagination>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >

    )
} 
