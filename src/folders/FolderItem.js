import react from 'react';
import '../style/FolderItem.css'
import { GridListTile, GridListTileBar, IconButton } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import FolderRoundedIcon from '@material-ui/icons/FolderRounded';


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
      width: 500,
      height: 450,
    },
  }),
);
  
function FolderItem ({ folder, cName }) {
    const classes = useStyles();
    console.log(cName);

    return (
        <GridListTile className={cName.gridListTitle} key={34} cols={ 1} title={folder.name}>
            <List className="folder-edit-options">
                <ListItem key={1}>
                    <IconButton aria-label={`edit`} >
                        <EditIcon fontSize="small"/>
                    </IconButton>
                </ListItem>
                <ListItem key={2}>
                    <IconButton aria-label={`delete`} >
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                </ListItem>
                <ListItem key={3}>
                    <IconButton aria-label={`download`} >
                        <CloudDownloadIcon fontSize="small"/>
                    </IconButton>
                </ListItem>
            </List>
            <FolderRoundedIcon fontSize="large" className="folder-icon"/>
            <GridListTileBar className={cName.gridListTitleBar} title={folder.name} actionIcon={
                <IconButton aria-label={`info about info`} className={cName}>
                <InfoIcon />
                </IconButton>
            }>
            </GridListTileBar>
        </GridListTile>
    )
}


export default FolderItem;