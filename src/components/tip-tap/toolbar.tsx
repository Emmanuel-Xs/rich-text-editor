"use client";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import { ActionButton } from "./action-button";
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
import { VideoButton } from "./video-button";

export default function TipTapToolBar({
  editor,
  className,
}: {
  editor: Editor;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center px-4 py-2 bg-background border-b border-gray-200 gap-1 flex-wrap justify-center",
        className
      )}
    >
      <FontFamilyDropdown editor={editor} />
      <FontSizeDropdown editor={editor} />
      <HeadingDropdown editor={editor} />
      <Alignment editor={editor} />
      <FormattingButtons editor={editor} />
      <LinkButton editor={editor} />
      <ColorPickerButton editor={editor} />
      <HighlighterButton editor={editor} />
      <ImageButton editor={editor} />
      <VideoButton editor={editor} />
      <ActionButton editor={editor} />
      <UndoRedo editor={editor} />
      <More editor={editor} />
    </div>
  );
}
