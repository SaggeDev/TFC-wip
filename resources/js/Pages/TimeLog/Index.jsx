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
export default function Index({ success, querParams, timeLogs, auth }) {
  let adminPresent = false;
  if (auth.user.role == "admin") {
    adminPresent = true;
  }




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
              <table>
                <thead>
                  <tr>

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