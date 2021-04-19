import { Menu } from'antd'
import { FolderOutlined } from '@ant-design/icons';
import {
    Link
  } from "react-router-dom";
import 'antd/dist/antd.css';

const { SubMenu } = Menu;



function FolderItemList ({folderList = {}, keyVal}) {
    return (
        Object.keys(folderList).map((keyName) => {
        // folderList && folderList.map((folder, id) => {
            const folder = folderList[keyName];
            return((folder.content && folder.content.length) ? 
            <SubMenu key={`sub${keyName}`} icon={<FolderOutlined />} title={<Link to={folder.path}>{folder.name}</Link>}>
                <FolderItemList folderList ={folder.content} keyVal={keyVal+ 1} />
            </SubMenu>
            : 
            <Menu.Item key={keyName} icon={<FolderOutlined />}>
                <Link to={folder.path}>{folder.name}</Link>
            </Menu.Item>)
        })
    )
            
}   

export default FolderItemList;


// folders.content && folders.content.map((folder) => {
//     return(
//         <Menu.Item key={folder.id} icon={<FolderOutlined />}>
//             <Link key={folder.id} to={folder.path}>{folder.name}</Link>
//         </Menu.Item>
//     )}
// )