import 'regenerator-runtime/runtime';

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import cloneDeep from 'lodash-es/cloneDeep';

import { GeneratedForm } from '../../src/components/GeneratedForm';
import { Layout } from '../../src/components/Layout';
import { Fields } from '../../src/components/Fields';
import { FieldRenderer } from '../../src/interfaces';

import metaMinimal from '../../examples/meta/minimal';

class Text extends FieldRenderer {
  render() {
    const { id, disabled } = this.props;

    return (
      <div id={id} className={`${disabled ? 'disabled-' : ''}text-renderer`}>
        {`text-renderer${disabled ? '-disabled' : ''}: ${id}`}
      </div>
    );
  }
}

class CustomRenderer extends FieldRenderer {
  render() {
    return <div>custom-renderer</div>;
  }
}

class DefaultConfig extends FieldRenderer {
  render() {
    const { config } = this.props;
    return <div>{config ? 'has config' : 'no config'}</div>;
  }
}

class CustomConfig extends FieldRenderer {
  render() {
    return <div>{this.props.config.test}</div>;
  }
}

class CustomOnChange extends FieldRenderer {
  render() {
    return (
      <div className="custom-on-change" onClick={() => this.props.onChange('test', [])} />
    );
  }
}

const mockRenderers: { [key: string]: typeof FieldRenderer } = {
  text: Text,
  customRenderer: CustomRenderer,
  defaultConfig: DefaultConfig,
  customConfig: CustomConfig,
  customOnChange: CustomOnChange
};

describe('<GeneratedForm />', () => {
  const getFormInstace = ({ meta, onChange = () => {} }) => (
    <GeneratedForm
      className="testForm"
      meta={meta}
      data={{}}
      errors={{}}
      dirtiness={{}}
      actions={{}}
      validator={null}
      renderers={mockRenderers}
      onChange={onChange}
    />
  );

  afterEach(cleanup);

  describe('Metadata completion and propagation', () => {
    test('should render "text" renderer if renderer not specified', () => {
      const { getAllByText } = render(getFormInstace({ meta: metaMinimal }));

      expect(getAllByText(/text-renderer/).length).toEqual(3);
    });

    test('should propagate `id` property to field renderers', () => {
      const { getAllByText } = render(getFormInstace({ meta: metaMinimal }));

      expect(getAllByText(/foo/).length).toBe(1);
      expect(getAllByText(/bar/).length).toBe(1);
      expect(getAllByText(/baz/).length).toBe(1);
    });

    test('should propagate `disabled` property to field renderers', () => {
      const meta: any = cloneDeep(metaMinimal);
      meta.fields[0].disabled = true;
      meta.fields[1].disabled = true;
      const { getAllByText } = render(getFormInstace({ meta }));

      expect(getAllByText(/text-renderer:/).length).toEqual(1);
      expect(getAllByText(/text-renderer-disabled/).length).toEqual(2);
    });

    test('should propagate empty object as `config` property to field renderers, if it not specified', () => {
      const meta: any = cloneDeep(metaMinimal);
      meta.fields[1].renderer = 'defaultConfig';
      const { getAllByText } = render(getFormInstace({ meta }));

      expect(getAllByText('has config').length).toBe(1);
    });

    test('should propagate `config` property to field renderers', () => {
      const meta: any = cloneDeep(metaMinimal);
      const testText = 'config test';

      meta.fields[2].renderer = {
        type: 'customConfig',
        config: { test: testText }
      };

      const { getAllByText } = render(getFormInstace({ meta }));

      expect(getAllByText(testText).length).toBe(1);
    });
  });

  describe('Rendering', () => {
    test('should not render hidden fields', () => {
      const meta: any = cloneDeep(metaMinimal);
      meta.fields[1].hidden = true;
      const { getAllByText } = render(getFormInstace({ meta }));

      expect(getAllByText(/text-renderer/).length).toBe(2);
    });

    test('should choose field renderer by the value of `renderer` field', () => {
      const meta: any = cloneDeep(metaMinimal);
      meta.fields[1].renderer = 'customRenderer';
      const { getAllByText } = render(getFormInstace({ meta }));

      expect(getAllByText(/text-renderer/).length).toBe(2);
      expect(getAllByText(/custom-renderer/).length).toBe(1);
    });

    // test('')
  });
});
