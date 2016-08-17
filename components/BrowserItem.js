import React from "react";

import { formatTime } from "../utils/time";
import { getName } from "../utils/files";

export default class BrowserItem extends React.Component {
    render() {
        var { file } = this.props;
        if(file.is_directory) {
            return (
                <li className="browser-item">
                    <a className="directory" href='' onClick={(e) => {this.props.browse(file.path); e.preventDefault();}}>
                    {getName(file.path)}
                    </a>
                </li>
            );
        }
        else {
            return (
                <li className="browser-item">
                    <span className="file">{getName(file.path)}</span>
                    <span className="time">{formatTime(file.time)}</span>
                </li>
            );
        }
    }
}
