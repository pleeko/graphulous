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
		graph.addNode('a');
		graph.addNode('b');
		graph.removeNode('a');

		expect(graph).toEqual({
			matrix: [[]],
			pointers: {b: {key: 1}}
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


});