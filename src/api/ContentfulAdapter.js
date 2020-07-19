import { createClient } from "contentful";

const POSTS_PER_PAGE = 12;

class ContentfulAdapter {
  constructor() {
    this.client = createClient({
      space: process.env.VUE_APP_CONTENTFUL_SPACE_ID,
      accessToken: process.env.VUE_APP_CONTENTFUL_DELIVERY_TOKEN
    });
  }

  async fetchBlogPosts() {
    return this.client.getEntries("blogPost");
  }

  async fetchBlogPostsBySlug(slug) {
    return this.client.getEntries({
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1
    });
  }

  async fetchBlogPostsAtPage(pageNumber) {
    return this.client.getEntries({
      content_type: "blogPost",
      order: "-fields.publishDate",
      skip: (pageNumber - 1) * POSTS_PER_PAGE,
      limit: POSTS_PER_PAGE
    });
  }

  async fetchBlogPostsByTagAtPage(tagName, pageNumber) {
    const tagResponse = await this.fetchTagsByName(tagName);
    if (tagResponse.total === 0) {
      throw new Error("タグが存在しません。");
    }

    const tag = tagResponse.items[0];

    return this.client.getEntries({
      content_type: "blogPost",
      "fields.tags.sys.id": tag.sys.id,
      order: "-fields.publishDate",
      skip: (pageNumber - 1) * POSTS_PER_PAGE,
      limit: POSTS_PER_PAGE
    });
  }

  async fetchTags() {
    return this.client.getEntries({
      content_type: "tag"
    });
  }

  async fetchTagsByName(name) {
    return this.client.getEntries({
      content_type: "tag",
      "fields.name": name,
      limit: 1
    });
  }

  async fetchBlogAuthorDetail() {
    return this.client.getEntry(process.env.VUE_APP_CONTENTFUL_AUTHOR_ENTRY_ID);
  }
}

export default new ContentfulAdapter(); //Singleton
