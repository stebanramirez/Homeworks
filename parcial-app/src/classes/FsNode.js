export class FsNode {
  constructor({ id, name, type, ownerEmail, parentId = null, createdAt = Date.now() }) {
    this.id = id;
    this.name = name;
    this.type = type; // "folder" o "file"
    this.ownerEmail = ownerEmail;
    this.parentId = parentId;
    this.createdAt = createdAt;
    this.children = [];
  }

  isFolder() {
    return this.type === "folder";
  }

  // un archivo nunca puede tener hijos
  addChild(node) {
    if (!this.isFolder()) {
      throw new Error("Un archivo no puede tener hijos");
    }
    this.children.push(node);
    return node;
  }
}
