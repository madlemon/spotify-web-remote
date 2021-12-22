import React, {useCallback, useRef, useState} from 'react';
import Track from "./Track";
import usePlaylist from "../hooks/usePlaylist";
import TrackLoadingSkeleton from "./TrackLoadingSkeleton";

function Tracklist() {
    const [offset, setOffset] = useState(0);
    const {loading, error, tracks, hasMore} = usePlaylist(offset);
    const [selectedTrack, setSelectedTrack] = useState(null);

    const observer = useRef();
    const lastTrackElementRef = useCallback(node => {
            if (loading) return
            if (observer.current) observer.current.disconnect()

            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasMore) {
                    setOffset(tracks.length)
                }
            })
            if (node) observer.current.observe(node);
        }
    );

    return (
        <div className="px-4 flex flex-col space-y-1 pb-36 text-gray-400">
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
                    trackRef={hasMore && tracks.length === i + 1 ? lastTrackElementRef : null}
                />
            ))}
            {loading && ["opacity-100", "opacity-70", "opacity-50", "opacity-30", "opacity-10"]
                .map(opacity => (<TrackLoadingSkeleton key={opacity} className={opacity}/>))}
            {error && <TrackLoadingSkeleton key={"error"} className={"bg-red-700"}/>}
        </div>
    )
}

export default Tracklist
