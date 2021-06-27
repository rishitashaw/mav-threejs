uniform float time;
uniform float progress;
uniform sampler2D texture;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
float PI = 3.1415926535979;

void main(){
    float diff = dot(vec3(1.),vNormal);
    //vec4 txt = texture2D(texture,vUv);
    gl_FragColor = vec4(vUv,1., 1.);
    //gl_FragColor = vec4(vNormal, 1.0);
    //gl_FragColor = vec4(abs(sin(diff* 10.)));
    //gl_FragColor=txt;
    
}