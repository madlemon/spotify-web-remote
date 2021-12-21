import {playlistState} from "../atoms/playlistAtom";
import React, {useState} from 'react';
import {useRecoilValue} from "recoil";
import Track from "./Track";

function Tracklist() {
    const playlist = useRecoilValue(playlistState);
    const [selectedTrack, setSelectedTrack] = useState(null);

    return (
        <div className="px-4 flex flex-col space-y-1 pb-36 text-gray-400">
            {playlist?.tracks.items.map((track, i) => (
                <Track
                    key={track.track.id}
                    track={track}
                    tracknumber={i}
                    onClick={() => {
                        if (selectedTrack === track.track.id)
                            setSelectedTrack(null)
                        else
                            setSelectedTrack(track.track.id)
                    }}
                    highlighted={selectedTrack === track.track.id}
                />
            ))}
        </div>
    )
}

export default Tracklist
