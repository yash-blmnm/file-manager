// import axios from "axios";
// import _cloneDeep from "lodash.clonedeep";
// import { firestoreConnect } from "react-redux-firebase";
// import { CREATE_FOLDER, REMOVE_FOLDER, GET_CURRENT_FOLDER } from './actions';
// import { useFirebase } from 'react-redux-firebase'

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

const findFolderInNestedTree = (tree, pathNames) => {
    // if(folderHistory[0] === "") {
    //     folderHistory.shift();
    //     findFolderInNestedTree(tree, folderHistory)
    // }
    
    // let folder = tree.folders;
    // console.log(tree, name, name.trim() != "");
    // name !== undefined && name.trim().length > 1'
    let path = pathNames.shift();
    const folder = path.trim().length ? tree[path] : tree;
    if(!pathNames.length) {
        return folder;
    } 
    // else {
        // return findFolderInNestedTree(tree, folderHistory);
        // const folder = tree[path];
        // if(!pathNames.length){
        //     return folder;
        // }
        // const folder = tree.content.find(folder => folder.path === path)
        // if(folder) {
        //     return folder;
        // }
        // if(!folderHistory.length){
        //     return folder;
        // }
        return findFolderInNestedTree(folder.content, path);
    // }
    
    
}

export const CREATE_FOLDER = 'CREATE_FOLDER';
export const REMOVE_FOLDER = 'DELETE_FOLDER';
export const GET_CURRENT_FOLDER = 'GET_CURRENT_FOLDER';
export const GET_ALL_FOLDERS = 'GET_ALL_FOLDERS';

export const folders = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case CREATE_FOLDER: {
            return state;
        }
        case REMOVE_FOLDER: {
            const { id } = payload;
            return state.filter(folder => folder.id !== id);
        }
        case GET_CURRENT_FOLDER: {
            const {path} = payload;
            // console.log(payload);
            // // console.log(state)
            // console.log("current folder");
            // const { path } = payload;
            // // console.log(pathNames)
            // // console.log(findFolderInNestedTree(state, pathNames));
            // console.log(state);
            const currentFolder = path && path.length > 1 ? findFolderInNestedTree(state.folders, path.split('/')) : state.currentFolder;
            return {
                ...state,
                currentFolder: currentFolder
            }
        }
        case GET_ALL_FOLDERS: {
            const { folders } = payload;
            return {
                ...state,
                folders: folders,
                
            };
        }
        default:
            return state;

    }
}


// New create folder logic
function changeOb(obj, path, data) {
    const tmp = obj;
    if(path === "") path = "/"
    if (tmp.path === path) {
      tmp.content = [...tmp.content, data];
    }
    return tmp;
  }
  
  function folderCreateRecusrsion(inp, path, data) {
    const o = inp;
    if(typeof o === "object"){
      if (Array.isArray(o.content)) {
        if (o.content.length > 0) {
           o.content.forEach((i) => folderCreateRecusrsion(i, path, data));
        }
      }
    }
    changeOb(o, path, data);
    return o;
  }


export const  createFolder = (folder) => {
    const {path} = folder;
    return (dispatch, getState, getFirebase) => {
      return getFirebase()
        .ref(`folders${path.replaceAll('/', '/content/')}`)
        .set(folder)
        .then(() => {
          dispatch({
                type: CREATE_FOLDER,
                payload: folder
            })
        })
  }
}

export const getAllFolders = () => {
    return (dispatch) => {
        // useFirebaseConnect([
        //     { path: 'folders' }
        // ])
        // // Get todos from redux state
        // const folders = useSelector(state => state.firebase.ordered.folders)
        dispatch({
            type: GET_ALL_FOLDERS,
            payload: folders
        })
    // });
}}


export const removeFolder = folder => ({
    type: REMOVE_FOLDER,
    payload: folder
})

// export const getCurrentFolder = pathNames => {
//     console.log("temp value")
//         return {
//             type: GET_CURRENT_FOLDER,
//             payload: { pathNames }
//         }
//     }


export const getCurrentFolder = path => {
    return (dispatch, getState) => {
        const state = getState();
        // const currentFolder = findFolderInNestedTree(state.firebase.data.folders, (pathNames || []).split(""))
        dispatch({
            type: GET_CURRENT_FOLDER,
            payload: { path }
        })
    // });
    }
}