import React from 'react';
import { useState, useReducer, useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import {List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import FolderRoundedIcon from '@material-ui/icons/FolderRounded';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { connect } from 'react-redux'
import { getCurrentFolder, deleteFolders } from '../store/reducers';
import Folder from './Folder';
// import { firebase } from '../fconfig';
import { compose } from 'redux' // can also come from recompose
import { withHandlers } from 'recompose'
import { withFirebase } from 'react-redux-firebase'
// const dB = firebase.database();
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useFirebase, firebaseConnect } from 'react-redux-firebase'
// import { withRouter } from "react-router";
import MyDropzone from './FileUpload'
import { GridList, GridListTile, GridListTileBar, IconButton, Button, Checkbox} from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import '../style/FolderItem.css';
import FolderRenameForm from './FolderRenameForm'
import { ThemeProvider } from '@material-ui/core/styles';
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: '100%',
      height: '100vh',
    },
    gridItem: {
        margin: '0px 10px 20px', 
    },
    list: {
        padding: 0,
        margin: 0,
        right: 0,
        position: 'absolute'
    }
  }),
);


const FolderView =  ( {currentFolder, getCurFolder, deleteSelectedFolders} ) => {
    const location = useLocation();
    const pathname = location.pathname;
    const classes = useStyles();
    const [uploadFile, setUploadFile] = useState(false);
    const [createFolder, setCreateFolder] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedIds, setSelectedIds] = useState([])
    const [classStateDel, setClassStateDel] = useState('')

    useEffect(() => {
        getCurFolder(pathname);
        
    }, [pathname]);

    const folderDelete = (e) => {
        deleteSelectedFolders(selectedIds, pathname)
        setSelectAll(false)
        setClassStateDel('')
        setSelectedIds([])
    }

    const handleChange = (e) => {
        let name = e.target.name
        if(selectedIds.indexOf(name) > -1) {
            setSelectedIds(selectedIds.filter(id => id !== name))
        }else {
            setSelectedIds([...selectedIds, e.target.name])
        }
        setClassStateDel('folder-grid-delete')
    }

    

    return (
        <div className={classes.root}>
            <div clsss="group-event" style={{right: '40px', position: 'absolute'}}>
                {!selectAll ? <Button color="primary" onClick={() => setSelectAll(true)}>Select</Button>: 
                <IconButton aria-label={`delete`}  onClick={folderDelete}><DeleteIcon fontSize="small"/> </IconButton>
                }
            </div>
            
            
            <GridList cellHeight={160} className={classes.gridList} cols={6}>
                {currentFolder.content && Object.keys(currentFolder.content).map((key, i) => {
                    const folder = currentFolder.content[key];
                    return (
                    // <FolderItem folder={folder} cName={classes}/>)
                    <GridListTile className={`${classes.gridItem} folder-grid-item ${(selectedIds.indexOf(folder.name) > -1) ? classStateDel : ''}`} 
                    key={key} cols={ 1} title={folder.name}>
                        {selectAll ?  <Checkbox
                            checked={selectedIds.indexOf(folder.name) > -1}
                            onChange={handleChange}
                            name={folder.name}
                            color="primary"
                        /> :
                        <List className={`${classes.list} folder-edit-options`}>
                            {/* <ListItem key={1}>
                                <IconButton aria-label={`edit`} onClick={folderRename}>
                                    <EditIcon fontSize="small"/>
                                </IconButton>
                            </ListItem>
                            <ListItem key={2}>
                                <IconButton aria-label={`delete`} >
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </ListItem> */}
                            {folder.type && folder.type != 'folder' ?
                                <ListItem key={3}>
                                    <IconButton aria-label={`download`} href={folder.downloadURL} download={folder.name}>
                                        <CloudDownloadIcon fontSize="small"/>
                                    </IconButton>
                                </ListItem>
                            :
                             ''
                            }
                            
                        </List>}
                        <span className="folder-grid-content">
                        {folder.type && folder.type !== "folder" ?
                            (folder.type.match(/image/g)) ?
                            <a href={folder.downloadURL} download={folder.name}>
                                <img className="asset" src={folder.downloadURL} alt={folder.name} />
                            </a>
                            : 
                            <DescriptionIcon fontSize="large" className="folder-icon"/>
                            
                        : <Link to={folder.path}><FolderRoundedIcon fontSize="large" className="folder-icon"/></Link>
                        }</span>
                        
                        <GridListTileBar className="folder-title-bar" title={
                            <FolderRenameForm folder={folder}/>} actionIcon={
                            <IconButton aria-label={`info about info`} className="folder-info-icon">
                            <InfoIcon />
                            </IconButton>
                        }>
                        </GridListTileBar>
                    </GridListTile>
                    )
                })}
                <GridListTile className={`${classes.gridItem} folder-grid-item`} key={34} cols={ 1} title={'create'}>

                {createFolder ? 
                <Folder /> :
                <IconButton onClick={() => {setUploadFile(false); setCreateFolder(!createFolder)}}>
                    <CreateNewFolderIcon fontSize="large"/>
                </IconButton>}
                {uploadFile ? 
                <MyDropzone/> : 
                <IconButton onClick={() => {setUploadFile(!uploadFile); setCreateFolder(false)}}>
                    <CloudUploadIcon fontSize="large" />
                </IconButton>}
                </GridListTile>
            </GridList>
        </div>
    );
}

const mapStateToProps = (state, props) => {
    console.log(state);
    const location = window.location ;
    const reference = location.pathname !== '/' ? location.pathname.replaceAll('/', '/content/') : location.pathname;
    const referenceList = reference.split("/")
    return {
        currentFolder: getCurrentFolders(state.firebase.data.folders,referenceList),
        folders: state.firebase.data.folders
    }
};

function getCurrentFolders(tree, referenceList) {
    console.log(tree, referenceList)
    let path = referenceList.shift();
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

}

const mapDispatchToProps = (dispatch, state) => {
    console.log(state)
    return ({
    getCurFolder: path => dispatch(getCurrentFolder(path, state)),
    deleteSelectedFolders: (folderIds, path) => dispatch(deleteFolders(folderIds, path))
})}




export default compose(connect(mapStateToProps, mapDispatchToProps), firebaseConnect(['folders']))(FolderView)