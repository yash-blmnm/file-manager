import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { useFirebaseConnect } from 'react-redux-firebase'


// const todosPath = 'folders'

export default function Todos() {
    useFirebaseConnect([
        { path: 'folders' }
      ])
//   const firebase = useFirebase()
  const todos = useSelector(state => state.firebase.ordered.folders)

  return (
    <div>
      <h1>Todos</h1>
      <div>
        {/* {JSON.stringify(todos, null, 2)} */}
      </div>
      {/* <button onClick={() => firebase.watchEvent('value', todosPath)}>
        Load Todos
      </button> */}
    </div>
  )
}