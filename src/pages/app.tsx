import { type AppType } from "next/dist/shared/lib/utils";
import useLocalStorage from "../Common/useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
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
      <ThemeProvider enableColorScheme={false} enableSystem={false}>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="title" content="Note - A notes taking app" />
          <meta
            name="description"
            content="Organize your thoughts and ideas with ease using our intuitive notes taking app"
          />

          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://note-gamma-azure.vercel.app/"
          />
          <meta property="og:title" content="Note - A notes taking app" />
          <meta
            property="og:description"
            content="Organize your thoughts and ideas with ease using our intuitive notes taking app."
          />
          <meta property="og:image" content="image-main.jpg" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://note-gamma-azure.vercel.app/"
          />
          <meta property="twitter:title" content="Note - A notes taking app" />
          <meta
            property="twitter:description"
            content="Organize your thoughts and ideas with ease using our intuitive notes taking app."
          />
          <meta property="twitter:image" content="image-main.jpg" />
          <link rel="icon" href="favicon.ico" />
        </Head>
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
      </ThemeProvider>
    );
  }
};

export default MyApp;
