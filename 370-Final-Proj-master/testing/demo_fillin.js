var canvas;
var gl;

window.onload = init;

var numVerts = 0;
var transMat;
var indices;
var tX =0.0;
var tY =0.0;
var tZ =0.0;
var c;

var rotXAMat;
var rotXBMat;
var rotXBMat;

var rotYAMat;
var rotYBMat;
var rotYCMat;

var rotZAMat;
var rotZBMat;
var rotZCMat;

var temp = new Float32Array(16);


 
function render(){
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    transMat[12] = tX;
    transMat[13] = tY;
    transMat[14] = tZ;
    
    for (var i = 0; i < 16; i ++){
        temp[i]= transMat[i];
    }
// MIDDLE SLICE
    // MIDDLE SLICE
    //Upper Middle Row
    
    multMat(temp,rotYAMat);
    multMat(c,rotZBMat);
    multMat(c,rotXAMat);

    for (var i = 0; i < 16; i ++){
        transMat[i] = c[i];
    }
    
    transMat[13] = parseFloat(tY) + 0.5;
    transMat[12] = parseFloat(tX)- 0.5;
    tMat = gl.getUniformLocation(gl.program, "tM");
    gl.uniformMatrix4fv(tMat, false, transMat);
    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
    
    multMat(temp,rotYAMat);
    multMat(c,rotZBMat);
    multMat(c,rotXBMat);

    for (var i = 0; i < 16; i ++){
        transMat[i] = c[i];
    }
    
    transMat[12] = parseFloat(tX);
    transMat[13] = parseFloat(tY) + 0.5;
    tMat = gl.getUniformLocation(gl.program, "tM");
    gl.uniformMatrix4fv(tMat, false, transMat);
    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
    
    multMat(temp,rotYAMat);
    multMat(c,rotZBMat);
    multMat(c,rotXCMat);

    for (var i = 0; i < 16; i ++){
        transMat[i] = c[i];
    }
    
    transMat[13] = parseFloat(tY) + 0.5;
    transMat[12] = parseFloat(tX)+ 0.5;
    tMat = gl.getUniformLocation(gl.program, "tM");
    gl.uniformMatrix4fv(tMat, false, transMat);
    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
    
    
    
    
    //Middle Row
    multMat(temp,rotYBMat);
    multMat(c,rotZBMat);
    multMat(c,rotXAMat);

    for (var i = 0; i < 16; i ++){
        transMat[i] = c[i];
    }
    
    transMat[12] = transMat[12]- 0.5;
    tMat = gl.getUniformLocation(gl.program, "tM");
    gl.uniformMatrix4fv(tMat, false, transMat);
    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
    
    
    multMat(temp,rotYBMat);
    multMat(c,rotZBMat);
    multMat(c,rotXBMat);

    for (var i = 0; i < 16; i ++){
        transMat[i] = c[i];
    }
    
    var tMat = gl.getUniformLocation(gl.program, "tM");
    gl.uniformMatrix4fv(tMat, false, transMat);
    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
    
    
    multMat(temp,rotYBMat);
    multMat(c,rotZBMat);
    multMat(c,rotXCMat);

    for (var i = 0; i < 16; i ++){
        transMat[i] = c[i];
    }
    transMat[12]= temp[12];
    transMat[12] = transMat[12]+ 0.5;
    tMat = gl.getUniformLocation(gl.program, "tM");
    gl.uniformMatrix4fv(tMat, false, transMat);
    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
    
    
    
    
    //Lower Midddle Row
    
    multMat(temp,rotYCMat);
    multMat(c,rotZBMat);
    multMat(c,rotXAMat); //remove temp replace with c

    for (var i = 0; i < 16; i ++){
        transMat[i] = c[i];
    }
    
    transMat[12] = parseFloat(tX)- 0.5;
    transMat[13]= parseFloat(tY)- 0.5;
    tMat = gl.getUniformLocation(gl.program, "tM");
    gl.uniformMatrix4fv(tMat, false, transMat);
    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
    transMat[13]= 0.0;
    
    multMat(temp,rotYCMat);
    multMat(c,rotZBMat);
    multMat(c,rotXBMat); //remove temp replace with c
    for (var i = 0; i < 16; i ++){
        transMat[i] = c[i];
    }
    transMat[12] = parseFloat(tX);
    transMat[13]= parseFloat(tY)- 0.5;
    tMat = gl.getUniformLocation(gl.program, "tM");
    gl.uniformMatrix4fv(tMat, false, transMat);
    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
    
    multMat(temp,rotYCMat);
    multMat(c,rotZBMat);
    multMat(c,rotXCMat);
    for (var i = 0; i < 16; i ++){
        transMat[i]= c[i];
    }
    
    transMat[13]= parseFloat(tY)- 0.5;
    transMat[12] = parseFloat(tX)+ 0.5;
    tMat = gl.getUniformLocation(gl.program, "tM");
    gl.uniformMatrix4fv(tMat, false, transMat);
    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
    
    for (var i = 0; i < 16; i ++){
        transMat[i]= temp[i];
    }

    
 // FORWARD SLICE
//    //Middle Row
//    transMat[14] = 1.0;
//    transMat[12] = tX;
//    var tMat = gl.getUniformLocation(gl.program, "tM");
//    gl.uniformMatrix4fv(tMat, false, transMat);
//    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
//
//    transMat[12] = parseFloat(tX)+ 1.0;
//    tMat = gl.getUniformLocation(gl.program, "tM");
//    gl.uniformMatrix4fv(tMat, false, transMat);
//    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
//
//    transMat[12] = parseFloat(tX)- 1.0;
//    tMat = gl.getUniformLocation(gl.program, "tM");
//    gl.uniformMatrix4fv(tMat, false, transMat);
//    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
//    //Upper Middle Row
//    transMat[12] = parseFloat(tX);
//    transMat[13] = 1.0;
//    tMat = gl.getUniformLocation(gl.program, "tM");
//    gl.uniformMatrix4fv(tMat, false, transMat);
//    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
//
//    transMat[12] = parseFloat(tX)+ 1.0;
//    tMat = gl.getUniformLocation(gl.program, "tM");
//    gl.uniformMatrix4fv(tMat, false, transMat);
//    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
//
//    transMat[12] = parseFloat(tX)- 1.0;
//    tMat = gl.getUniformLocation(gl.program, "tM");
//    gl.uniformMatrix4fv(tMat, false, transMat);
//    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
//    //Lower Midddle Row
//    transMat[13]= -1.0;
//
//    transMat[12] = parseFloat(tX);
//    tMat = gl.getUniformLocation(gl.program, "tM");
//    gl.uniformMatrix4fv(tMat, false, transMat);
//    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
//
//    transMat[12] = parseFloat(tX)+ 1.0;
//    tMat = gl.getUniformLocation(gl.program, "tM");
//    gl.uniformMatrix4fv(tMat, false, transMat);
//    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
//
//    transMat[12] = parseFloat(tX)- 1.0;
//    tMat = gl.getUniformLocation(gl.program, "tM");
//    gl.uniformMatrix4fv(tMat, false, transMat);
//    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
//    transMat[13]= 0.0;
////BACK SLICE
//    //Middle Row
//    transMat[14]= -1.0;
//    transMat[12] = tX;
//    var tMat = gl.getUniformLocation(gl.program, "tM");
//    gl.uniformMatrix4fv(tMat, false, transMat);
//    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
//
//    transMat[12] = parseFloat(tX)+ 1.0;
//    tMat = gl.getUniformLocation(gl.program, "tM");
//    gl.uniformMatrix4fv(tMat, false, transMat);
//    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
//
//    transMat[12] = parseFloat(tX)- 1.0;
//    tMat = gl.getUniformLocation(gl.program, "tM");
//    gl.uniformMatrix4fv(tMat, false, transMat);
//    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
//    //Upper Middle Row
//    transMat[12] = parseFloat(tX);
//    transMat[13] = 1.0;
//    tMat = gl.getUniformLocation(gl.program, "tM");
//    gl.uniformMatrix4fv(tMat, false, transMat);
//    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
//
//    transMat[12] = parseFloat(tX)+ 1.0;
//    tMat = gl.getUniformLocation(gl.program, "tM");
//    gl.uniformMatrix4fv(tMat, false, transMat);
//    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
//
//    transMat[12] = parseFloat(tX)- 1.0;
//    tMat = gl.getUniformLocation(gl.program, "tM");
//    gl.uniformMatrix4fv(tMat, false, transMat);
//    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
//    //Lower Midddle Row
//    transMat[13]= -1.0;
//
//    transMat[12] = parseFloat(tX);
//    tMat = gl.getUniformLocation(gl.program, "tM");
//    gl.uniformMatrix4fv(tMat, false, transMat);
//    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
//
//    transMat[12] = parseFloat(tX)+ 1.0;
//    tMat = gl.getUniformLocation(gl.program, "tM");
//    gl.uniformMatrix4fv(tMat, false, transMat);
//    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
//
//    transMat[12] = parseFloat(tX)- 1.0;
//    tMat = gl.getUniformLocation(gl.program, "tM");
//    gl.uniformMatrix4fv(tMat, false, transMat);
//    gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);
//    transMat[13]= 0.0;
//    transMat[14] = 0.0;
}

 
function shiftX(){
	var pos = document.getElementById("transXSlider").value;
	tX = pos;
    
	render();
}
function shiftY(){
    var pos = document.getElementById("transYSlider").value;
    tY = pos;
    render();
}
function shiftZ(){
    var pos = document.getElementById("transZSlider").value;
    tZ = pos;
    render();
}

