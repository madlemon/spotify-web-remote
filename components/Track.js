import useSpotify from "../hooks/useSpotify";
import React from 'react';
import {currentTrackIdState, isPlayingState} from "../atoms/playerAtom";
import {useRecoilState} from "recoil";
import {PauseIcon, PlayIcon} from "@heroicons/react/solid";
import {MusicNoteIcon} from "@heroicons/react/outline";
import {millisToMinutesAndSeconds} from "../lib/time";

function Track({track, tracknumber, onClick, highlighted, trackRef, context_uri}) {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    const playTrack = event => {
        event.stopPropagation();
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotifyApi.play({
                context_uri: context_uri,
                position_ms: 0,
                offset: {
                    position: tracknumber
                },
            }
        );
    }

    const pauseTrack = event => {
        event.stopPropagation();
        setIsPlaying(false);
        spotifyApi.pause();
    }

    const currentTrackIsPlayed = isPlaying && currentTrackId === track.track.id;

    const dynamicClassname = `w-7 text-white ${highlighted ? "" : "hidden group-hover:inline"} cursor-pointer`;
    return (
        <div
            data-testid="track-item"
            className={`grid grid-cols-2 rounded-lg px-4 py-2 group 
                         ${highlighted ? "bg-zinc-600" : "hover:bg-zinc-800"}`}
            onClick={onClick}
            ref={trackRef}>
            <div className="flex items-center space-x-4">
                <div>
                    {currentTrackIsPlayed ? <MusicNoteIcon
                            className={`w-7 p-1 text-green-500 animate-bounce ${highlighted ? "hidden" : "group-hover:hidden"}`}
                        /> :
                        <p className={`w-7 text-center ${highlighted ? "hidden" : "group-hover:hidden"}`}>
                            {tracknumber + 1}
                        </p>
                    }

                    {
                        currentTrackIsPlayed ?
                            <PauseIcon
                                data-testid="track-item-pause-button"
                                className={dynamicClassname}
                                onClick={pauseTrack}
                            /> :
                            <PlayIcon
                                data-testid="track-item-play-button"
                                className={dynamicClassname}
                                onClick={playTrack}
                            />
                    }
                </div>
                <img
                    className="w-10"
                    src={track.track.album.images[0].url}
                    alt="Albumcover"/>
                <div>
                    <p className={`w-36 md:w-48 lg:w-64 truncate text-white font-bold
                                  ${currentTrackIsPlayed ? "text-green-500" : ""}`}>
                        {track.track.name}
                    </p>
                    <p className={`w-40 hover:underline ${highlighted ? "text-white" : "hover:text-white"} cursor-pointer`}>
                        {track.track.artists[0].name}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between
                    ml-auto md:ml-0">
                <p className={`w-50 hidden md:inline hover:underline cursor-pointer truncate
                               ${highlighted ? "text-white" : "hover:text-white"}`}>
                    {track.track.album.name}
                </p>
                <p className={`${highlighted ? "text-white" : ""}`}>
                    {millisToMinutesAndSeconds(track.track.duration_ms)}
                </p>
            </div>

        </div>
    )
}

export default Track
