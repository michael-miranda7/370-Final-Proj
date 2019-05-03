var canvas;
var gl;

window.onload = init;

var numVerts = 0;
var rotMat;
var indices;
var ang;

 
function render(){
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	var rMat = gl.getUniformLocation(gl.program, "rM");
	gl.uniformMatrix4fv(rMat, false, rotMat);

	gl.drawElements(gl.TRIANGLES, numVerts, gl.UNSIGNED_SHORT,0);	
}

 
function rotY(){
	var pos = document.getElementById("rotSlider").value;
		
	ang = pos*3.14159/180.0;
	rotMat[5] = Math.cos(ang);
	rotMat[6] = Math.sin(ang);
	rotMat[9] = -Math.sin(ang);
	rotMat[10] = Math.cos(ang); 
	
	render();
}



function handleTextureLoaded(image, texture) {
  console.log("handleTextureLoaded, image = " + image);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D);
}


function init(){
	canvas = document.getElementById("gl-canvas"); 
	
	document.getElementById("rotSlider").value = "180";

	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) { alert("WebGL isn't available - interactive cannot run"); }
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	//Load shaders and initalize attribute buffers
	initShaders2(gl, "vertex-shader", "fragment-shader"); 
		
	//Initialize transformation
	ang = 180.0*3.14159/180.0;
	rotMat = new Float32Array(16);
	for (var i = 0; i < 16; i++){
		rotMat[i] = 0;	
	}
	
	rotMat[5] = Math.cos(ang);
	rotMat[6] = Math.sin(ang); 
	rotMat[0] = 1.0;
	rotMat[8] = -Math.sin(ang);
	rotMat[10] = Math.cos(ang); 
	rotMat[15] = 1.0;
	
	
	//Initalize geometry
	var verts = [
		-0.5,0.5,-0.5,
        -0.5,-0.5,-0.5,
         0.5,-0.5,-0.5,
         0.5,0.5,-0.5,

         -0.5,0.5,0.5,
         -0.5,-0.5,0.5,
         0.5,-0.5,0.5,
         0.5,0.5,0.5
	];
	
	var faces = [
		0,1,2, 2,3,0,  4,5,6, 6,7,4,  2,3,7, 6,7,2,  0,1,4, 4,5,1,  0,3,4, 4,7,3,  1,2,5, 5,6,2
	];	
	
	numVerts = faces.length;
		
	
	var textCoords = [
		0.0,  1.0,
		0.0,  0.0,
		1.0,  0.0,
		1.0,  1.0,

		1.0,  0.0,
		0.0,  0.0,
		0.0,  1.0,
		1.0,  1.0
	];

   
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
	
	var textureCoordAttribute = gl.getAttribLocation(gl.program, "aTextureCoord");
	gl.enableVertexAttribArray(textureCoordAttribute);
	var texture_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, texture_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textCoords), gl.STATIC_DRAW);
	
    gl.bindBuffer(gl.ARRAY_BUFFER, texture_buffer);
	gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
	/*gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, cubeTexture);*/

	///////////////////// Important //////////////////////////////////////

	// For the images, make sure they are all the same dimensions and they are a power of 2
	// Also, make sure they are in the same location as the code, even in a subfolder
	gl.uniform1i(gl.getUniformLocation(gl.program, "uSampler"), 0);

	//Load texture then render
	var cubeTexture = gl.createTexture();

	gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeTexture);

	const faceInfos = [
  {
    target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, 
    url: 'images/seahawk.png',
  },
  {
    target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 
    url: 'images/clouds.png',
  },
  {
    target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 
    url: 'images/trex.png',
  },
  {
    target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 
    url: 'images/giraffe.png',
  },
  {
    target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 
    url: 'images/wolf.png',
  },
  {
    target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 
    url: 'images/space.png',
  },
];

faceInfos.forEach((faceInfo) => {
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
/////////////////////////////////////////////////////////////////////////////////////////
	/*var cubeImage = new Image();
	cubeImage.onload = function() { handleTextureLoaded(cubeImage, cubeTexture);
									render();
								  }
	cubeImage.src = "seahawk.png";	*/	
	
	render();
	

}



















