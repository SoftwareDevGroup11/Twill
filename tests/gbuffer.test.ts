import { GBuffer } from '../src/texteditor/gbuffer';
import { MAX_GBUFFER_LENGTH } from '../src/globals';
import { expect, test } from 'vitest';

test('Checks gap buffer initialization', () => {
    let gBuffer = new GBuffer();

    expect(gBuffer.left).toBe(0);
    expect(gBuffer.right).toBe(MAX_GBUFFER_LENGTH - 1);
    expect(gBuffer.buffer.length).toBe(MAX_GBUFFER_LENGTH);

});
