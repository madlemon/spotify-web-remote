import {useEffect, useState} from "react";
import useSpotify from "./useSpotify";
import {useRecoilValue} from "recoil";
import {currentTrackIdState} from "../atoms/playerAtom";

function useTrackInfo() {
    const spotifyApi = useSpotify();
    const currentTrackId = useRecoilValue(currentTrackIdState);
    const [trackInfo, setTrackInfo] = useState(null);

    useEffect(() => {
        const fetchTrackInfo = async () => {
            if (currentTrackId) {
                spotifyApi.getTrack(currentTrackId)
                    .then(response =>
                        setTrackInfo(response.body)
                    )
            }

        }
        fetchTrackInfo();
    }, [currentTrackId, spotifyApi]);

    return trackInfo;
}


export default useTrackInfo
