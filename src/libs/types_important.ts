import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

export function numberAsLetters(i: number): string {
  const numberAsString = i.toString();
  if (numberAsString.length > 3) return (i / 1000).toString().slice(0, 3) + "K";
  else return numberAsString;
}

export async function convert2markdown(x: string): Promise<string> {
  let content = await marked(
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


export interface Dependency {
  name: string;
  source: "relative" | "remote";
  location: string;
};

export interface deepSearchData {
  [key: string]: string;
};

export interface Repo {
  avatar_url: string;
  name: string;
  full_name: string;
  created_at: string;
  description: string;
  default_branch?: string;
  open_issues: number;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  contentIsCorrect?: boolean;
  tags_url: string;
  license: string;
  readme_content?: string;
  specials?: string;
  topics?: Array<string>;
  size: number;
  has_build_zig_zon?: number;
  has_build_zig?: number;
  fork?: boolean;
  updated_at: string;
  dependencies?: Dependency[];
  berg?: number;
  archived?: boolean;
};

export async function fetchReadmeContent(repo: Repo): Promise<string> {
  const defaultBranch = "master";
  const combinations = [
    "readme.md",
    "README.md",
    "readme",
    "README",
    "readme.txt",
    "README.txt",
  ];

  try {
    for (let i = 0; i < combinations.length; i++) {
      const url = `https://raw.githubusercontent.com/${repo.full_name}/${defaultBranch}/${combinations[i]}`;

      // Attempt to fetch the file directly
      const response = await fetch(url);
      if (response.ok) {
        const ext = combinations[i].includes(".") ? combinations[i].split(".").pop()! : "";
        if (ext == "md") {
          return await convert2markdown(await response.text());
        } else {
          return await response.text();
        }
      }
    }
  } catch (error) {
    // Catch any unexpected errors and gracefully return 404
  }

  return "404";
}