function multMat(a, b){
    var mata0 = a[0],   mata4 = a[4],   mata8 = a[8],   mata12 = a[12];
    var mata1 = a[1],   mata5 = a[5],   mata9 = a[9],   mata13 = a[13];
    var mata2 = a[2],   mata6 = a[6],   mata10 = a[10], mata14 = a[14];
    var mata3 = a[3],   mata7 = a[7],   mata11 = a[11], mata15 = a[15];
    
    c = new Float32Array(16);
    
    var matb1 = b[0],   matb2 = b[1],   matb3 = b[2],   matb4 = b[3];
    c[0] = (mata0*matb1) + (mata4*matb2) + (mata8*matb3) +  (mata12*matb4);
    c[1] = (mata1*matb1) + (mata5*matb2) + (mata9*matb3) +  (mata13*matb4);
    c[2] = (mata2*matb1) + (mata6*matb2) + (mata10*matb3) + (mata14*matb4);
    c[3] = (mata3*matb1) + (mata7*matb2) + (mata11*matb3) + (mata15*matb4);
    
    matb1 = b[4],   matb2 = b[5],   matb3 = b[6],   matb4 = b[7];
    c[4] = (mata0*matb1) + (mata4*matb2) + (mata8*matb3) +  (mata12*matb4);
    c[5] = (mata1*matb1) + (mata5*matb2) + (mata9*matb3) +  (mata13*matb4);
    c[6] = (mata2*matb1) + (mata6*matb2) + (mata10*matb3) + (mata14*matb4);
    c[7] = (mata3*matb1) + (mata7*matb2) + (mata11*matb3) + (mata15*matb4);
    
    matb1 = b[8],   matb2 = b[9],   matb3 = b[10],   matb4 = b[11];
    c[8] = (mata0*matb1) + (mata4*matb2) + (mata8*matb3) +  (mata12*matb4);
    c[9] = (mata1*matb1) + (mata5*matb2) + (mata9*matb3) +  (mata13*matb4);
    c[10] = (mata2*matb1) + (mata6*matb2) + (mata10*matb3) + (mata14*matb4);
    c[11] = (mata3*matb1) + (mata7*matb2) + (mata11*matb3) + (mata15*matb4);
    
    matb1 = b[12],   matb2 = b[13],   matb3 = b[14],   matb4 = b[15];
    c[12] = (mata0*matb1) + (mata4*matb2) + (mata8*matb3) +  (mata12*matb4);
    c[13] = (mata1*matb1) + (mata5*matb2) + (mata9*matb3) +  (mata13*matb4);
    c[14] = (mata2*matb1) + (mata6*matb2) + (mata10*matb3) + (mata14*matb4);
    c[15] = (mata3*matb1) + (mata7*matb2) + (mata11*matb3) + (mata15*matb4);
    
    //return c;
    
}

