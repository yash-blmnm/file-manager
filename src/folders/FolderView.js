import React from 'react';
import { useState, useReducer, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { connect } from 'react-redux'
import { getCurrentFolder } from '../store/reducers';
import Folder from './Folder';
// import { firebase } from '../fconfig';
import { compose } from 'redux' // can also come from recompose
import { withHandlers } from 'recompose'
import { withFirebase } from 'react-redux-firebase'
// const dB = firebase.database();
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useFirebase, firebaseConnect } from 'react-redux-firebase'
import { withRouter } from "react-router";




const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
}));
  

const FolderView =  ( {currentFolder, dispatch} ) => {
    // const folders = dB.ref("folders");
    // console.log(folders);
    
    // console.log(firebase);
    const location = useLocation();
    // const reference = location.pathname !== '/' ? location.pathname.replaceAll('/', '/content/') : location.pathname
    // const firebase = useFirebase()
    // const storageRef = firebase.storage().ref(reference)
    // console.log(storageRef.child());
    // useFirebaseConnect([
    //     { path: `${reference}/content` }
    //   ])
    // const currentFolder = useSelector((state) => {
    //     console.log(state);
    //     return ({...state, current: state.firebase.ordered})
    // })
    // console.log(currentFolder)
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    // const pathNames = window.location.pathname ? window.location.pathname.split('/') : [];
    const handleClick = () => {
        setOpen(!open);
    };
    
    useEffect(() => {
        // console.log(123);
        // // if(folders.path){
        // getCurFolder(location.pathname);
        // // }
        
    }, [location]);

    // React.useEffect(() => { addTodo(location.pathname) }, [])
    
    // const removeFolder = (id) => {
    //     console.log("Remove");
    // }
    // if(!isLoaded(currentFolder)) {
    //     return('Loading...')
    // }

    return (
        <>
            <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
                {currentFolder.content && Object.keys(currentFolder.content).map((key, i) => {
                    const folder = currentFolder.content[key];
                    return(<ListItem key={folder.name}>
                        <ListItemIcon> <FolderIcon /> </ListItemIcon>
                        <ListItemText primary={folder.name} />
                    </ListItem>)
                })}
                <ListItem key={currentFolder && currentFolder.length + 1}>
                    <ListItemIcon> <CreateNewFolderIcon onClick={handleClick}/> </ListItemIcon>
                    {
                        open ?
                            <ListItemText> <Folder /> </ListItemText>
                         : ''

                    }
                </ListItem>
            </List> 
        </>    
    );
}

const mapStateToProps = (state, props) => {
    console.log(props)
    // console.log(props.location);
    const location = window.location ;
    // console.log(state, ownProps);
    // const location = useLocation();
    const reference = location.pathname !== '/' ? location.pathname.replaceAll('/', '/content/') : location.pathname;
    const referenceList = reference.split("/")
    return {
        currentFolder: getCurrentFolders(state.firebase.data.folders,referenceList),
        folders: state.firebase.data.folders
    }
};

function getCurrentFolders(tree, referenceList) {
    let path = referenceList.shift();
    // const folder = path.trim().length ? tree[path] : tree;
    if(path.trim().length) {
        const folder = tree[path];
        if(!referenceList.length) {
            return folder;
        } 
        if(folder) {
            return getCurrentFolders(folder, referenceList);
        }else {
            return tree;
        }
        
    }else {
        if(!referenceList.length) {
            return tree;
        } else {
            return getCurrentFolders(tree, referenceList);
        }
    }
    // if(!referenceList.length) {
    //     return folder;
    // } 
    
    // console.log(path, folder);
    // if(!referenceList.length) {
    //     return folder;
    // } 
    // return getCurrentFolders(folder.content, referenceList);

}

const mapDispatchToProps = (dispatch, state) => {
    console.log(state)
    return ({
    getCurFolder: path => dispatch(getCurrentFolder(path, state))
})}

// const enhance = compose(
// firebaseConnect((props) => [
//     { path: 'folders' }
// ]),
// connect((state) => {
//     let folders = state.firebase.data.folders;
//     console.log({...state, folders: {...state.folders, folders : state.firebase.data.folders}, isLoaded: isLoaded(folders)})
//     return ({...state, folders: {...state.folders, folders : state.firebase.data.folders}, isLoaded: isLoaded(folders)})
// }))

// export default connect(mapStateToProps, mapDispatchToProps)(FolderView);
// const enhance = compose(
//     withFirebase,
//     withHandlers({addTodo: state => (path) => {
//         debugger;
//         console.lor(state);
//         return state.dispatch(getCurrentFolder(path))
//     }})
// )

// export default withFirebase(FolderView);

export default compose(connect(mapStateToProps, mapDispatchToProps), firebaseConnect(['folders']))(withRouter(FolderView))