let spotifyMemory = {
    volume_percent: "50",

    availableDevices: [
        {
            id: '1',
            name: 'PC'
        },
        {
            id: '2',
            name: 'ECHO'
        },
        {
            id: '3',
            name: 'ECHO DOT'
        }
    ],

    current_device_ids: [],

    player: {
        is_playing: false,
        shuffle_state: false,
        repeat_state: 'off', // 'off', 'context' or 'track'
        track_number: 1,
        position_ms: '0',
    },
    
}

export {spotifyMemory}
