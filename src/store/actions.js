export const CREATE_FOLDER = 'CREATE_FOLDER';
export const REMOVE_FOLDER = 'DELETE_FOLDER';
export const GET_CURRENT_FOLDER = 'GET_CURRENT_FOLDER';



export const createFolder = folder => ({
    type: CREATE_FOLDER,
    payload: folder
})


export const removeFolder = folder => ({
    type: REMOVE_FOLDER,
    payload: folder
})

export const getCurrentFolder = name => ({
    type: GET_CURRENT_FOLDER,
    payload: { name }
})