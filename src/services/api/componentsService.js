import componentsData from "@/services/mockData/components.json";

class ComponentsService {
  constructor() {
    this.components = [...componentsData];
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async getByPageId(pageId) {
    await this.delay();
    const normalizedPageId = parseInt(pageId);
    return this.components
      .filter(c => c.pageId === normalizedPageId)
      .sort((a, b) => (a.position || 0) - (b.position || 0))
      .map(c => ({ ...c }));
  }

async getById(id) {
    await this.delay();
    const normalizedId = parseInt(id);
    const component = this.components.find(c => (c.id || c.Id) === normalizedId);
    if (!component) {
      throw new Error(`Component with ID ${id} not found`);
    }
    return { ...component };
  }

async create(componentData) {
    await this.delay(400);
    const existingIds = this.components.map(c => c.id || c.Id).filter(Boolean);
    const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    const normalizedPageId = parseInt(componentData.pageId);
    const pageComponents = this.components.filter(c => c.pageId === normalizedPageId);
    const positions = pageComponents.map(c => c.position || 0);
    const nextPosition = positions.length > 0 ? Math.max(...positions) + 1 : 1;
    
const newComponent = {
      id: newId,
      ...componentData,
      pageId: normalizedPageId,
      position: nextPosition
    };
    
    this.components.push(newComponent);
    return { ...newComponent };
  }

async update(id, updates) {
    await this.delay(350);
    const normalizedId = parseInt(id);
    const index = this.components.findIndex(c => (c.id || c.Id) === normalizedId);
    if (index === -1) {
      throw new Error(`Component with ID ${id} not found`);
    }
    
    this.components[index] = { ...this.components[index], ...updates };
    return { ...this.components[index] };
  }

async delete(id) {
    await this.delay(250);
    const normalizedId = parseInt(id);
    const index = this.components.findIndex(c => (c.id || c.Id) === normalizedId);
    if (index === -1) {
      throw new Error(`Component with ID ${id} not found`);
    }
    
    const deletedComponent = this.components.splice(index, 1)[0];
    return { ...deletedComponent };
  }

  async reorder(pageId, componentOrders) {
    await this.delay(400);
componentOrders.forEach(({ id, position }) => {
      const normalizedId = parseInt(id);
      const component = this.components.find(c => (c.id || c.Id) === normalizedId);
      if (component) {
        component.position = position || 0;
      }
    });
    
    return this.getByPageId(pageId);
  }

}

export default new ComponentsService();