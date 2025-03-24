"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Editor } from "@tiptap/react";
import {
  CheckSquare,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  SquareCheckBig,
} from "lucide-react";
import { useCallback } from "react";

export function HeadingDropdown({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const currentHeading = useCallback(() => {
    if (editor.isActive("heading", { level: 1 })) return <Heading1 size={16} />;
    if (editor.isActive("heading", { level: 2 })) return <Heading2 size={16} />;
    if (editor.isActive("heading", { level: 3 })) return <Heading3 size={16} />;
    if (editor.isActive("taskList")) return <CheckSquare size={16} />;
    if (editor.isActive("bulletList")) return <List size={16} />;
    if (editor.isActive("orderedList")) return <ListOrdered size={16} />;
    if (editor.isActive("paragraph")) return <span className="pr-2">¶</span>;
    // fallback if none are active
    return <span className="pr-2">¶</span>;
  }, [editor]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 px-2 bg-accent text-accent-foreground"
        >
          <span className="font-bold">{currentHeading()}</span>
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>HIERARCHY</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => editor?.chain().focus().setParagraph().run()}
            disabled={!editor?.can().setParagraph()}
            className={editor?.isActive("paragraph") ? "bg-accent" : ""}
          >
            <span className="pr-2">¶</span> Paragraph
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
            disabled={!editor?.can().toggleHeading({ level: 1 })}
            className={
              editor?.isActive("heading", { level: 1 }) ? "bg-accent" : ""
            }
          >
            <span className="pr-2">H₁</span> Heading 1
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            disabled={!editor?.can().toggleHeading({ level: 2 })}
            className={
              editor?.isActive("heading", { level: 2 }) ? "bg-accent" : ""
            }
          >
            <span className="pr-2">H₂</span> Heading 2
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
            disabled={!editor?.can().toggleHeading({ level: 3 })}
            className={
              editor?.isActive("heading", { level: 3 }) ? "bg-accent" : ""
            }
          >
            <span className="pr-2">H₃</span> Heading 3
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>LISTS</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            disabled={!editor?.can().toggleBulletList()}
            className={editor?.isActive("bulletList") ? "bg-accent" : ""}
          >
            <List size={16} className="mr-2" /> Bullet list
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            disabled={!editor?.can().toggleOrderedList()}
            className={editor?.isActive("orderedList") ? "bg-accent" : ""}
          >
            <ListOrdered size={16} className="mr-2" /> Numbered list
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="">
              <SquareCheckBig size={16} className="mr-2" />
              Task List
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => editor?.chain().focus().toggleTaskList().run()}
                >
                  Toggle Task List
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    editor?.chain().focus().splitListItem("taskItem").run()
                  }
                  disabled={!editor?.can().splitListItem("taskItem")}
                >
                  Split List Item
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    editor?.chain().focus().sinkListItem("taskItem").run()
                  }
                  disabled={!editor?.can().sinkListItem("taskItem")}
                >
                  Sink List Item
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    editor?.chain().focus().liftListItem("taskItem").run()
                  }
                  disabled={!editor?.can().liftListItem("taskItem")}
                >
                  Lift List Item
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
