import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import firebase from "firebase";
import { connect } from 'react-redux';
import { createFolder } from '../store/reducers'
import { useLocation } from "react-router-dom";


function MyDropzone( { onCreatePressed } ) {
  const location = useLocation();
  const prevPath = location.pathname === "/" ? "" : location.pathname;
  const [fileList, setFileList] = useState([]);

  const uploadTasks = []
  const onDrop = useCallback(acceptedFiles => {
    setFileList([...fileList,...acceptedFiles])
    acceptedFiles.map(acceptedFile => {
      console.log(acceptedFile.name);
      let task = firebase.storage().ref(prevPath).child(acceptedFile.name).put(acceptedFile)
      task.on('state_changed', function (snapshot) {
        return console.log(Math.round(100 * snapshot.bytesTransferred / snapshot.totalBytes), task);
      }, function (error) {
        return console.log(error, task);
      }, function () {
        removeTask(task);
        console.log(task);
        const { name, contentType, fullPath} = task.snapshot.metadata;
        return handleUploadSuccess({ name, contentType, fullPath });
      });
      uploadTasks.push(task);
    })
  }, [])

  const removeFile = (fileName) => {
    console.log(fileName);
    // setFileList(fileList.filter(acceptedFile => acceptedFile.name !== fildName))
  }

  const handleUploadSuccess = async ({ name, contentType, fullPath }) => {
    const downloadURL = await firebase
      .storage()
      .ref()
      .child(name)
      .getDownloadURL();
    console.log(downloadURL, 'success');
    const updatedName = name.replace(/\.[^/.]+$/, "").replace(/[\(#\$\[\]\)\.\' ']/gm,"");
    // const prevPath = location.pathname === "/" ? "" : location.pathname;
    const ucuploadFile = onCreatePressed({name: updatedName, 
      path: `${prevPath}/${updatedName}`, 
      type: contentType, 
      downloadURL, 
      storageRef: fullPath,
      createdAt: String(new Date())})
      .then((success) =>  console.log(success)).catch((error) => console.log(error));
  };


  function removeTask(task) {
    for (var i = 0; i < uploadTasks.length; i++) {
      if (uploadTasks[i] === task) {
        uploadTasks.splice(i, 1);
        return;
      }
    }
  }
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }

      </div>
    
    {/* {fileList.map(file => {
        return (
        <>
          <p style={divStyle}> {file.name}</p>
          <span style={removeStyle} onClick={removeFile(file.name)}> x </span>
        </>
        )
      })} */}
    </>
    
  )
}


const mapDispatchToProps = dispatch =>({onCreatePressed: folder => dispatch(createFolder(folder))});


export default connect(null, mapDispatchToProps)(MyDropzone);

const divStyle =  {
  clear: 'both',
  display: 'inline-block',
  overflow: 'hidden',
  'white-space': 'nowrap',
  width: '80%',
  'text-overflow': 'ellipsis',
  margin: '2px'
}
const removeStyle = {

}