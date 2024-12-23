import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

export async function convert2markdown(x) {
  let content = marked(
    x.replaceAll("- [x]", "±§±§±§±").replaceAll("- [ ]", "±§±§±§§±"),
  );
  content = sanitizeHtml(content, {
    allowedAttributes: {
      a: ["href", "name", "target"],
      code: ["class"],
      img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
    },
  });
  content = content.replaceAll(
    "±§±§±§§±",
    "<br/><input type='checkbox' class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' disabled></input>",
  );
  content = content.replaceAll(
    "±§±§±§±",
    "<br/><input type='checkbox' class='w-4 h-4 text-green-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' checked disabled></input>",
  );
  content = content.replaceAll(
    "[!IMPORTANT]",
    `<span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">IMPORTANT</span>`,
  );
  content = content.replaceAll(
    "[!NOTE]",
    `<span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">NOTE</span>`,
  );
  content = content.replaceAll(
    "[!WARNING]",
    `<span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">WARNING</span>`,
  );
  content = content.replaceAll(
    "[!CAUTION]",
    `<span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">CAUTION</span>`,
  );
  return content;
}