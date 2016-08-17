import { connect } from "react-redux";

import { updateStatus } from "../actions";
import Client from "../utils/client";

import Player from "../components/Player";

const getSong = (state) => {
    return {
        name: state.status.file,
        position: state.status.elapsed,
        end: state.status.Time
    }
}

const mapStateToProps = (state) => {
    return {
        song: getSong(state),
        volume: state.status.volume
    }
}

const callCommand = (cmd, dispatch) => {
    const c = new Client();
    c.command(cmd);
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPlay: () => {
            callCommand('play', dispatch);
        },
        onPause: () => {
            callCommand('pause', dispatch);
        },
        onStop: () => {
            callCommand('stop', dispatch);
        },
        onNext: () => {
            callCommand('next', dispatch);
        },
        onPrevious: () => {
            callCommand('previous', dispatch);
        },
        onForward: () => {
            callCommand('seekcur +5', dispatch);
        },
        onBackward: () => {
            callCommand('seekcur -5', dispatch);
        }
    }
}

const PlayerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Player);

export default PlayerContainer;
