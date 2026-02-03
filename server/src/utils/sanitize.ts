import sanitizeHtml from "sanitize-html";

 const sanitizeContent = (text: string): string => {
  return sanitizeHtml(text, {
    allowedTags: [
      "b",
      "i",
      "em",
      "strong",
      "a",
      "pre",
      "code",
      "blockquote",
      "ul",
      "ol",
      "li",
      "br",
      "p",
      "span"
    ],

    allowedAttributes: {
      a: ["href", "target"],
      span: ["class"]
    },

    allowedSchemes: ["http", "https", "mailto"],

    disallowedTagsMode: "escape"
  });
};

export default sanitizeContent;
