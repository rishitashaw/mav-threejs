uniform float time;
varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;
uniform vec2 pixels;

float PI = 3.1415926535979


void main() {
    vUv=uv;
    vNormal=normal

    vec4 mvPosition = modelViewMatrix * vec4 (position, 1.);

    
    gl_Position=projectionMatrix * mvPosition;
}