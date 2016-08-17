export const getName = (path) => {
    if(path === undefined){
        return path;
    }
    var name = path.split("/");
    return name[name.length-1];
}

export const getPrevious = (path) => {
    var pieces = path.split("/");
    var previous = pieces.slice(0, pieces.length-1).join("/");
    if(previous === ""){
        previous = "/";
    }
    return previous;
}

export const transformFiles = (files) => {
    var newFiles = [];
    files.forEach((file) => {
        if(file.playlist !== undefined){
            return;
        }
        var path = file.directory || file.file;
        var is_directory = file.directory !== undefined;
        var time = file.Time || null;
        newFiles.push({
            path,
            is_directory,
            time
        });
    });
    return newFiles;
}
