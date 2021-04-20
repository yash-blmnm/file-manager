import React, { useState, useEffect } from 'react';
import {
  useLocation,
  Link
} from "react-router-dom";
import { Breadcrumb } from 'antd';



function BreadCrumbComp () {


    const location = useLocation();
    const [bcArray, setbcArray] = useState({});

    const extractBreadCrumb = (pathnames) => {
        let pathHash = {}
        for(let i = 0; i<pathnames.length; i++){
            let val = pathnames[i].length ? pathnames[i] : 'root'
            pathHash[val] = val.length ? pathnames.slice(0, i+1).join('/') : '/';
        }
        return pathHash;
    }

    useEffect(() => {
        setbcArray(extractBreadCrumb(location.pathname.split('/')))
    }, [location.pathname]);

    console.log(bcArray);


    return (
        <Breadcrumb style={{ margin: '16px 20px' }}>
            {Object.keys(bcArray).map(name => {
            //   let [name, path] = breadCrumb
              return <Breadcrumb.Item><Link to={bcArray[name]}>{name}</Link></Breadcrumb.Item>
            })}
          </Breadcrumb>
    )
}


export default BreadCrumbComp;