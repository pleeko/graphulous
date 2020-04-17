
function Graph() {
  this.pointers = {};
  this.matrix = [];
}

Graph.prototype.addNode = function (node) {
  this.pointers[node] = {
    key: this.matrix.length
  }
  this.matrix.push([]);
}

Graph.prototype.removeNode = function (node) {
  const index = this.pointers[node].key;

  this.matrix.forEach(row => {
    row.splice(index, 1);
  })

  this.matrix.splice(index, 1);
  delete this.pointers[node];
}

Graph.prototype.addEdge = function (node1, node2) {
  const key1 = this.pointers[node1].key;
  const key2 = this.pointers[node2].key;

  this.matrix[key1][key2] = 1;
  this.matrix[key2][key1] = 1;
}

Graph.prototype.removeEdge = function (node1, node2) {
  const key1 = this.pointers[node1].key;
  const key2 = this.pointers[node2].key;

  this.matrix[key1][key2] = null;
  this.matrix[key2][key1] = null;
}

Graph.prototype.dfs = function (node) {
  const key = this.pointers[node].key;
  let acc = dfsUtil(this.matrix, key, [], []);  
  let keys = Object.keys(this.pointers);
  return acc.map(a => {
    return keys[a];
  });
}

function dfsUtil(matrix, key, visited, acc) {
  visited[key] = true;
  acc.push(key);
  for (let i = 0; i < matrix.length; i++) {
    if ((typeof matrix[key][i] !== 'undifined') && matrix[key][i] === 1 && (!visited[i])) {
      dfsUtil(matrix, i, visited, acc);
    }
  }
  return acc;
}

module.exports = Graph;