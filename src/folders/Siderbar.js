import React from 'react';
import { useState, useReducer, useEffect } from 'react';
import { connect } from 'react-redux'
import { Menu } from'antd'
import { FolderOutlined } from '@ant-design/icons';
import {
    Link
  } from "react-router-dom";
// import { getAllFolders } from '../reducers';
import FolderItemList from './FolderItemList';
const { SubMenu } = Menu;


function Siderbar ({ folders = [] }) {

    return (
        <>
            {/* <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}> */}
                <FolderItemList folderList = {folders} />
            {/* </Menu> */}
        </>
    );
}


const mapStateToProps = state => ({
    folders: state.firebase.data.folders.content
})

// const mapDispatchToProps = dispatch => ({
//     loadAllFolders: id => dispatch(getAllFolders())
// })

export default connect(mapStateToProps)(Siderbar);
