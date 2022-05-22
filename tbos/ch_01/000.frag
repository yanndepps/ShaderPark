/*
 * template
*/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform float   u_time;


void main(void) {
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    gl_FragColor = vec4(st, 0.5 + 0.5 * sin(u_time), 1.0);
}
