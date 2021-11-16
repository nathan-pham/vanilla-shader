const error = (message) => {
    console.log(`[webgl.js] ${message}`)
}

export const webgl = ({ container=document.body, vertexSource, fragmentSource }) => {

    let buffer

    const canvas = document.createElement("canvas")
    canvas.width = container.offsetWidth
    canvas.height = container.offsetHeight
    container.appendChild(canvas)

    const gl = canvas.getContext("webgl")

    if(!gl) {
        error("failed to get WebGL context")
        return null
    }

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)


    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vertexSource)
    gl.compileShader(vertexShader)

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, source)
    gl.compileShader(fragmentShader)

    const program = gl.createProgram()

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    gl.detachShader(program, vertexShader)
    gl.detachShader(program, fragmentShader)
    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)

    const dispose = () => {

        gl.useProgram(null)
        if(buffer) gl.deleteBuffer(buffer)
        if(program) gl.deleteProgram(program)

    }

    if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        error(`shader program could not link\n${gl.getProgramInfoLog(program)}`)
        dispose()
        return null
    }

    gl.enableVertexAttribArray(0)
    buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.vertexAttribPointer(0, 1, gl.FLOAT, false, 0, 0)

    gl.useProgram(program)
    gl.drawArrays(gl.POINTS, 0, 1)

    dispose()
    
}