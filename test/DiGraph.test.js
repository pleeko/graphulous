const DiGraph = require('../src/DiGraph');

describe('DiGraph', () => {
	it('should return a new DiGraph', () => {
		const diGraph = new DiGraph();

		expect(diGraph).toEqual({
			matrix: [],
			pointers: {}
		});
	});

	it('should add a node to the DiGraph', () => {
		const diGraph = new DiGraph();
		diGraph.addNode('a');

		expect(diGraph).toEqual({
			matrix: [[]],
			pointers: {a: {key: 0}}
		});
	});


	it('should remove a node to the DiGraph', () => {
		const diGraph = new DiGraph();
		diGraph.addNode(1);
		diGraph.addNode(2);
		diGraph.removeNode(1);

		expect(diGraph).toEqual({
			matrix: [[]],
			pointers: {2: {key: 1}}
		});
	});

	it('should add an edge to the DiGraph', () => {
		const diGraph = new DiGraph();
		diGraph.addNode('a');
		diGraph.addNode('b');
		diGraph.addEdge('a', 'b');

		expect(diGraph).toEqual({
		   matrix: [ [ undefined, 1 ], [] ],
			 pointers: { a: { key: 0 }, b: { key: 1 } }
			});
	});

	it('should remove an edge from the DiGraph', () => {
		const diGraph = new DiGraph();
		diGraph.addNode('a');
		diGraph.addNode('b');
		diGraph.addEdge('a', 'b');

		expect(diGraph).toEqual({
		   matrix: [ [ undefined, 1 ], [] ],
			 pointers: { a: { key: 0 }, b: { key: 1 } }
			});
			
		diGraph.removeEdge('a', 'b');

		expect(diGraph).toEqual({
			matrix: [ [ undefined, null ], [] ],
			pointers: { a: { key: 0 }, b: { key: 1 } }
			});
	});

	it('should complete DFS on diGraph', () => {
		const diGraph = new DiGraph();
		diGraph.addNode('a');
		diGraph.addNode('b');
		diGraph.addNode('c');
		diGraph.addNode('d');
		
		diGraph.addEdge('a','b');
		diGraph.addEdge('a','c');
		diGraph.addEdge('b','c');
		diGraph.addEdge('c','a');
		diGraph.addEdge('c','d');
		diGraph.addEdge('d','d');
		const ret = diGraph.dfs('c');
		expect(ret).toEqual([ 'c', 'a', 'b', 'd' ]);
	});

	it('should complete BFS on DiGraph', () => {
		let g = new DiGraph(); 
		g.addNode(0);
		g.addNode(1);
		g.addNode(2);
		g.addNode(3);
		g.addNode(4);
		
		g.addEdge(0, 3); 
		g.addEdge(0, 1); 
		g.addEdge(2, 0); 
		g.addEdge(2, 1); 
		g.addEdge(4, 2); 
		
		let ret = g.bfs(0);
		expect(ret).toEqual([ '0', '1', '3']);
	});

	it('should convert json to a DiGraph', () => {
		let json = {
			nodes: [
				{name: 'a'},
				{name: 'b'},
				{name: 'c'},
				{name: 'd'},
			],
			edges:[
				{source: 'a', target: 'b'},
				{source: 'b', target: 'c'},
				{source: 'c', target: 'd'},
				{source: 'd', target: 'a'},
			]
		}
		
		let diGraph = new DiGraph();
		diGraph.fromJson(json);
		expect(diGraph).toEqual({
			matrix: [ 
				[ undefined, 1],
				[ undefined, undefined, 1], 
				[ undefined, undefined, undefined, 1],
				[ 1], 
		 	],
			pointers: { a: { key: 0 }, b: { key: 1 }, c: { key: 2 }, d: { key: 3 } }
		});
	});

});