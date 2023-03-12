import { useRouter } from "next/router";
import type { Note, Tag } from ".././app";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Head from "next/head";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
  onDeleteNote: () => void;
};
const NotePage = ({ notes, onDeleteNote }: NoteListProps) => {
  const router = useRouter();
  const { id } = router.query;
  const currentNote = notes.find((note) => {
    return note.id === id;
  });
  if (!currentNote) return null;
  return (
    <>
      <Head>
        <title>{currentNote.title}</title>
      </Head>
      <header className="m-10 flex justify-between">
        <h1 className="self-center text-3xl font-medium leading-6 text-gray-900">
          {currentNote.title}
        </h1>
        <nav>
          <Link href={`/edit/${id}`}>
            <button className="mr-2 inline-flex justify-center rounded-md border border-transparent  bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
              Edit
            </button>
          </Link>
          <Link onClick={onDeleteNote} href={`/`}>
            <button className="  justify-center rounded-md border border-red-500 py-2 px-4 text-sm font-medium text-red-500 shadow-sm hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
              Delete
            </button>
          </Link>
          <Link href={`..`}>
            <button className=" ml-2 rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Back
            </button>
          </Link>
        </nav>
      </header>
      <div className="prose m-10 max-w-none lg:prose-xl">
        <ReactMarkdown>{currentNote.markdown}</ReactMarkdown>
      </div>
    </>
  );
};

export default NotePage;
