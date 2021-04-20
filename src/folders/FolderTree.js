import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";


const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
    color: '#fff'
  },
  item: {
    overflow: 'hidden',
    'white-space': 'nowrap',
    // width: '80%',
    'text-overflow': 'ellipsis',
  }
});

function RecursiveTreeView( { folders } ) {
  const classes = useStyles();

  const renderTree = (nodes) => (
    <TreeItem key={nodes.name} nodeId={nodes.name} label={nodes.name} className={classes.item}>
      {nodes.content && Array.isArray(Object.values(nodes.content)) ? Object.values(nodes.content).map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(folders)}
    </TreeView>
  );
}


const mapStateToProps = state => ({
    folders: state.firebase.data.folders
})


export default connect(mapStateToProps)(RecursiveTreeView);
