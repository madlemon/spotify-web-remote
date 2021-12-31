import {fireEvent, render, screen} from "@testing-library/react";
import DeviceControl from "../../components/player/DeviceControl";
import {renderWithSessionAndRecoil} from "../__utils__/reactUtils";
import {RecoilRoot} from "recoil";
import {availableDevicesState} from "../../atoms/deviceAtom";
import {mockSession} from "../__mocks__/sessionmock";
import {SessionProvider} from "next-auth/react";
import {RecoilObserver} from "../__utils__/RecoilObserver";
import {RecoilStateSetter} from "../__utils__/RecoilStateSetter";
import {spotifyMemory} from "../__mocks__/inMemorySpotify";


describe('DeviceControl component', () => {

    const renderDeviceControl = () => {
        const utils = renderWithSessionAndRecoil(<DeviceControl/>)

        const deviceMenuButton = () => screen.getByTestId('device-menu-button')
        const deviceMenu = () => screen.queryByTestId('device-menu')

        const openMenu = () => !deviceMenu() && fireEvent.click(deviceMenuButton());
        return {
            deviceMenuButton,
            deviceMenu,
            openMenu,
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

    test('render all available devices in menu', () => {
        const onChange = jest.fn();
        render(
            <SessionProvider session={mockSession}>
                <RecoilRoot>
                    <RecoilObserver
                        node={availableDevicesState}
                        onChange={onChange}/>
                    <RecoilStateSetter
                        node={availableDevicesState}
                        defaultValue={spotifyMemory.availableDevices}/>
                    <DeviceControl/>
                </RecoilRoot>
            </SessionProvider>
        );

        fireEvent.click(screen.getByTestId('device-menu-button'))
        expect(screen.getByText('PC')).toBeInTheDocument()
        expect(screen.getByText('ECHO')).toBeInTheDocument()
        expect(screen.getByText('ECHO DOT')).toBeInTheDocument()
    })
})
