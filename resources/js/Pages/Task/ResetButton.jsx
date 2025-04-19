import React from "react";
import { router } from "@inertiajs/react";
import { Button } from "@headlessui/react";


const ResetButton = ({ link, queryString }) => {


  return (
    <>
        <Button className="text-center p-2 bg-blue-600 text-white rounded-md" onClick={() => router.get(route(link))}>Resetear filtros</Button>
    </>
  );
};

export default ResetButton;
