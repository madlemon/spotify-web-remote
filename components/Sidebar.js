import {HomeIcon, MenuAlt3Icon, PlusIcon, RssIcon, SearchIcon, ShieldExclamationIcon} from "@heroicons/react/outline";
import {HeartIcon} from "@heroicons/react/solid";
import {signOut, useSession} from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import React, {useEffect, useState} from 'react';
import {useRecoilState} from "recoil";
import {playlistIdState} from "../atoms/playlistAtom";

function Sidebar() {
    const spotifyApi = useSpotify();
    const {data: session} = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    useEffect(() => {
        if (!spotifyApi.getAccessToken()) {
            return;
        }
        spotifyApi.getUserPlaylists().then((data) => {
            setPlaylists(data.body.items);
        })
    }, [session, spotifyApi]);

    return (
        <div
            className="flex flex-col h-screen text-gray-500 font-bold border-r border-gray-900 p-5
            text-xs lg:text-sm
            sm:max-w-[12rem] lg:max-w-[15rem]
            hidden md:inline-flex">
            <div className="space-y-4">
                <button className="sidebar-item hover:bg-red-600"
                        onClick={() => signOut()}>
                    <ShieldExclamationIcon className="h-5 w-5"/>
                    <p>Logout</p>
                </button>
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
                {playlists.map((playlist) => (
                    <p key={playlist.id}
                       className={`cursor-pointer hover:text-white mt-4 
                       ${playlistId === playlist.id ? "text-white" : ""}`}
                       onClick={() => setPlaylistId(playlist.id)}
                    >
                        {playlist.name}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default Sidebar
