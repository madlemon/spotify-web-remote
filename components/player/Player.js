import React, {useEffect} from "react";
import useSpotify from "../../hooks/useSpotify";
import {currentTrackIdState, isPlayingState, isShuffleState, repeatState} from "../../atoms/playerAtom";
import {useRecoilState, useSetRecoilState} from "recoil";
import useTrackInfo from "../../hooks/useTrackInfo";
import VolumeControl from "./VolumeControl";
import PlayerControl from "./PlayerControl";

function Player() {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const trackInfo = useTrackInfo();
    const setIsPlaying = useSetRecoilState(isPlayingState);
    const setIsShuffle = useSetRecoilState(isShuffleState);
    const setRepeat = useSetRecoilState(repeatState);

    const fetchCurrentPlaybackState = function () {
        spotifyApi.getMyCurrentPlaybackState()
            .then(response => {
                console.log("Current PlaybackState >>>", response.body);
                setIsPlaying(response.body?.is_playing);
                setIsShuffle(response.body?.shuffle_state);
                setRepeat(response.body?.repeat_state);
            });
    }

    const fetchCurrentPlayingTrack = function () {
        spotifyApi.getMyCurrentPlayingTrack()
            .then(response => {
                console.log("Currently playing >>>", response.body);
                setCurrentTrackId(response.body?.item?.id);
            });
    }

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentPlaybackState();
            fetchCurrentPlayingTrack();
        }
    }, [currentTrackId, spotifyApi]);


    return (
        trackInfo &&
        <div className=" bg-zinc-800  border-t-[0.1px] border-zinc-700 flex items-center">
            <div className="flex items-center space-x-4">
                <img
                    className="hidden md:inline w-20 py-3 pl-3"
                    src={trackInfo.album.images?.[0]?.url}
                    alt="Albumcover"/>
                <div className="w-40 truncate p-3 md:p-0">
                    <h3>
                        {trackInfo.name}
                    </h3>
                    <p className="text-xs hover:underline cursor-pointer">
                        {trackInfo.artists?.[0]?.name}
                    </p>
                </div>
            </div>

            <PlayerControl/>
            <VolumeControl/>
        </div>
    )
}

export default Player
