import React, { useEffect, useState } from "react";
import User from "../../services/User";
import server from "../../services/Server";

import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const EditNote = ({ match, history }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTab, setSelectedTab] = useState("write");

  const user = User.getCurrentUser();
  const username = user.username;
  const id = match.params.id;

  useEffect(() => {
    server
      .get(`/${username}/note/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
  },[username, id]);

  const editNote = () => {
    const data = {
      title,
      content
    }

    server
      .put(`/${username}/edit/${id}`, data)
      .then(() => {
        history.push(`/${username}/notes`);
      });
  };

  return (
    <div className="container mt-3">
      <h1 className="title">Edit Note</h1>

      <div className="box mt-3">
        <form onSubmit={e => {
          e.preventDefault();
          editNote();
        }}>

          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Content</label>
            <div className="control">
              <ReactMde
              value={content}
              onChange={setContent}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
              }
            />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-link">Save</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditNote;