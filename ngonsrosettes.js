 var gl;
 var program;
 var vPosition;
 var bufferId;
 var canvas;
 var pi = 3.14;
 var maxNumVertices = 100;

 var points = [];
 var vertices = [];
 var n;
 var x,y;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 0.0, 1.0, 1.0 );


    
    //  Load shader
    program = initShaders( gl, "vertex-shader", "fragment-shader" );

    // Load the data into the GPU
    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, 8*maxNumVertices, gl.STATIC_DRAW );


    // Associate our shader variables with our data buffer
    vPosition = gl.getAttribLocation( program, "vPosition" );
};

function render(){
    console.log(points);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram( program );
    gl.enableVertexAttribArray( vPosition );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays(gl.GL_LINES, 0, points.length );
}

function ngon(){
    points = [];
    //console.log('reached ngon()');
    //grabbing n
    n = document.getElementById("n").value;
    //validating n
    if(n > 100 || n < 3){
        alert('please choose a number between 3 and 100 for an ngon');
        return;
    }
    //calculating points
    x = [];
    y = [];
    var i;
    for(i = 0 ; i < n ; i++ ){
        x[i] = Math.cos(2*pi*i/n);
        y[i] = Math.sin(2*pi*i/n);
    }
    //finding all vertices
    var k;
    for( k = 0 ; k < n ; k++ ){
        vertices.push( vec2(x[k].toFixed(4), y[k].toFixed(4)) );
    }

    //pushing line segment points
    var j;
    for(j = 0; j < n ; j++ ){
        points.push(vertices[j]);
        if(j + 1 == n){
            points.push(vertices[0]);
        } else {
            points.push(vertices[j + 1]);
        }
    }


    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));

    render();
}

function rosette(){
    //grabbing n
    points = [];
    n = document.getElementById('n').value;
    //n validation
    if(n > 100 || n < 4){
        alert('please choose a number between 4 and 100 for a rosette');
        return;
    }
    //calculating points
    x = [];
    y = [];
    var i;
    for(i = 0 ; i < n ; i++ ){
        x[i] = Math.cos(2*pi*i/n);
        y[i] = Math.sin(2*pi*i/n);
    }
    //putting points into vertices
    var k;
    for( k = 0 ; k < n ; k++ ){
        vertices.push( vec2(x[k].toFixed(4), y[k].toFixed(4)) );
    }

    var j;
    var c;
    for(j = 0 ; j <= n - 2 ; j++){
        for(c = j + 1 ; c < n - 1 ; c++ ){
            points.push(vertices[j]);
            points.push(vertices[c]);
        }
    }

    console.log(points);

    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));

    render();


}
