import React, {useCallback, useEffect, useState} from "react";
import {debounce} from "lodash";
import {VolumeOffIcon, VolumeUpIcon} from "@heroicons/react/outline";
import useSpotify from "../../hooks/useSpotify";

function VolumeControl() {
    const spotifyApi = useSpotify();
    const [volume, setVolume] = useState(50);
    const isMuted = volume === 0;

    useEffect(() => {
        debouncedVolumeAdjust(volume);
    }, [volume]);

    const debouncedVolumeAdjust = useCallback(
        debounce((newVolume) => {
            spotifyApi.setVolume(newVolume)
                .then(function () {
                    console.log(`Setting volume to ${newVolume}.`);
                }, function (err) {
                    //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                    console.log('Something went wrong!', err);
                });
        }, 300),
        []
    )

    return (
        <div className="flex items-center space-x-3 justify-end pr-5 volume-slider">
            {isMuted ?
                <VolumeOffIcon
                    className="player-button"
                    onClick={() => setVolume(50)}
                />
                : <VolumeUpIcon
                    className="player-button"
                    onClick={() => setVolume(0)}
                />}
            <input
                className="w-14 md:w-28"
                type="range" value={volume} min={0} max={100}
                onChange={(e) => {
                    let newVolume = Number(e.target.value);
                    setVolume(newVolume);
                }}
            />
        </div>
    )
}

export default VolumeControl
