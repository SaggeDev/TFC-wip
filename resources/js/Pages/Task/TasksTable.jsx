import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Link, router } from "@inertiajs/react";

export default function TasksTable({
  tasks,
  success,
  queryParams = null,
  hideProjectColumn = false,
}) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("task.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      queryParams.sort_direction =
        queryParams.sort_direction === "asc" ? "desc" : "asc";
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("task.index"), queryParams);
  };

  const deleteTask = (task ) => {
    if (!window.confirm("Are you sure you want to delete the task?")) return;
    router.delete(route("task.destroy", task.id));
  };

  return (
    <>
      {success && (
        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
          {success}
        </div>
      )}

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-400 rounded-b-md">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                {/* Filter Inputs Row */}
                <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap dark:bg-gray-800">
                    <th className="px-3 py-3" />
                    <th className="px-3 py-3" />
                    {!hideProjectColumn && <th className="px-3 py-3" />}
                    <th className="px-3 py-3">
                      <TextInput
                        className="w-full bg-blue-100"
                        defaultValue={queryParams.name}
                        placeholder="Task Name"
                        onBlur={(e) =>
                          searchFieldChanged("name", e.target.value)
                        }
                        onKeyPress={(e) => onKeyPress("name", e)}
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
                        <option value="">Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </SelectInput>
                    </th>
                    <th className="px-3 py-3" />
                    <th className="px-3 py-3" />
                    <th className="px-3 py-3" />
                    <th className="px-3 py-3" />
                  </tr>
                  {/* Column Headers */}
                  <tr className="text-nowrap">
                    <TableHeading
                      name="id"
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      ID
                    </TableHeading>
                    <th className="px-3 py-3">Imagen</th>
                    {!hideProjectColumn && (
                      <th className="px-3 py-3">Proyecto</th>
                    )}
                    <TableHeading
                      name="name"
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Nombre
                    </TableHeading>
                    <TableHeading
                      name="status"
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Estado
                    </TableHeading>
                    <TableHeading
                      name="created_at"
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Creado
                    </TableHeading>
                    <TableHeading
                      name="due_date"
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Fecha límite
                    </TableHeading>
                    <th className="px-3 py-3">Creador</th>
                    <th className="px-3 py-3 text-right">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {tasks.data.map((task) => (
                    <tr
                      key={task.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-3 py-2">{task.id}</td>
                      <td className="px-3 py-2">
                        <img src={task.image} style={{ width: 60 }} />
                      </td>
                      {!hideProjectColumn && (
                        <td className="px-3 py-2">{task.fromProject.name}</td>
                      )}
                      <td className="px-3 py-2 text-blue-900 hover:underline">
                        <Link href={route("task.show", task.id)}>
                          {task.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={
                            "px-2 py-1 rounded-lg text-white " +
                            TASK_STATUS_CLASS_MAP[task.status]
                          }
                        >
                          {TASK_STATUS_TEXT_MAP[task.status]}
                        </span>
                      </td>
                      <td className="px-3 py-2">{task.created_at}</td>
                      <td className="px-3 py-2">{task.due_date}</td>
                      <td className="px-3 py-2">
                        {task.fromProject.createdBy.name}
                      </td>
                      <td className="px-3 py-2 text-right text-nowrap">
                        <Link
                          href={route("task.edit", task.id)}
                          className="text-yellow-700 bg-yellow-300 dark:text-yellow-300 dark:bg-yellow-700 mx-1 py-1 px-5 hover:shadow-sm rounded-md text-base"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => deleteTask(task)}
                          className="text-red-700 bg-red-300 dark:text-red-300 dark:bg-red-700 mx-1 py-1 px-5 hover:shadow-sm rounded-md text-base"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination pagLinks={tasks.meta} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
