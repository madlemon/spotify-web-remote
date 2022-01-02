import React, {useState} from 'react';
import Track from "./Track";
import usePlaylist from "../hooks/usePlaylist";
import TrackLoadingSkeleton from "./TrackLoadingSkeleton";
import {ClockIcon, HashtagIcon} from "@heroicons/react/outline";

function Tracklist() {
    const {playlist, tracks, loading, error, loadOnIntersectRef} = usePlaylist();
    const [selectedTrack, setSelectedTrack] = useState(null);


    return (
        <div className="px-4 flex flex-col space-y-1 pb-36 text-gray-400">
            <div className="sticky top-14 bg-gradient-to-b from-transparent to-zinc-900">
                <div className="grid grid-cols-2 rounded-lg px-4 py-1 group">
                    <div className="flex items-center space-x-4">
                        <HashtagIcon className="w-5"/>
                        <p>TITEL</p>
                    </div>

                    <div className="flex items-center justify-between ml-auto md:ml-0">
                        <p className="hidden md:inline">ALBUM</p>
                        <ClockIcon className="w-5"/>
                    </div>
                </div>
                <hr className="border-gray-600"/>
            </div>
            {tracks.map((track, i) => (
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
                    trackRef={tracks.length === i + 1 ? loadOnIntersectRef : null}
                    context_uri={playlist?.uri}
                />
            ))}
            {loading && ["opacity-100", "opacity-70", "opacity-50", "opacity-30", "opacity-10"]
                .map(opacity => (<TrackLoadingSkeleton key={opacity} className={opacity}/>))}

            {error && <TrackLoadingSkeleton key={"error"} className={"bg-red-700"}/>}
        </div>
    )
}

export default Tracklist
