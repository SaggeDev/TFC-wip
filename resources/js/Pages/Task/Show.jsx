import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import { useState, useEffect } from "react";
import ConfirmationAlert from "@/Components/ConfirmationAlert.jsx"


export default function Show({ auth, success, task }) {
  console.log(success)
  const [isIn, setIsIn] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (task.data.createdFor.id === auth.user.id) {
      setIsIn(true);
    }
    if (task.data.createdBy.id === auth.user.id) {
      setIsCreator(true);
    }
    if (auth.user.role === "admin") { // ← You had "role" == "role"
      setIsAdmin(true);
    }
  }, [auth.user.id, auth.user.role, task.data.createdBy.id, task.data.createdFor.id]);


  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-blue-800 dark:text-gray-200 leading-tight">
            {`Tarea "${task.data.name}"`}
          </h2>
          {(isIn||isAdmin||isCreator)&&<Link
            href={route("task.edit", task.data.id)}
            className="bg-amber-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-amber-600"
          >
            Editar
          </Link>
          }
        </div>
      }
    >
      <Head title={`Tarea "${task.data.name}"`} />
      {success && <ConfirmationAlert text={success} />}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="bg-gray-100 p-1 shadow">
              <img
                src={("/storage/" + task.data.image) || task.data.image}
                alt=""
                className="w-auto h-64 object-cover rounded-lg"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg">ID de Tarea</label>
                    <p className="mt-1">{task.data.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Nombre</label>
                    <p className="mt-1">{task.data.name}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Estado</label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded text-white " +
                          TASK_STATUS_CLASS_MAP[task.data.status]
                        }
                      >
                        {TASK_STATUS_TEXT_MAP[task.data.status]}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Prioridad</label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded text-white " +
                          TASK_PRIORITY_CLASS_MAP[task.data.priority]
                        }
                      >
                        {TASK_PRIORITY_TEXT_MAP[task.data.priority]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Creado por</label>
                    <p className="mt-1">{task.data.createdBy.name}({task.data.createdBy.email})</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg">Fecha límite</label>
                    <p className="mt-1">{task.data.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Creada en</label>
                    <p className="mt-1">{task.data.created_at}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Proyecto</label>
                    <p className="mt-1">
                      <Link
                        href={route("project.show", task.data.fromProject.id)}
                        className="hover:underline text-blue-900"
                      >
                        {task.data.fromProject.name}
                      </Link>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Usuario asignado</label>
                    {auth.user.id === task.data.createdFor.id ? (
                      <p className="mt-1 text-blue-500">{task.data.createdFor.name} (Tu)</p>
                    ) : <p className="mt-1">{task.data.createdFor.name}({task.data.createdFor.email})</p>}

                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="font-bold text-lg">Descripción</label>
                <p className="mt-1">{task.data.description}</p>
              </div>
              <div className="mt-4">
                <label className="font-bold text-lg">Link de tarea:   </label>

                <a
                  href={task.data.task_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-900 hover:underline"
                >
                  {task.data.task_link}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
