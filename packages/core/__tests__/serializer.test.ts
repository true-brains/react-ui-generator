import { serializeToObject } from '../src/serializer';


describe('serializeToObject()', () => {
  test('should extract value from object in `GeneratedForm` data\'s format', () => {
    const data = {
      field1: { value: 'foo' },
      field2: { value: 'bar' },
      field3: { value: 'baz' },
    }

    const serialized = {
      field1: 'foo',
      field2: 'bar',
      field3: 'baz',
    }

    expect(serializeToObject(data)).toEqual(serialized);
  });

  test('should correctly process subform data ("list" subform type)', () => {
    const data = {
      field1: { value: 'foo' },
      field2: {
        value: [
          { subField: { value: 'bar1' } },
          { subField: { value: 'bar2' } },
          { subField: { value: 'bar3' } },
        ],
      },
      field3: { value: 'baz' },
    }

    const serialized = {
      field1: 'foo',
      field2: [
        { subField: 'bar1' },
        { subField: 'bar2' },
        { subField: 'bar3' },
      ],
      field3: 'baz',
    }

    expect(serializeToObject(data)).toEqual(serialized);
  });

  test('should correctly process subform data ("form" subform type)', () => {
    const data = {
      field1: { value: 'foo' },
      field2: {
        value: {
          subField1: { value: 'bar1' },
          subField2: { value: 'bar2' },
          subField3: { value: 'bar3' },
        },
      },
      field3: { value: 'baz' },
    }

    const serialized = {
      field1: 'foo',
      field2: {
        subField1: 'bar1',
        subField2: 'bar2',
        subField3: 'bar3',
      },
      field3: 'baz',
    }

    expect(serializeToObject(data)).toEqual(serialized);
  });


  test('should correctly process deeply nested subform data', () => {
    const data = {
      field1: { value: 'foo' },

      field2: {
        value: [
          {
            subField1: {
              value: [
                { subField1_1: { value: 'bar1_1'} },
                { subField1_1: { value: 'bar1_1'} },
                { subField1_1: { value: 'bar1_1'} },
              ]
            },
            subField2: { value: 'bar2' }
          },
        ],
      },

      field3: {
        value: {
          subField1: { value: 'baz1' },
          subField2: {
            value: {
              subField2_1: { value: 'baz2_1' },
              subField2_2: { value: 'baz2_2' },
            }
          },
        }
      },
    }

    const serialized = {
      field1: 'foo',
      field2: [
        {
          subField1: [
            { subField1_1: 'bar1_1' },
            { subField1_1: 'bar1_1' },
            { subField1_1: 'bar1_1' }
          ],

          subField2: 'bar2',
        },
      ],

      field3: {
        subField1: 'baz1',
        subField2: {
          subField2_1: 'baz2_1',
          subField2_2: 'baz2_2',
        }
      }
    }

    expect(serializeToObject(data)).toEqual(serialized);
  });
});
