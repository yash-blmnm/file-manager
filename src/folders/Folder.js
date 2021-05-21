import React from 'react';
import { useState, useEffect } from 'react';
import { Input, Form } from 'antd';
import { connect } from 'react-redux';
// import { getCurrentFolder } from '../actions';
import { useLocation } from "react-router-dom";
import { createFolder } from './../store/reducers';
import { config } from '../fconfig';


function Folder({ currentFolder : {content} , onCreatePressed }) {
    const [form] = Form.useForm();
    const location = useLocation();
    const[name, setName] = useState('');
    const createNewFolder = () => {
        const isDataValid = name.trim().length;
        const isDuplicateData = content && Object.keys(content).some(folder => folder.name === name);
        if(isDataValid && !isDuplicateData){
            const prevPath = location.pathname === "/" ? "" : location.pathname;
            onCreatePressed({name, path: `${prevPath}/${name}`, content: [], createdAt: String(new Date()), type: 'folder'});
            setName('');
            form.resetFields();
        }
        
    }


    return (
        <div className="App">
            <Form form={form} name="basic" onFinish={(createNewFolder)} initialValues={{name : name}}>
                <Form.Item 
                    name="name" 
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    rules={[{ required: true, message: 'Please input your file name!' }]}>
                    <Input />
                </Form.Item>
            </Form>
        </div>
    );
}

const mapStateToProps = state => {
    console.log(state);
    return({
    currentFolder: state.firebase.data.folders,
})};

const mapDispatchToProps = dispatch =>({onCreatePressed: folder => dispatch(createFolder(folder))});

export default connect(mapStateToProps, mapDispatchToProps)(Folder);
