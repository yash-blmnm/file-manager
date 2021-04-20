
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

export const CREATE_FOLDER = 'CREATE_FOLDER';
export const REMOVE_FOLDER = 'REMOVE_FOLDER';
export const UPDATE_FOLDER = 'UPDATE_FOLDER';
export const GET_CURRENT_FOLDER = 'GET_CURRENT_FOLDER';
export const GET_ALL_FOLDERS = 'GET_ALL_FOLDERS';
export const ERROR_NOTIFICATION = 'ERROR_NOTIFICATION';

export const folders = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case CREATE_FOLDER: {
            return state;
        }
        case UPDATE_FOLDER: {
            return state;
        }
        case REMOVE_FOLDER: {
            return state;
        }
        case GET_CURRENT_FOLDER: {
            const {path} = payload;
            return {
                ...state,
            }
        }
        case GET_ALL_FOLDERS: {
            const { folders } = payload;
            return {
                ...state,
                folders: folders,
                
            };
        }
        case ERROR_NOTIFICATION: {
            const { error } = payload;
            return {
                ...state,
                error: error
            }
        }
        default:
            return state;

    }
}


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
        .then((response) => {
          dispatch({
                type: CREATE_FOLDER,
                payload: folder
            })
        }).catch((error) => {
            dispatch({
                type: ERROR_NOTIFICATION,
                payload: error
            })
        })
  }
}
export const  updateFolder = (oldPath, newPath, newFolder) => {
    console.log(oldPath, newPath, newFolder);
    // const {path} = folder;
    return (dispatch, getState, getFirebase) => {
      return getFirebase()
        .ref(`folders${oldPath.replaceAll('/', '/content/')}`)
        .remove()
        .then((data) => {
            console.log(data);
            getFirebase()
            .ref(`folders${newPath.replaceAll('/', '/content/')}`)
            .set(newFolder)
            .then(() => {
                dispatch({
                    type: UPDATE_FOLDER,
                    payload: newFolder
                })
            })
        })
  }
}
export const  deleteFolders = (folderIds, path) => {
    // const {path} = folder;
    return (dispatch, getState, getFirebase) => {
        Promise.allSettled(folderIds.map(folderId => {
            let ref = path.length <= 1 ? `folders/content/${folderId}` : `folders${path.replaceAll('/', '/content/')}/content/${folderId}`
            return getFirebase().ref(ref).remove()
        })).then((results) => {
            dispatch({
                type: REMOVE_FOLDER,
                payload: folderIds
            })
        }).catch(error => console.log(error))
  }
}

export const getAllFolders = () => {
    return (dispatch) => {
        dispatch({
            type: GET_ALL_FOLDERS,
            payload: folders
        })
}}




export const getCurrentFolder = path => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch({
            type: GET_CURRENT_FOLDER,
            payload: { path }
        })
    }
}