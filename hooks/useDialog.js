import React, {useState} from "react";
import {XIcon} from "@heroicons/react/outline";

const useDialog = (header, content) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => {
        setIsOpen(true)
    }
    const close = () => {
        console.log("Dialog >>> closing")
        setIsOpen(false)
    }


    let dialog = <>
        {isOpen &&
        <div className='drop-shadow-xl fixed text-white top-20 rounded-lg bg-zinc-700 p-1
                            flex flex-col space-y-1 z-50'>
            <div className="flex items-center justify-end p-2">
                <h2 data-testid='dialog-header'
                    className="flex-grow text-2xl font-bold text-center">{header}</h2>
                <XIcon className="h-5 cursor-pointer text-gray-400 hover:text-white"
                       data-testid='dialog-close'
                       onClick={close}/>
            </div>
            {content}
        </div>}
    </>;


    return {
        open,
        close,
        dialog,
    }
}

export default useDialog
