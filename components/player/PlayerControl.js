import useSpotify from "../../hooks/useSpotify";
import React from "react";
import {FastForwardIcon, PauseIcon, PlayIcon, RefreshIcon, RewindIcon, SwitchHorizontalIcon} from "@heroicons/react/solid";
import {useRecoilState, useSetRecoilState} from "recoil";
import {currentTrackIdState, isPlayingState, isShuffleState, repeatState} from "../../atoms/playerAtom";

function PlayerControl() {
    const spotifyApi = useSpotify();
    const setCurrentTrackId = useSetRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [isShuffle, setIsShuffle] = useRecoilState(isShuffleState);
    const [repeat, setRepeat] = useRecoilState(repeatState);
    const isRepeat = repeat === 'context';

    const play = function () {
        setIsPlaying(true);
        spotifyApi.play();
    }

    const pause = function () {
        setIsPlaying(false);
        spotifyApi.pause();
    }
    const toggleShuffle = function () {
        let newShuffleState = !isShuffle;
        setIsShuffle(newShuffleState);
        spotifyApi.setShuffle(newShuffleState)
            .then(function () {
                console.log(`Shuffle is ${newShuffleState ? "on" : "off"}.`);
            }, function (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log('Something went wrong!', err);
            });
    }


    const toggleRepeat = function () {
        // Set Repeat Mode On User’s Playback
        let newRepeatState = isRepeat ? 'off' : 'context';
        setRepeat(newRepeatState);
        spotifyApi.setRepeat(newRepeatState)
            .then(function () {
                console.log('Repeat track.');
            }, function (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log('Something went wrong!', err);
            });
    }

    const skipToNext = function () {
        // Skip User’s Playback To Next Track
        spotifyApi.skipToNext()
            .then(function () {
                console.log('Skip to next');
                // delay da wir kurz auf spotify warten
                setTimeout(function () {
                    setCurrentTrackId(null);
                }, 300);
            }, function (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log('Something went wrong!', err);
            });
    }

    const skipToPrevious = function () {
        // Skip User’s Playback To Previous Track
        spotifyApi.skipToPrevious()
            .then(function () {
                console.log('Skip to previous');
                // delay da wir kurz auf spotify warten
                setTimeout(function () {
                    setCurrentTrackId(null);
                }, 300);
            }, function (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log('Something went wrong!', err);
            });
    }


    return (
        <div className="flex flex-grow items-center space-x-4 justify-center">
            <SwitchHorizontalIcon
                className={`player-button ${isShuffle ? "!text-green-500" : ""}  hidden md:inline-flex`}
                onClick={toggleShuffle}
            />
            <RewindIcon
                className="player-button"
                onClick={skipToPrevious}
            />
            {isPlaying ?
                <PauseIcon
                    className="player-button !text-white !w-12 !h-12"
                    onClick={pause}
                />
                : <PlayIcon
                    className="player-button !text-white !w-12 !h-12"
                    onClick={play}
                />
            }
            <FastForwardIcon
                className="player-button"
                onClick={skipToNext}
            />
            <RefreshIcon
                className={`player-button ${isRepeat ? "!text-green-500" : ""} hidden md:inline-flex`}
                onClick={toggleRepeat}
            />
        </div>
    )
}

export default PlayerControl
