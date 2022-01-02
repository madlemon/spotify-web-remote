import {renderWithSessionAndRecoil} from "../__utils__/reactUtils";
import {fireEvent, getByTestId, screen, waitFor} from "@testing-library/react";
import {getPlaylistTracksResponse} from "../__mocks__/apiResponses";
import {spotifyServer} from "../__mocks__/spotifyServer";
import {rest} from "msw";
import {millisToMinutesAndSeconds} from "../../lib/time";
import Tracklist from "../../components/Tracklist";
import userEvent from '@testing-library/user-event'
import {spotifyMemory} from "../__mocks__/inMemorySpotify";

describe('Tracklist component', () => {

    const handleGetPlaylistTracks = (reponse) => rest.get('https://api.spotify.com/v1/playlists/:playlistId/tracks', (req, res, ctx) => {
        return res(
            ctx.json({...reponse})
        )
    });

    function given_ApiResponse_PlaylistsTracks_Is(reponse) {
        spotifyServer.use(handleGetPlaylistTracks(reponse))
    }

    const loadingTrackskeletons = () => screen.queryAllByTestId('track-skeleton');
    const trackItems = () => screen.queryAllByTestId('track-item');
    const playButtonOf = (trackItem) => getByTestId(trackItem, 'track-item-play-button');
    const pauseButtonOf = (trackItem) => getByTestId(trackItem, 'track-item-pause-button');

    test('it renders loading skeleton tracks while waiting for api', async () => {
        given_ApiResponse_PlaylistsTracks_Is(getPlaylistTracksResponse);
        renderWithSessionAndRecoil(<Tracklist/>)

        expect(loadingTrackskeletons().length).toBeGreaterThan(0)
    });

    test('it renders all tracks from api', async () => {
        given_ApiResponse_PlaylistsTracks_Is(getPlaylistTracksResponse);
        renderWithSessionAndRecoil(<Tracklist/>)

        await waitFor(() => {
            expect(trackItems().length).toBe(getPlaylistTracksResponse.items.length)
        })
    });

    test('it renders name, artist, album and duration of tracks', async () => {
        given_ApiResponse_PlaylistsTracks_Is(getPlaylistTracksResponse);
        renderWithSessionAndRecoil(<Tracklist/>)
        const firstTrackNumber = 0;
        const lastTrackNumber = getPlaylistTracksResponse.items.length - 1;
        const trackNumbersToTest = [firstTrackNumber, 1, 2, 3, 10, lastTrackNumber];

        function expectTrackdataToBePresent(trackNumber) {
            const trackData = getPlaylistTracksResponse.items[trackNumber].track
            const trackComponent = trackItems()[trackNumber]

            expect(trackComponent).toHaveTextContent(trackData.album.name);
            expect(trackComponent).toHaveTextContent(trackData.artists[0].name);
            expect(trackComponent).toHaveTextContent(trackData.name);
            expect(trackComponent).toHaveTextContent(millisToMinutesAndSeconds(trackData.duration_ms));
        }

        await waitFor(() => {
            trackNumbersToTest.forEach(expectTrackdataToBePresent)
        })
    });

    test('it renders [play/pause]Button on hover, [plays/pauses] track on click', async () => {
        given_ApiResponse_PlaylistsTracks_Is(getPlaylistTracksResponse);
        renderWithSessionAndRecoil(<Tracklist/>)
        spotifyMemory.player.is_playing = false;

        await waitFor(() => {
            expect(trackItems()[0]).toBeInTheDocument()
        })

        userEvent.hover(trackItems()[0])
        fireEvent.click(playButtonOf(trackItems()[0]))

        await waitFor(() => {
            expect(pauseButtonOf(trackItems()[0])).toBeInTheDocument()
        })

        fireEvent.click(pauseButtonOf(trackItems()[0]))

        await waitFor(() => {
            expect(playButtonOf(trackItems()[0])).toBeInTheDocument()
            expect(spotifyMemory.player.is_playing).toBe(false)
        })
    });

})
