import {HomeIcon, MenuAlt3Icon, PlusIcon, RssIcon, SearchIcon} from "@heroicons/react/outline";
import {HeartIcon} from "@heroicons/react/solid";
import React from 'react';
import {useRecoilState} from "recoil";
import {playlistIdState} from "../atoms/playlistAtom";
import useUserPlaylists from "../hooks/useUserPlaylists";

function Sidebar() {
    const {loading, error, userPlaylists, loadOnIntersectRef} = useUserPlaylists();
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    return (
        <div
            className="flex flex-col h-screen text-gray-500 font-bold border-r border-gray-900 p-5
            text-xs lg:text-sm
            sm:max-w-[12rem] lg:max-w-[15rem]
            hidden md:inline-flex print:md:hidden">
            <div className="space-y-4">
                <button className="sidebar-item">
                    <HomeIcon className="h-5 w-5"/>
                    <p>Start</p>
                </button>
                <button className="sidebar-item">
                    <SearchIcon className="h-5 w-5"/>
                    <p>Suchen</p>
                </button>
                <button className="sidebar-item">
                    <MenuAlt3Icon className="h-5 w-5 rotate-90"/>
                    <p>Bibliothek</p>
                </button>

                <hr className="border-t-[0.1px] border-gray-900"/>

                <button className="sidebar-item group">
                    <div className="bg-gray-500 group-hover:bg-white text-black p-1">
                        <PlusIcon className="h-3 w-3"/>
                    </div>
                    <p>Playlist erstellen</p>
                </button>
                <button className="sidebar-item group">
                    <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500
                    text-white p-1
                    opacity-80 group-hover:opacity-100">
                        <HeartIcon className="h-3 w-3"/>
                    </div>
                    <p>Lieblingssongs</p>
                </button>
                <button className="sidebar-item">
                    <RssIcon className="h-5 w-5"/>
                    <p>Deine Podcasts</p>
                </button>

                <hr className="border-t-[0.1px] border-gray-900 "/>
            </div>
            <div className="flex flex-col flex-auto overflow-y-scroll scrollbar-hide pb-36">

                {userPlaylists.map((playlist, index) => (
                    <p key={playlist.id}
                       className={`cursor-pointer hover:text-white mt-4 
                       ${playlistId === playlist.id ? "text-white" : ""}`}
                       onClick={() => setPlaylistId(playlist.id)}
                       ref={userPlaylists.length === index + 1 ? loadOnIntersectRef : null}
                    >
                        {playlist.name}
                    </p>
                ))}
                {error && <span
                    key={"error"}
                    className={"bg-red-400 text-red-800 rounded-lg w-full p-1"}
                >
                    Error loading your playlists!
                </span>}
                {loading &&
                ["opacity-100", "opacity-50", "opacity-10"].map(opacity => (
                    <div
                        key={opacity}
                        className={`${opacity} bg-zinc-700 animate-pulse rounded-lg w-1/2 h-3 mt-4`}>
                        &nbsp;
                    </div>))}
            </div>
        </div>
    );
}

export default Sidebar
