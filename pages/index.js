import Head from 'next/head'
import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import {getSession, useSession} from "next-auth/react";
import Player from "../components/player/Player";
import React, {useEffect} from "react";
import useSpotify from "../hooks/useSpotify";
import {availableDevicesState, currentDeviceIdState} from "../atoms/deviceAtom";
import {useRecoilState} from "recoil";
import DeviceMenu from "../components/player/DeviceMenu";


export default function Home() {
    const spotifyApi = useSpotify()
    const {data: session} = useSession();
    const [devices, setDevices] = useRecoilState(availableDevicesState);
    const [currentDeviceId, setCurrentDeviceId] = useRecoilState(currentDeviceIdState);


    useEffect(() => {
        if (spotifyApi.getAccessToken() && devices.length === 0) {
            // Get a User's Available Devices
            spotifyApi.getMyDevices()
                .then(function (data) {
                    let availableDevices = data.body.devices
                    setDevices(availableDevices)
                    data.body.devices
                        .filter(device => device.is_active)
                        .forEach(device => setCurrentDeviceId(device.id));

                }, function (err) {
                    console.log('Something went wrong!', err)
                })
        }
    }, [session, devices, spotifyApi])

    return (
        <div className="bg-black h-screen overflow-hidden">
            <Head>
                <title>Spotify Clone</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className="flex">
                <Sidebar/>
                <Center/>
            </main>

            <div className="sticky bottom-0 text-white print:hidden">
                <Player/>
            </div>

            {!currentDeviceId && <div className="fixed w-screen h-screen bg-black opacity-70 top-0 left-0"/>}
            {!currentDeviceId && <DeviceMenu className="absolute top-16 left-1/2 h-fit"/>}

        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
        props: {
            session,
        },
    };
}
