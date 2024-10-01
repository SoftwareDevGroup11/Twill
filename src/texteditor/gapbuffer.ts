import { MAX_GBUFFER_LENGTH } from '../globals';

export type GBuffer = {
    buffer: Array<string>;
    left: number;
    right: number;
};

export function createGBuffer() : GBuffer {
    let gBuffer : GBuffer = {
	buffer: Array<string>(MAX_GBUFFER_LENGTH).fill('*'),
	left: 0,
	right: MAX_GBUFFER_LENGTH - 1,
    };
    return gBuffer;
}
