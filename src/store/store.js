import firebase from 'firebase/app'
import 'firebase/auth'
// import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'
import { config } from '../fconfig';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import { getFirebase } from 'react-redux-firebase'
import { folders } from './reducers'
import thunk from 'redux-thunk';


const rrfConfig = {
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
}

// Initialize firebase instance
firebase.initializeApp(config)

// Initialize other services on firebase instance
// firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers

const rootReducer = combineReducers({
  folders,
  firebase: firebaseReducer,
  // firestore: firestoreReducer // <- needed if using firestore
})


// Create store with reducers and initial state
const initialState = {
  folders: {
      name: 'root',
      id: 1,
      content: [],
      reference: '/',
  },
  currentFolder: {},
  isLoaded: false
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk.withExtraArgument( getFirebase))))

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
}


