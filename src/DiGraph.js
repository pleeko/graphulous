function DiGraph() {
  this.pointers = {};
  this.matrix = [];
}

DiGraph.prototype.fromJson = function (data, nodes = 'nodes', source = 'source',
  target = 'target', name = 'name', edges = 'edges') {
  data[nodes].forEach(node => {
    this.addNode(node[name]);
  });

  data[edges].forEach(edge => {
    this.addEdge(edge[source], edge[target]);
  });
};

DiGraph.prototype.addNode = function (node) {
  this.pointers[node] = {
    key: this.matrix.length,
  };
  this.matrix.push([]);
};

DiGraph.prototype.removeNode = function (node) {
  const index = this.pointers[node].key;

  this.matrix.forEach((row) => {
    row.splice(index, 1);
  });

  this.matrix.splice(index, 1);
  delete this.pointers[node];
};

DiGraph.prototype.addEdge = function (node1, node2) {
  const key1 = this.pointers[node1].key;
  const key2 = this.pointers[node2].key;
  this.matrix[key1][key2] = 1;

};

DiGraph.prototype.removeEdge = function (node1, node2) {
  const key1 = this.pointers[node1].key;
  const key2 = this.pointers[node2].key;
  this.matrix[key1][key2] = null;

};

DiGraph.prototype.dfs = function (node) {
  const key = this.pointers[node].key;
  let acc = dfsUtil(this.matrix, key, [], []);
  let keys = Object.keys(this.pointers);
  return acc.map((a) => {
    return keys[a];
  });
};

DiGraph.prototype.bfs = function (node) {
  const key = this.pointers[node].key;
  let acc = bfsUtil(this.matrix, key);
  let keys = Object.keys(this.pointers);
  return acc.map((a) => {
    return keys[a];
  });
};

function dfsUtil(matrix, key, visited, acc) {
  visited[key] = true;
  acc.push(key);
  for (let i = 0; i < matrix.length; i++) {
    if (typeof matrix[key][i] !== 'undifined' && matrix[key][i] === 1 && !visited[i]) {
      dfsUtil(matrix, i, visited, acc);
    }
  }
  return acc;
}

function bfsUtil(matrix, key) {
  let visited = [];
  let queue = [];
  let acc = [];
  visited[key] = true;
  queue.push(key);

  while (queue.length !== 0) {
    let s = queue.shift();
    acc.push(s);

    let row = matrix[s];
    for (let i = 0; i < row.length; i++) {
      if (typeof row[i] !== 'undifined' && row[i] === 1 && !visited[i]) {
        visited[i] = true;
        queue.push(i);
      }
    }
  }
  return acc;
}

module.exports = DiGraph;