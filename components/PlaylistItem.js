import React from "react";

import { formatTime } from "../utils/time";
import { getName } from "../utils/files";

export default class PlaylistItem extends React.Component {
    render() {
        var { song } = this.props;
        var cls = "playlist-item";
        var cls2 = "play";

        if(this.props.song.Id == this.props.activeid){
            cls += " active";
            cls2 += " play-active";
        }


        return (
            <li className={cls}>
                <span className="name">{getName(song.file)}</span>
                <span className="time">{formatTime(song.Time)}</span>
                <button onClick={() => this.props.play(song.Id)} className={cls2}>Play</button>
            </li>
        );
    }
}
