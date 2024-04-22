# Djikstra-explorer
Visualization of the Djikstra algorithm. Accessible at http://droplet.cz/network

Controls:  
Point cursor at each node to show ideal path from the source. Length of edges are not to scale. If no path is shown, the chosen node is inaccessible.
'd' - step by step exploration process of the graph  
'r' - clear the leftovers after the exploration, i.e. visualization of the accessible nodes

Tweaking:  
At the top of graph.js, there are tweaking variables, namely for  
The number of nodes - default is 15, can go up to 26.  
Switching to a directed graph.  
Changing the source node.  
In the draw.js you can configure time it takes to explore each edge. Default is 300ms.  

Enjoy!
