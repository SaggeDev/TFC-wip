import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
    project_link:"",
    created_by:auth.user.id
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("project.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-blue-800 dark:text-gray-200 leading-tight">
            Nuevo proyecto
          </h2>
        </div>
      }
    >
      <Head title="Crear proyecto" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div>
                <InputLabel
                  htmlFor="project_image_path"
                  value="Imagen del proyecto"
                />
                <TextInput
                  id="project_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="project_name" value="Nombre" />

                <TextInput
                  id="project_name"
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
                  htmlFor="project_description"
                  value="Descripción"
                />

                <TextAreaInput
                  id="project_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("description", e.target.value)}
                />

                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_due_date"
                  value="Fecha límite"
                />

                <TextInput
                  id="project_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("due_date", e.target.value)}
                />

                <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="project_status" value="Estado inicial" />

                <SelectInput
                  name="status"
                  id="project_status"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">...</option>
                  <option className="text-red-600" value="pending">Pendiente</option>
                  <option className="text-blue-600" value="in_progress">En progreso</option>
                  <option className="text-emerald-600" value="completed">Completado</option>
                </SelectInput>

                <InputError message={errors.project_status} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="project_link" value="Link del repositorio/drive del proyecto" />

                <TextInput
                  id="project_link"
                  type="text"
                  name="project_link"
                  value={data.project_link}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("project_link", e.target.value)}
                />

                <InputError message={errors.project_link} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("project.index")}
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