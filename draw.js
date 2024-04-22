canvas = document.getElementById('canv');
canvas2 = document.getElementById('canv2');
canvas3 = document.getElementById('canv3');
const ctx = canvas.getContext('2d');
const ctx2 = canvas2.getContext('2d');
const ctx3 = canvas3.getContext('2d');
canvas.width = 1920;
canvas.height = 1080;
canvas2.width = 1920;
canvas2.height = 1080;
canvas3.width = 1920;
canvas3.height = 1080;
ctx2.lineWidth = 5;
ctx.lineWidth = 2;

node_color = '#FF7D00';
vertices_arrows_color = '#15616D';
source_node_color = '#FFECD1';
found_path_color = '#FFECD1';
exploration_color = '#FFECD1';  

let mouseCoordsVar = {};

function drawCircle(context, x, y, radius, color) {
	  context.beginPath();
	  context.arc(x, y, radius, 0, 2 * Math.PI);
	  context.fillStyle = color;
	  context.fill();
	  context.closePath();
}

var inside = false;
var currentNode = 'fallback';

function update(){
		for (const [v, coords] of Object.entries(nodes)){
				if (mouseCoordsVar.x > coords.x-15 && mouseCoordsVar.x < coords.x+15 && mouseCoordsVar.y > coords.y-15 && mouseCoordsVar.y < coords.y+15 && inside === false) {
						let path = findPath(v);
						drawPath(ctx2,path,found_path_color);
						inside = true;
						currentNode = v;
						console.log("czesc");
						break;
				}
				else if (!(mouseCoordsVar.x > nodes[currentNode].x-15 && mouseCoordsVar.x < nodes[currentNode].x+15 && mouseCoordsVar.y > nodes[currentNode].y-15 && mouseCoordsVar.y < nodes[currentNode].y+15) && inside){
						ctx2.clearRect(0,0,canvas.width, canvas.height);
  					inside = false;
  					currentNode = 'fallback';
  					console.log("pryc");
				}
		}
}

async function showDjikstra(){
		for (i=0;i<explorationProcess.length;i++){
			drawPath(ctx2,explorationProcess[i],exploration_color);
			drawCircle(ctx3 ,nodes[explorationProcess[i][0]].x, nodes[explorationProcess[i][0]].y, 15, exploration_color);
			await new Promise(resolve => setTimeout(resolve, 500));
			ctx2.clearRect(0,0,canvas.width, canvas.height);
		}
}

function findPath(end){
		let path = [];
		let temp = end;
		path.push(end);
		while (paths[temp]['p'] !== null){
				temp = paths[temp]['p'];
				path.push(temp);
		}
		return path.reverse();
}

function drawPath(context, path, color){
		for (let i = 0; i < path.length-1; i++){
				context.beginPath();
				context.moveTo(nodes[path[i]]['x'], nodes[path[i]]['y']);
				context.lineTo(nodes[path[i+1]]['x'], nodes[path[i+1]]['y']);
				context.strokeStyle = color;
      	context.stroke();
      	let coordsStart = {x : nodes[path[i]]['x'], y : nodes[path[i]]['y']}
      	let arrowVector = {x : nodes[path[i+1]]['x']-nodes[path[i]]['x'], y : nodes[path[i+1]]['y']-nodes[path[i]]['y']}
      	drawArrow(context, coordsStart, arrowVector, color);
		}
}

function drawArrow(context, coordsStart, vector, color){
		context.fillStyle = color;
		let coords = {x : coordsStart.x + 0.8*vector.x, y : coordsStart.y + 0.8*vector.y};
		let vectorMagnitude = Math.sqrt(vector.x**2 + vector.y**2);
		let unitVector = {x : vector.x/vectorMagnitude, y : vector.y/vectorMagnitude};
		let normalizedUnitVector = {x : unitVector.y, y : -unitVector.x};
		let arrowWidthOffset = 10;
		let arrowHeightOffset = 25;
		context.beginPath();
		context.moveTo(coords.x+normalizedUnitVector.x*arrowWidthOffset, coords.y+normalizedUnitVector.y*arrowWidthOffset);
		context.lineTo(coords.x+unitVector.x*arrowHeightOffset, coords.y+unitVector.y*arrowHeightOffset);
		context.lineTo(coords.x-normalizedUnitVector.x*arrowWidthOffset, coords.y-normalizedUnitVector.y*arrowWidthOffset);
		context.fill();
		context.closePath();
}

function mouseCoords(event){
		var rect = canvas.getBoundingClientRect();
	  return {
		    x: event.clientX - rect.left,
		    y: event.clientY - rect.top
	  };
}



let coord = {x : 1000, y : 1000};

let nodes = {fallback : {x : 0, y : 0}};

ctx.font = "50px Arial";

for (const [v, value] of Object.entries(network)) {
		nodes[v] = {x : coord['x'], y : coord['y']};
		if (v !== source){
				drawCircle(ctx, coord['x'], coord['y'], 15, node_color);
		}
		else {
				drawCircle(ctx, coord['x'], coord['y'], 15, source_node_color);
		}
		ctx.fillText(v,coord['x']+10,coord['y']+10);
		coord['x'] = Math.floor(Math.random() * (1920-30) )+30;
		coord['y'] = Math.floor(Math.random() * (1080-30) )+30;
}

for (const [v, neighbors_v] of Object.entries(network)) {
		for (const [w, dist] of Object.entries(neighbors_v)) {
				drawPath(ctx,[v,w], vertices_arrows_color);
		}
		console.log('done');
}

for (const [v, value] of Object.entries(nodes)) {
	console.log(v, value);
}

document.addEventListener('mousemove', (event) => {
  mouseCoordsVar = mouseCoords(event);
  update();
});

document.addEventListener('keydown', (event) => {
	if (event.key === 'd'){
		showDjikstra();
	}
	if (event.key === 'r'){
		ctx3.clearRect(0,0,canvas.width,canvas.height);
	}
});