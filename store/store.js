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



// // store/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import usersReducer from './usersSlice';
// import { loadState, saveState } from '../utils/localStorage';

// const persistedState = loadState();

// const combinedReducer = configureStore({
//   reducer: {
//     users: usersReducer,
//   },
//   preloadedState: persistedState,
// }).reducer;

// const rootReducer = (state, action) => {
//   if (action.type === 'INITIALIZE_STATE') {
//     return action.payload; // Rehydrate the entire state
//   }
//   return combinedReducer(state, action);
// };

// const store = configureStore({
//   reducer: rootReducer,
//   // ... other store configurations
// });

// store.subscribe(() => {
//   saveState({
//     users: store.getState().users,
//   });
// });

// export default store;

// store.dispatch({
//     type: 'INITIALIZE_STATE',
//     payload: newState // The entire new state you want to set
// });