import {fireEvent, screen, waitFor} from "@testing-library/react";
import DeviceControl from "../../components/player/DeviceControl";
import {renderWithSessionAndRecoil} from "../__utils__/reactUtils";
import {availableDevicesState} from "../../atoms/deviceAtom";
import {RecoilObserver} from "../__utils__/RecoilObserver";
import {RecoilStateSetter} from "../__utils__/RecoilStateSetter";
import {spotifyMemory} from "../__mocks__/inMemorySpotify";


describe('DeviceControl component', () => {

    const renderDeviceControl = (...extraComponents) => {
        const utils = renderWithSessionAndRecoil([<DeviceControl/>, ...extraComponents])

        const deviceMenuButton = () => screen.getByTestId('device-menu-button')
        const deviceMenu = () => screen.queryByTestId('device-menu')
        const outsideDeviceMenu = () => screen.getByTestId('outside-device-menu')
        const activeDeviceItem = () => screen.queryByTestId('device-item-active')

        const openMenu = () => !deviceMenu() && fireEvent.click(deviceMenuButton())
        const clickOutsideMenu = () => fireEvent.click(outsideDeviceMenu())
        const selectDevice = (deviceName) => fireEvent.click(screen.getByText(deviceName))
        
        return {
            deviceMenuButton,
            deviceMenu,
            openMenu,
            clickOutsideMenu,
            selectDevice,
            activeDeviceItem,
            ...utils,
        }
    }

    test('open and close deviceMenu when button is clicked', () => {
        const {deviceMenuButton, deviceMenu, openMenu} = renderDeviceControl()
        expect(deviceMenu()).not.toBeInTheDocument()

        openMenu()
        expect(deviceMenu()).toBeInTheDocument()

        fireEvent.click(deviceMenuButton())
        expect(deviceMenu()).not.toBeInTheDocument()
    });

    test('close deviceMenu when user clicks outside of deviceMenu', () => {
        const {deviceMenu, openMenu, clickOutsideMenu} = renderDeviceControl()

        openMenu()
        expect(deviceMenu()).toBeInTheDocument()

        clickOutsideMenu()
        expect(deviceMenu()).not.toBeInTheDocument()
    });

    test('render all available devices in menu', () => {
        const onChange = jest.fn();
        const {openMenu} = renderDeviceControl(
            <RecoilObserver
                node={availableDevicesState}
                onChange={onChange}/>,
            <RecoilStateSetter
                node={availableDevicesState}
                defaultValue={spotifyMemory.availableDevices}/>
        )

        openMenu();

        expect(screen.getByText('PC')).toBeInTheDocument()
        expect(screen.getByText('ECHO')).toBeInTheDocument()
        expect(screen.getByText('ECHO DOT')).toBeInTheDocument()
    })

    test('set current device when device in menu is selected', async () => {
        const {openMenu, selectDevice, activeDeviceItem} = renderDeviceControl(
            <RecoilStateSetter
                node={availableDevicesState}
                defaultValue={spotifyMemory.availableDevices}/>
        )
        openMenu();

        selectDevice('ECHO')

        await waitFor(() => {
            expect(activeDeviceItem()).toBeInTheDocument()
            expect(activeDeviceItem()).toHaveTextContent('ECHO')
            expect(spotifyMemory.current_device_ids).toStrictEqual(['2'])
        })
    })
})
