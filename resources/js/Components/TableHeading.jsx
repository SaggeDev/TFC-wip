import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
//^ Esta libreía permite crear componentes de react de distintas formas(Flecha arriba y bajo por ejemplo) en vez de tener que compoenrlo con el 
export default function TableHeading({
  name,
  sortable = true,
  sort_field = null,
  sort_direction = null,
  sortChanged = () => {},
  children,
}) {
  return (
    <th onClick={(e) => sortChanged(name)}>
      <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
        {children}
        {sortable && (
          <div>
            <ChevronUpIcon
              className={
                "w-4 " +
                (sort_field === name && sort_direction === "asc"
                  ? "text-blue-600 dark:text-blue-400"
                  : "")
              }
            />
            <ChevronDownIcon
              className={
                "w-4 -mt-2 " +
                (sort_field === name && sort_direction === "desc"
                  ? "text-blue-700 dark:text-blue-400"
                  : "")
              }
            />
          </div>
        )}
      </div>
    </th>
  );
}