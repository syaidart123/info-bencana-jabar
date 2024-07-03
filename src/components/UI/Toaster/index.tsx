import { ToasterContext } from "@/context/ToasterContext";
import { ToasterType } from "@/types/toaster.type";
import { CircleCheckBig, CircleMinus, CircleX, X } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";

const toasterVariant: any = {
  success: {
    title: "Suksess",
    icon: <CircleCheckBig />,
    color: "bg-green-300",
    barColor: "bg-green-500",
  },
  danger: {
    title: "Error",
    icon: <CircleX />,
    color: "bg-red-300",
    barColor: "bg-red-500",
  },
  warning: {
    title: "Warning",
    icon: <CircleMinus />,
    color: "bg-yellow-300",
    barColor: "bg-yellow-500",
  },
};

const Toaster = () => {
  const { toaster, setToaster }: ToasterType = useContext(ToasterContext);
  const [lengthBar, setLengthBar] = useState(100);
  const timerRef = useRef<any>(null);

  const timerstart = () => {
    timerRef.current = setInterval(() => {
      setLengthBar((prev) => prev - 0.14);
    });
  };

  useEffect(() => {
    timerstart();
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (lengthBar < 0) {
      setToaster({});
    }
  }, [lengthBar, setToaster]);

  return (
    <div className="fixed bottom-5 right-5 z-50 overflow-hidden rounded-lg border bg-white shadow-lg lg:bottom-10 lg:right-10">
      <div className={`h-3 bg-gray-300`}>
        <div
          className={`${
            toaster && toaster.variant === "success"
              ? toasterVariant.success.barColor
              : toasterVariant.danger.barColor
          } h-full`}
          style={{ width: `${lengthBar}%` }}
        ></div>
      </div>
      <div className="mt-2 flex items-center gap-4 px-4 py-2">
        <div
          className={`p-1 text-3xl font-bold text-white ${
            toaster &&
            toaster.variant &&
            toasterVariant[toaster.variant]?.barColor
          } rounded-full`}
        >
          {toaster && toaster.variant && toasterVariant[toaster.variant]?.icon}
        </div>
        <div className="min-w-40">
          <p className="mb-1 font-bold">
            {toaster &&
              toaster.variant &&
              toasterVariant[toaster.variant]?.title}
          </p>
          <p>{toaster?.message}</p>
        </div>
        <div
          className="absolute right-3 top-4 cursor-pointer text-xl"
          onClick={() => setToaster({})}
        >
          <X />
        </div>
      </div>
    </div>
  );
};

export default Toaster;
