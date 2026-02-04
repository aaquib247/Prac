let graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addEdge('A', 'B');
graph.addEdge('B', 'C');
graph.addEdge('C', 'D');
graph.addEdge('D', 'A');

console.log(graph.hasCycle()); // Output: true (Cycle exists)

let graph2 = new Graph();
graph2.addVertex('A');
graph2.addVertex('B');
graph2.addVertex('C');
graph2.addEdge('A', 'B');
graph2.addEdge('B', 'C');

console.log(graph2.hasCycle()); // Output: false (No cycle exists)