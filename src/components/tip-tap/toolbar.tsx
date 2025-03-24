"use client";
import { Editor } from "@tiptap/react";
import { Alignment } from "./alignment";
import { ColorPickerButton } from "./color-picker";
import { FontFamilyDropdown } from "./font-family";
import { FontSizeDropdown } from "./font-size";
import { FormattingButtons } from "./formatting";
import { HeadingDropdown } from "./headings";
import { HighlighterButton } from "./highlighter";
import { ImageButton } from "./image-button";
import { LinkButton } from "./link";
import More from "./more";
import UndoRedo from "./undo-redo";

export default function TipTapToolBar({ editor }: { editor: Editor }) {
  return (
    <div className="flex items-center px-4 py-2 bg-background border-b border-gray-200 gap-1 flex-wrap overflow-x-auto -mx-6">
      {/* ------------------------------
          1) Font family dropdown
      ------------------------------ */}
      <FontFamilyDropdown editor={editor} />
      {/* ------------------------------
          2) Font size dropdown
      ------------------------------ */}
      <FontSizeDropdown editor={editor} />
      {/* ------------------------------
          3) Heading / Paragraph
      ------------------------------ */}
      <HeadingDropdown editor={editor} />
      {/* ------------------------------
          4) Text alignment
      ------------------------------ */}
      <Alignment editor={editor} />
      {/* ------------------------------
          5) Basic formatting toggles
      ------------------------------ */}
      <FormattingButtons editor={editor} />
      {/* ------------------------------
          6) Document & Link
      ------------------------------ */}
      <LinkButton editor={editor} />
      {/* ------------------------------
          7) Color picker (placeholder)
      ------------------------------ */}
      <ColorPickerButton editor={editor} />
      {/* -----------------------------
          7) Highlighter (placeholder)
      ------------------------------ */}
      <HighlighterButton editor={editor} />
      {/* ------------------------------
          8) Undo / redo
      ------------------------------ */}
      <ImageButton editor={editor} />
      <UndoRedo editor={editor} />
      {/* ------------------------------
          9) More
      ------------------------------ */}
      <More editor={editor} />
    </div>
  );
}
