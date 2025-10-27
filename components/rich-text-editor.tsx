"use client";

import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  content,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: placeholder || "Start writing your amazing content...",
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "focus:outline-none max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  const setLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("bold")
              ? "bg-[#ff751f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("italic")
              ? "bg-[#ff751f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("strike")
              ? "bg-[#ff751f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Strike
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("heading", { level: 1 })
              ? "bg-[#ff751f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("heading", { level: 2 })
              ? "bg-[#ff751f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("heading", { level: 3 })
              ? "bg-[#ff751f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("bulletList")
              ? "bg-[#ff751f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Bullet List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("orderedList")
              ? "bg-[#ff751f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Numbered List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("blockquote")
              ? "bg-[#ff751f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Quote
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("codeBlock")
              ? "bg-[#ff751f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Code Block
        </button>
        <button
          type="button"
          onClick={setLink}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("link")
              ? "bg-[#ff751f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Link
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
          className="px-3 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Unlink
        </button>
      </div>

      <div className="bg-white min-h-60 p-4">
        <EditorContent
          editor={editor}
          className="outline-none ProseMirror text-black 
            [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:my-2
            [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:my-2
            [&_li]:my-1
            [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:my-4
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:my-3
            [&_h3]:text-xl [&_h3]:font-bold [&_h3]:my-2
            [&_p]:my-2
            [&_blockquote]:border-l-4 [&_blockquote]:border-[#ff751f] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4
            [&_pre]:bg-gray-900 [&_pre]:text-white [&_pre]:p-4 [&_pre]:rounded [&_pre]:my-4 [&_pre]:overflow-x-auto
            [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
            [&_a]:text-[#ff751f] [&_a]:underline"
        />
      </div>
    </div>
  );
}