import { 
    MAX_GBUFFER_LENGTH, 
    GBUFFER_DUMMY_CHAR,
    assert
} from '../globals';

export class GBuffer {
    buffer: Array<string>;
    left: number;
    right: number;

    constructor() {
	this.buffer = Array<string>(MAX_GBUFFER_LENGTH).fill(GBUFFER_DUMMY_CHAR);
	this.left = 0;
	this.right = MAX_GBUFFER_LENGTH - 1;
    }

    insertText(text : string) : boolean {
	for (let i = 0; i < text.length; i++) {
	    if (!this.insertChar(text[i])) {
		return false;
	    }
	}
	return true;
    }

    delete() : void {
	if (this.right >= MAX_GBUFFER_LENGTH - 1) return;
	this.right += 1;
	this.buffer[this.right] = GBUFFER_DUMMY_CHAR;
    }

    backspace() : void {
	if (this.left <= 0) return;
	this.left -= 1;
	this.buffer[this.left] = GBUFFER_DUMMY_CHAR;
    }

    moveCursorLeftBy(amount : number) : void {
	for (let i = 0; i < amount; i++) {
	    this.moveCursorLeft();
	}
    }

    moveCursorRightBy(amount : number) : void {
	for (let i = 0; i < amount; i++) {
	    this.moveCursorRight();
	}
    }

    print() : void {
	// console.log(this.buffer.join(""));
	// let arr = Array<string>(MAX_GBUFFER_LENGTH).fill(" ");
	// arr[this.left] = "^";
	// arr[this.right] = "^";
	// console.log(arr.join(""));
    }

    dump() : string {
	let left_part : string = this.buffer.slice(0, this.left).join("");
	let right_part : string = this.buffer.slice(this.right + 1, MAX_GBUFFER_LENGTH).join("");

	return left_part + right_part;
    }

    private insertChar(char: string) : boolean {
	assert(char.length == 1);
	if (this.left >= this.right) {
	    return false;
	}

	this.buffer[this.left] = char;
	this.left += 1;

	return true;
    }

    private moveCursorLeft() : void {
	// Make sure we can go left
	if (this.left <= 0) return;

	// Make sure we can copy to right ptr
	if (this.buffer[this.right] !== GBUFFER_DUMMY_CHAR) return;

	// Copy char at left to right and adjust
	this.left -= 1;
	this.buffer[this.right] = this.buffer[this.left];
	this.buffer[this.left] = GBUFFER_DUMMY_CHAR;
	this.right -= 1;
    }

    private moveCursorRight() : void {
	// Make sure we can go right 
	if (this.right >= MAX_GBUFFER_LENGTH - 1) return;

	// Make sure we can copy to left ptr
	if (this.buffer[this.left] !== GBUFFER_DUMMY_CHAR) return;

	// Copy char at left to right and adjust
	this.right += 1;
	this.buffer[this.left] = this.buffer[this.right];
	this.buffer[this.right] = GBUFFER_DUMMY_CHAR;
	this.left += 1;
    }
}
