import { type NextPage } from "next";
import Head from "next/head";
import NoteForm from "../Common/noteform";
import type { RawNoteData, Tag } from "./app";
type NoteFormProps = {
  onSubmit: (data: RawNoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};
const New: NextPage<NoteFormProps> = ({
  onSubmit,
  onAddTag,
  availableTags,
}) => {
  return (
    <>
      <Head>
        <title>Note</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-10">
        <NoteForm
          onSubmit={onSubmit}
          onAddTag={onAddTag}
          availableTags={availableTags}
        />
      </main>
    </>
  );
};

export default New;
