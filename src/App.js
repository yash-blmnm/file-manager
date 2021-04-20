import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Link
} from "react-router-dom";
import FolderView from './folders/FolderView'
import Siderbar from './folders/Siderbar'
import RecursiveTreeView from './folders/FolderTree'
// import Grid from '@material-ui/core/Grid';
import { Layout, Menu, Breadcrumb } from 'antd';
import './App.css'
import { getAllFolders } from './store/reducers';
import { connect} from 'react-redux';
import { useState, useEffect } from 'react';
// import { isLoaded } from "react-redux-firebase";
// import { getTodos } from "./redux/selectors";
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux';
import BreadCrumbComp from './folders/BreadCrumbComp';
const { Header, Content, Footer, Sider } = Layout;

function App({ isLoaded }) {

  // Show message while folders are loading
  if (!isLoaded) {
    return <div>Loading...</div>
  }
  return (
    <Router>
      <Route path="/">
        <Layout>
          <Sider style={{width: 'auto', maxWidth: 'none', flex: 'none'}} breakpoint="lg" collapsedWidth="0" onBreakpoint={broken => {console.log(broken);}} onCollapse={(collapsed, type) => { console.log(collapsed, type); }}>
            <RecursiveTreeView />
          </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: '0 20px', color: '#fff', textAlign: 'center', verticalAlign: 'middle' }} title={'My Directory'}>
            <h2 style={{color: '#fff'}}>My Directory</h2>
          </Header>
          <BreadCrumbComp />
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Switch>
                <Route exact path="/" >
                  <FolderView/>
                </Route>
                <Route path="/:id" >
                  <FolderView/>
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
      </Layout>,
      </Route>
    </Router>
    
  );
}

const enhance = compose(
  firebaseConnect((props) => [
    { path: 'folders' }
  ]),
  connect((state) => {
    let folders = state.firebase.data.folders;
    return ({...state, folders: {...state.folders, folders : state.firebase.data.folders}, isLoaded: isLoaded(folders)})
  }))

export default enhance(App)
