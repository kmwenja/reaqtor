import net from "net";

export default class Client {
    constructor(options) {
        var opts = options || {};
        this.host = opts.host || '127.0.0.1';
        this.port = opts.port || 6600;
        this.default_success = opts.success || console.log.bind(null);
        this.default_error = opts.error || console.log.bind(null);
    }

    connect(success) {
        var self = this;
        var socket = new net.Socket();
        socket.connect(this.port, this.host, function(){
            success(socket);
        });
    }

    makeObject(data) {
        var obj = {};
        data.forEach(function(line){
            var parts = line.split(":", 2);
            obj[parts[0].trim()] = parts[1].trim();
        });
        return obj;
    }

    parse(data, options) {
        var opts = options || {};
        var obj_end = opts.obj_end || null;
        var obj_start = opts.obj_start || null;

        var lines = data.split('\n');
        var actual_data = lines.slice(1, lines.length-2);

        if(obj_end !== null){
            var obj_ends = obj_end.split(',');
            var objs = [];
            var temp = [];
            var self = this;
            actual_data.forEach(function(item){
                temp.push(item);
                var key = item.split(':')[0].trim();
                if(obj_ends.indexOf(key) > -1){
                    objs.push(self.makeObject(temp));
                    temp = [];
                }
            });
            return objs;
        }
        else if(obj_start !== null){
            var obj_starts = obj_start.split(',');
            var objs = [];
            var temp = [];
            var self = this;
            actual_data.forEach(function(item){
                var key = item.split(':')[0].trim();
                if(obj_starts.indexOf(key)> -1){
                    if(temp.length > 0){
                        objs.push(self.makeObject(temp));
                        temp = [];
                    }
                }
                temp.push(item);
            });
            if(temp.length > 0){
                objs.push(self.makeObject(temp));
            }
            return objs;
        }
        else {
            return this.makeObject(actual_data);
        }
    }

    command(cmd, options){
        var opts = options || {};
        var success = opts.success || this.default_success;
        var error = opts.error || this.default_error;
        var parse = opts.parse || false;
        var obj_end = opts.obj_end || null;
        var obj_start = opts.obj_start || null;

        var self = this;
        this.connect(function(socket){
            var data_so_far = "";
            var success_regex = /OK(.*\n)*OK\n$/;
            var error_regex = /OK MPD .*\nACK \[(.*)@.*\] \{.*\} (.*)\n$/;
            socket.on('data', function(data){
                data_so_far += data;
                if(data_so_far.search(success_regex) > -1){
                    if(parse){
                        success(self.parse(data_so_far, {obj_end: obj_end, obj_start: obj_start}));
                    }
                    else {
                        success(data_so_far);
                    }
                    socket.destroy();
                    data_so_far = "";
                }
                if(data_so_far.search(error_regex) > -1){
                    var matches = data_so_far.match(error_regex);
                    var error_code = matches[1];
                    var error_text = matches[2];
                    var error_string = error_code + ": " + error_text;
                    error(error_string);
                    socket.destroy();
                    data_so_far = "";
                }
            });
            socket.write(cmd + '\n');
        });
    }

    status(options = {}) {
        var success = options.success || this.default_success;
        this.command('command_list_begin\nstatus\ncurrentsong\ncommand_list_end', {parse: true, success: success});
    }

    playlist(options = {}) {
        var success = options.success || this.default_success;
        this.command('playlistinfo', {parse: true, obj_end: 'Id', success: success});
    }

    listfiles(path, options = {}){
        var success = options.success || this.default_success;
        if(path === '/'){
            this.command('lsinfo '+path, {parse: true, obj_end: 'Last-Modified', success: success});
        }
        else {
            this.command('lsinfo '+path, {parse: true, obj_start: 'directory,file', success: success});
        }
    }

}
