import {} from "electron";
import * as React from "react";
import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { format } from "date-fns";
import { sortBy } from "lodash";

import { NotesService, Note } from "../shared/NotesService";
import "./fonts.css";

const { remote } = window.require("electron");

const remoteNotes = remote.getGlobal("notes") as NotesService;

const Global = createGlobalStyle`
  :root {
    --black: #212121;
    --dark: #323232;
    --color: #0d7377;
    --light: #14ffec;
  }

  body {
    background-color: var(--black);
    font-size: 16px;
    color: white;
    font-family: Montserrat;
    line-height: 1.2;
  }

  h1, h2, h3, h4 {
    line-height: 1.4;
  }

  input, label {
    color: inherit;
    font-size: inherit;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
  }
`;

const Root = styled.div`
  padding: 1rem;
`;

const NotePreview = styled.div`
  margin-bottom: 1rem;

  ul {
    list-style-position: inside;
  }

  input[type="checkbox"] {
    margin-left: 0 !important;
  }
`;

const NoteDate = styled.div`
  margin-bottom: 0.25rem;
  font-style: italic;
  color: var(--color);
`;

function NoteContent({ children }: { children: string }) {
  return <div>{children}</div>;
}

function useNotes() {
  const [notes, setNotes] = React.useState<Note[]>([]);

  React.useEffect(() => {
    remoteNotes
      .loadAll()
      .then((newNotes) => setNotes(sortBy(newNotes, "createdAt")));
  }, [setNotes]);

  return notes;
}

function Editor() {
  return <input placeholder="New note" />;
}

export default function App() {
  const notes = useNotes();

  return (
    <>
      <Global />
      <Root>
        <Editor />
        {notes.map((note) => (
          <NotePreview key={note.id}>
            <NoteDate>
              {format(new Date(note.createdAt), "MM/dd/yyyy")}
            </NoteDate>
            <NoteContent>{note.content}</NoteContent>
          </NotePreview>
        ))}
      </Root>
    </>
  );
}
