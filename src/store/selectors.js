import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'

useFirebaseConnect([
    { path: 'folders' }
])
// Get todos from redux state
const folders = useSelector(state => ({
    ...state, folders: state.firebase.ordered.folders, isLoaded: isLoaded(folders)
}))
