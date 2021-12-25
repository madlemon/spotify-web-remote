import React from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {availableDevicesState, currentDeviceIdState} from "../../atoms/deviceAtom";
import spotifyApi from "../../lib/spotify";
import {DesktopComputerIcon, DeviceTabletIcon, VolumeOffIcon, VolumeUpIcon} from "@heroicons/react/outline";
import {DeviceMobileIcon} from "@heroicons/react/solid";

function DeviceMenu(props) {
    const availableDevices = useRecoilValue(availableDevicesState);
    const [currentDeviceId, setCurrentDeviceId] = useRecoilState(currentDeviceIdState);

    const transferMyPlayback = function (deviceId) {
        // Transfer a User's Playback
        spotifyApi.transferMyPlayback(new Array(deviceId))
            .then(function () {
                setCurrentDeviceId(deviceId)
                console.log('Transfering playback to ' + deviceId)
            }, function (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log('Something went wrong!', err)
            });
    }

    function DeviceItem(itemProps) {
        return (
            <div
                className={`flex items-center space-x-2 hover:bg-zinc-600 rounded-lg p-1 cursor-pointer ${itemProps.active ? "text-green-500" : ""}`}
                onClick={itemProps.onClick}>
                {itemProps.active ? <VolumeUpIcon className="w-8"/> : <VolumeOffIcon className="w-8"/>}
                <p className="truncate">{itemProps.deviceName}</p>
            </div>
        )
    }

    return (
        <div className={`${props.className} drop-shadow-xl text-white absolute bottom-20 w-80 translate-x-[-45%]
                            rounded-lg bg-zinc-700 p-1
                            flex flex-col space-y-1`}>
            <h2 className="text-2xl font-bold text-center">Mit Gerät verbinden</h2>
            <div className="flex justify-center items-end text-gray-400">
                <DeviceMobileIcon className="w-16 translate-x-[1.7rem]"/>
                <DesktopComputerIcon className="w-24 text-gray-100 z-10"/>
                <DeviceTabletIcon className="w-20 translate-x-[-1.7rem]"/>
            </div>

            <hr className="opacity-50"/>
            {availableDevices.map(device =>
                <DeviceItem
                    key={device.id}
                    deviceName={device.name}
                    active={device.id === currentDeviceId}
                    onClick={() => transferMyPlayback(device.id)}/>
            )}
            <div className="h-6 w-6 rotate-45 bg-zinc-700 translate-x-36 translate-y-3"/>
        </div>)
}

export default DeviceMenu
