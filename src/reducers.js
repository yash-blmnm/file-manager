// import axios from "axios";
// import _cloneDeep from "lodash.clonedeep";
// // import { CREATE_FOLDER, REMOVE_FOLDER, GET_CURRENT_FOLDER } from './actions';
// const initialState = {
//     folders: {
//         name: 'root',
//         id: 1,
//         content: [],
//         reference: '/',
//     },
//     currentFolder: {},
// }

// const findFolderInNestedTree = (tree, path) => {
//     // if(folderHistory[0] === "") {
//     //     folderHistory.shift();
//     //     findFolderInNestedTree(tree, folderHistory)
//     // }
    
//     // let folder = tree.folders;
//     // console.log(tree, name, name.trim() != "");
//     // name !== undefined && name.trim().length > 1
//     if(path === "/") {
//         return tree;
//     } 
//     // else {
//         // return findFolderInNestedTree(tree, folderHistory);
//         const folder = tree.content.find(folder => folder.path === path)
//         if(folder) {
//             return folder;
//         }
//         // if(!folderHistory.length){
//         //     return folder;
//         // }
//         return findFolderInNestedTree(folder, path);
//     // }
    
    
// }

// export const CREATE_FOLDER = 'CREATE_FOLDER';
// export const REMOVE_FOLDER = 'DELETE_FOLDER';
// export const GET_CURRENT_FOLDER = 'GET_CURRENT_FOLDER';
// export const GET_ALL_FOLDERS = 'GET_ALL_FOLDERS';

// export const folders = (state = initialState, action) => {
//     const { type, payload } = action;
//     switch (type) {
//         case CREATE_FOLDER: {
//             return {
//                 ...state, folders: action.payload,
//             };
//         }
//         case REMOVE_FOLDER: {
//             const { id } = payload;
//             return state.filter(folder => folder.id !== id);
//         }
//         case GET_CURRENT_FOLDER: {
//             // console.log(state)
//             const { pathNames } = payload;
//             console.log(pathNames)
//             // console.log(findFolderInNestedTree(state, pathNames));
//             console.log("here", findFolderInNestedTree(state.folders, pathNames));
//             // const currentFolder = pathNames && pathNames.length > 1 ? findFolderInNestedTree(state.folders, pathNames) : state.currentFolder;
//             return {
//                 ...state,
//                 currentFolder: findFolderInNestedTree(state.folders, pathNames)
//             }
//         }
//         case GET_ALL_FOLDERS: {
//             return {
//                 ...state,
//                 folders: action.payload
//             };
//         }
//         default:
//             return state;

//     }
// }


// // New create folder logic
// function changeOb(obj, path, data) {
//     const tmp = obj;
//     if(path === "") path = "/"
//     if (tmp.path === path) {
//       tmp.content = [...tmp.content, data];
//     }
//     return tmp;
//   }
  
//   function folderCreateRecusrsion(inp, path, data) {
//     const o = inp;
//     if(typeof o === "object"){
//       if (Array.isArray(o.content)) {
//         if (o.content.length > 0) {
//            o.content.forEach((i) => folderCreateRecusrsion(i, path, data));
//         }
//       }
//     }
//     changeOb(o, path, data);
//     return o;
//   }

// export const createFolder = (allFolders, path, newFolder) => {
//     const foldersData = folderCreateRecusrsion(allFolders, path, newFolder);
//     return (dispatch) => {
//         return axios.post("http://localhost:5000/folders", foldersData).then((response)=> {
//             dispatch({
//                 type: CREATE_FOLDER,
//                 payload: response.data
//             })
//         });
// }
    
// }

// export const getAllFolders = () => {
//     return (dispatch) => {
//     return axios.get("http://localhost:5000/folders").then((response)=> {
//         dispatch({
//             type: GET_ALL_FOLDERS,
//             payload: response.data
//         })
//     });
// }}


// export const removeFolder = folder => ({
//     type: REMOVE_FOLDER,
//     payload: folder
// })

// export const getCurrentFolder = pathNames => ({
//     type: GET_CURRENT_FOLDER,
//     payload: { pathNames }
// })