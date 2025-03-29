/* eslint-disable @next/next/no-img-element */

import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";

const ImageComponent = ({ node }: NodeViewProps) => {
  const { src, alt, title, isLocalFile } = node.attrs;

  return (
    <NodeViewWrapper>
      <div
        className="image-wrapper"
        data-is-local={isLocalFile ? "true" : "false"}
      >
        <img
          src={src}
          alt={alt || title || "Image"}
          title={title}
          className="max-w-full h-auto"
        />
      </div>
    </NodeViewWrapper>
  );
};

export default ImageComponent;
