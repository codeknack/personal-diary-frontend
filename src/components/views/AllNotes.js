import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Note from "../Note";
import User from "../../services/User";
import server from "../../services/Server";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState(false);

  const user = User.getCurrentUser();
  const username = user.username;

  useEffect(() => {
    server
      .get(`/${username}/notes`)
      .then(response => {
        setNotes(response.data);
        if (!response.data.length) {
          setMessage(true);
        }
      })
  }, [username]);

  return (
    <div className="container mt-3">
      <h1 className="title">All Notes</h1>
      <Link to={`/${username}/add`} className="navbar-item">
        <span className="icon is-small mr-1">
          <i className="fas fa-file-medical"></i>
        </span>
        Add Note
      </Link>

      {notes.length > 0 && (
        <div className="box has-background-info-dark">
          <div className="columns is-multiline">
            { notes.map( function(note) { 
                return (  
                  <div className="column is-one-third" key={note._id}>
                    <Note note={note} />
                  </div>
                )         
              })
            }
          </div>
        </div>
      )}

      {message && (
        <div className="notification is-info is-light">
          <p>Your personal diary doesn't contain any notes yet. To create new note click Add Note button.</p>
        </div>
      )}
      
    </div>
  );
};

export default AllNotes;