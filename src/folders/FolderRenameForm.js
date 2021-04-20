import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import {connect} from 'react-redux';
import {updateFolder} from '../store/reducers'
import { useLocation } from "react-router-dom";

function FolderRenameForm ({ folder, onRenamePressed, currentFolder: {content} }) {
    const location = useLocation();
    const [rename, setRename] = useState(false);
    const [newName, setNewName] = useState(folder.name);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = ({name}) => {        
        const isDataValid = name.trim().length;
        console.log(content)
        const isDuplicateData = content && Object.keys(content).some(folder => folder.name === name);
        if(isDataValid && !isDuplicateData){
            const prevPath = location.pathname === "/" ? "" : location.pathname;
            onRenamePressed(folder.path, `${prevPath}/${name}`, {...folder, name, path: `${prevPath}/${name}`});
        }
        setRename(!rename);
        setNewName('');
    }

    return (
        <>
            {!rename ?
            <div onDoubleClick={() => setRename(!rename)}>{folder.name}</div>
            : <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input defaultValue={newName} {...register("name", { required: true })} />
            
          </form>   
        }
        </>
    )
}

const mapStateToProps = state => {
    return({
    currentFolder: state.firebase.data.folders,
    // folders: state.folders.folders,
})};

const mapDispatchToProps = dispatch =>({onRenamePressed: (oldPath, newPath, newFolder) => dispatch(updateFolder(oldPath, newPath, newFolder))});


export default connect(mapStateToProps, mapDispatchToProps)(FolderRenameForm);