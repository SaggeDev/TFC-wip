import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading"
import { useState, useEffect } from "react";
import { PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP } from "@/constants.jsx";
import ResetButton from "@/Pages/Task/ResetButton";
import ConfirmationAlert from "@/Components/ConfirmationAlert"
import Moment from 'moment';

//? Para permitir la vista distinta de admin y users, esta programado de forma que se cargan todos los registros pero se muestran solo los que tienen el user id==card[user id] por asi decirlo, si es admin, se desactiva la condición
export default function Index({ success, queryParams = null, timeLogs, auth }) {
  const adminPresent = (auth.user.role == "admin") ? true : false;
  //? Si lo manejo con una constante condicional, gano en seguridad, comprensión lectora(por asi decirlo) y ahorro recursos
  // usersOnProject.some(user => user.id === auth.user.id))
  // console.log(usersOnProject)
  // console.log(auth.user.id)
  Moment.locale('es');
  let start;
  let end;
  let duration;
  const calcDuration = (timeLog) => {//Sugerencia de Pablo Miguel Ferrer
    start = Moment(timeLog.entry_time, 'HH:mm:ss');
    end = Moment(timeLog.exit_time, 'HH:mm:ss');
    start.add(4,'days')
    end.add(4,'days')
    duration = Moment.duration(end.diff(start));
    return (duration);
  };
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

    router.get(route("timeLog.index"), queryParams, {
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
    router.get(route("timeLog.index"), queryParams);
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
          {!adminPresent && (<Link href={route('timeLog.create')} className="bg-green-600 text-white p-1 rounded-md"> Registrar horas
          </Link>)}

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
                    <th className="px-3 py-3">
                      <TextInput
                        className="w-11  bg-blue-100 "
                        defaultValue={queryParams.id}
                        placeholder="ID"
                        onBlur={(e) =>
                          searchFieldChanged("id", e.target.value)
                        }
                        onKeyPress={(e) => {
                          onKeyPress("id", e);
                          // getParams();
                        }}
                      />


                    </th>
                    {/* Entrada */}
                    <th className="px-3 py-3" >
                      <input aria-label="Date" type="date" className="  bg-blue-100 rounded-lg border-gray-300  focus:border-indigo-500  focus:ring-indigo-500 dark:focus:ring-indigo-600  shadow-sm"
                        placeholder="Fecha de entrada"
                        onChange={(e) =>
                          searchFieldChanged("entry_time", e.target.value)} />
                    </th>
                    {/* Salida */}
                    <th className="px-3 py-3" >
                      <input aria-label="Date" type="date" className="  bg-blue-100 rounded-lg border-gray-300  focus:border-indigo-500  focus:ring-indigo-500 dark:focus:ring-indigo-600  shadow-sm"
                        placeholder="Fecha de salida"
                        onChange={(e) =>
                          searchFieldChanged("exit_time", e.target.value)} />
                    </th>
                    {/* Tipo */}
                    <th className="px-3 py-3">
                      <SelectInput
                        className="w-full bg-blue-100"
                        defaultValue={queryParams.work_type}
                        onChange={(e) =>
                          searchFieldChanged("work_type", e.target.value)
                        }
                      >
                        <option className="text-gray-400" value="">...</option>
                        <option value="at_office">Personado</option>
                        <option value="home_office">Teletrabajado</option>

                      </SelectInput>
                    </th>

                    {adminPresent && (
                      <>
                        {/* (Solo admin) Pertenece a  */}
                        <th className="px-3 py-3" >
                          <TextInput
                            className="  bg-blue-100 "
                            defaultValue={queryParams.user_id}
                            placeholder="Usuario"
                            onBlur={(e) =>
                              searchFieldChanged("user_id", e.target.value)
                            }
                            onKeyPress={(e) => {
                              onKeyPress("user_id", e);
                              // getParams();
                            }}
                          />
                        </th>
                        {/* (Solo admin) Alterado  */}
                        <th className="px-3 py-3 text-center" >
                          <SelectInput
                            className="w-full bg-blue-100"
                            defaultValue={queryParams.altered}
                            onChange={(e) =>
                              searchFieldChanged("altered", e.target.value)
                            }
                          >
                            <option className="text-gray-400" value="">...</option>
                            <option value="1">Si</option>
                            <option value="0">No</option>

                          </SelectInput></th>
                      </>
                    )}
                    {/* Tiempo total */}
                    {!adminPresent && (<th className="px-3 py-3 content-center" />)}
                    <th className="px-3 py-3 content-center text-center" >
                      {(queryString != "") && <ResetButton link="timeLog.index" queryString={queryString} />}
                    </th>
                  </tr>
                  <tr className="text-nowrap ">
                    {/* <th className="p-4">ID</th> */}
                    <TableHeading
                      name="id"
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      ID
                    </TableHeading>
                    <TableHeading
                      name="entry_time"
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Fecha de entrada
                    </TableHeading>
                    <TableHeading
                      name="exit_time"
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Fecha de salida
                    </TableHeading>
                    <th className="p-3 text-center">Tipo de registro</th>

                    {/* //^Cabe mencionar que por la naturaleza de las relaciones de las tablas, se filtra por orden numérico del id de usuario(Lo que viene a se un orden de creación de usuario) */}

                    {adminPresent && (
                      <>
                        <TableHeading
                          name="user_id"
                          sort_field={queryParams.sort_field}
                          sort_direction={queryParams.sort_direction}
                          sortChanged={sortChanged}
                        >
                          Usuario
                        </TableHeading>
                        <th className="p-3 text-center">Alterado</th></>
                    )
                    }
                    <th className="p-3 text-center">Tiempo total</th>
                    {!adminPresent && (<th className="p-3 text-center">Acciones</th>)}




                  </tr>
                </thead>
                <tbody>
                  <br />
                  {(timeLogs.data).map((timeLog) => {
                    duration = calcDuration(timeLog);


                    return (
                      <tr key={timeLog.id}>
                        <td>{timeLog.id}</td>
                        <td>
                          {Moment(timeLog.entry_time).format('HH:mm:ss ')}
                          <br />
                          {Moment(timeLog.entry_time).format('DD MMM yy ')}
                        </td>
                        <td>
                          {Moment(timeLog.exit_time).format('HH:mm:ss ')}
                          <br />
                          {Moment(timeLog.exit_time).format('DD MMM yy ')}
                        </td>
                        <td>{(timeLog.work_type == "at_office") ? "Personado" : "Teletrabajado"}</td>
                        {adminPresent && (
                          <>
                            <td>{timeLog.user.name}</td>
                            <td>{timeLog.altered ? "Sí" : "No"}</td>
                          </>
                        )}
                        <td>
                          {console.log(duration)}
                          {duration.days() > 0 ? `${duration.days()}d   :   ` : ""}{duration.hours()}h   :   {duration.minutes()}m
                        </td>
                        {!adminPresent && (
                          <td>
                            <Link href={route('timeLog.edit', timeLog.id)} className="text-blue-500">Editar</Link>
                          </td>

                        )}
                        <td></td>

                      </tr>
                    )
                  })}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>




    </AuthenticatedLayout >
  )
}