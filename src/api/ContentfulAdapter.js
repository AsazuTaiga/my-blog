import { createClient } from "contentful";

const POSTS_PER_PAGE = 10;

export default class ContentfulAdapter {
  constructor() {
    this.client = createClient({
      space: process.env.VUE_APP_CONTENTFUL_SPACE_ID,
      accessToken: process.env.VUE_APP_CONTENTFUL_DELIVERY_TOKEN
    });
  }

  async fetchBlogPosts() {
    return this.client.getEntries("blogPost");
  }

  async fetchBlogPostByEntryId(entryId) {
    return this.client.getEntry(entryId);
  }

  async fetchBlogPostsByTagId(tagId) {
    return this.client.getEntries({
      content_type: "blogPost",
      "fields.tags.sys.id": tagId,
      order: "-fields.releaseDate"
    });
  }

  async fetchBlogPostsAtPage(pageNumber) {
    return this.client.getEntries({
      content_type: "blogPost",
      order: "-fields.releaseDate",
      skip: (pageNumber - 1) * POSTS_PER_PAGE,
      limit: POSTS_PER_PAGE
    });
  }
}
