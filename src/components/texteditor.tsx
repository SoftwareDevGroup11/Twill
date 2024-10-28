import { FileOBJ } from '../texteditor/fileobj';
import "./texteditor.css";

import { FONT_SIZE, LanguagesPath, Languages, Colors } from '../globals';

import { useRef, useEffect } from "react";

import Parser from 'web-tree-sitter';

interface TextEditorProp {
    fileOBJs: Array<FileOBJ>,
    index: number
};

const TextEditor : React.FC<TextEditorProp>= (props: TextEditorProp) => {
    const file = props.fileOBJs[props.index];

    const parserRef = useRef<Parser | null>(null);

    useEffect(() => {
	const initParser = async () => {
	    await Parser.init({
		locateFile(scriptName: string, scriptDirectory: string) {
		    (scriptDirectory)
		    return scriptName;
		},
	    });

	    const parser = new Parser();
	    parserRef.current = parser;

	    let file_type = file.name.split('.').pop();
	    if (file_type) {
		console.log(file_type);
		if (file_type in LanguagesPath) {
		    if (Languages[file_type] === undefined) {
			Languages[file_type] = await Parser.Language.load(LanguagesPath[file_type]);
		    }
		    parser.setLanguage(Languages[file_type]);
		    draw();
		} else {
		    parserRef.current = null;
		}
		console.log(Languages[file_type]);
	    }
	};

	initParser().catch(error => {
	    console.error("Failed to initialize parser:", error);
	});

    }, [props.index, file.name]);

    let colors_count = Object.keys(Colors).length - 2;
    console.log(colors_count);

    function offset(index: number, pos?: Parser.Point): string | null {
	index; // unused
	if (!pos) return null;

	let line = file.lines[pos.row];

	if (line) {
	    let sliced = line.dump().slice(pos.column) + '\n';
	    return sliced;
	}

	return null;
    }

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    function draw() {
	const canvas = canvasRef.current;
	if (!canvas) return;

	const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
	if (!ctx) return;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "#1D2021"; // Background Color
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	// Set font and line height
	ctx.font = `bold ${FONT_SIZE}px courier`;
	const lineHeight = FONT_SIZE * 1.5; // Set line height for better spacing

	let parser = parserRef.current;
	if (parser) {
	    const tree = parser.parse(offset);
	    DFS(ctx, tree.rootNode);
	} else {
	    ctx.fillStyle = "#ffffff";
	    for (let j = 0; j < file.lines.length; j++) {
		const text = file.lines[j].dump();

		for (let i = 0; i < text.length; i++) {
		    let x = i * 12;
		    let y = j * (FONT_SIZE * 1.5) + FONT_SIZE;

		    ctx.fillText(text[i], x, y);
		}
	    }
	}

	// Drawing the cursor
	ctx.fillStyle = "#ffffff"; // Set cursor color to white
	ctx.fillRect(
	    file.lines[file.currentLine].left * 12,
	    file.currentLine * lineHeight,
	    1,
	    lineHeight // Change cursor height to match line height
	);

	/*
	ctx.fillRect(
	    file.lines[file.currentLine].left * 12,
	    25 + file.currentLine * lineHeight,
	    12,
	    1
	);
	*/
    }

    function DFS(ctx: CanvasRenderingContext2D, node: Parser.SyntaxNode) {
	let color: string;

	// Determine the color based on the node type
	if (node.isNamed) {
	    let colorIndex = node.typeId % colors_count;
	    let color_key = Object.keys(Colors)[colorIndex];
	    color = Colors[color_key];
	    ctx.fillStyle = color;
	} else {
	    color = "#EBDBB2";
	    ctx.fillStyle = color;
	    // color = "#EBDBB2";
	}

	let start = node.startPosition;
	let end = node.endPosition;

	// Calculate position to draw text
	let text = file.slice([start.row, start.column], [end.row, end.column]);
	let y = start.row * (FONT_SIZE * 1.5) + FONT_SIZE; // Adjust y position based on line height

	ctx.fillText(text, start.column * 12, y); // Draw text at calculated position

	// Recursively draw child nodes
	for (let child of node.children) {
	    DFS(ctx, child);
	}
    }

    useEffect(() => {
	draw();
	const canvas: HTMLCanvasElement | null = canvasRef.current;
	if (!canvas) return;
	canvas.focus();
    }, [file.lines, draw]);

    // TODO: Make this more clean. Add a better abstraction
    function onInputHandle(event: React.KeyboardEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>) {
	event.preventDefault();
	if (event.type === "keydown") {
	    const e = event as React.KeyboardEvent<HTMLCanvasElement>;
	    if (e.key.length === 1) {
		file.insertText(e.key);
		draw();
	    } else if (e.key === "ArrowUp") {
		file.moveCursorUpBy(1);
		draw();
	    } else if (e.key === "ArrowDown") {
		file.moveCursorDownBy(1);
		draw();
	    } else if (e.key === "ArrowLeft") {
		file.moveCursorLeftBy(1);
		draw();
	    } else if (e.key === "ArrowRight") {
		file.moveCursorRightBy(1);
		draw();
	    } else if (e.key === "Backspace") {
		file.backspace();
		draw();
	    } else if (e.key === "Delete") {
		file.delete();
		draw();
	    } else if (e.key === "Enter") {
		file.insertNewline();
		draw();
	    } else if (e.key === "Tab") {
		file.insertText("    "); // added a very naive implementation of TAB, using movecursorRightby 4 doesn't provide intended output
		draw();
	    }
	}

	if (event.type === "mousedown") {
	    let e = event as React.MouseEvent<HTMLCanvasElement>;

	    const rect = (e.target as HTMLElement).getBoundingClientRect();

	    const x = e.clientX - rect.left;
	    const y = e.clientY - rect.top;

	    const row = Math.floor(y / (FONT_SIZE * 1.5)); // Line height
	    const column = Math.floor(x / 12); // Width of each character (assuming monospaced font)

	    file.setCursor(row, column);

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
	onMouseDown={onInputHandle}
	onClick={() => canvasRef.current?.focus()}
	></canvas>
    )
}

export default TextEditor;
