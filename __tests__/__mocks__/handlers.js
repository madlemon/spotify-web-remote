import {rest} from 'msw'
import {spotifyMemory} from "./inMemorySpotify";
import {getPlaylistTracksResponse} from "./apiResponses";

export const handlers = [

    rest.get('https://api.spotify.com/v1/me/playlists', (req, res, ctx) => {
        return res(
            ctx.json({
                items: [
                    {id: '1', name: 'Meine Tolle Playlist'},
                    {id: '2', name: 'Mal was anderes'},
                ]
            })
        )
    }),

    rest.get('https://api.spotify.com/v1/playlists/:playlistId/tracks', (req, res, ctx) => {
        return res(
            ctx.json({getPlaylistTracksResponse})
        )
    }),

    rest.put('https://api.spotify.com/v1/me/player/volume', (req, res, ctx) => {
        spotifyMemory.volume_percent = req.url.searchParams.get('volume_percent')
        return res(
            ctx.status(200)
        )
    }),

    rest.put('https://api.spotify.com/v1/me/player', (req, res, ctx) => {
        spotifyMemory.current_device_ids = req.body.device_ids
        return res(
            ctx.status(200)
        )
    }),

    rest.put('https://api.spotify.com/v1/me/player/play', (req, res, ctx) => {
        spotifyMemory.player.is_playing = true
        return res(
            ctx.status(200)
        )
    }),

    rest.put('https://api.spotify.com/v1/me/player/pause', (req, res, ctx) => {
        spotifyMemory.player.is_playing = false
        return res(
            ctx.status(200)
        )
    }),

    rest.put('https://api.spotify.com/v1/me/player/shuffle', (req, res, ctx) => {
        spotifyMemory.player.shuffle_state = !spotifyMemory.player.shuffle_state
        return res(
            ctx.status(200)
        )
    }),

    rest.put('https://api.spotify.com/v1/me/player/repeat', (req, res, ctx) => {
        spotifyMemory.player.repeat_state = req.url.searchParams.get('state')
        return res(
            ctx.status(200)
        )
    }),

    rest.post('https://api.spotify.com/v1/me/player/previous', (req, res, ctx) => {
        spotifyMemory.player.track_number--
        return res(
            ctx.status(200)
        )
    }),

    rest.post('https://api.spotify.com/v1/me/player/next', (req, res, ctx) => {
        spotifyMemory.player.track_number++
        return res(
            ctx.status(200)
        )
    }),

    rest.put('https://api.spotify.com/v1/me/player/seek', (req, res, ctx) => {
        let positionMs = req.url.searchParams.get('position_ms');
        console.log('positionMs >>>', positionMs)
        spotifyMemory.player.position_ms = positionMs
        return res(
            ctx.status(200)
        )
    }),


]
