import {rest} from 'msw'
import {spotifyMemory} from "./inMemorySpotify";

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

    rest.put('https://api.spotify.com/v1/me/player/volume', (req, res, ctx) => {
        spotifyMemory.volume_percent = req.url.searchParams.get('volume_percent');
        return res(
            ctx.status(200)
        )
    }),
]
