import webgl from "./webgl.js"

webgl({
    container: document.getElementById("webgl__container"),
    vertexSource: `
        void main() {
            gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
            gl_PointSize = 64.0;
        }
    `,
    fragmentSource: `
        #ifdef GL_ES
        precision mediump float;
        #endif

        void main() {
            gl_FragColor = vec4(0.18, 0.54, 0.34, 1.0);
        }
    `
})