function rotateXA(){
    var pos = document.getElementById("rotXASlider").value;
    pos = (pos * 3.14159)/180;
    for (var i = 0; i < 16; i ++){
        rotXAMat[i] = 0;
    }
    rotXAMat[0] = 1;
    rotXAMat[15] = 1;
    rotXAMat[5] = Math.cos(pos);
    rotXAMat[10] = Math.cos(pos);
    rotXAMat[6] = Math.sin(pos);
    rotXAMat[9] = -(Math.sin(pos));
    render();
}
function rotateXB(){
    var pos = document.getElementById("rotXBSlider").value;
    pos = (pos * 3.14159)/180;
    for (var i = 0; i < 16; i ++){
        rotXBMat[i] = 0;
    }
    rotXBMat[0] = 1;
    rotXBMat[15] = 1;
    rotXBMat[5] = Math.cos(pos);
    rotXBMat[10] = Math.cos(pos);
    rotXBMat[6] = Math.sin(pos);
    rotXBMat[9] = -(Math.sin(pos));
    render();
}
function rotateXC(){
    var pos = document.getElementById("rotXCSlider").value;
    pos = (pos * 3.14159)/180;
    for (var i = 0; i < 16; i ++){
        rotXCMat[i] = 0;
    }
    rotXCMat[0] = 1;
    rotXCMat[15] = 1;
    rotXCMat[5] = Math.cos(pos);
    rotXCMat[10] = Math.cos(pos);
    rotXCMat[6] = Math.sin(pos);
    rotXCMat[9] = -(Math.sin(pos));
    render();
}

