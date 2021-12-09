import { createStore, combineReducers, applyMiddleware } from "../../myredux/index.js";
import counterReducer from "./reducers/counter.js";
import infoReducer from "./reducers/info.js";
import timeMiddleware from "./middlewares/timeMiddleware.js";

const reducer = combineReducers({
	counter: counterReducer,
	info: infoReducer,
});

const rewriteCreateStoreFunc = applyMiddleware(
	timeMiddleware,
)

//创建store,传入reducer
const store = createStore(reducer, {}, rewriteCreateStoreFunc);

//订阅，状态改变通知订阅者，把订阅者的方法存入到监听队列中
store.subscribe(() => {
	const state = store.getState();
	console.log(state.counter.count);
});
store.subscribe(() => {
	const state = store.getState();
	console.log(state.info.name + state.info.description);
});

//通过派发改变状态
store.dispatch({
	type: "INCREMENT",
});
store.dispatch({
	type: "SET_NAME",
	name: "jie2",
	description: "前端爱我",
});
