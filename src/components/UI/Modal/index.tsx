import React, { useEffect, useRef, useState } from 'react'

type propTypes = {
    children: React.ReactNode,
    onClose:any;
}
const Modal = (props:propTypes) => {
    const {children,onClose}=props;
    const ref :any = useRef(null);

    useEffect(()=>{
    const handleClickOutside = (e:any)=>{
        if(ref.current && !ref.current?.contains(e.target)){
            onClose()
        }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return(
        document.addEventListener("mousedown", handleClickOutside)
    )
    },[onClose])
  return (
    <div className='fixed w-screen h-screen z-50 top-0 bg-black bg-opacity-50 flex justify-center items-center'>
        <div ref={ref} className={`p-5 rounded-md bg-white w-[80vw] max-h-[80vh] xl:w-[50vw] xl:max-h-[80vh] transition-all shadow-md overflow-y-scroll no-scrollbar sm:overflow-auto`}>
            {children}
        </div>
    </div>
  )
}

export default Modal