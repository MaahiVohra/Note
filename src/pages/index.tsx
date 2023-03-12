import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import Select from "react-select";
import type { Note, Tag } from "./app";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
};

type SimplifiedNote = {
  tagIds: string[];
  title: string;
  id: string;
  availableTags: Tag[];
};

const Home: NextPage<NoteListProps> = ({
  availableTags,
  notes,
}: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const filteredNotes = useMemo<Note[]>(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tagIds.some((notetag) => notetag === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);
  return (
    <>
      <Head>
        <title>Note | Home</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
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

        <meta property="twitter:card" content="image-main.jpg" />
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
      <header className="mx-10 mt-10 flex justify-between md:col-span-1">
        <div className=" px-4 sm:px-0">
          <h3 className=" flex items-center text-3xl font-medium text-gray-900">
            <img src="favicon-32x32.png" alt="N" className="inline-block" />
            <span className="font-cursive">ote</span>
          </h3>
        </div>
        <nav className="">
          <Link href="/new" className="bg-gray-50 text-right ">
            <button className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Create
            </button>
          </Link>
        </nav>
      </header>
      <div className="md:col-span-2">
        <div className="shadow  sm:rounded-md">
          <div className=" space-y-6 bg-white p-10">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="block w-full flex-1  rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tags
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <Select
                    isMulti
                    name="tags"
                    className=" block w-full flex-1 rounded-none rounded-r-md border-gray-300 shadow-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    classNamePrefix="react-select"
                    value={selectedTags.map((tag) => {
                      return { label: tag.label, value: tag.id };
                    })}
                    options={availableTags.map((tag) => {
                      return { label: tag.label, value: tag.id };
                    })}
                    onChange={(tags) =>
                      setSelectedTags(
                        tags.map((tag) => {
                          return { label: tag.label, id: tag.value };
                        })
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-10 grid sm:grid-cols-2 lg:grid-cols-4">
        {filteredNotes.map((note) => (
          <Link href={`/note/${note.id}`} key={note.id}>
            <NoteCard
              id={note.id}
              title={note.title}
              tagIds={note.tagIds}
              availableTags={availableTags}
            />
          </Link>
        ))}
      </div>
    </>
  );
};
function NoteCard({ title, tagIds, availableTags }: SimplifiedNote) {
  const filteredTags = availableTags.filter((tag) => tagIds.includes(tag.id));
  return (
    <div className="m-3 h-48 max-h-52 max-w-sm overflow-hidden rounded shadow-lg">
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{title}</div>
      </div>
      <div className="px-6 pt-4 pb-2">
        {filteredTags.map((tag) => (
          <span
            className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
            key={tag.id}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}
export default Home;
