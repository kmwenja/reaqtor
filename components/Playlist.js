import React from "react";

import PlaylistItem from "./PlaylistItem";
import formatTime from "../utils/time";

export default class Playlist extends React.Component {
    render() {
        return (
            <div className="playlist">
                <h2 className="header">Playlist</h2>
                <ul className="body">
                    {this.props.songs.map(song =>
                        <PlaylistItem key={song.Id} song={song} activeid={this.props.activeid} play={this.props.play}/>
                    )}
                </ul>
            </div>
        );
    }
}
