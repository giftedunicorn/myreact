export default function createStore(reducer, initState, rewriteCreateStoreFunc) {
  if (rewriteCreateStoreFunc) {
    const newCreateStore = rewriteCreateStoreFunc(createStore)
    return newCreateStore(reducer, initState)
  }

  let state = initState; //状态
  let listeners = []; //监听队列

  //订阅，状态改变通知订阅者，把订阅者的方法存入到监听队列中
  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      // cancel subscription
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  //获取状态
  function getState() {
    return state;
  }

  //改变状态，执行监听队列中订阅者的方法
  function dispatch(action) {
    //reducer负责更新数据
    state = reducer(state, action);
    //通知所有的订阅者
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  function replaceReducer(nextReducer) {
    reducer = nextReducer
    dispatch({ type: Symbol() })
  }

  dispatch({ type: Symbol() })

  return {
    subscribe,
    getState,
    dispatch,
    replaceReducer,
  };
}
