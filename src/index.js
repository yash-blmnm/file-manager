import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, rrfProps } from './store/store';
import App from './App';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>  {/* PRovider that helps interact with firebase data */}
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

