import React, { useState } from 'react'
import "react-quill/dist/quill.snow.css";
import Editor from './Editor';
import { Navigate } from "react-router-dom";


export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [redirect, setRedirect] = useState(false);
  
  async function createNewPost(ev) {
    if(!files){
      alert("Please select a file");
    }else {
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("content", content);
      data.set("image", image);
      data.set("category", type);
      data.set("file", files[0]);
      ev.preventDefault();
      const response = await fetch("http://localhost:4000/post", {
        method: "POST",
        body: data,
        credentials: "include",
      });
      if (response.ok) {
        setRedirect(true);
      }
    }
    
   }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

 
  return (
    <form onSubmit={createNewPost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input
        type="text"
        placeholder={"Image URL"}
        value={image}
        onChange={(ev) => setImage(ev.target.value)}
      />
      <input
        type="text"
        placeholder={"Category"}
        value={type}
        onChange={(ev) => setType(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>
        Create post
      </button>
    </form>
  );
}