function rotateYA(){
    var pos = document.getElementById("rotYASlider").value;
    pos = (pos * 3.14159)/180;
    for (var i = 0; i < 16; i ++){
        rotYAMat[i] = 0;
    }
    rotYAMat[0] = Math.cos(pos);//
    rotYAMat[15] = 1;//
    rotYAMat[5] = 1;//
    rotYAMat[10] = Math.cos(pos);//
    rotYAMat[8] = Math.sin(pos);//
    rotYAMat[2] = -(Math.sin(pos));//
    render();
}
function rotateYB(){
    var pos = document.getElementById("rotYBSlider").value;
    pos = (pos * 3.14159)/180;
    for (var i = 0; i < 16; i ++){
        rotYBMat[i] = 0;
    }
    rotYBMat[0] = Math.cos(pos);//
    rotYBMat[15] = 1;//
    rotYBMat[5] = 1;//
    rotYBMat[10] = Math.cos(pos);//
    rotYBMat[8] = Math.sin(pos);//
    rotYBMat[2] = -(Math.sin(pos));//
    render();
}
function rotateYC(){
    var pos = document.getElementById("rotYCSlider").value;
    pos = (pos * 3.14159)/180;
    for (var i = 0; i < 16; i ++){
        rotYCMat[i] = 0;
    }
    rotYCMat[0] = Math.cos(pos);//
    rotYCMat[15] = 1;//
    rotYCMat[5] = 1;//
    rotYCMat[10] = Math.cos(pos);//
    rotYCMat[8] = Math.sin(pos);//
    rotYCMat[2] = -(Math.sin(pos));//
    render();
}

function rotateZA(){
    var pos = document.getElementById("rotZASlider").value;
    pos = (pos * 3.14159)/180;
    for (var i = 0; i < 16; i ++){
        rotZAMat[i] = 0;
    }
    rotZAMat[0] = Math.cos(pos);//
    rotZAMat[15] = 1;//
    rotZAMat[5] = Math.cos(pos);;//
    rotZAMat[10] = 1;//
    rotZAMat[1] = Math.sin(pos);
    rotZAMat[4] = -(Math.sin(pos));
    render();
}
function rotateZB(){
    var pos = document.getElementById("rotZBSlider").value;
    pos = (pos * 3.14159)/180;
    for (var i = 0; i < 16; i ++){
        rotZBMat[i] = 0;
    }
    rotZBMat[0] = Math.cos(pos);//
    rotZBMat[15] = 1;//
    rotZBMat[5] = Math.cos(pos);;//
    rotZBMat[10] = 1;//
    rotZBMat[1] = Math.sin(pos);
    rotZBMat[4] = -(Math.sin(pos));
    render();
}
function rotateZC(){
    var pos = document.getElementById("rotZCSlider").value;
    pos = (pos * 3.14159)/180;
    for (var i = 0; i < 16; i ++){
        rotZCMat[i] = 0;
    }
    rotZCMat[0] = Math.cos(pos);//
    rotZCMat[15] = 1;//
    rotZCMat[5] = Math.cos(pos);;//
    rotZCMat[10] = 1;//
    rotZCMat[1] = Math.sin(pos);
    rotZCMat[4] = -(Math.sin(pos));
    render();
}

