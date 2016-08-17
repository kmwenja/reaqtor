import React from "react";
import { connect } from "react-redux";

import PlayerContainer from "./PlayerContainer";
import PlaylistContainer from "./PlaylistContainer";
import BrowserContainer from "./BrowserContainer";
import Client from "../utils/client";
import { updateStatus, updatePlaylist, updateBrowser } from "../actions";

const mapStateToProps = (state) => {
    return {
        current: state.browser.current
    }
}


class Layout extends React.Component {
    componentDidMount() {
        const c = new Client();
        this.interval = setInterval(()=>{
            c.status({success: (data) => {
                this.props.dispatch(updateStatus(data));
            }});
            c.playlist({success: (data) => {
                this.props.dispatch(updatePlaylist(data));
            }});
            c.listfiles(this.props.current, {success: (data) => {
                this.props.dispatch(updateBrowser(this.props.current, data));
            }});
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="app">
                <h1 className="header">Reaqtor</h1>
                <div className="browser-slot">
                    <BrowserContainer/>
                </div>
                <div className="playlist-slot">
                    <PlaylistContainer/>
                </div>
                <div className="player-slot">
                    <PlayerContainer/>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Layout);
