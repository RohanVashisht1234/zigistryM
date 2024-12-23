import { defineConfig } from "vite";
import marko from "@marko/run/vite";
import staticAdapter from "@marko/run-adapter-static";
import packages_data from "./database/main.json";
import programs_data from "./database/programs.json";
import { Repo } from "./src/libs/types_important";

function arrayOfPaths() {
    let my_array: string[] = [];
    packages_data.forEach((element: Repo) => {
        my_array.push("/packages/" + element.full_name + "/");
    });
    programs_data.forEach((element: Repo) => {
        my_array.push("/programs/" + element.full_name + "/");
    });
    return my_array;
}

export default defineConfig({
    plugins: [
        marko({
            adapter: staticAdapter({
                urls: () => {
                    // read from your json file, and return an array of paths
                    return arrayOfPaths();
                }
            })
        })
    ]
});
