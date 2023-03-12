import CreatableSelect from "react-select/creatable";
import Link from "next/link";
import type { NoteData, RawNoteData, Tag } from "../pages/app";
import { FormEvent, useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
type NoteFormProps = {
  onSubmit: (data: RawNoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

export default function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tagIds = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(
    availableTags.filter((tag) => tagIds.includes(tag.id))
  );
  const [markdownPreview, setMarkdownPreview] = useState(markdown);
  const router = useRouter();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // titleRef and markdownRef will never be null but we should not force non-null assertion
    if (titleRef.current === null || markdownRef.current === null) return;
    onSubmit({
      title: titleRef.current.value,
      markdown: markdownRef.current.value,
      tagIds: selectedTags.map((tag) => tag.id),
    });
    router.push("/");
  };
  return (
    <main className="m-10 grid grid-cols-2">
      <header className="col-span-2 flex justify-between">
        <div className="px-4 sm:px-0">
          <h3 className=" text-3xl font-medium text-gray-900">
            <span>New Note</span>
          </h3>
        </div>
        <nav className=" mb-5 flex justify-end gap-3">
          <button
            onClick={handleSubmit}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
          <Link href=".." className="bg-gray-50 text-right ">
            <button className=" rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-gray-400 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Cancel
            </button>
          </Link>
        </nav>
      </header>
      <form className="col-span-1">
        <div className="w-full shadow sm:overflow-hidden sm:rounded-md">
          <div className=" bg-white px-4 py-5 sm:p-6">
            <div className="grid w-full grid-cols-6 gap-6">
              <div className="col-span-3">
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
                    ref={titleRef}
                    defaultValue={title}
                    required
                    className="block w-full flex-1  rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tags
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <CreatableSelect
                    isMulti
                    name="tags"
                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 shadow-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    classNamePrefix="react-select"
                    value={selectedTags.map((tag) => {
                      return { label: tag.label, value: tag.id };
                    })}
                    onCreateOption={(label) => {
                      const newTag = { id: uuidV4(), label };
                      onAddTag(newTag);
                      setSelectedTags((prev) => [...prev, newTag]);
                    }}
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
              <textarea
                name="markdown"
                rows={19}
                ref={markdownRef}
                required
                onChange={(e) => setMarkdownPreview(e.currentTarget.value)}
                defaultValue={markdown}
                className="col-span-6 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm "
                placeholder="What's on your mind?"
              />
            </div>
          </div>
        </div>
      </form>
      <section className="col-span-1 h-[78vh] overflow-auto p-5">
        <div className="prose  max-w-none lg:prose-xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {markdownPreview}
          </ReactMarkdown>
        </div>
      </section>
    </main>
  );
}
