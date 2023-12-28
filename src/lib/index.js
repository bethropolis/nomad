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

    console.log(module)
    let comick = new module.default()


    await comick.load();

     console.log(await comick.latest())

};

dynamicImport();