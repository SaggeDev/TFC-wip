import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, projects, users }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
    project_id: "",
    priority: "",
    assigned_user_id: "",
    task_link: ""
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && value instanceof File) {
        formData.append(key, value);
      }
    });

    post(route("task.store"), {
      data: formData,
      forceFormData: true
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-blue-800 dark:text-gray-200 leading-tight">
            Nueva tarea
          </h2>
        </div>
      }
    >
      <Head title="Crear tarea" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div>
                <InputLabel htmlFor="task_project_id" value="Proyecto" />

                <SelectInput
                  name="project_id"
                  id="task_project_id"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("project_id", e.target.value)}
                >
                  <option value="">Seleccionar proyecto</option>
                  {projects.data.map((project) => (
                    <option value={project.id} key={project.id}>
                      ({project.id}) {project.name}
                    </option>
                  ))}
                </SelectInput>

                <InputError message={errors.project_id} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_image_path" value="Foto de la tarea" />
                <TextInput
                  id="task_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_name" value="Nombre" />

                <TextInput
                  id="task_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />

                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_description"
                  value="Descripción"
                />

                <TextAreaInput
                  id="task_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("description", e.target.value)}
                />

                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_due_date" value="Fecha límite" />

                <TextInput
                  id="task_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("due_date", e.target.value)}
                />

                <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_status" value="Estado inicial" />

                <SelectInput
                  name="status"
                  id="task_status"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">...</option>
                  <option value="pending" className="text-red-600">Pendiente</option>
                  <option value="in_progress" className="text-blue-600">En progreso</option>
                  <option value="completed" className="text-green-600">Completada</option>
                </SelectInput>

                <InputError message={errors.task_status} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="task_priority" value="Prioridad inicial" />

                <SelectInput
                  name="priority"
                  id="task_priority"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("priority", e.target.value)}
                >
                  <option value="" >...</option>
                  <option value="low" className="text-amber-500 hover:bg-amber-500">Baja</option>
                  <option value="medium" className="text-amber-700">Alta</option>
                  <option value="high" className="text-red-700">Urgente</option>
                </SelectInput>

                <InputError message={errors.priority} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_link" value="Link de la tarea" />

                <TextInput
                  id="task_link"
                  type="text"
                  name="task_link"
                  value={data.task_link}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("task_link", e.target.value)}
                />

                <InputError message={errors.task_link} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_assigned_user"
                  value="Asignar a:"
                />

                <SelectInput
                  name="assigned_user_id"
                  id="task_assigned_user"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("assigned_user_id", e.target.value)}
                >
                  <option value="">Nadie</option>
                  {users.data.map((user) => (
                    <option value={user.id} key={user.id}>
                      {user.name}
                    </option>
                  ))}
                </SelectInput>

                <InputError
                  message={errors.assigned_user_id}
                  className="mt-2"
                />
              </div>

              <div className="mt-4 text-right">
                <Link
                  href={route("task.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancelar
                </Link>
                <button className="bg-amber-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-amber-600">
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}