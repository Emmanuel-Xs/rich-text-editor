// import { Node, mergeAttributes } from "@tiptap/core";
// import { Node as ProsemirrorNode } from "prosemirror-model";

// export const Video = Node.create({
//   name: "video",
//   group: "block",
//   selectable: true,
//   atom: true,

//   addAttributes() {
//     return {
//       src: {
//         default: null,
//       },
//     };
//   },

//   parseHTML() {
//     return [{ tag: "iframe" }];
//   },

//   renderHTML({
//     node,
//     HTMLAttributes,
//   }: {
//     node: ProsemirrorNode;
//     HTMLAttributes: Record<string, any>;
//   }) {
//     return [
//       "iframe",
//       mergeAttributes(HTMLAttributes, {
//         frameborder: "0",
//         allowfullscreen: "true",
//       }),
//     ];
//   },

//   addCommands() {
//     return {
//       setVideo:
//         (options: { src: string }) =>
//         ({ editor }) => {
//           return editor
//             .chain()
//             .insertContent(
//               `<iframe src="${options.src}" width="560" height="315"></iframe>`
//             )
//             .run();
//         },
//     };
//   },
// });
