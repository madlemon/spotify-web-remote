import React, {useEffect, useState} from 'react';
import {signOut, useSession} from "next-auth/react";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/outline";
import {shuffle} from "lodash";
import {playlistIdState, playlistState} from "../atoms/playlistAtom";
import {useRecoilState, useRecoilValue} from "recoil";
import useSpotify from "../hooks/useSpotify";
import Tracklist from "./Tracklist";


function Center() {
    const spotifyApi = useSpotify();
    const {data: session} = useSession();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);

    let colors = ['from-red-600',
        'from-orange-600',
        'from-amber-500',
        'from-lime-700',
        'from-green-600',
        'from-pink-700',
        'from-fuchsia-700',
        'from-rose-600',
        'from-blue-500',
        'from-indigo-700'];

    useEffect(() => {
        let randomizedColor = shuffle(colors).pop();
        setColor(randomizedColor);
    }, [playlistId]);

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId)
            .then((data) => setPlaylist(data.body))
    }, [session, spotifyApi, playlistId]);

    function Profile(props) {
        const [open, setOpen] = useState(false)

        return (
            <header className="absolute top-5 right-5 z-50 print:hidden">
                <div className="flex items-center bg-black space-x-3
                opacity-90 hover:opacity-80 cursor-pointer rounded-full
                p-1 pr-2"
                     onClick={event => {
                         event.stopPropagation()
                         setOpen(!open)
                     }}>
                    <img className="rounded-full w-6 h-6"
                         src={session?.user.image}
                         alt="Benutzer-Avatar"/>
                    <h2>{session?.user.name}</h2>
                    {open ? <ChevronUpIcon className="h-5 w-5"/> : <ChevronDownIcon className="h-5 w-5"/>}
                    {open && props.children}
                </div>
            </header>
        )
    }

    function DropDownMenu() {
        function MenuItem(props) {
            return (
                <div className="hover:bg-zinc-800 rounded-lg p-1"
                     onClick={props.onClick}>
                    {props.itemText}
                </div>
            )
        }

        return (
            <div className="absolute top-10 w-60 translate-x-[-40%]
                            rounded-lg bg-black p-1
                            flex flex-col space-y-1 ">
                <MenuItem itemText="Konto"/>
                <MenuItem itemText="Profil"/>
                <MenuItem itemText="Einstellungen"/>
                <hr className="border-t-[0.1px] border-gray-900 "/>
                <MenuItem itemText="Abmelden"
                          onClick={() => signOut()}/>
            </div>
        )
    }

    return (
        <div key={playlistId} // force rerender of component to reset scroll position & offset
             className="flex flex-grow flex-col text-white
                        h-screen overflow-y-scroll scrollbar-hide bg-zinc-900">
            <Profile>
                <DropDownMenu/>
            </Profile>

            <section
                className={`flex items-end h-80 w-full space-x-7 p-7
                bg-gradient-to-b to-zinc-900 ${color}`}>
                <img
                    className="w-32 md:w-44 lg:w-56 shadow-2xl"
                    src={playlist?.images?.[0]?.url}
                    alt="Playlist-Cover-Image"
                />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className="text-2xl md:text-5xl xl:text-7xl font-bold">{playlist?.name}</h1>
                </div>
            </section>
            <div>
                <Tracklist/>
            </div>
        </div>
    );
}

export default Center;
