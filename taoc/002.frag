/*
 * the art of code
 * ep_002
 * building stuff with circles
*/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform float   u_time;

float Circle(vec2 st, vec2 p, float r, float blur) {
    float d = length(st-p);
    float c = smoothstep(r, r - blur, d);
    return c;
}

void main(void) {
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st -= 0.5; // -0.5 <-> 0.5
    st.x *= u_resolution.x / u_resolution.y;

    vec3 col = vec3(0.);

    float mask = Circle(st, vec2(0.0), .4, .05);
    mask -= Circle(st, vec2(-.13, .2), .07, .02);
    mask -= Circle(st, vec2(.13, .2), .07, .02);

    float mouth = Circle(st, vec2(0.0), .3, .02);
    mouth -= Circle(st, vec2(0.0, 0.1), .3, .02);
    // col = vec3(mouth);
    mask -= mouth;

    col = vec3(1., 1., 0.) * mask;

    gl_FragColor = vec4(col, 1.0);
}
