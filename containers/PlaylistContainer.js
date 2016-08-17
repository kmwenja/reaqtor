import { connect } from "react-redux";

import Playlist from "../components/Playlist";
import Client from "../utils/client";

const mapStateToProps = (state) => {
    return {
        songs: state.playlist,
        activeid: state.status.Id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        play: (id) => {
            const c = new Client();
            c.command('playid '+id);
        }
    }
}

const PlaylistContainer = connect(mapStateToProps, mapDispatchToProps)(Playlist);

export default PlaylistContainer;
