import useSpotify from "./useSpotify";
import {useSession} from "next-auth/react";
import {useRecoilValue} from "recoil";
import {playlistIdState, playlistState} from "../atoms/playlistAtom";
import {useEffect, useState} from "react";

function usePlaylist(offset = 0) {
    const spotifyApi = useSpotify()
    const {data: session} = useSession();
    const playlistId = useRecoilValue(playlistIdState)
    const playlist = useRecoilValue(playlistState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [tracks, setTracks] = useState([])
    const [hasMore, setHasMore] = useState(false);

    const limit = 50

    useEffect(() => {
        setTracks([])
    }, [playlistId])

    useEffect(() => {
        setLoading(true)
        setError(false)
        spotifyApi.getPlaylistTracks(playlistId, {limit: limit, offset: offset})
            .then((res) => {
                setTracks(prevTracks => {
                    return [...prevTracks, ...res.body.items]
                })
                setHasMore(res.body.items.length > 0)

                setLoading(false);

            }).catch(() => setError(true))
    }, [offset, playlistId])

    return {playlist, loading, error, tracks, hasMore}
}

export default usePlaylist
