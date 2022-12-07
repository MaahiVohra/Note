import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import NoteForm from "../../Common/noteform";
import type { Note, NoteData, RawNoteData, Tag } from "../app";
type EditFormProps = {
  onUpdate: (data: RawNoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
  notes: Note[];
};
const Edit: NextPage<EditFormProps> = ({
  onAddTag,
  onUpdate,
  availableTags,
  notes,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const currentNote = notes.find((note) => note.id === id);
  return (
    <>
      <Head>
        <title>Note</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-10">
        <NoteForm
          title={currentNote?.title}
          markdown={currentNote?.markdown}
          tagIds={currentNote?.tagIds}
          onSubmit={(data) => onUpdate(data)}
          onAddTag={onAddTag}
          availableTags={availableTags}
        />
      </main>
    </>
  );
};
export default Edit;
