import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import Moment from "moment"; 

export default function TimeLogRegister({ lastTimeLog, success }) {
  const [duration, setDuration] = useState(Moment.duration(0));

  const entryTime = Moment(lastTimeLog?.entry_time, "YYYY-MM-DD HH:mm:ss").add(2, "hours");

  useEffect(() => {
    if (lastTimeLog && lastTimeLog.exit_time == null) {
      const interval = setInterval(() => {
        const now = Moment();
        const newDuration = Moment.duration(now.diff(entryTime));
        setDuration(newDuration);
      }, 1000);

      return () => clearInterval(interval); 
    }
  }, [lastTimeLog]);

  switch (true) {
    default:
    case success === null:
    case success?.includes("Registro guardado con éxito"):
      return (
        <Link href={route('timeLog.create')} className="bg-green-600 text-white p-1 rounded-md">
          Registrar horas
        </Link>
      );

    case (success === " " && lastTimeLog?.exit_time == null):
    case success === "Registro comenzado con éxito":
      return (
        <div className="grid grid-cols-4 gap-4 items-center">
          <div>
            <Link
              href={route("timeLog.create")}
              className="bg-red-600 text-white p-1 rounded-md text-center px-10"
            >
              Parar
            </Link>
          </div>
          <div>
            <p className="font-bold mb-1">Tiempo transcurrido:</p>
            <p>
              {duration.days() > 0 ? `${duration.days()}d : ` : ""}
              {String(duration.hours()).padStart(2, '0')}h :
              {String(duration.minutes()).padStart(2, '0')}m :
              {String(duration.seconds()).padStart(2, '0')}s
            </p>
          </div>
        </div>
      );

    
  }
}
