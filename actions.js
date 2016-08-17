import { getPrevious, transformFiles } from "./utils/files";


export const updateStatus = (status) => {
    return {
        type: 'UPDATE_STATUS',
        data: status
    }
}

export const updatePlaylist = (playlist) => {
    return {
        type: 'UPDATE_PLAYLIST',
        data: playlist
    }
}

export const updateBrowser = (path, files) => {
    var current = path;
    var previous = getPrevious(path);
    var newFiles = transformFiles(files);

    return {
        type: 'UPDATE_BROWSER',
        data: {
            current,
            previous,
            files: newFiles
        }
    }
}
