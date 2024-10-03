import { MAX_GBUFFER_LENGTH } from '../globals';

export class GBuffer {
    buffer: Array<string>;
    left: number;
    right: number;

    constructor() {
	this.buffer = Array<string>(MAX_GBUFFER_LENGTH).fill('*');
	this.left = 0;
	this.right = MAX_GBUFFER_LENGTH - 1;
    }
}
