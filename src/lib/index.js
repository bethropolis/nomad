import Extension from "./extension.js";

// Attach Extension to the global object
// For browsers
if (typeof window !== "undefined") {
    window.Extension = Extension;
}

// For Node.js
if (typeof global !== "undefined") {
    global.Extension = Extension;
}

// Dynamically import test.js after setting Extension globally
const dynamicImport = async () => {
    const module = await import("./test.js");

    let comick = new module.default()

    await comick.load();

     let latest = await comick.latest();

     console.log(latest[0]);

     let detail = await comick.detail(latest[0].url);

     console.log(detail.episodes[0])

     let watch = await comick.watch(detail.episodes[0].urls[0].url);

     console.log(watch);

};

dynamicImport();