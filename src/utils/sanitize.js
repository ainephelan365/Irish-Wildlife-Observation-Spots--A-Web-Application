// file for sanitizing html

import sanitizeHtml from "sanitize-html";

export function sanitizeInput(input) {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: "discard",
  });
}
