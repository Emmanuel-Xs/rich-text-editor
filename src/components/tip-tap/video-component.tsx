import {
  getVimeoEmbedUrl,
  getYouTubeEmbedUrl,
  isVimeoUrl,
  isYouTubeUrl,
} from "@/lib/video-utils";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";

const VideoComponent = ({ node }: NodeViewProps) => {
  const {
    src,
    title,
    width,
    height,
    controls,
    autoplay,
    loop,
    muted,
    isLocalFile,
  } = node.attrs;

  // Render different video elements based on the source
  const renderVideo = () => {
    if (isYouTubeUrl(src)) {
      return (
        <iframe
          src={getYouTubeEmbedUrl(src)}
          title={title || "YouTube video"}
          width={width || "560"}
          height={"415"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else if (isVimeoUrl(src)) {
      return (
        <iframe
          src={getVimeoEmbedUrl(src)}
          title={title || "Vimeo video"}
          width={width}
          height={height || "315"}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else {
      // Regular video file
      return (
        <video
          src={src}
          title={title}
          width={width}
          height={height}
          controls={controls}
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
        >
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <NodeViewWrapper>
      <div
        className="video-wrapper"
        data-video-type={
          isYouTubeUrl(src) ? "youtube" : isVimeoUrl(src) ? "vimeo" : "file"
        }
        data-is-local={isLocalFile ? "true" : "false"}
      >
        {renderVideo()}
      </div>
    </NodeViewWrapper>
  );
};

export default VideoComponent;
