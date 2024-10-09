import { GBuffer } from './gbuffer';

export class FileOBJ {
    lines: Array<GBuffer>;
    name: string;

    constructor(name: string = '') {
	this.name = name;
	this.lines = Array<GBuffer>(0);
    }

    parse(content: string = ''): void {
	let start = 0;
	let end = 0;
	while (end <= content.length - 1) {
	    end = this.nextEOL(content, start);

	    let gbuff = new GBuffer();
	    gbuff.insertText(content.slice(start, end));
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
};
