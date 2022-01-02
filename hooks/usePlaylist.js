import useSpotify from "./useSpotify";
import {useRecoilValue} from "recoil";
import {playlistIdState, playlistState} from "../atoms/playlistAtom";
import {useEffect, useState} from "react";
import useInfinteScrolling from "./useInfinteScrolling";

function usePlaylist() {
    const spotifyApi = useSpotify()
    const playlistId = useRecoilValue(playlistIdState)
    const playlist = useRecoilValue(playlistState);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [tracks, setTracks] = useState([])
    const [hasMore, setHasMore] = useState(false);

    const {loadOnIntersectRef} = useInfinteScrolling(loading, tracks, hasMore, setOffset);

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

    return {playlist, tracks, loading, error, loadOnIntersectRef}
}

export default usePlaylist
