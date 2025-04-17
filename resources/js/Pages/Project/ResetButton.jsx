import React from "react";
import { router } from "@inertiajs/react";
import { Button } from "@headlessui/react";


const ResetButton = () => {


  return (
    <>
        <Button className="text-center p-2 bg-blue-600 text-white rounded-md" onClick={() => router.get(route("project.index"))}>Resetear filtros</Button>
    </>
  );
};

export default ResetButton;
