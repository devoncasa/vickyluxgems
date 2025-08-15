import { defineStackbitConfig, SiteMapEntry } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

/**
 * Visual Editor (Git CMS) for Vicky LuxGems
 * - Flat file slugs in /content/pages/{slug}.json
 * - Each doc carries its real URL in field "url"
 * - siteMap() uses that URL so nested routes work (e.g. /amber/history)
 */
export default defineStackbitConfig({
  stackbitVersion: "~1.0.0",
  ssgName: "custom",
  nodeVersion: "18",
  contentSources: [
    new GitContentSource({
      contentDirs: ["content"],
      models: [
        {
          name: "Page",
          type: "page",
          label: "Page",
          filePath: "content/pages/{slug}.json",
          fields: [
            { name: "title", type: "string", required: true, label: "Title" },
            { name: "url", type: "string", required: true, label: "URL (e.g. /amber/history or /#/amber/history)" },
            { name: "heroTitle", type: "string", label: "Hero Title" },
            { name: "heroSubtitle", type: "string", label: "Hero Subtitle" },
            { name: "body", type: "markdown", label: "Body (optional)" }
          ]
        }
      ]
    })
  ],
  siteMap: async ({ documents }): Promise<SiteMapEntry[]> => {
    return documents
      .filter((d) => d.modelName === "Page")
      .map((doc) => {
        const data = doc.data as any;
        const url = (data?.url || "/").replace(/\/+$/,"") || "/";
        return {
          stableId: doc.id,
          urlPath: url.startsWith("/") ? url : `/${url}`,
          document: doc,
          isHomePage: url === "/"
        };
      });
  }
});