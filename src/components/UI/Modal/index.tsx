import React, { useEffect, useRef, useState } from "react";

type propTypes = {
  children: React.ReactNode;
  onClose: any;
};
const Modal = (props: propTypes) => {
  const { children, onClose } = props;
  const ref: any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current?.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return document.addEventListener("mousedown", handleClickOutside);
  }, [onClose]);
  return (
    <div className="fixed top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div
        ref={ref}
        className={`no-scrollbar max-h-[80vh] w-[80vw] overflow-y-scroll rounded-md bg-white p-5 shadow-md transition-all sm:overflow-auto xl:max-h-[80vh] xl:w-[65vw]`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
