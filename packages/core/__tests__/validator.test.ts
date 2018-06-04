import { buildValidator } from '../src/validator';

describe('buildValidator()', () => {
  test('should return function, that calls original `validatorFn`, when is called', () => {
    const mockFn = jest.fn();
    const validator = buildValidator(mockFn, {});

    validator({});
    expect(mockFn.mock.calls.length).toBe(1);
  });

  describe('constructed validator function', () => {
    test('should return object with errors list for each field from original data', () => {
      const mockFn = jest.fn();
      const validator = buildValidator(mockFn, {});
      const data = { foo: '', bar: '', baz: '', };
      const { errors } = validator(data);

      expect(Object.keys(errors)).toEqual(['foo', 'bar', 'baz']);
    });

    test('should return empty array of errors for valid fields', () => {
      const validatorFn = (arg: any) => ({ errors: {} });
      const validator = buildValidator(validatorFn, {});
      const data = { foo: '', bar: '', baz: '', };
      const { errors } = validator(data);

      expect(errors).toEqual({ foo: [], bar: [], baz: [] });
    });

    test('should return errors from `validatorFn` output for invalid fields', () => {
      const returnedErrors = { foo: ['foo error'] };
      const validatorFn = (arg: any) => ({ errors: returnedErrors });
      const validator = buildValidator(validatorFn, {});
      const data = { foo: '', bar: '', baz: '', };
      const { errors } = validator(data);

      expect(errors).toEqual({ foo: returnedErrors.foo, bar: [], baz: [] });
    });
  })
});
