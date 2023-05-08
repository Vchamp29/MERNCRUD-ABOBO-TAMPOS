import { useState, useEffect } from "react";
import axios from "axios";
import './styles.css'; 

function App() {
  // state 
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
  });
  
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",  
  });

// use effect
useEffect(() => {
    fetchNotes(); 
}, []); 

//functions
const fetchNotes = async () => {

  // fetch the notes
  const res = await axios.get("http://localhost:3000/notes");
  // set to state
  setNotes(res.data.notes);
};

const updateCreateFormField = (e) =>{
  const { name, value } = e.target;

  setCreateForm({
    ...createForm,
    [name]: value,
  });
};

const createNote = async (e) => {
  e.preventDefault();

  // create the note
  const res = await axios.post("http://localhost:3000/notes", createForm);

  //update state
  setNotes([...notes, res.data.note]);

  // clear form state
  setCreateForm({title: ""});
};

const deleteNote = async (_id) => {
  // delete the note 
  const res = await axios.delete(`http://localhost:3000/notes/${_id}`)

  // update state
  const newNotes = [...notes].filter(note => {
    return note._id !== _id;
  }); 

  setNotes(newNotes);
};

const handleUpdateFieldChange = (e) => {
  const {value, name} = e.target

  setUpdateForm({
    ...updateForm,
    [name]: value,
  });
};



const toggleUpdate = (note) => {
  // set state on update form
  setUpdateForm({
    title: note.title, _id: note._id
  });
};

const updateNote = async (e) => {
  e.preventDefault();
  const { title, body } = updateForm;

  // send the update request
  const res = await axios.put(`http://localhost:3000/notes/${updateForm._id}`, 
  { title }
  );

  //update state 
  const newNotes = [...notes];
  const noteIndex = notes.findIndex(note => {
    return note._id === updateForm._id;
  });
  newNotes[noteIndex] = res.data.note;

  setNotes(newNotes);

  // clear update form state
  setUpdateForm({
    _id:null,
    title: "",
  })
}

return <div id="app" className="App">
  <div>
    <div id="taskTop">
      <br/>
      <h1 id="tasktext">TASK LIST</h1>
      <br />
    </div>
    {notes && notes.map(note => {
      return (
        <div key={note._id} id="task">
          <br/>
          <div id="activetaskdiv">
            <br/>
          <h2>{note.title}</h2>
          <h5>Options:</h5>
          <button onClick={() => deleteNote(note._id)}>
            Delete task
          </button>
            <button onClick={() => toggleUpdate(note)}>
              Update task
            </button>
            <br/>
            <br/>
            </div>
            <br/>
        </div>
      );
    })}
  </div>

  {updateForm._id && (
  <div className="First" id="updatetaskdiv">
    <br/>
    <h1 id="updatetask">UPDATE TASK</h1>
    <form onSubmit={updateNote}>
      <input 
        onChange={handleUpdateFieldChange} 
        value={updateForm.title} 
        name="title"
      />
      <br/>
      <button type="submit" id="updatebutton">Update task</button>
    </form>
  </div>
  )}  
  {! updateForm._id && ( 
  <div id="addtaskdiv">
    <br/>
    <h1 id="addtasktext">ADD TASK</h1>
    <form onSubmit={createNote}>
      <input 
        placeholder="Enter task here:"
        onChange={updateCreateFormField} 
        value={createForm.title} 
        name="title"
      />  
      <br />
      <button type="submit" id="addtaskbutton">Create task</button>
      <br />
    </form>
  </div>)}

</div>

}

export default App;
