export const formatTime = (time) => {
    let t = new Date(time * 1000);
    return t.getUTCHours() + ":" + t.getUTCMinutes() + ":" + t.getUTCSeconds();
}
