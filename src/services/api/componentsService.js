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
    return this.components
      .filter(c => c.pageId === parseInt(pageId))
      .sort((a, b) => a.position - b.position)
      .map(c => ({ ...c }));
  }

async getById(id) {
    await this.delay();
    const component = this.components.find(c => c.Id === parseInt(id));
    if (!component) {
      throw new Error(`Component with ID ${id} not found`);
    }
    return { ...component };
  }

  async create(componentData) {
    await this.delay(400);
    const newId = Math.max(...this.components.map(c => c.Id)) + 1;
    const pageComponents = this.components.filter(c => c.pageId === componentData.pageId);
    const nextPosition = pageComponents.length > 0 ? Math.max(...pageComponents.map(c => c.position)) + 1 : 1;
    
    const newComponent = {
      Id: newId,
      ...componentData,
      position: nextPosition,
      aiEnabled: false,
      aiTriggerRules: {
        showWhen: "",
        keywords: [],
        priority: 1
      }
    };
    
    this.components.push(newComponent);
    return { ...newComponent };
  }

  async update(id, updates) {
    await this.delay(350);
    const index = this.components.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Component with ID ${id} not found`);
    }
    
    this.components[index] = { ...this.components[index], ...updates };
    return { ...this.components[index] };
  }

  async delete(id) {
    await this.delay(250);
    const index = this.components.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Component with ID ${id} not found`);
    }
    
    const deletedComponent = this.components.splice(index, 1)[0];
    return { ...deletedComponent };
  }

  async reorder(pageId, componentOrders) {
    await this.delay(400);
    componentOrders.forEach(({ id, position }) => {
      const component = this.components.find(c => c.Id === parseInt(id));
      if (component) {
        component.position = position;
      }
    });
    
    return this.getByPageId(pageId);
  }

  async updateAiRules(id, aiRules) {
    await this.delay(300);
    return this.update(id, { 
      aiEnabled: true,
      aiTriggerRules: aiRules 
    });
  }

async toggleAiEnabled(id) {
    await this.delay(250);
    const component = this.components.find(c => c.Id === parseInt(id));
    if (!component) {
      throw new Error(`Component with ID ${id} not found`);
    }
    
    return this.update(id, { aiEnabled: !component.aiEnabled });
  }
}

export default new ComponentsService();