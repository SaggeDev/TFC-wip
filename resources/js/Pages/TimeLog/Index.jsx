import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading"
import { useState, useEffect } from "react";
import { PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP } from "@/constants.jsx";
import ResetButton from "@/Pages/Project/ResetButton";
import ConfirmationAlert from "@/Components/ConfirmationAlert"

//? Para permitir la vista distinta de admin y users, esta programado de forma que se cargan todos los registros pero se muestran solo los que tienen el user id==card[user id] por asi decirlo, si es admin, se desactiva la condición
export default function Index({ success, queryParams = null, timeLogs, auth }) {
  let adminPresent = false;
  if (auth.user.role == "admin") {
    adminPresent = true;
  }
  // usersOnProject.some(user => user.id === auth.user.id))
  // console.log(usersOnProject)
  // console.log(auth.user.id)
  const hasNoParams = Object.keys(queryParams || {}).length === 0;
  const checkParams = (hasNoParams) => {
    hasNoParams = Object.keys(queryParams || {}).length === 0;
  }
  const { page, ...nonPageParams } = queryParams || {};
  const queryString = new URLSearchParams(nonPageParams).toString();

  //Para poder buscar los campos
  queryParams = queryParams || {};//El valor por defecto que toma al cargar la página es null
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("TimeLog.index"), queryParams, {
      preserveState: true,
      replace: true,
      preserveScroll: true,
    });

  };

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
    router.get(route("TimeLog.index"), queryParams);
  };


    //^ Para permitir la vista distinta de admin y users, esta programado de forma que se cargan todos los registros pero se muestran solo los que tienen el user id==card[user id] por asi decirlo, si es admin, se desactiva la condición

  return (
    <AuthenticatedLayout
      header={
        <div>
          <h2 className="text-xl font-semibold leading-tight text-blue-800 dark:text-gray-200">
            Horas trabajadas
          </h2>
          <br />
          <Link href={route('timeLog.create')} className="bg-green-600 text-white p-1 rounded-md"> Registrar horas
          </Link>
        </div>
      }
    >
      <Head title='Registros horarios' ></Head>
      {success && <ConfirmationAlert text={success} />}
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-400 rounded-b-md">
              <table className="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400 ">
                <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap dark:bg-gray-800">
                    {/* ID */}
                    <th className="px-3 py-3" />
                    {/* Entrada */}
                    <th className="px-3 py-3" />
                    {/* Salida */}
                    <th className="px-3 py-3" />
                    {/* Tipo */}
                    <th className="px-3 py-3" />
                    {/* (Solo admin) Pertenece a  */}
                    <th className="px-3 py-3" />
                    {/* (Solo admin) Alterado  */}
                    <th className="px-3 py-3" />
                    {/* (Solo user) Acciones  */}
                    <th className="px-3 py-3" />


                  </tr>
                  <tr>

                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>




    </AuthenticatedLayout>
  )
}