import { GBuffer } from '../texteditor/gbuffer';
import './texteditor.css';

import { useRef, useEffect } from 'react';

const TextEditor = () => {
    const gBuff = new GBuffer();
    gBuff.insertText("hello");

    const canvasRef = useRef(null);

    function draw() {
	const canvas = canvasRef.current;
	const ctx = canvas.getContext("2d");

	ctx.fillStyle = '#000000'
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

	ctx.fillStyle = '#ffffff'
	ctx.strokeStyle = '#ffffff'
	ctx.font = "20px courier";

	let text = gBuff.dump();
	for (let i = 0; i < text.length; i++) {
	    ctx.fillText(text[i], i * 12, 20);
	}

	ctx.fillRect(gBuff.left * 12, 0, 1, 23);
    }

    useEffect(() => {
	draw();
	const canvas = canvasRef.current;
	canvas.focus();
    }, [gBuff.buffer]);

    function onInputHandle(event) {
	if (event.key.length === 1) {
	    gBuff.insertText(event.key);
	    draw();
	} else if (event.key === "ArrowLeft") {
	    gBuff.moveCursorLeftBy(1);
	    draw();
        } else if (event.key === "ArrowRight") {
	    gBuff.moveCursorRightBy(1);
	    draw();
        } else if (event.key === "Backspace") {
	    gBuff.backspace();
	    draw();
        } else if (event.key === "Delete") {
	    gBuff.delete();
	    draw();
        }
    }

    return (
	<canvas 
	    id="canvas" 
	    ref={canvasRef} 
	    width="1280" 
	    height="720" 
	    tabIndex={0}
	    onKeyDown={onInputHandle}
	    onClick={() => canvasRef.current.focus()}
	></canvas>
    )
}

export default TextEditor;
