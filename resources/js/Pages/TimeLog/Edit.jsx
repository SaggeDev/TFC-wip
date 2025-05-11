import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Head, useForm, Link } from "@inertiajs/react";
import Moment from "moment";


export default function EditTimeLog({ auth, timeLog }) {
  const { data, setData, post, processing, errors } = useForm({
    entry_time: Moment(timeLog.data.entry_time).format("YYYY-MM-DDTHH:mm") || "",
    exit_time: Moment(timeLog.data.exit_time).format("YYYY-MM-DDTHH:mm") || "",
    _method: "PUT",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("timeLog.update", timeLog.data.id), {
      timeLog: timeLog,
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-blue-800 dark:text-gray-200 leading-tight">
            {"Editar Registro. ID: "+timeLog.data.id}
          </h2>
        </div>
      }
    >
      <Head title="Editar Registro Horario" />

      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mt-4">
                <InputLabel htmlFor="entry_time" value="Hora de Entrada" />
                <TextInput
                  id="entry_time"
                  type="datetime-local"
                  name="entry_time"
                  value={data.entry_time}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("entry_time", e.target.value)}
                  isFocused={true}
                />
                <InputError message={errors.entry_time} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="exit_time" value="Hora de Salida" />
                <TextInput
                  id="exit_time"
                  type="datetime-local"
                  name="exit_time"
                  value={data.exit_time}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("exit_time", e.target.value)}
                />
                <InputError message={errors.exit_time} className="mt-2" />
              </div>

              <div className="mt-6 text-right">
                <Link
                  href={route("timeLog.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={processing}
                  className="bg-amber-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-amber-600"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
