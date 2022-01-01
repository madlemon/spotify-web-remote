import {renderWithSessionAndRecoil} from "../__utils__/reactUtils";
import PlayerControl from "../../components/player/PlayerControl";
import {fireEvent, screen, waitFor} from "@testing-library/react";
import {RecoilStateSetter} from "../__utils__/RecoilStateSetter";
import {isPlayingState, isShuffleState, repeatState} from "../../atoms/playerAtom";
import {spotifyMemory} from "../__mocks__/inMemorySpotify";

describe('PlayerControl component', () => {

    const renderPlayerControl = (durationMs, progressMs, ...extraComponents) => {
        const utils = renderWithSessionAndRecoil(
            [
                <PlayerControl duration_ms={durationMs} progress_ms={progressMs}/>,
                ...extraComponents
            ])

        const progressLabel = () => screen.getByTestId('progress-label')
        const progressBar = () => screen.getByTestId('progress-input')
        const durationLabel = () => screen.getByTestId('duration-label')

        const shuffleButton = () => screen.getByTestId('shuffle-button')
        const repeatButton = () => screen.getByTestId('repeat-button')
        const playButton = () => screen.queryByTestId('play-button')
        const pauseButton = () => screen.queryByTestId('pause-button')
        const skipButton = () => screen.getByTestId('skip-button')
        const skipToPreviousButton = () => screen.getByTestId('skip-to-previous-button')

        const sendInputToProgressBar = (value) => fireEvent.change(progressBar(), {target: {value: value}})

        return {
            progressLabel,
            progressBar,
            durationLabel,
            shuffleButton,
            repeatButton,
            playButton,
            pauseButton,
            skipButton,
            skipToPreviousButton,
            sendInputToProgressBar,
            ...utils,
        }
    }

    test('displays given duration and progress', () => {
        const {
            progressLabel,
            durationLabel
        } = renderPlayerControl(60000, 10000)

        expect(progressLabel()).toHaveTextContent('0:10')
        expect(durationLabel()).toHaveTextContent('1:00')
    });

    test('progressBar has given progressValue', () => {
        const {
            progressBar
        } = renderPlayerControl(60000, 10000)

        expect(progressBar().value).toBe('10000')
    });

    test('set progress when user inputs value in progressBar', async () => {
        const {
            progressBar,
            sendInputToProgressBar
        } = renderPlayerControl(60000, 0)
        expect(progressBar().value).toBe('0')
        spotifyMemory.player.position_ms = '0'

        sendInputToProgressBar('20000')

        await waitFor(() => {
            expect(progressBar().value).toBe('20000')
            expect(spotifyMemory.player.position_ms).toBe('20000')
        })
    });

    test('render playButton when playingState is false', () => {
        const {
            playButton
        } = renderPlayerControl(60000, 10000,
            <RecoilStateSetter
                node={isPlayingState}
                defaultValue={false}/>)

        expect(playButton()).toBeInTheDocument()
    });

    test('render pauseButton when playingState is true', () => {
        const {
            pauseButton
        } = renderPlayerControl(60000, 10000,
            <RecoilStateSetter
                node={isPlayingState}
                defaultValue={true}/>)

        expect(pauseButton()).toBeInTheDocument()
    });

    test('set playingState to true when playButton is clicked and vise versa', async () => {
        const {
            playButton,
            pauseButton
        } = renderPlayerControl(60000, 10000,
            <RecoilStateSetter
                node={isPlayingState}
                defaultValue={false}/>)

        fireEvent.click(playButton())

        await waitFor(() => {
            expect(pauseButton()).toBeInTheDocument()
            expect(playButton()).not.toBeInTheDocument()
            expect(spotifyMemory.player.is_playing).toBe(true)
        })

        fireEvent.click(pauseButton())

        await waitFor(() => {
            expect(playButton()).toBeInTheDocument()
            expect(pauseButton()).not.toBeInTheDocument()
            expect(spotifyMemory.player.is_playing).toBe(false)
        })
    });

    test('toggle shuffleState when shuffleButton is clicked', async () => {
        const {
            shuffleButton
        } = renderPlayerControl(60000, 10000,
            <RecoilStateSetter
                node={isShuffleState}
                defaultValue={false}/>)
        expect(spotifyMemory.player.shuffle_state).toBe(false)

        fireEvent.click(shuffleButton())

        await waitFor(() => {
            expect(shuffleButton()).toHaveClass('!text-green-500')
            expect(spotifyMemory.player.shuffle_state).toBe(true)
        })
    });

    test('given repeatState off set repeatState to context when repeatButton is clicked', async () => {
        const {
            repeatButton
        } = renderPlayerControl(60000, 10000,
            <RecoilStateSetter
                node={repeatState}
                defaultValue={"off"}/>)
        expect(spotifyMemory.player.repeat_state).toBe("off")

        fireEvent.click(repeatButton())

        await waitFor(() => {
            expect(repeatButton()).toHaveClass('!text-green-500')
            expect(spotifyMemory.player.repeat_state).toBe("context")
        })

    });

    test('given repeatState context set repeatState to off when repeatButton is clicked', async () => {
        const {
            repeatButton
        } = renderPlayerControl(60000, 10000,
            <RecoilStateSetter
                node={repeatState}
                defaultValue={"context"}/>)
        expect(spotifyMemory.player.repeat_state).toBe("context")

        fireEvent.click(repeatButton())

        await waitFor(() => {
            expect(repeatButton()).not.toHaveClass('!text-green-500')
            expect(spotifyMemory.player.repeat_state).toBe("off")
        })
    });

    test('increment tracknumber when repeatButton is clicked', async () => {
        const {
            skipButton
        } = renderPlayerControl(60000, 10000)
        spotifyMemory.player.track_number = 1;

        fireEvent.click(skipButton())

        await waitFor(() => {
            expect(spotifyMemory.player.track_number).toBe(2)
        })
    });

    test('reduce tracknumber when repeatButton is clicked', async () => {
        const {
            skipToPreviousButton
        } = renderPlayerControl(60000, 10000)
        spotifyMemory.player.track_number = 2;

        fireEvent.click(skipToPreviousButton())

        await waitFor(() => {
            expect(spotifyMemory.player.track_number).toBe(1)
        })
    });

})
