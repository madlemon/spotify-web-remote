import useSpotify from "../../hooks/useSpotify";
import React, {useCallback, useEffect, useState} from "react";
import {PauseIcon, PlayIcon} from "@heroicons/react/solid";
import {FastForwardIcon, RefreshIcon, RewindIcon, SwitchHorizontalIcon} from "@heroicons/react/outline";
import {useRecoilState, useSetRecoilState} from "recoil";
import {currentTrackIdState, isPlayingState, isShuffleState, repeatState} from "../../atoms/playerAtom";
import {millisToMinutesAndSeconds} from "../../lib/time";
import {debounce} from "lodash";

function PlayerControl({duration_ms, progress_ms}) {
    const spotifyApi = useSpotify()
    const setCurrentTrackId = useSetRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [isShuffle, setIsShuffle] = useRecoilState(isShuffleState)
    const [repeat, setRepeat] = useRecoilState(repeatState)
    const isRepeat = repeat === 'context'
    const [fleetingPositionMs, setFleetingPositionMs] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);

    const play = function () {
        setIsPlaying(true)
        spotifyApi.play()
    }

    const pause = function () {
        setIsPlaying(false)
        spotifyApi.pause()
    }
    const toggleShuffle = function () {
        let newShuffleState = !isShuffle
        setIsShuffle(newShuffleState)
        spotifyApi.setShuffle(newShuffleState)
            .then(function () {
                console.log(`Shuffle is ${newShuffleState ? "on" : "off"}.`);
            }, function (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log('Something went wrong!', err);
            })
    }

    const toggleRepeat = function () {
        // Set Repeat Mode On User’s Playback
        let newRepeatState = isRepeat ? 'off' : 'context'
        setRepeat(newRepeatState)
        spotifyApi.setRepeat(newRepeatState)
            .then(function () {
                console.log('Repeat track.')
            }, function (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log('Something went wrong!', err)
            })
    }

    const skipToNext = function () {
        // Skip User’s Playback To Next Track
        spotifyApi.skipToNext()
            .then(function () {
                console.log('Skip to next')
                // delay da wir kurz auf spotify warten
                setTimeout(function () {
                    setCurrentTrackId(null)
                }, 300)
            }, function (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log('Something went wrong!', err)
            })
    }

    const skipToPrevious = function () {
        // Skip User’s Playback To Previous Track
        spotifyApi.skipToPrevious()
            .then(function () {
                console.log('Skip to previous')
                // delay da wir kurz auf spotify warten
                setTimeout(function () {
                    setCurrentTrackId(null)
                }, 300)
            }, function (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log('Something went wrong!', err);
            })
    }

    const debouncedSeek = useCallback(
        // Seek To Position In Currently Playing Track
        debounce((positionMs) => {
            spotifyApi.seek(positionMs)
                .then(function () {
                    console.log('Seek to ' + positionMs)
                    // kurz warten bis spotify die neue position übernommen hat
                    setTimeout(function () {
                        setIsSeeking(false)
                    }, 1000)
                }, function (err) {
                    //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                    console.log('Something went wrong!', err);
                })
        }, 300),
        []
    )

    useEffect(() => {
        if (!isSeeking) return
        debouncedSeek(fleetingPositionMs)
    }, [fleetingPositionMs]);


    return (
        <div className="flex flex-grow flex-col justify-center items-center space-y-2">
            <div className="flex items-center space-x-3">
                <SwitchHorizontalIcon
                    data-testid="shuffle-button"
                    className={`player-button ${isShuffle ? "!text-green-500" : ""}  hidden md:inline-flex`}
                    onClick={toggleShuffle}
                />
                <RewindIcon
                    data-testid="skip-to-previous-button"
                    className="player-button"
                    onClick={skipToPrevious}
                />
                {isPlaying ?
                    <PauseIcon
                        data-testid="pause-button"
                        className="player-button !text-gray-200 !w-10 !h-10"
                        onClick={pause}
                    />
                    : <PlayIcon
                        data-testid="play-button"
                        className="player-button !text-gray-200 !w-10 !h-10"
                        onClick={play}
                    />
                }
                <FastForwardIcon
                    data-testid="skip-button"
                    className="player-button"
                    onClick={skipToNext}
                />
                <RefreshIcon
                    data-testid="repeat-button"
                    className={`player-button ${isRepeat ? "!text-green-500" : ""} hidden md:inline-flex`}
                    onClick={toggleRepeat}
                />
            </div>
            <div className="volume-slider flex w-full lg:max-w-2xl items-center space-x-2 px-4 text-gray-400 text-xs">
                <p data-testid="progress-label">
                    {millisToMinutesAndSeconds(progress_ms)}
                </p>
                <input
                    data-testid="progress-input"
                    className="w-full"
                    type="range" value={isSeeking ? fleetingPositionMs : progress_ms} min={0} max={duration_ms}
                    onChange={(e) => {
                        let newPositionMs = Number(e.target.value)
                        setFleetingPositionMs(newPositionMs)
                        setIsSeeking(true)
                    }}
                />
                <p data-testid="duration-label">
                    {millisToMinutesAndSeconds(duration_ms)}
                </p>
            </div>
        </div>
    )
}

export default PlayerControl
