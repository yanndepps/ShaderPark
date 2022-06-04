/*
 * © curiouslyminded
 * 001
 * s01e03 -> noise, fract & modulo
*/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform float   u_time;
uniform float u_mouse;
uniform float zambo;

float hash(float n) { return fract(sin(n) * 1e4); }
float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }

float noise(vec2 x) {
    vec2 i = floor(x);
    vec2 f = fract(x);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}


void main(void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // st -= 0.5;
    // st.x *= u_resolution.x / u_resolution.y;
    float t = ( u_time * 0.05 ) * 4.;

    float n = 24.0;
    vec3 c1 = vec3(1., 1., 0.);
    vec3 c2 = vec3(.5, 0., .5);

    float test = noise(vec2(st.x + 1.35, st.y + 1.35));
    float gridX = mod( test * n + sin(t), 1.0 );
    float gridY = mod( test * n + cos(t) * .5, 1.0 );

    float noise = noise(
        vec2(
            gridX * sin(t),
            gridY * cos(t) + 1.75
)
);
    noise = smoothstep(2., .5, noise);
    vec3 color = vec3(vec2(noise), st.y * st.y + st.x * st.x);
    color *= mix(c2, c1, 1. - st.x);

    gl_FragColor = vec4(color, 1.0);
}
