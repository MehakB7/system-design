class TrieNode {
  constructor() {
    this.isLeaf = false;
    this.children = new Array(26);
    this.values = []; 
  }

  updateValues(value) {
  if (!this.values.includes(value)) {
    this.values.push(value);
    if (this.values.length > 10) {
      this.values.shift();
    }
  }
}
}

class Trie {
  constructor() {
    this.mainNode = new TrieNode();
  }

  insert(word) {
    let currentNode = this.mainNode;
    for (let char of word) {
      let index = char.charCodeAt(0) - 'a'.charCodeAt(0);
      if (!currentNode.children[index]) {
        currentNode.children[index] = new TrieNode();
      }
      currentNode.children[index].updateValues(word);
      currentNode = currentNode.children[index];
    }
    currentNode.isLeaf = true;
  }

  search(word) {
    let currentNode = this.mainNode;
    for (let char of word) {
      let index = char.charCodeAt(0) - 'a'.charCodeAt(0);
      if (!currentNode.children[index]) {
        return false;
      }
      currentNode = currentNode.children[index];
    }
    return currentNode.isLeaf;
  }

  startsWith(prefix) {
    let currentNode = this.mainNode;
    for (let char of prefix) {
      let index = char.charCodeAt(0) - 'a'.charCodeAt(0);
      if (!currentNode.children[index]) {
        return false;
      }
      currentNode = currentNode.children[index];
    }
    return true;
  }

  autocomplete(prefix) {
    let currentNode = this.mainNode;
    for (let char of prefix) {
      let index = char.charCodeAt(0) - 'a'.charCodeAt(0);
      if (!currentNode.children[index]) {
        return [];
      }
      currentNode = currentNode.children[index];
    }
    return currentNode.values;
  }

 toJSON() {
  let idCounter = 0;

  function buildNode(node, char = '') {
    const nodeId = `node-${idCounter++}`;
    return {
      id: nodeId,              
      value: char,
      isLeaf: node.isLeaf,
      children: node.children
        .map((child, i) =>
          child ? buildNode(child, String.fromCharCode(i + 97)) : null
        )
        .filter(Boolean),
    };
  }

  return buildNode(this.mainNode, '');
}


}

module.exports = Trie
