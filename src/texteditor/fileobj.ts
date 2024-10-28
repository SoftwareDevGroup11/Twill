import { GBuffer } from './gbuffer';

import { MAX_GBUFFER_LENGTH } from '../globals';

export class FileOBJ {
    lines: Array<GBuffer>;
    name: string;
    currentLine: number;

    constructor(name: string = '') {
	this.name = name;
	this.lines = Array<GBuffer>(0);
	this.currentLine = 0;

	this.lines.push(new GBuffer());
    }

    print() {
	for (let line of this.lines) {
	    line.print();
	}
    }

    dump() : string {
	let content = "";
	for (const line of this.lines) content += line.dump() + '\n';
	return content;
    }

    slice(start: [number, number], end: [number, number]) : string {
	let line = this.lines[start[0]];
	return line.dump().slice(start[1], end[1] + 1);
    }

    insertNewline() {
	let currGBuff = this.lines[this.currentLine];
	let newLine = new GBuffer();

	newLine.insertText(currGBuff.buffer.slice(currGBuff.right + 1).join(""));
	newLine.setCursor(0);

	currGBuff.clearRight();

	this.lines.splice(this.currentLine + 1, 0, newLine);
	this.currentLine += 1;
    }

    insertText(text: string) {
	this.lines[this.currentLine].insertText(text);
    }

    backspace() {
	if (this.getCursor()[1] == 0 && this.currentLine > 0) {
	    this.lines[this.currentLine - 1].moveCursorToEnd();
	    const currentLineContent = this.lines[this.currentLine].dump()
	    this.lines[this.currentLine - 1].insertText(currentLineContent);
	    this.lines.splice(this.currentLine, 1);
	    this.currentLine -= 1;

	    this.moveCursorLeftBy(currentLineContent.length);
	} else {
	    this.lines[this.currentLine].backspace();
	}
    }

    delete() {
	if (this.lines[this.currentLine].right == MAX_GBUFFER_LENGTH - 1 && this.currentLine < this.lines.length - 1) {
	    this.lines[this.currentLine + 1].moveCursorToBeginning();
	    this.lines[this.currentLine + 1].insertText(this.lines[this.currentLine].dump());
	    this.lines.splice(this.currentLine, 1);
	    // this.currentLine += 1;

	} else {
	    this.lines[this.currentLine].delete();
	}
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
	if (this.getCursor()[1] == 0 && this.currentLine > 0) {
	    this.currentLine--;
	} else {
	    this.lines[this.currentLine].moveCursorLeftBy(amount);
	}
    }

    moveCursorRightBy(amount: number) {
	if (this.lines[this.currentLine].right >= MAX_GBUFFER_LENGTH - 1) {
	    this.currentLine++;
	} else {
	    this.lines[this.currentLine].moveCursorRightBy(amount);
	}
    }

    parse(content: string = ''): void {
	let start = 0;
	let end = 0;

	let firstIter = true;
	while (end <= content.length - 1) {
	    end = this.nextEOL(content, start);

	    // Handling an edge case when you put stuff in to the already
	    // existing line for the first time and for the rest you 
	    // add new lines

	    if (!firstIter) {
		const gbuff = new GBuffer();
		gbuff.insertText(content.slice(start, end).replace("\t", "    "));
		gbuff.setCursor(0);
		this.lines.push(gbuff);
	    } else {
		const gbuff = this.lines[this.lines.length - 1];
		gbuff.insertText(content.slice(start, end).replace("\t", "    "));
		gbuff.setCursor(0);
		firstIter = false;
	    }

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
