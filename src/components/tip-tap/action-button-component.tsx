"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";

const ActionButtonComponent = ({ node, editor, getPos }: NodeViewProps) => {
  const {
    href,
    text,
    display,
    width,
    textColor,
    backgroundColor,
    borderStyle,
    borderWidth,
    borderColor,
    borderRadius,
    target,
  } = node.attrs;

  const isEditable = editor.isEditable;

  const buttonStyle = {
    color: textColor,
    backgroundColor,
    borderStyle,
    borderWidth,
    borderColor,
    borderRadius,
    width: display === "inline" ? width : "100%",
    display: "inline-block",
    padding: "0.5rem 1rem",
    textDecoration: "none",
    textAlign: "center" as const,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 150ms ease",
  };

  const containerStyle = {
    display: display === "block" ? "block" : "inline-block",
    margin: display === "block" ? "1rem 0" : "0",
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isEditable) {
      e.preventDefault();

      // Select this node when clicked in editor mode
      if (typeof getPos === "function") {
        editor.commands.setNodeSelection(getPos());
      }
    }
  };

  return (
    <NodeViewWrapper as="span" style={containerStyle}>
      <a
        href={href}
        target={target}
        style={buttonStyle}
        data-type="action-button"
        onClick={handleClick}
        className={cn(
          "action-button",
          isEditable && "ring-2 ring-offset-2 ring-offset-white ring-blue-400"
        )}
      >
        {text}
      </a>
    </NodeViewWrapper>
  );
};

export default ActionButtonComponent;
