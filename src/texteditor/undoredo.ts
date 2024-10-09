import { Action } from './actions';
import { FileOBJ } from './fileobj';
import { MAX_ACTIONS_RECORDED } from '../globals';

export class UndoRedoStack {
    file: FileOBJ;
    stack: Array<Action>;
    top: number;
    validTop: number;

    constructor(file: FileOBJ) {
	this.file = file;
	this.stack = Array<Action>(MAX_ACTIONS_RECORDED);
	this.top = 0;
	this.validTop = 0;
    }

    addAction(action: Action) {
	this.stack[this.top] = action;
	action.redo();
	this.top += 1;
	this.validTop = this.top;
    }

    undo() {
	if (this.top == 0) return;
	this.top -= 1;
	this.stack[this.top].undo();
    }

    redo() {
	if (this.top <= this.validTop) return;

	this.top += 1;
	this.stack[this.top].redo();
    }
};
