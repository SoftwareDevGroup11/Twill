import { FileOBJ } from '../texteditor/fileobj';
import "./texteditor.css";

import { useRef, useEffect } from "react";

interface TextEditorProp {
	fileOBJs: Array<FileOBJ>,
	index: number
};


const TextEditor : React.FC<TextEditorProp>= (props: TextEditorProp) => {
  const file = props.fileOBJs[props.index];

    // file.parse(
    //   '#include <iostream>\n\nint main() {\n    std::cout << "Hello World" << std::endl;\n}'
    // );	
 
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.fillStyle = "#3C3D37"; // Background Color
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = "#ffffff";

    // Font Should be a Monospace font, or else it will break the cursor
    ctx.font = "20px courier";

    for (let j = 0; j < file.lines.length; j++) {
      const text = file.lines[j].dump();
      for (let i = 0; i < text.length; i++) {
        ctx.fillText(text[i], i * 12, 20 + 20 * j);
      }
    }

    // Drawing the cursor
    ctx.fillRect(
      file.lines[file.currentLine].left * 12,
      file.currentLine * 20 + 5,
      1,
      20
    );


	console.log(file.dump())

  }

  useEffect(() => {
    draw();
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.focus();
  }, [file.lines, draw]);

  // TODO: Make this more clean. Add a better abstraction
  function onInputHandle(event: React.KeyboardEvent<HTMLCanvasElement>) {
    event.preventDefault();
    if (event.key.length === 1) {
      file.insertText(event.key);
      draw();
    } else if (event.key === "ArrowUp") {
      file.moveCursorUpBy(1);
      draw();
    } else if (event.key === "ArrowDown") {
      file.moveCursorDownBy(1);
      draw();
    } else if (event.key === "ArrowLeft") {
      file.moveCursorLeftBy(1);
      draw();
    } else if (event.key === "ArrowRight") {
      file.moveCursorRightBy(1);
      draw();
    } else if (event.key === "Backspace") {
      file.backspace();
      draw();
    } else if (event.key === "Delete") {
      file.delete();
      draw();
    } else if (event.key === "Enter") {
      file.insertNewline();
      draw();
    } else if (event.key === "Tab") {
      file.insertText("    "); // added a very naive implementation of TAB, using movecursorRightby 4 doesn't provide intended output
      draw();
    }
  }

    return (
	<canvas 
	    id="canvas" 
	    ref={canvasRef} 
	    width="1920" 
	    height="1080" 
	    tabIndex={0}
	    onKeyDown={onInputHandle}
	    onClick={() => canvasRef.current?.focus()}
	></canvas>
    )
}

export default TextEditor;
