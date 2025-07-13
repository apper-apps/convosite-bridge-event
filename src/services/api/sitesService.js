import sitesData from "@/services/mockData/sites.json";

class SitesService {
  constructor() {
    this.sites = [...sitesData];
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.sites];
  }

  async getById(id) {
    await this.delay();
    const site = this.sites.find(s => s.Id === parseInt(id));
    if (!site) {
      throw new Error(`Site with ID ${id} not found`);
    }
    return { ...site };
  }

  async create(siteData) {
    await this.delay(400);
    const newId = Math.max(...this.sites.map(s => s.Id)) + 1;
    const newSite = {
      Id: newId,
      ...siteData,
      published: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.sites.push(newSite);
    return { ...newSite };
  }

  async update(id, updates) {
    await this.delay(350);
    const index = this.sites.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Site with ID ${id} not found`);
    }
    
    this.sites[index] = {
      ...this.sites[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return { ...this.sites[index] };
  }

  async delete(id) {
    await this.delay(250);
    const index = this.sites.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Site with ID ${id} not found`);
    }
    
    const deletedSite = this.sites.splice(index, 1)[0];
    return { ...deletedSite };
  }

  async publish(id) {
    await this.delay(500);
    return this.update(id, { published: true });
  }

  async unpublish(id) {
    await this.delay(300);
    return this.update(id, { published: false });
  }
}

export default new SitesService();