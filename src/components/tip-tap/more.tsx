import type { Editor } from "@tiptap/react";
import {
  Code,
  FileCode,
  MoreVertical,
  Quote,
  Strikethrough,
  SubscriptIcon,
  SuperscriptIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Toggle } from "../ui/toggle";

export default function More({ editor }: { editor: Editor }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
          <MoreVertical size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-fit">
        <DropdownMenuGroup>
          <Toggle
            pressed={editor.isActive("code")}
            onPressedChange={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().toggleCode()}
            size="sm"
            className="h-8 w-8 p-0"
            title="Code"
          >
            <Code size={16} />
          </Toggle>
          <Toggle
            pressed={editor.isActive("codeBlock")}
            onPressedChange={() =>
              editor.chain().focus().toggleCodeBlock().run()
            }
            disabled={!editor.can().toggleCodeBlock()}
            size="sm"
            className="h-8 w-8 p-0"
            title="Code"
          >
            <FileCode size={16} />
          </Toggle>
          <Toggle
            pressed={editor.isActive("blockquote")}
            onPressedChange={() =>
              editor.chain().focus().toggleBlockquote().run()
            }
            disabled={!editor.can().toggleBlockquote()}
            size="sm"
            className="h-8 w-8 p-0"
            title="Blockquote"
          >
            <Quote size={16} />
          </Toggle>
          <Toggle
            pressed={editor.isActive("strike")}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().toggleStrike()}
            size="sm"
            className="h-8 w-8 p-0"
            title="Strikethrough"
          >
            <Strikethrough size={16} />
          </Toggle>
          <Toggle
            pressed={editor.isActive("superscript")}
            onPressedChange={() =>
              editor.chain().focus().toggleSuperscript().run()
            }
            disabled={!editor.can().toggleSuperscript()}
            size="sm"
            className="h-8 w-8 p-0"
            title="Superscript"
          >
            <SuperscriptIcon size={16} />
          </Toggle>
          <Toggle
            pressed={editor.isActive("subscript")}
            onPressedChange={() =>
              editor.chain().focus().toggleSubscript().run()
            }
            disabled={!editor.can().toggleSubscript()}
            size="sm"
            className="h-8 w-8 p-0"
            title="Subscript"
          >
            <SubscriptIcon size={16} />
          </Toggle>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
