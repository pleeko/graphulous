
class Graph { 
  constructor() {
    this.pointers = {};
    this.matrix = [];
  }

  addNode(node){
    this.pointers[node] = {
      key: this.matrix.length
    }
    this.matrix.push([]);
  }

  removeNode(node){
    const index = this.pointers[node].key;

    this.matrix.forEach( row => {
      row.splice(index,1);
    })

    this.matrix.splice(index,1);
    delete this.pointers[node];
  }

  addEdge(node1,node2) {
    const key1 = this.pointers[node1].key;
    const key2 = this.pointers[node2].key;

    this.matrix[key1][key2] = 1;
    this.matrix[key2][key1] = 1;
  }

  removeEdge(node1,node2) {
    const key1 = this.pointers[node1].key;
    const key2 = this.pointers[node2].key;

    this.matrix[key1][key2] = null;
    this.matrix[key2][key1] = null;
  }
}

module.exports = Graph;