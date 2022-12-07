// import { type AppType } from "next/dist/shared/lib/utils";
// import useLocalStorage from "../Common/useLocalStorage";
// import { v4 as uuidV4 } from "uuid";
import "../styles/globals.css";

// export type RawNote = {
//   id: string;
// };
// export type RawNoteData = {
//   title: string;
//   markdown: string;
//   tagIds: string[];
// };

// export type Note = {
//   id: string;
// } & NoteData;

// export type NoteData = {
//   title: string;
//   markdown: string;
//   tags: Tag[];
// };

// export type Tag = {
//   id: string;
//   label: string;
// };
import dynamic from "next/dynamic";
const App = dynamic(() => import("./app"), { ssr: false });
export default App;
// const MyApp: AppType = ({ Component, pageProps }) => {
//   {
//     const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
//     const [tags, setTags] = useLocalStorage<RawNote[]>("TAGS", []);
//     function onCreateNote(data: NoteData) {
//       setNotes((prevNotes) => {
//         return [
//           ...prevNotes,
//           { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
//         ];
//       });
//     }
//     function addTag(newTag: Tag) {
//       setTags((prev) => [...prev, newTag]);
//     }
//     return (
//       <Component
//         {...pageProps}
//         onSubmit={onCreateNote}
//         onAddTag={addTag}
//         availableTags={tags}
//         notes={notes}
//         suppressHydrationWarning
//       />
//     );
//   }
// };

// export default MyApp;
