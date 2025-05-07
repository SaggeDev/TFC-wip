import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP, TASK_PRIORITY_TEXT_MAP, TASK_PRIORITY_CLASS_MAP } from "@/constants";
import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading"
import { Head, Link, router } from "@inertiajs/react";
import ResetButton from "@/Pages/Task/ResetButton";
import SelectInput from "@/Components/SelectInput";


export default function Dashboard({ auth, queryParams = null, myPendingTasks, myProgressTasks, myCompletedTasks, activeTasks}) {
    const { page, ...nonPageParams } = queryParams || {};
    const queryString = new URLSearchParams(nonPageParams).toString();
    //Para poder buscar los campos
    queryParams = queryParams || {};//El valor por defecto que toma al cargar la página es null

    const hasNoParams = Object.keys(queryParams || {}).length === 0;
    const checkParams = (hasNoParams) => {
        hasNoParams = Object.keys(queryParams || {}).length === 0;
    }
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
        router.get(route("dashboard"), queryParams);
    };
    const searchFieldChanged = (name, value) => {
            if (value) {
                queryParams[name] = value;
            } else {
                delete queryParams[name];
            }
    
            router.get(route("dashboard"), queryParams, {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            });
    
        };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-blue-800 dark:text-gray-200">
                    Panel de control
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-red-500 text-2xl font-semibold">
                                Tareas pendientes
                            </h3>
                            <p className="text-xl text-center mt-4">
                                <span className="mr-2">{myPendingTasks}</span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-blue-500 text-2xl font-semibold">
                                Tareas en progreso
                            </h3>
                            <p className="text-xl text-center mt-4">
                                <span className="mr-2">{myProgressTasks}</span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-green-500 text-2xl font-semibold">
                                Tareas completadas
                            </h3>
                            <p className="text-xl text-center mt-4">
                                <span className="mr-2">{myCompletedTasks}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
                    <div className="bg-gray-50 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-gray-500 text-xl font-semibold">
                                Tareas por terminar
                            </h3>


                            <table className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap dark:bg-gray-800  ">
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
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
                                            </SelectInput>
                                        </th>
                                        


                                        <th className="px-3 py-3">
                                            {(queryString != "") && <ResetButton link="dashboard" queryString={queryString} />}

                                        </th>
                                    </tr>
                                    <tr>
                                        <TableHeading
                                            name="id"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            ID
                                        </TableHeading>
                                        <th className="px-3 py-3 w-120">Nombre</th>
                                        <TableHeading
                                            name="priority"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Prioridad
                                        </TableHeading>
                                        <th className="px-3 py-3 w-120">Nombre del proyecto</th>
                                        <TableHeading
                                            name="status"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Estado
                                        </TableHeading>
                                        <TableHeading
                                            name="due_date"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Fecha límite
                                        </TableHeading>


                                    </tr>
                                </thead>
                                <tbody>
                                    {activeTasks.data.map((task) => (
                                        <tr key={task.id}>
                                            <td className="px-3 py-2">{task.id}</td>
                                            <td className="px-3 py-2 text-blue-700 hover:underline hover:text-blue-800 w-150">
                                                <Link href={route("task.show", task.id)}>
                                                    {task.name}
                                                </Link>
                                            </td>
                                            <div className="px-1 py-1 text-center content-center">
                                                <div className={" py-1  rounded-lg text-white   " + TASK_PRIORITY_CLASS_MAP[task.priority]}>{TASK_PRIORITY_TEXT_MAP[task.priority]}</div>
                                            </div>
                                            <td className="px-3 py-2 text-gray-700 hover:underline hover:text-gray-800 w-110">
                                                <Link href={route("project.show", task.fromProject.id)}>
                                                    {task.fromProject.name}
                                                </Link>
                                            </td>

                                            <div className="px-2 py-1 ">
                                                <div className={" py-1 rounded-lg text-white w-full text-center content-center " + TASK_STATUS_CLASS_MAP[task.status]}>{TASK_STATUS_TEXT_MAP[task.status]}</div>
                                            </div>
                                            <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination pagLinks={activeTasks.meta}>
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}