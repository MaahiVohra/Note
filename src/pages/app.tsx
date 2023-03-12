import { type AppType } from "next/dist/shared/lib/utils";
import useLocalStorage from "../Common/useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import { useRouter } from "next/router";
import { useEffect } from "react";

export type RawNote = {
  id: string;
};
export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type Tag = {
  id: string;
  label: string;
};

const MyApp: AppType = ({ Component, pageProps }) => {
  {
    const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
    const [tags, setTags] = useLocalStorage<RawNote[]>("TAGS", []);
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
      if (
        !notes.find((s) => s.id === id) &&
        router.pathname !== "/" &&
        router.pathname !== "/new"
      ) {
        router.push("/");
      }
    }, []);

    function onCreateNote(data: RawNoteData) {
      setNotes((prevNotes) => {
        return [...prevNotes, { ...data, id: uuidV4() }];
      });
    }
    function onUpdateNote({ ...data }: RawNoteData) {
      setNotes((prevNotes) => {
        return prevNotes.map((note) => {
          if (note.id === id) {
            console.log("success");
            return {
              ...note,
              ...data,
            };
          } else return note;
        });
      });
    }
    function onDeleteNote() {
      setNotes((prevNotes) => {
        return prevNotes.filter((note) => note.id !== id);
      });
    }
    function addTag(newTag: Tag) {
      setTags((prev) => [...prev, newTag]);
    }
    return (
      <Component
        {...pageProps}
        onSubmit={onCreateNote}
        onDeleteNote={onDeleteNote}
        onAddTag={addTag}
        onUpdate={onUpdateNote}
        availableTags={tags}
        notes={notes}
        suppressHydrationWarning
      />
    );
  }
};

export default MyApp;
