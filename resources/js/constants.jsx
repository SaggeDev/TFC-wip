import {  router } from "@inertiajs/react";


export const PROJECT_STATUS_CLASS_MAP = {
  pending: "bg-red-600 dark:bg-red-700",
  in_progress: " bg-blue-500 dark:bg-blue-600",
  completed: " bg-green-500 dark:bg-green-600",
};
export const PROJECT_STATUS_TEXT_MAP = {
  pending: "Pendiente",
  in_progress: "En progreso",
  completed: "Completado",
};
export const TASK_STATUS_CLASS_MAP = {
  pending: "bg-red-500 dark:bg-red-700",
  in_progress: " bg-blue-500 dark:bg-blue-600",
  completed: " bg-green-500 dark:bg-green-600",
};
export const TASK_STATUS_TEXT_MAP = {
  pending: "Pendiente",
  in_progress: "En progreso",
  completed: "Completado",
};
export const TASK_PRIORITY_CLASS_MAP = {
  low: " bg-amber-400",
  high: " bg-amber-600",
  urgent: " bg-red-600",
};
export const TASK_PRIORITY_TEXT_MAP = {
  low: " Baja ",
  high: " Alta ",
  urgent: "Urgente",
};


//& Mejora de estructuración de interfaces sugerida por Pablo Miguel Ferrer(07/05/2025) para las páginas index y project show
// export const hasNoParams = (queryParams)=>{Object.keys(queryParams || {}).length === 0};
// export const checkParams = (hasNoParams, queryParams) => {
//   hasNoParams = Object.keys(queryParams || {}).length === 0;
// }

// export const onKeyPress = (name, e) => {
//   checkParams()
//   if (e.key !== "Enter") return;//Solo cuando presiona Enter

//   searchFieldChanged(name, e.target.value);
// };
// export const searchFieldChanged = (queryParams, name, value) => {
//   if (value) {
//       queryParams[name] = value;
//   } else {
//       delete queryParams[name];
//   }

//   router.get(route("task.index"), queryParams, {
//       preserveState: true,
//       replace: true,
//       preserveScroll: true,
//   }
// );

// };