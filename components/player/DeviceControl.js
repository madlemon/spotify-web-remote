import React, {useState} from "react";
import {DesktopComputerIcon} from "@heroicons/react/outline";
import DeviceMenu from "./DeviceMenu";


function DeviceControl() {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div>
            <div>
                <DesktopComputerIcon className="player-button mr-2"
                                     onClick={() => setIsOpen(!isOpen)}/>
            </div>
            {isOpen && <div className="fixed w-screen h-screen top-0 left-0"
                            onClick={() => setIsOpen(!isOpen)}/>}
            {isOpen && <DeviceMenu className="absolute bottom-20 translate-x-[-45%]"/>}
        </div>
    )
}

export default DeviceControl
