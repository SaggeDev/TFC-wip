import { Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";

import {
  TASK_STATUS_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_PRIORITY_CLASS_MAP,
} from "@/constants.jsx";
import ResetButton from "@/Pages/Task/ResetButton";

export default function Index({ tasks, queryParams, project, isIn, isAdmin, isCreator }) {
  queryParams = queryParams ?? {};
  const { page, ...nonPageParams } = queryParams;
  const queryString = new URLSearchParams(nonPageParams).toString();
  const deleteTask = (task) => {
    if (!window.confirm("Estas seguro que quieres eliminar esta tarea?")) {
      return;
    }
    router.delete(route("task.destroy", task.id));
  };
  const searchFieldChanged = (name, value) => {
    const updatedParams = { ...queryParams };

    if (value) {
      updatedParams[name] = value;
    } else {
      delete updatedParams[name];
    }

    router.get(route("project.show", project), updatedParams, {
      preserveState: true,
      replace: true,
      preserveScroll: true,
    });
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    const updatedParams = { ...queryParams };

    if (name === updatedParams.sort_field) {
      updatedParams.sort_direction =
        updatedParams.sort_direction === "asc" ? "desc" : "asc";
    } else {
      updatedParams.sort_field = name;
      updatedParams.sort_direction = "asc";
    }

    router.get(route("project.show", project), updatedParams, {
      preserveState: true,
      replace: true,
      preserveScroll: true,
    });
  };

  return (
    <>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-400 rounded-b-md">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap dark:bg-gray-800">
                    <th className="px-3 py-3">
                      {/* <SelectInput
                        className="w-auto bg-blue-100"
                        value={queryParams.priority || ""}
                        onChange={(e) =>
                          searchFieldChanged("priority", e.target.value)
                        }
                      >
                        <option className="text-gray-400" value="">
                          Todo
                        </option>
                        <option value="low">Baja</option>
                        <option value="high">Alta</option>
                        <option value="urgent">Urgente</option>
                      </SelectInput> */}
                    </th>
                    <th className="px-3 py-3">
                      {/* <TextInput
                        className="w-full bg-blue-100"
                        value={queryParams.id || ""}
                        placeholder="ID"
                        onChange={(e) =>
                          searchFieldChanged("id", e.target.value)
                        }
                        onKeyPress={(e) => onKeyPress("id", e)}
                      /> */}
                    </th>
                    <th className="px-3 py-3" />
                    <th className="px-3 py-3">
                      <TextInput
                        className="w-full bg-blue-100"
                        placeholder="Nombre"

                        onKeyPress={(e) => onKeyPress("name", e)}
                      />
                    </th>
                    <th className="px-3 py-3">
                      <SelectInput
                        className="w-auto bg-blue-100"
                        value={queryParams.status || ""}
                        onChange={(e) =>
                          searchFieldChanged("status", e.target.value)
                        }
                      >
                        <option className="text-gray-400" value="">
                          Todos
                        </option>
                        <option value="pending">Pendiente</option>
                        <option value="in_progress">En progreso</option>
                        <option value="completed">Completado</option>
                      </SelectInput>
                    </th>
                    <th className="px-3 py-3" />
                    <th className="px-3 py-3" />
                    <th className="px-3 py-3">
                      {queryString !== "" && (
                        <ResetButton
                          link="project.show"
                          project={project}
                          queryString={queryString}
                        />
                      )}
                    </th>
                  </tr>
                  <tr className="text-nowrap">
                    <th className="p-3">Prioridad</th>
                    <TableHeading
                      name="id"
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      ID
                    </TableHeading>
                    <th className="">Imagen</th>
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
                      name="createdBy"
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Asignado a
                    </TableHeading>
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
                    <th className="p-3 text-center">
                      Total: {tasks.meta.total}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.data.map((task) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-md"
                      key={task.id}
                    >
                      <td className="px-2 py-1 text-center ">
                        <div
                          className={
                            " py-1 rounded-lg text-white w-full" +
                            TASK_PRIORITY_CLASS_MAP[task.priority]
                          }
                        >
                          {TASK_PRIORITY_TEXT_MAP[task.priority]}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-center">{task.id}</td>
                      <td className="px-3 py-2 text-center">
                        <img
                          src={task.image}
                          alt={`Imagen de ${task.name}`}
                          className="h-12 w-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-3 py-2 !text-blue-900 hover:underline">
                        <Link href={route("task.show", task.id)} >{task.name}</Link>
                      </td>
                      <td className="px-10 py-1 text-center">
                        <div
                          className={
                            " py-1 rounded-lg text-white w-full " +
                            TASK_STATUS_CLASS_MAP[task.status]
                          }
                        >
                          {TASK_STATUS_TEXT_MAP[task.status]}
                        </div>
                      </td>
                      <td className="px-4 py-2">{task.createdFor.name}</td>
                      <td className="px-4 py-2">{task.created_at}</td>
                      <td className="px-4 py-2">{task.due_date}</td>
                      <td className="px-4 py-2">
                        {(isIn||isCreator||isAdmin)&& (
                          <>
                            <Link
                              href={route("task.edit", task.id)}
                              className="text-yellow-800 bg-yellow-200 dark:text-yellow-200 dark:bg-yellow-800 mx-1 py-1 px-4 hover:shadow-md rounded-md"
                            >
                              Editar
                            </Link>
                            {(isCreator||isAdmin)&& (
                            <button
                              onClick={() => deleteTask(task)}
                              className="text-red-800 bg-red-200 dark:text-red-200 dark:bg-red-800 mx-1 py-1 px-4 hover:shadow-md rounded-md"
                            >
                              Eliminar
                            </button>
                            )}
                            {/* Solo el admin y creador pueden borrar la tarea */}
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination pagLinks={tasks.meta} activeParam={queryString} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
