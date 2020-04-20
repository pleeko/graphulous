function MultiGraph() {
  this.pointers = {};
  this.matrix = [];
}

MultiGraph.prototype.fromJson = function (data, nodes='nodes', source='source', 
  target='target', name='name', edges='edges') {
    data[nodes].forEach(node => {
      this.addNode(node[name]);
    });
    
    data[edges].forEach(edge => {
      this.addEdge(edge[source], edge[target]);
    });
};

MultiGraph.prototype.addNode = function (node) {
  this.pointers[node] = {
    key: this.matrix.length,
  };
  this.matrix.push([]);
};

MultiGraph.prototype.removeNode = function (node) {
  const index = this.pointers[node].key;

  this.matrix.forEach((row) => {
    row.splice(index, 1);
  });

  this.matrix.splice(index, 1);
  delete this.pointers[node];
};

MultiGraph.prototype.addEdge = function (node1, node2, data) {
  const key1 = this.pointers[node1].key;
  const key2 = this.pointers[node2].key;

  this.matrix[key1][key2] = [data];
  this.matrix[key2][key1] = [data];
};

MultiGraph.prototype.removeEdge = function (node1, node2, data) {
  const key1 = this.pointers[node1].key;
  const key2 = this.pointers[node2].key;

  let index = this.matrix[key1][key2].findIndex(element => element === data);
  this.matrix[key1][key2].splice(index,1);
  if(this.matrix[key1][key2].length === 0){
    this.matrix[key1][key2] = null;
  }
  index = this.matrix[key2][key1].findIndex(element => element === data);
  this.matrix[key2][key1].splice(index,1);
  if(this.matrix[key2][key1].length === 0){
    this.matrix[key2][key1] = null;
  }

};

// MultiGraph.prototype.dfs = function (node) {
//   const key = this.pointers[node].key;
//   let acc = dfsUtil(this.matrix, key, [], []);
//   let keys = Object.keys(this.pointers);
//   return acc.map((a) => {
//     return keys[a];
//   });
// };

// MultiGraph.prototype.bfs = function (node) {
//   const key = this.pointers[node].key;
//   let acc = bfsUtil(this.matrix, key);
//   let keys = Object.keys(this.pointers);
//   return acc.map((a) => {
//     return keys[a];
//   });
// };

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

module.exports = MultiGraph;
