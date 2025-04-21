import React from "react";
import { router } from "@inertiajs/react";
import { Button } from "@headlessui/react";


const ResetButton = ({ link, queryString, project="" }) => {


  return (
    <>
        <Button className="text-center p-2 bg-blue-600 text-white rounded-md" onClick={() => router.get(route(link,project))}>Resetear filtros</Button>
    </>
  );//
};

/*router.get(route("project.show", project), queryParams, {
      preserveState: true,
      replace: true,
      preserveScroll: true,
    }); */

export default ResetButton;
