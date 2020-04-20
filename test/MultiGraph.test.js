const MultiGraph = require('../src/MultiGraph');

describe('MultiGraph', () => {
  it('should return a new MultiGraph', () => {
    const graph = new MultiGraph();

    expect(graph).toEqual({
      matrix: [],
      pointers: {}
    });
  });

  it('should add a node to the MultiGraph', () => {
    const graph = new MultiGraph();
    graph.addNode('a');

    expect(graph).toEqual({
      matrix: [[]],
      pointers: { a: { key: 0 } }
    });
  });


  it('should remove a node to the MultiGraph', () => {
    const graph = new MultiGraph();
    graph.addNode(1);
    graph.addNode(2);
    graph.removeNode(1);

    expect(graph).toEqual({
      matrix: [[]],
      pointers: { 2: { key: 1 } }
    });
  });

  it('should add an edge to the MultiGraph', () => {
    const graph = new MultiGraph();
    graph.addNode('a');
    graph.addNode('b');
    graph.addEdge('a', 'b', { weight: 12 });

    expect(graph).toEqual({
      matrix: [[undefined, [{ weight: 12 }]], [[{ weight: 12 }]]],
      pointers: { a: { key: 0 }, b: { key: 1 } }
    });
  });

  it('should remove an edge from the MultiGraph', () => {
    const graph = new MultiGraph();
    graph.addNode('a');
    graph.addNode('b');
    graph.addEdge('a', 'b', 7);
    graph.addEdge('a', 'b', 7);

    expect(graph).toEqual({
      matrix: [[undefined, [7,7]], [[7,7]]],
      pointers: { a: { key: 0 }, b: { key: 1 } }
    });

    graph.removeEdge('a', 'b', 7);

    expect(graph).toEqual({
      matrix: [[undefined, [7]], [[7]]],
      pointers: { a: { key: 0 }, b: { key: 1 } }
    });
  });

  // it('should complete DFS on graph', () => {
  //   const graph = new MultiGraph();
  //   graph.addNode('a');
  //   graph.addNode('b');
  //   graph.addNode('c');
  //   graph.addNode('d');

  //   graph.addEdge('a', 'b');
  //   graph.addEdge('a', 'c');
  //   graph.addEdge('b', 'c');
  //   graph.addEdge('c', 'a');
  //   graph.addEdge('c', 'd');
  //   graph.addEdge('d', 'd');
  //   const ret = graph.dfs('c');
  //   expect(ret).toEqual(['c', 'a', 'b', 'd']);
  // });

  // it('should complete BFS on graph', () => {
  //   let g = new MultiGraph();
  //   g.addNode(0);
  //   g.addNode(1);
  //   g.addNode(2);
  //   g.addNode(3);
  //   g.addNode(4);

  //   g.addEdge(0, 3);
  //   g.addEdge(0, 1);
  //   g.addEdge(2, 0);
  //   g.addEdge(2, 1);
  //   g.addEdge(4, 2);

  //   let ret = g.bfs(0);
  //   expect(ret).toEqual(['0', '1', '2', '3', '4']);
  // });

  it('should convert json to a graph', () => {
    let json = {
      nodes: [
        { name: 'a' },
        { name: 'b' },
        { name: 'c' },
        { name: 'd' },
      ],
      edges: [
        { source: 'a', target: 'b', data: { weight: 2 } },
        { source: 'b', target: 'c', data: { weight: 6 } },
        { source: 'c', target: 'd', data: { weight: 4 } },
        { source: 'd', target: 'a', data: { weight: 78 }},
        { source: 'd', target: 'a', data: { weight: 92 }},
      ]
    }

    let graph = new MultiGraph();
    graph.fromJson(json);

    expect(graph).toEqual({
      matrix: [
        [undefined, [{ "weight": 2 }], undefined, [{ "weight": 78 },{ "weight": 92 }]],
        [[{ "weight": 2 }], undefined, [{ "weight": 6 }]],
        [undefined, [{ "weight": 6 }], undefined, [{ "weight": 4 }]],
        [[{ "weight": 78 },{ "weight": 92 }], undefined, [{ "weight": 4 }]]],
      pointers: { a: { key: 0 }, b: { key: 1 }, c: { key: 2 }, d: { key: 3 } }
    });
  });

});