import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import TasksTable from "../Task/TasksTable.jsx";
import ConfirmationAlert from "@/Components/ConfirmationAlert.jsx"
import { useState } from "react";
import { Button } from "@headlessui/react";

export default function Show({ auth, success, project, UsersOnProject, tasks, queryParams }) {
  const [isIn, setIsIn] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const joinProject = (user_id, project_id) => {
    if (!window.confirm("¿Estás seguro de unirte al proyecto? No es reversible")) return;

    router.post(
      route('projectUser.store', { project: project_id }),
      { user_id: user_id }
    );
  };
  switch (true) {
    case auth.user.id === project.data.createdBy.id:
      if (!isCreator) {
        setIsCreator(true);
      }
      break;
    case auth.user.role === 'admin':
      if (!isAdmin) {
        setIsAdmin(true);
      }
      break;
    default:
      break;
  }
  const deleteProject = (project) => {
    if (!window.confirm("Estas seguro que quieres eliminar este proyecto?")) {
      return;
    }
    if (!window.confirm("También estarás borrando las tareas y archivos. Esta acción es completamente irreversible, estás seguro?")) {
      return;
    }
    router.delete(route("project.destroy", project.id));
  };

  return (

    <AuthenticatedLayout

      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-blue-800 dark:text-gray-200">
            Proyecto: {project.data.name}
          </h2>
          {(isAdmin || isCreator) && <button
            onClick={() => deleteProject(project.data)}
            className="bg-red-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-red-600"
          >
            Eliminar
          </button>
          }
          {(isIn || isCreator || isAdmin) && <Link
            href={route("project.edit", { project: project.data.id })}
            className="bg-amber-500 py-1.5 px-4 text-white rounded shadow-md transition hover:bg-amber-600"
          >
            Editar
          </Link>}
          {/* //^Solo aparece cuando está el creador, administrador o está unido el user */}
        </div>
      }
    >
      <Head title={'Proyecto ' + project.data.id}></Head>

      {success && <ConfirmationAlert text={success} />}

      {/* <pre>{JSON.stringify(UsersOnProject, undefined, 2)}</pre> */}

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 ">
            <div className="p-2 bg-gray-100 rounded-lg shadow-sm">
              <img
                src={"/storage/" + project.data.image}
                className="w-auto h-64 object-cover rounded-md"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                </div>
                <div className="space-y-4">
                  <Info label="Fecha límite" value={project.data.due_date} />
                  <Info label="Creado en" value={project.data.created_at} />
                  <Info label="Creado por" value={(project.data.createdBy.name) + " (" + (project.data.createdBy.email) + ")"} />
                </div>
                <div>

                  <Info
                    label="Participante/s:"
                    value={

                      UsersOnProject.length > 0 ? (
                        <ul>
                          {UsersOnProject.map((user) => {
                            if (user.id === auth.user.id) {
                              if (!isIn) {
                                setIsIn(true);
                              }
                              return (<li key={user.id} className="text-blue-700">{user.name} (Tu)</li>);

                            }


                            else {
                              return (<li key={user.id}>{user.name} ({user.email})</li>);
                            }


                          })}
                        </ul>
                      ) : (
                        "Nadie se ha unido al proyecto todavía"
                      )

                    }
                  />
                  {!isIn && (
                    <Button onClick={() => { joinProject(auth.user.id, project.data.id) }} className="bg-green-500 text-white rounded-md p-2 ">Unirse</Button>
                  )}

                </div>
              </div>

              <div className="pt-6">
                <label className="block text-lg font-bold mb-1">
                  Descripción del proyecto
                </label>
                <p className="leading-relaxed">{project.data.description}</p>
              </div>
              <div className="pt-6">
                <label className="block text-lg font-bold mb-1">
                  Repositorio/Drive del proyecto
                </label>
                <Link onClick={() => window.open(project.data.project_link, '_blank')} className="leading-relaxed text-blue-900 hover:text-blue-600">{project.data.project_link}</Link>
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
                project={project.data.id}
                isIn={isIn}
                isCreator={isCreator}
                isAdmin={isAdmin}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout >
  );
}

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
