const {atom} = require("recoil");

export const playlistIdState = atom({
    key: 'playlistIdState', // unique ID (with respect to other atoms/selectors)
    default: '37i9dQZF1DXcOYQJYGaYjk', // default value (aka initial value)
});

export const playlistState = atom({
    key: 'playlistAtomState', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
});

