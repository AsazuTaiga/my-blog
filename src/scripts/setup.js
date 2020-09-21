const fs = require("fs");
const Contentful = require("contentful");
const createClient = Contentful.createClient;
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../../.env.local") });

const ContentfulAdapter = {
  client: createClient({
    space: process.env.VUE_APP_CONTENTFUL_SPACE_ID,
    accessToken: process.env.VUE_APP_CONTENTFUL_DELIVERY_TOKEN
  }),
  async fetchBlogPosts() {
    return this.client.getEntries({
      content_type: "blogPost"
    });
  },
  async fetchTags() {
    return this.client.getEntries({
      content_type: "tag"
    });
  },
  async fetchBlogAuthorDetail() {
    return this.client.getEntry(process.env.VUE_APP_CONTENTFUL_AUTHOR_ENTRY_ID);
  }
};

console.log("Fetching resources from Contentful API...");

ContentfulAdapter.fetchBlogPosts().then(response => {
  fs.writeFileSync(
    path.join(__dirname, "../store/blogPosts.json"),
    JSON.stringify(response)
  );
});

ContentfulAdapter.fetchTags().then(response => {
  fs.writeFileSync(
    path.join(__dirname, "../store/tags.json"),
    JSON.stringify(response)
  );
});

ContentfulAdapter.fetchBlogAuthorDetail().then(response => {
  fs.writeFileSync(
    path.join(__dirname, "../store/blogAuthorDetail.json"),
    JSON.stringify(response)
  );
});
console.log("---- SUCCESS! ----");
