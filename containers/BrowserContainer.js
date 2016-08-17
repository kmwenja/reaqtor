import { connect } from "react-redux";

import Browser from "../components/Browser";
import Client from "../utils/client";
import { updateBrowser } from "../actions";

const mapStateToProps = (state) => {
    return {
        files: state.browser.files,
        previous: state.browser.previous,
        current: state.browser.current,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        browse: (path) => {
            const c = new Client();
            c.listfiles(path, {success: (data) => {
                dispatch(updateBrowser(path, data));
            }});
        }
    }
}

const BrowserContainer = connect(mapStateToProps, mapDispatchToProps)(Browser);

export default BrowserContainer;
