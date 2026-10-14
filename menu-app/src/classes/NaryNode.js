export class NaryNode {
  constructor(title, link, component) {
    this.title = title;
    this.link = link;
    this.component = component;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
    return node;
  }

  isLeaf() {
    return this.children.length === 0;
  }
}
