import React, {useState} from "react";
import { Link } from "react-router-dom";
import User from "../services/User";
import server from "../services/Server"

import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const Note = ({ note }) => {
  const date = new Date(note.date).toDateString();
  const time = new Date(note.date).toLocaleTimeString();

  const [showModal, setShowModal] = useState(false);

  const user = User.getCurrentUser();
  const username = user.username;

  const deleteNote = (id) => {
    server
      .delete(`/${username}/remove/${id}`)
      .then(() => {
        window.location.reload();
      })
  };

  return (
    <div className="card has-background-warning">
      <div className="card-content m-2 has-background-warning-light has-text-dark">
        <div id="note" className="content">
          <p className="title is-4">{note.title}</p>
          <hr/>
          <p className="subtitle is-6">{date} <br/> {time}</p>
        </div>
      </div>

      <footer className="card-footer">
        <a className="card-footer-item has-text-primary-dark" onClick={e => {
          e.preventDefault();
          setShowModal(true);
        }}>
          <span className="icon is-small mx-2">
            <i className="fas fa-eye"></i>
          </span>
          Preview
        </a>
        <Link to={`/${username}/edit/${note._id}`} className="card-footer-item has-text-primary-dark">
          <span className="icon is-small mx-2">
            <i className="fas fa-pen"></i>
          </span>
          Edit
        </Link>
        <a className="card-footer-item has-text-primary-dark" onClick={e => {
          e.preventDefault();
          deleteNote(note._id);
        }}>
          <span className="icon is-small mx-2">
            <i className="fas fa-trash"></i>
          </span>
          Delete
        </a>
      </footer>

      <div className={`modal ${showModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head has-background-warning">
            <p className="modal-card-title has-text-warning-dark">
              {note.title}
            </p>
            <button className="delete" aria-label="close" onClick={e => {
              e.preventDefault();
              setShowModal(false);
            }}>
            </button>
          </header>

          <section className="modal-card-body has-background-warning-light">
            <ReactMde
              value={note.content}
              selectedTab={"preview"}
              readOnly
              toolbarCommands={[]}
              generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
              }
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Note;