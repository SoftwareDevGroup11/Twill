import { GBuffer } from './gbuffer';

export class FileOBJ {
    lines: Array<GBuffer>;
    name: string;
    currentLine: number;

    constructor(name: string = '') {
	this.name = name;
	this.lines = Array<GBuffer>(0);
	this.currentLine = 0;
    }

    print() {
	for (let line of this.lines) {
	    line.print();
	}
    }

    insertText(text: string) {
	this.lines[this.currentLine].insertText(text);
    }

    backspace() {
	this.lines[this.currentLine].backspace();
    }

    delete() {
	this.lines[this.currentLine].delete();
    }

    setCursor(row: number, col: number) {
	if (!(0 <= row && row < this.lines.length)) return;

	this.currentLine = row;
	this.lines[this.currentLine].setCursor(col);
    }

    getCursor() : [number, number] {
	return [this.currentLine, this.lines[this.currentLine].left];
    }

    moveCursorUpBy(amount: number) {
	for (let i = 0; i < amount; i++) {
	    this.moveCursorUp();
	}
    }

    moveCursorDownBy(amount: number) {
	for (let i = 0; i < amount; i++) {
	    this.moveCursorDown();
	}
    }

    moveCursorLeftBy(amount: number) {
	this.lines[this.currentLine].moveCursorLeftBy(amount);
    }

    moveCursorRightBy(amount: number) {
	this.lines[this.currentLine].moveCursorRightBy(amount);
    }

    parse(content: string = ''): void {
	let start = 0;
	let end = 0;
	while (end <= content.length - 1) {
	    end = this.nextEOL(content, start);

	    let gbuff = new GBuffer();
	    gbuff.insertText(content.slice(start, end));
	    gbuff.setCursor(0);
	    this.lines.push(gbuff);

	    start = end + 1;
	}
    }

    // Returns the next index of a \n or EOF in the string
    // EOL == End of Line
    private nextEOL(content: string, oldIndex: number) : number {
	let newIndex = oldIndex; // content[oldIndex - 1] is an EOL
	while (content[newIndex] !== '\n' && newIndex < content.length) {
	    newIndex++;
	}

	// if newIndex reached the end then return the content's length
	// otherwise just return newIndex
	return (newIndex >= content.length) ? content.length : newIndex;
    }

    private moveCursorUp() {
	// Dont move is we're in the first line
	if (this.currentLine == 0) {
	    return;
	}

	let cursorCol = this.lines[this.currentLine].left;
	let upperLineLength: number = this.lines[this.currentLine - 1].getLength();
	this.lines[this.currentLine - 1].setCursor(Math.min(cursorCol, upperLineLength - 1));

	this.currentLine -= 1;
    }

    private moveCursorDown() {
	// Dont move is we're in the last line
	if (this.currentLine == this.lines.length - 1) {
	    return;
	}

	let cursorCol = this.lines[this.currentLine].left;
	let belowLineLength: number = this.lines[this.currentLine + 1].getLength();
	this.lines[this.currentLine + 1].setCursor(Math.min(cursorCol, belowLineLength - 1));

	this.currentLine += 1;
    }
};
