import React, {useState} from "react";
import {XIcon} from "@heroicons/react/outline";

const useDialog = (header, content) => {
    const [isOpen, setIsOpen] = useState(false);


    const open = () => {
        setIsOpen(true)
    }
    const close = () => {
        setIsOpen(false)
    }


    let dialog = <>
        <div className={`${!isOpen && "hidden"} drop-shadow-xl fixed text-white top-20 rounded-lg bg-zinc-700 p-1
                            flex flex-col space-y-1`}>
            <div className="flex items-center justify-end p-2">
                <h2 className="flex-grow text-2xl font-bold text-center">{header}</h2>
                <XIcon className="h-5 cursor-pointer text-gray-400 hover:text-white"
                       onClick={close}/>
            </div>
            {content}
        </div>
    </>;


    return {
        open,
        dialog,
    }
}

export default useDialog
