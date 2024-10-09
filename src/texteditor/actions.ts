import { FileOBJ } from './fileobj';
import { CursorPos } from '../globals';

export interface Action {
    file: FileOBJ;

    redo(): void;
    undo(): void;
};

export class CursorMoveAction implements Action {
    file: FileOBJ;
    prev: CursorPos;
    curr: CursorPos;

    constructor(file: FileOBJ, prev: CursorPos, curr: CursorPos) {
	this.file = file;
	this.prev = prev;
	this.curr = curr;
    }

    redo(): void {
	this.file.setCursor(...this.curr);
    }

    undo(): void {
	this.file.setCursor(...this.prev);
    }
};
