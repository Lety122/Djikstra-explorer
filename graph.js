/*var network = {
	S : {A : 1, D : 4, F : 1},
	A : {B : 1},
	B : {C : 1, D : 1},
	C : {E : 2},
	D : {E : 2}, 
	E : {},
	F : {E : 5}
};*/

var network = createNetwork(26);

undirect(network);

var source = 'A';

var explorationProcess = [];

var paths = djikstra(network,source);



function createNetwork(num_of_nodes){
	let alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	let nodes = alphabet.slice(0,num_of_nodes);
	let network = {};
	for (i=0;i<nodes.length;i++){
		network[nodes[i]] = {};
		for (j=0;j<randInt(0,4);j++){
			network[nodes[i]][chooseRandElement(nodes)] = randInt(1,5);
		}
	}
	return network
}

function randInt(min,max){
	return Math.floor(Math.random() * (max-min) ) + min;
}

function chooseRandElement(arr){
	return arr[randInt(0,arr.length)];
}


function undirect(dict){
	let temp = dict;
	for (const [v, neighbors_v] of Object.entries(temp)) {
		for (const [w, dist] of Object.entries(neighbors_v)) {
			temp[w][v] = dist;
		}
	}
	return temp;
}

function buildPaths(network, source) {
	let paths = {};
	for (const [v, neighbors_v] of Object.entries(network)) {
		if (v !== source){
			paths[v] = {p : null, d : Infinity};
		}
		else {
			paths[v] = {p : null, d : 0};
		}
	}
	return paths;
}

function buildQueue(dict, explored){
	let temp = null;
	let min = Infinity;
	for (const [v, value] of Object.entries(dict)) {
		if (value['d'] > 0 && value['d'] < Infinity && value['d'] < min && !explored.includes(v)){
			temp = v;
			min = value['d'];
		}
	}
	return temp;
}

function djikstra(network, source){
	let queue = [source];
	let explored = [];
	let paths = buildPaths(network, source);

	for (let i = 0; i < Object.keys(network).length; i++){
		let v = queue[0];
		let neighbors_v = network[v];
		explored.push(v);
		queue.shift();
		if (neighbors_v !== undefined){
			for (const [w, distance_to_v] of Object.entries(neighbors_v)) {
				if (paths[w]['d'] > (paths[v]['d']+distance_to_v) ){
					paths[w]['p'] = v;
					paths[w]['d'] = paths[v]['d']+distance_to_v;
				}
				explorationProcess.push([v,w]);
			}
		}
		queue.push(buildQueue(paths, explored));
	}
	return paths;
}

for (const [v, value] of Object.entries(paths)) {
	console.log(v, value);
}



for (const [v, value] of Object.entries(network)) {
	console.log(v, value);
}