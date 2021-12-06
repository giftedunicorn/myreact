import { renderComponent } from '../react-dom/diff'

const setStateQueue = [] // store all the updates
const renderQueue = [] // store the component will be updated

function defer(fn) {
	// execute flush after all sync functions
	return Promise.resolve().then(fn)
}

export function enqueueSetState(stateChange, component) {
	// only run flush when queue is empty, otherwise flsuh will be executed 100 times
	if (setStateQueue.length === 0) {
		defer(flush)
	}

	// +1 100 times, then 100 stateChange pushed to queue, and final result will be 100
	setStateQueue.push({
		stateChange,
		component
	})

	// make sure there is no dup component in queue, only one of this component push to render queue
	// filter dup component
	if (!renderQueue.some(item => item === component)) {
		renderQueue.push(component)
	}
}

// execute and clear queue after the sync functions
function flush() {
	let item, component

	while (item = setStateQueue.shift()) {
		const {stateChange, component} = item

		// if prevState is not existed, make the current state as the prevState
		if (!component.prevState) {
			component.prevState = Object.assign({}, component.state)
		}

		// if stateChange is a function instead of object, usage
		if (typeof stateChange === 'function') {
			Object.assign(component.state, stateChange(component.prevState, component.props))
		} else {
			// if it's object, merge like before
			Object.assign(component.state, stateChange)
		}

		component.prevState = component.state
	}

	while (component = renderQueue.shift()) {
		renderComponent(component)
	}
}
