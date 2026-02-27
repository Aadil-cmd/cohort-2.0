import React,{ useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
const App = () => {

  const [notes, setNotes] = useState([
    {
      title:"test title 1",
      description:"test description"
    },
    {
      title:"test title 2",
      description:"test description"
    },
    {
      title:"test title 3",
      description:"test description"
    },
    {
      title:"test title 4",
      description:"test description"
    }
  ])
   
   function fetchNotes(){
    axios.get("http://localhost:3000/api/notes")
    .then((res)=>{
      setNotes(res.data.note)
    })
   }

   useEffect(function(){
     fetchNotes()
   },[])

   function submitHandler(e){
     e.preventDefault()

     const { title, description } = e.target.elements
     console.log(title.value,description.value)

     axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value
     })
     .then((res)=>{
      fetchNotes()
     })
   }

   function deleteHandler(noteId){
    axios.delete("http://localhost:3000/api/notes/"+noteId)
    .then((res)=>{
      console.log(res.data)
      fetchNotes()
    })
   }

   function updateNote(noteId){
    axios.patch("http://localhost:3000/api/notes/"+noteId,{
      description:"Modified Description"
    })
    .then((res)=>{
      fetchNotes()
    })
   }

  return (
      <>
      <form className='create-note-form' onSubmit={submitHandler}>
        <input name='title' type="text" placeholder='Enter title'/>
        <input name='description' type="text" placeholder='Enter description'/>
        <button>Create Note</button>
      </form>
      <div className="notes">
        {
        notes.map(note=>{
         return <div className="note">
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <button onClick={()=>(deleteHandler(note._id))}>delete</button>
          <button onClick={()=>{updateNote(note._id)}}>update</button>
        </div>
        })
        }
      </div>  
      </>    
  )
}

export default App
