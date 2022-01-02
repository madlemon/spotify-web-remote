import useSpotify from "./useSpotify";
import {useEffect, useState} from "react";
import useInfinteScrolling from "./useInfinteScrolling";

function useUserPlaylists() {
    const spotifyApi = useSpotify()
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [userPlaylists, setUserPlaylists] = useState([])
    const [hasMore, setHasMore] = useState(true);

    const {loadOnIntersectRef} = useInfinteScrolling(loading, userPlaylists, hasMore, setOffset);

    const limit = 20;


    useEffect(() => {
        if (!hasMore) return
        if (!spotifyApi.getAccessToken()) {
            setUserPlaylists([])
            return
        }
        setLoading(true)
        setError(false)

        spotifyApi.getUserPlaylists({limit: limit, offset: offset})
            .then((res) => {
                setUserPlaylists(prevPlaylists => {
                    return [...prevPlaylists, ...res.body.items]
                })
                setHasMore(res.body.items.length > 0)

                setLoading(false);
            }).catch(() => setError(true))
    }, [offset, spotifyApi])

    return {userPlaylists, loading, error, loadOnIntersectRef}
}

export default useUserPlaylists
