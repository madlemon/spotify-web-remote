import {atom} from "recoil";


export const currentDeviceIdState = atom({
    key: 'currentDeviceIdState',
    default: null,
});

export const availableDevicesState = atom({
    key: 'availableDevicesState',
    default: [],
});
