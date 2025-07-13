import pagesData from "@/services/mockData/pages.json";

class PagesService {
  constructor() {
    this.pages = [...pagesData];
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getBySiteId(siteId) {
    await this.delay();
    return this.pages
      .filter(p => p.siteId === parseInt(siteId))
      .sort((a, b) => a.order - b.order)
      .map(p => ({ ...p }));
  }

  async getById(id) {
    await this.delay();
    const page = this.pages.find(p => p.Id === parseInt(id));
    if (!page) {
      throw new Error(`Page with ID ${id} not found`);
    }
    return { ...page };
  }

  async create(pageData) {
    await this.delay(400);
    const newId = Math.max(...this.pages.map(p => p.Id)) + 1;
    const sitePages = this.pages.filter(p => p.siteId === pageData.siteId);
    const nextOrder = sitePages.length > 0 ? Math.max(...sitePages.map(p => p.order)) + 1 : 1;
    
    const newPage = {
      Id: newId,
      ...pageData,
      order: nextOrder,
      isDefault: sitePages.length === 0
    };
    
    this.pages.push(newPage);
    return { ...newPage };
  }

  async update(id, updates) {
    await this.delay(350);
    const index = this.pages.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Page with ID ${id} not found`);
    }
    
    this.pages[index] = { ...this.pages[index], ...updates };
    return { ...this.pages[index] };
  }

  async delete(id) {
    await this.delay(250);
    const index = this.pages.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Page with ID ${id} not found`);
    }
    
    const deletedPage = this.pages.splice(index, 1)[0];
    return { ...deletedPage };
  }

  async reorder(siteId, pageOrders) {
    await this.delay(400);
    pageOrders.forEach(({ id, order }) => {
      const page = this.pages.find(p => p.Id === parseInt(id));
      if (page) {
        page.order = order;
      }
    });
    
    return this.getBySiteId(siteId);
  }
}

export default new PagesService();