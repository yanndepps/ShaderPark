/*
 * the art of code
 * ep_003
 * making a rectangle
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

float Band(float t, float start, float end, float blur) {
    float step1 = smoothstep(start-blur, start+blur, t);
    float step2 = smoothstep(end+blur, end-blur, t);
    return step1 * step2;
}

float Rect(vec2 st, float left, float right, float bottom, float top, float blur) {
    float band1 = Band(st.x, left, right, blur);
    float band2 = Band(st.y, bottom, top, blur);
    return band1*band2;
}

float Smiley(vec2 st, vec2 p, float size) {
    st -= p; // translate coordinate system
    st /= size; // scale coordinate system
    float mask = Circle(st, vec2(0.0), .4, .01);
    mask -= Circle(st, vec2(-.13, .2), .07, .02);
    mask -= Circle(st, vec2(.13, .2), .07, .02);

    float mouth = Circle(st, vec2(0.0), .3, .02);
    mouth -= Circle(st, vec2(0.0, 0.1), .3, .02);
    mask -= mouth;

    return mask;
}

void main(void) {
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st -= 0.5; // -0.5 <-> 0.5
    st.x *= u_resolution.x / u_resolution.y;

    vec3 col = vec3(0.);

    // float mask = Smiley(st, vec2(0., 0.1), 1.0);

    float mask = Rect(st, -.2, .2, -.3, .3, .01);
    col = vec3(1., 1., 1.) * mask;

    gl_FragColor = vec4(col, 1.0);
}
