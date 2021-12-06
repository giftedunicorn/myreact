import {renderComponent} from '../react-dom/diff'
import { enqueueSetState } from './set-state-queue'

class Component {
    constructor(props = {}) {
        this.isReactComponent = true;
        this.state = {};
        this.props = props;
    }

    setState(stateChange) {
    	// merge this.state and stateChange
        // Object.assign(this.state, stateChange);
        // renderComponent(this);
        enqueueSetState(stateChange, this)
    }
}

export default Component;