function init(){
	canvas = document.getElementById("gl-canvas"); 
	
	document.getElementById("transXSlider").value = "0";
    
    document.getElementById("rotXASlider").value = "0";
    document.getElementById("rotYASlider").value = "0";
    document.getElementById("rotZASlider").value = "0";
    
    document.getElementById("rotXBSlider").value = "0";
    document.getElementById("rotYBSlider").value = "0";
    document.getElementById("rotZBSlider").value = "0";
    
    document.getElementById("rotXCSlider").value = "0";
    document.getElementById("rotYCSlider").value = "0";
    document.getElementById("rotZCSlider").value = "0";

	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) { alert("WebGL isn't available - interactive cannot run"); }
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

	//Load shaders and initalize attribute buffers
	initShaders2(gl, "vertex-shader", "fragment-shader"); 



    tX = 0.0;
    transMat = new Float32Array(16);
    
    rotXAMat = new Float32Array(16);
    rotXBMat = new Float32Array(16);
    rotXCMat = new Float32Array(16);
    
    rotYAMat = new Float32Array(16);
    rotYBMat = new Float32Array(16);
    rotYCMat = new Float32Array(16);
    
    rotZAMat = new Float32Array(16);
    rotZBMat = new Float32Array(16);
    rotZCMat = new Float32Array(16);
    for (var i = 0; i < 16; i++){
        transMat[i] = 0;
        
        rotXAMat[i] = 0;
        rotXBMat[i] = 0;
        rotXCMat[i] = 0;
        
        rotYAMat[i] = 0;
        rotYBMat[i] = 0;
        rotYCMat[i] = 0;
        
        rotZAMat[i] = 0;
        rotZBMat[i] = 0;
        rotZCMat[i] = 0;
        
    }
    for (var i = 0; i < 16; i += 5){
        transMat[i] = 1;
        
        rotXAMat[i] = 1;
        rotXBMat[i] = 1;
        rotXCMat[i] = 1;
        
        rotYAMat[i] = 1;
        rotYBMat[i] = 1;
        rotYCMat[i] = 1;
        
        rotZAMat[i] = 1;
        rotZBMat[i] = 1;
        rotZCMat[i] = 1;
    }
    
    transMat[12] = tX;

	
	var verts = [];
	var faces = [];
    var fileName = "cube.obj";
    //var fileName2 = "cube2.obj";
    

	
		//open file
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
    			if (request.readyState === 4 && request.status !== 404) {
				//parse
				var lines = request.responseText.split('\n');  // Break up into lines and store them as array
				//alert(lines);
				lines.push(null); // Append null
				var lIdx = 0;  																												
				while (lines[lIdx] != null){
				    var line = lines[lIdx];
				    var cIdx = 2;
				    //vertex
				    if (line.charAt(0) == 'v' && line.charAt(1) == ' '){
					//parse line
					var count = 0;
					while (cIdx < line.length){
						var start = cIdx;
						while (line.charAt(cIdx) != " " && cIdx < line.length)
						    cIdx++;
						var end = cIdx-1;	
						var num = line.substring(start, end);
						var val = Number(num);
						verts[verts.length] = val;
						cIdx++;

						count++;
					}
					
				    }
				    else if (line.charAt(0) == 'f' && line.charAt(1) == ' '){
						while (cIdx < line.length){
							var start = cIdx;
							while (line.charAt(cIdx) != " " && cIdx < line.length)
								cIdx++;
							var end = cIdx;
							var num = line.substring(start, end);
							var val = Number(num) - 1;
							faces[faces.length] = val;
							cIdx++;
						}
					
				    }
				    lIdx++;
				}
    			}
 		}

        request.open('GET', fileName, false); // Create a request to acquire the file
        request.send();

	numVerts = faces.length;

    
    


    
	
	var vertex_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
	var vPos = gl.getAttribLocation(gl.program, "vPos");
	gl.vertexAttribPointer(vPos, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPos);
	
	var Index_Buffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faces), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
    
    // Diff start here
    


    
    
    
    var texture_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texture_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    var textureCoordAttribute = gl.getAttribLocation(gl.program, "aTextureCoord");
    gl.vertexAttribPointer(textureCoordAttribute, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(textureCoordAttribute);  //Duplicate
    
	//uFrame = gl.getUniformLocation(gl.program, "uFrame");
    
 

    var cubeTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeTexture);

    const faceInfos = [
  {
    target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, 
    url: '256x256 images/clouds.png',
  },
  {
    target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 
    url: '256x256 images/giraffe.png',
  },
  {
    target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 
    url: '256x256 images/moose.png',
  },
  {
    target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 
    url: '256x256 images/wolf.png',
  },
  {
    target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 
    url: '256x256 images/trex.png',
  },
  {
    target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 
    url: '256x256 images/space.png',
  }
];

faceInfos.forEach(function(faceInfo){
  const {target, url} = faceInfo;
 
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 512;
  const height = 512;
  const format = gl.RGBA;
  const type = gl.UNSIGNED_BYTE;
 
  gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
 
  const image = new Image();
  image.src = url;
  image.addEventListener('load', function() {
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeTexture);
    gl.texImage2D(target, level, internalFormat, format, type, image);
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
                         
                         
  });
});

gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);


    
    //diff ends here
    
    gl.uniform1i(gl.getUniformLocation(gl.program, "uSampler"), 0); // this is in mine

	render();

}
