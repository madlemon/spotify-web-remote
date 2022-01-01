import React, {useEffect, useState} from "react";
import useSpotify from "../../hooks/useSpotify";
import {currentTrackIdState, isPlayingState, isShuffleState, repeatState} from "../../atoms/playerAtom";
import {useRecoilState, useSetRecoilState} from "recoil";
import useTrackInfo from "../../hooks/useTrackInfo";
import VolumeControl from "./VolumeControl";
import PlayerControl from "./PlayerControl";
import useInterval from "../../hooks/useInterval";
import {useSession} from "next-auth/react";
import DeviceControl from "./DeviceControl";

function Player() {
    const spotifyApi = useSpotify()
    const {data: session} = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const trackInfo = useTrackInfo()
    const setIsPlaying = useSetRecoilState(isPlayingState)
    const setIsShuffle = useSetRecoilState(isShuffleState)
    const setRepeat = useSetRecoilState(repeatState)
    const [progressMs, setProgressMs] = useState(0)

    const fetchCurrentPlaybackState = function () {
        spotifyApi.getMyCurrentPlaybackState()
            .then(response => {
                setIsPlaying(response.body?.is_playing)
                setIsShuffle(response.body?.shuffle_state)
                setRepeat(response.body?.repeat_state)
                setProgressMs(response.body?.progress_ms)
            });
    }

    const fetchCurrentPlayingTrack = function () {
        spotifyApi.getMyCurrentPlayingTrack()
            .then(response => {
                setCurrentTrackId(response.body?.item?.id);
            })
    }

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentPlaybackState()
            fetchCurrentPlayingTrack()
        }
    }, [session, currentTrackId, spotifyApi])

    useInterval(() => {
        fetchCurrentPlaybackState()
        fetchCurrentPlayingTrack()
    }, 1000)


    return (
        trackInfo &&
        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900  border-t-[0.1px] border-zinc-700 flex items-center">
            <div className="flex items-center space-x-4">
                <img
                    className="hidden md:inline w-20 py-3 pl-3"
                    src={trackInfo.album.images?.[0]?.url}
                    alt="Albumcover"/>
                <div className="text-xs lg:text-base w-32 md:w-40 lg:w-64 truncate p-3 md:p-0">
                    <h3 className="truncate">
                        {trackInfo.name}
                    </h3>
                    <p className="text-xs hover:underline cursor-pointer">
                        {trackInfo.artists?.[0]?.name}
                    </p>
                </div>
            </div>

            <PlayerControl duration_ms={trackInfo.duration_ms} progress_ms={progressMs}/>
            <DeviceControl/>
            <VolumeControl/>
        </div>
    )
}

export default Player
