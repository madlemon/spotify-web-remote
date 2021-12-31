import {fireEvent, screen, waitFor} from "@testing-library/react";
import VolumeControl from "../../components/player/VolumeControl";
import {spotifyMemory} from "../__mocks__/inMemorySpotify";
import {renderWithSessionAndRecoil} from "../__utils__/reactUtils";

describe('VolumeControl component', () => {

    const renderVolumeControl = () => {
        const utils = renderWithSessionAndRecoil(<VolumeControl/>)

        const volumeOff = () => screen.queryByTestId('volume-off')
        const volumeOn = () => screen.queryByTestId('volume-on')
        const volumeRangeInput = () => screen.getByTestId('volume-range')
        return {
            volumeOff,
            volumeOn,
            volumeRangeInput,
            ...utils,
        }
    }

    test('it renders with volume-on visible and volume set to 50', () => {
        const {volumeOn, volumeOff, volumeRangeInput} = renderVolumeControl();
        expect(volumeOn()).not.toBeInTheDocument()
        expect(volumeOff()).toBeInTheDocument()
        expect(volumeRangeInput()).toBeInTheDocument()
        expect(volumeRangeInput().value).toBe("50")
        expect(spotifyMemory.volume_percent).toBe("50")
    });

    test('when volume-off is clicked volume-on replaces volume-off and sets volume to 0', async () => {
        const {volumeOn, volumeOff, volumeRangeInput} = renderVolumeControl();
        expect(volumeOff()).toBeInTheDocument()
        expect(spotifyMemory.volume_percent).toBe("50")

        fireEvent.click(volumeOff())

        await waitFor(() => {
            expect(volumeOn()).toBeInTheDocument()
            expect(volumeOff()).not.toBeInTheDocument()
            expect(volumeRangeInput().value).toBe("0")
            expect(spotifyMemory.volume_percent).toBe("0")
        })
    });

    test('when volume-on is clicked volume-off replaces volume-on and sets volume to 50', async () => {
        const {volumeOn, volumeOff} = renderVolumeControl();
        fireEvent.click(volumeOff())

        await waitFor(() => expect(volumeOn()).toBeInTheDocument())

        expect(volumeOn()).toBeInTheDocument()
        expect(spotifyMemory.volume_percent).toBe("0")

        fireEvent.click(volumeOn())
        await waitFor(() => {
            expect(volumeOff()).toBeInTheDocument()
            expect(volumeOn()).not.toBeInTheDocument()
            expect(spotifyMemory.volume_percent).toBe("50")
        })
    });

    test('set volume to 50 when volume-range is set to 50', async () => {
        const {volumeOn, volumeOff, volumeRangeInput} = renderVolumeControl();

        fireEvent.change(volumeRangeInput(), {target: {value: '0'}})

        await waitFor(() => {
            expect(volumeOn()).toBeInTheDocument()
            expect(volumeOff()).not.toBeInTheDocument()
            expect(volumeRangeInput().value).toBe("0")
            expect(spotifyMemory.volume_percent).toBe("0")
        })
    });

})
