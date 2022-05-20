/*
 * the art of code
 * ep_001
 * intro
*/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform float   u_time;


void main(void) {
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st -= 0.5; // -0.5 <-> 0.5
    st.x *= u_resolution.x / u_resolution.y;

    float d = length(st);
    float r = 0.3;

    float c = smoothstep(r, r - 0.01, d);

    // if (d < 0.3) c = 1.0; else c = 0.0;
    
    gl_FragColor = vec4(vec3(c), 1.0);
}
