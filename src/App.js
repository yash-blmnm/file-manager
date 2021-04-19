import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import FolderView from './folders/FolderView'
import Siderbar from './folders/Siderbar'
// import Grid from '@material-ui/core/Grid';
import { Layout, Menu } from 'antd';
import './App.css'
import { getAllFolders } from './store/reducers';
import { connect} from 'react-redux';
import { useEffect } from 'react';
// import { isLoaded } from "react-redux-firebase";
// import { getTodos } from "./redux/selectors";
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux';
const { Header, Content, Footer, Sider } = Layout;

function App({ isLoaded }) {

  

  // Show message while todos are loading
  if (!isLoaded) {
    return <div>Loading...</div>
  }
  return (
    <Router>
      <Route path="/">
        {/* <Grid container direction="row" justify="flex-start" alignItems="flex-start">
          <FolderView parent={{id: 0, pathRef:"", content: [], name: "home"}}/>
        </Grid> */}
        <Layout>
          <Sider breakpoint="lg" collapsedWidth="0" onBreakpoint={broken => {console.log(broken);}} onCollapse={(collapsed, type) => { console.log(collapsed, type); }}>
            <Siderbar />
          </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Switch>
                <Route exact path="/" >
                  <FolderView/>
                </Route>
                <Route exact path="/:id" >
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

// const mapStateToProps = state => ({isLoaded: state.folders.isLoaded})


// const mapDispatchToProps = dispatch => ({
//   loadAllFolders: () => dispatch(getAllFolders())
// })

// export default connect(mapStateToProps, mapDispatchToProps)(App);
// // export default App;

const enhance = compose(
  firebaseConnect((props) => [
    { path: 'folders' }
  ]),
  connect((state) => {
    let folders = state.firebase.data.folders;
    return ({...state, folders: {...state.folders, folders : state.firebase.data.folders}, isLoaded: isLoaded(folders)})
  }))

export default enhance(App)
