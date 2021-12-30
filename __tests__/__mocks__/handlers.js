import {rest} from 'msw'

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

]
