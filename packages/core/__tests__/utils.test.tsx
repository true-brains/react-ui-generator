import React from 'react';

import {
  findFieldIdx,
  enhanceFormMeta,
  extractFieldActions
} from '../src/utils';

import metaMinimal from '../examples/meta/minimal';
import metaFieldActions from '../examples/meta/field-action';


describe('findFieldIdx()', () => {
  const testId = 'testId';

  test('should return `-1` for empty `fields` array', () => {
    expect(findFieldIdx([], testId)).toBe(-1);
  });

  test('should return `-1` if `fields` array does not contain field with test id', () => {
    const fields: JSX.Element[] = [
      <div id="foo" />,
      <div id="bar" />
    ];

    expect(findFieldIdx(fields, testId)).toBe(-1);
  });

  test('should return index if `fields` array contains field with test id', () => {
    const fields: JSX.Element[] = [
      <div id="foo" />,
      <div id="bar" />,
      <div id={testId} />
    ];

    expect(findFieldIdx(fields, testId)).toBe(2);
  });
});


describe('enhanceFormMeta()', () => {
  describe('Minimal metadata config', () => {
    const minimalFieldMeta = metaMinimal.fields[0];
    const completedMeta = enhanceFormMeta(metaMinimal);
    const fieldMeta = completedMeta.fields[0];

    test('should not change size of "fields" array in meta data', () => {
      expect(completedMeta.fields.length).toBe(metaMinimal.fields.length);
    });

    test('should not change "id" property of field meta', () => {
      expect(minimalFieldMeta.id).toBeDefined();
      expect(fieldMeta.id).toBeDefined();
      expect(fieldMeta.id).toBe(minimalFieldMeta.id);
    });

    test('should add "renderer" object property to field meta', () => {
      expect(minimalFieldMeta['renderer']).toBeUndefined();
      expect(fieldMeta.renderer.type).toBe("text");
      expect(fieldMeta.renderer.config).toBeDefined();
    });

    test('should add "hidden" property to field meta with default value `false`', () => {
      expect(minimalFieldMeta['hidden']).toBeUndefined();
      expect(fieldMeta.hidden).toBe(false);
    });

    test('should add "disabled" property to field meta with default value `false`', () => {
      expect(minimalFieldMeta['disabled']).toBeUndefined();
      expect(fieldMeta.disabled).toBe(false);
    });

    test('should add "serializer" property to field meta with default value equals to field\'s id', () => {
      expect(minimalFieldMeta['serializer']).toBeUndefined();
      expect(fieldMeta.serializer).toBe(fieldMeta.id);
    });

    test('should add "actions" object property to field meta', () => {
      expect(minimalFieldMeta['actions']).toBeUndefined();
      expect(fieldMeta.actions).toBeDefined();
    });
  });
});


describe('extractFieldActions()', () => {
  function foo () {}
  function bar () {}
  function baz () {}

  const formActions = {
    'foo': foo,
    'bar': bar,
    'baz': baz
  };

  test('should join callback names with action handlers by action name', () => {
    const fieldActions = metaFieldActions.fields[0].actions;
    const result = extractFieldActions(formActions, fieldActions);

    expect(result['onClick']).toBe(foo);
    expect(result['onDoubleClick']).toBe(bar);
    expect(Object.keys(result)).toEqual(['onClick', 'onDoubleClick']);
  });

  test('should skip callback names that refers to absent action handlers', () => {
    const fieldActions = metaFieldActions.fields[1].actions;
    const result = extractFieldActions(formActions, fieldActions);

    expect(result['onClick']).toBe(foo);
    expect(result['onDoubleClick']).toBeUndefined();
    expect(Object.keys(result)).toEqual(['onClick']);
  });
});
