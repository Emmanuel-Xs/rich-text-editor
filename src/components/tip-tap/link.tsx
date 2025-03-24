"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import type { Editor } from "@tiptap/react";
import { Link } from "lucide-react";
import { useState } from "react";

export function LinkButton({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const [linkUrl, setLinkUrl] = useState<string>("");
  const [openNewTab, setOpenNewTab] = useState<boolean>(false);

  const setLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl, target: openNewTab ? "_blank" : null })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Toggle
          pressed={editor.isActive("link")}
          disabled={!editor.can().extendMarkRange("link")}
          size="sm"
          className="h-8 w-8 p-0"
        >
          <Link size={16} />
        </Toggle>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Enter URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={setLink}>Set Link</Button>
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="openInNewTab" className="text-sm">
              Open in new tab
            </label>
            <input
              type="checkbox"
              id="openInNewTab"
              checked={openNewTab}
              onChange={(e) => setOpenNewTab(e.target.checked)}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
