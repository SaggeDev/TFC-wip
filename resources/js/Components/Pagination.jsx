import React from 'react';
import { Link } from "@inertiajs/react";



export default function Pagination({ pagLinks }) {
  return (
    <nav className="text-center m-3">
      {
        pagLinks.links.map((link) => (
          <Link
          preserveScroll //Para que cada vez que se pulsa el botón, no se reinicie la altura de la página
            dangerouslySetInnerHTML={(() => {
              if (link.label == "&laquo; Previous") {
                return { __html: "Anterior" };
              } else if (link.label == "Next &raquo;") {
                return { __html: "Siguiente" };
              } else {
                return { __html: link.label };
              }
              //TODO:Idiomas
            })()}//Con esto se inserta como contenido html y que no se interprete como string, el grupo condicional de arriba es para la traducción
            key={link.label} //El identificador
            className={
              "inline-block py-2 px-3 rounded-lg dark:text-gray-200 text-xs" + // El estilo de cada botón
              (link.active ? " bg-blue-500 dark:bg-blue-900 dark:text-white" : "") + // El estilo si está activo
              (!link.url ? " !text-gray-500 cursor-not-allowed" : "hover:bg-gray-950") //El estilo si no encuentra el link
            }
            href={link.url || ""}>
          </Link>
        ))}
    </nav>
  )
}