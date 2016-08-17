import React from "react";

import { formatTime } from "../utils/time";
import { getName } from "../utils/files";

export default class Player extends React.Component {
    render() {
        return (
            <div className="player">
                <p>Song Name: {getName(this.props.song.name)}</p>
                <p>Seeker: {formatTime(this.props.song.position)} out of {formatTime(this.props.song.end)}</p>
                <p>Volume: {this.props.volume}%</p>
                <button onClick={this.props.onPlay}>Play</button>
                <button onClick={this.props.onPause}>Pause</button>
                <button onClick={this.props.onStop}>Stop</button>
                <button onClick={this.props.onNext}>Next</button>
                <button onClick={this.props.onPrevious}>Previous</button>
                <button onClick={this.props.onForward}>Seek Forward</button>
                <button onClick={this.props.onBackward}>Seek Backward</button>
            </div>
        );
    }
}
