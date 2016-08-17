import React from "react";

import BrowserItem from "./BrowserItem";


export default class Browser extends React.Component {
    render() {
        return (
            <div className="browser">
                <h2 className="header">Browser here</h2>
                <p>Current: {this.props.current}</p>
                <a href='' onClick={(e) => {this.props.browse(this.props.previous); e.preventDefault();}}>Back: {this.props.previous}</a>
                <ul className="body">
                    {this.props.files.map((file) =>
                        <BrowserItem key={file.path} file={file} browse={this.props.browse}/>
                    )}
                </ul>
            </div>
        );
    }
}
