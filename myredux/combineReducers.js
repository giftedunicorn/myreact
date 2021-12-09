//合并Reducer
export default function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);

  //返回一个合并的reducer
  return function combineReducer(state = {}, action) {
    const newState = {};

    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      const prevState = state[key]; //现有的状态
      newState[key] = reducer(prevState, action);
    }

    return newState; //返回更新后的状态
  };
}
