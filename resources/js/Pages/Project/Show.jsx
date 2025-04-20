import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import TasksTable from "../Task/TasksTable.jsx";
import ConfirmationAlert from "@/Components/ConfirmationAlert.jsx"

export default function Show({ auth, success, project, tasks, queryParams }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-blue-800 dark:text-gray-200">
            Proyecto: {project.data.name}
          </h2>
          <Link
            href={route("project.edit", { project: project.data.id })}
            className="bg-emerald-500 py-1.5 px-4 text-white rounded shadow-md transition hover:bg-emerald-600"
          >
            Editar
          </Link>
        </div>
      }
    >
      {success &&<ConfirmationAlert text={success}/>}
     

      {/* Project Overview */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <img
              src={project.data.image}
              alt="Project visual"
              className="w-full h-64 object-cover rounded-t-md"
            />
            <div className="p-6 text-gray-900 dark:text-gray-100 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Info label="ID del Proyecto" value={project.data.id} />
                  <Info label="Nombre" value={project.data.name} />
                  <Info
                    label="Estado"
                    value={
                      <span
                        className={
                          "px-3 py-1 rounded-full text-sm font-semibold text-white " +
                          PROJECT_STATUS_CLASS_MAP[project.data.status]
                        }
                      >
                        {PROJECT_STATUS_TEXT_MAP[project.data.status]}
                      </span>
                    }
                  />
                  <Info label="Creado por" value={project.data.createdBy.name} />
                </div>
                <div className="space-y-4">
                  <Info label="Fecha límite" value={project.data.due_date} />
                  <Info label="Creación" value={project.data.created_at} />
                  <Info label="Actualizado por" value={project.data.updatedBy.name} />
                </div>
              </div>

              <div className="pt-6">
                <label className="block text-lg font-bold mb-1">
                  Descripción del proyecto
                </label>
                <p className="leading-relaxed">{project.data.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Associated Tasks */}
      <div className="pb-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-blue-800 dark:text-white">
                Tareas relacionadas
              </h3>
              <TasksTable
                tasks={tasks}
                
                queryParams={queryParams}
                hideProjectColumn={true}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

// Reusable Info Display Component
function Info({ label, value }) {
  return (
    <div>
      <label className="block font-semibold text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <p className="mt-1 text-gray-800 dark:text-gray-100">{value}</p>
    </div>
  );
}
