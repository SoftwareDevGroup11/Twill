import { GBuffer } from '../src/texteditor/gbuffer';
import { MAX_GBUFFER_LENGTH } from '../src/globals';
import { expect, test } from 'vitest';

test('Checks gap buffer initialization', () => {
    let gBuffer = new GBuffer();

    expect(gBuffer.left).toBe(0);
    expect(gBuffer.right).toBe(MAX_GBUFFER_LENGTH - 1);
    expect(gBuffer.buffer.length).toBe(MAX_GBUFFER_LENGTH);

});

test('Checks gap buffer insertion', () => {
    let gBuffer = new GBuffer();

    expect(gBuffer.insertText('abc')).toBe(true);

    expect(gBuffer.left).toBe(3);
    expect(gBuffer.right).toBe(MAX_GBUFFER_LENGTH - 1);
    expect(gBuffer.buffer.slice(0, 3)).toStrictEqual(['a', 'b', 'c']);
    expect(gBuffer.dump()).toStrictEqual('abc');
});

test('Checks gap buffer cursor movement', () => {
    let gBuffer = new GBuffer();

    expect(gBuffer.insertText('abc')).toBe(true);

    gBuffer.moveCursorLeftBy(1);

    expect(gBuffer.insertText('abc')).toBe(true);
    expect(gBuffer.dump()).toBe('ababcc');

    gBuffer.moveCursorRightBy(2);
    gBuffer.setCursor(0);

    expect(gBuffer.left).toBe(0);
});

test('Checks gap buffer deletion', () => {
    let gBuffer = new GBuffer();

    gBuffer.insertText('abc');

    expect(gBuffer.dump()).toBe('abc');

    gBuffer.moveCursorLeftBy(1);

    gBuffer.backspace();

    expect(gBuffer.dump()).toBe('ac');

    gBuffer.delete();

    expect(gBuffer.dump()).toBe('a');

    gBuffer.moveCursorRightBy(2);
});
