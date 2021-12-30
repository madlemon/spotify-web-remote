function millisToMinutesAndSeconds(millis) {
    if (!millis && millis !== 0) return '0:00';
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export {millisToMinutesAndSeconds}
