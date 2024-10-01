import { GBuffer, createGBuffer } from '../src/texteditor/gapbuffer';
import { MAX_GBUFFER_LENGTH } from '../src/globals';
import { expect, test } from 'vitest';

test('Checks gap buffer initialization', () => {
    let gBuffer : GBuffer = createGBuffer();

    expect(gBuffer.left).toBe(0);
    expect(gBuffer.right).toBe(MAX_GBUFFER_LENGTH - 1);
    expect(gBuffer.buffer.length).toBe(MAX_GBUFFER_LENGTH);
});
