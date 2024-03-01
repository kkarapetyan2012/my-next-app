// // store/store.js working example
// import { configureStore } from '@reduxjs/toolkit';
// import usersReducer from './usersSlice';

// export const makeStore = () => configureStore({
//   reducer: {
//     users: usersReducer,
//   },
// });

// const store = makeStore();

// export default store;


// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import { loadState, saveState } from '../utils/localStorage';

const persistedState = loadState();

export const makeStore = () => configureStore({
  reducer: {
    users: usersReducer,
  },
  preloadedState: persistedState,
});

const store = makeStore();

store.subscribe(() => {
  saveState({
    users: store.getState().users,
  });
});

export default store;
