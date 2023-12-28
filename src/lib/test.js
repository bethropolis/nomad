export default class extends Extension {
    async req(url) {
        return this.request(url, {
            headers: {
                "Miru-Url": await this.getSetting("mangadex"), 
                 "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
            },
          
        });
    }

    async load() {
        this.registerSetting({
            title: "MangaDex API",
            key: "mangadex",
            type: "input",
            description: "MangaDex API URL",
            defaultValue: "https://api.mangadex.org",
        });

        this.registerSetting({
            title: "Reverse Order of Chapters",
            key: "reverseChaptersOrder",
            type: "toggle",
            description: "Reverse the order of chapters",
            defaultValue: "false",
        });

        this.registerSetting({
            title: "Language",
            key: "lang",
            type: "input",
            description: "Language",
            defaultValue: "en",
        })
    }

    async latest(page) {
        const offset = page > 1 ? (page - 1) * 30 : 0;
        const res = await this.req(
            `/manga?order[rating]=desc&limit=30&offset=${offset}&includes[]=cover_art`
        );

        let data = await res.data.map((item) => {
            const mangaId = item.id;
            const coverArtObject = item.relationships.find(
                (relationship) => relationship.type === "cover_art"
            );
            if (!coverArtObject) return;

            const coverFilename = coverArtObject.attributes.fileName;
            const coverImageURL = `https://uploads.mangadex.org/covers/${mangaId}/${coverFilename}.256.jpg`;

            const title = (() => {
                const altTitle = item.attributes?.title;
                const key = Object.keys(altTitle)[0];
                return altTitle[key] || "unknown title";
            })();

            return {
                url: item.id,
                title: title,
                cover: coverImageURL,
            };
        });
        return data;
    }
}
