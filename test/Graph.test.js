const Graph = require('../src/Graph');

describe('Graph', () => {
	it('should return a new Graph', () => {
		const graph = new Graph();

		expect(graph).toEqual({
			matrix: [],
			pointers: {}
		});
	});

	it('should add a node to the Graph', () => {
		const graph = new Graph();
		graph.addNode('a');

		expect(graph).toEqual({
			matrix: [[]],
			pointers: {a: {key: 0}}
		});
	});


	it('should remove a node to the Graph', () => {
		const graph = new Graph();
		graph.addNode(1);
		graph.addNode(2);
		graph.removeNode(1);

		expect(graph).toEqual({
			matrix: [[]],
			pointers: {2: {key: 1}}
		});
	});

	it('should add an edge to the Graph', () => {
		const graph = new Graph();
		graph.addNode('a');
		graph.addNode('b');
		graph.addEdge('a', 'b');

		expect(graph).toEqual({
		   matrix: [ [ undefined, 1 ], [ 1 ] ],
			 pointers: { a: { key: 0 }, b: { key: 1 } }
			});
	});

	it('should remove an edge from the Graph', () => {
		const graph = new Graph();
		graph.addNode('a');
		graph.addNode('b');
		graph.addEdge('a', 'b');

		expect(graph).toEqual({
		   matrix: [ [ undefined, 1 ], [ 1 ] ],
			 pointers: { a: { key: 0 }, b: { key: 1 } }
			});
			
		graph.removeEdge('a', 'b');

		expect(graph).toEqual({
			matrix: [ [ undefined, null ], [ null ] ],
			pointers: { a: { key: 0 }, b: { key: 1 } }
			});
	});

	it('should complete DFS on graph', () => {
		const graph = new Graph();
		graph.addNode('a');
		graph.addNode('b');
		graph.addNode('c');
		graph.addNode('d');
		
		graph.addEdge('a','b');
		graph.addEdge('a','c');
		graph.addEdge('b','c');
		graph.addEdge('c','a');
		graph.addEdge('c','d');
		graph.addEdge('d','d');
		const ret = graph.dfs('c');
		expect(ret).toEqual([ 'c', 'a', 'b', 'd' ]);
	});

});