// // pages/_app.js
// import { Provider } from 'react-redux';
// import store from '../store/store';

import StoreProvider from "./StoreProvider";

// function MyApp({ Component, pageProps }) {
//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }

// export default MyApp;


// // pages/_app.js
// import { Provider } from 'react-redux';
// import store from '../store/store';

// function MyApp({ Component, pageProps }) {
//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }

// export default MyApp;

// pages/_app.js
// import { Provider } from 'react-redux';
// import store from '../store/store';

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider >
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;