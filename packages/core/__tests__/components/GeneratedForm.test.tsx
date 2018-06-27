import React from 'react';
import { shallow, render, mount } from '@pisano/enzyme';
import sinon from 'sinon';
import { cloneDeep } from 'lodash';

import { GeneratedForm } from '../../src/components/GeneratedForm';
import { Layout } from '../../src/components/Layout';
import { Fields } from '../../src/components/Fields';
import { FieldRenderer } from '../../src/interfaces';

import metaMinimal from '../../examples/meta/minimal';

class Text extends FieldRenderer {
  render() {
    const { id, disabled } = this.props;

    return <div id={id} className={`${disabled ? 'disabled-' : ''}text-renderer`} />;
  }
}

class CustomRenderer extends FieldRenderer {
  render() {
    return <div className="custom-renderer" />;
  }
}

class DefaultConfig extends FieldRenderer {
  render() {
    const { config } = this.props;
    return <div className={`${config ? 'has-config' : 'no-config'}`} />;
  }
}

class CustomConfig extends FieldRenderer {
  render() {
    return <div className={`${this.props.config.test}`} />;
  }
}

class CustomOnChange extends FieldRenderer {
  render() {
    return (
      <div className='custom-on-change' onClick={() => this.props.onChange('test', [])} />
    );
  }
}

const mockRenderers: { [key: string]: typeof FieldRenderer } = {
  text: Text,
  customRenderer: CustomRenderer,
  defaultConfig: DefaultConfig,
  customConfig: CustomConfig,
  customOnChange: CustomOnChange,
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

  describe('Metadata completion and propagation', () => {
    test('should render "text" renderer if renderer not specified', () => {
      const wrapper = render(getFormInstace({ meta: metaMinimal }));

      expect(wrapper.find('.text-renderer').length).toBe(3);
    });

    test('should propagate `id` property to field renderers', () => {
      const wrapper = render(getFormInstace({ meta: metaMinimal }));

      expect(wrapper.find('#foo').length).toBe(1);
      expect(wrapper.find('#bar').length).toBe(1);
      expect(wrapper.find('#baz').length).toBe(1);
    });

    test('should propagate `disabled` property to field renderers', () => {
      const meta: any = cloneDeep(metaMinimal);
      meta.fields[0].disabled = true;
      meta.fields[1].disabled = true;
      const wrapper = render(getFormInstace({ meta }));

      expect(wrapper.find('.text-renderer').length).toBe(1);
      expect(wrapper.find('.disabled-text-renderer').length).toBe(2);
    });

    test('should propagate empty object as `config` property to field renderers, if it not specified', () => {
      const meta: any = cloneDeep(metaMinimal);
      meta.fields[1].renderer = 'defaultConfig';
      const wrapper = render(getFormInstace({ meta }));

      expect(wrapper.find('.has-config').length).toBe(1);
    });

    test('should propagate `config` property to field renderers', () => {
      const meta: any = cloneDeep(metaMinimal);
      const testClass = 'config-test';

      meta.fields[2].renderer = {
        type: 'customConfig',
        config: { test: testClass }
      };

      const wrapper = render(getFormInstace({ meta }));

      expect(wrapper.find(`.${testClass}`).length).toBe(1);
    });
  });

  describe('Rendering', () => {
    test('should not render hidden fields', () => {
      const meta: any = cloneDeep(metaMinimal);
      meta.fields[1].hidden = true;
      const wrapper = render(getFormInstace({ meta }));

      expect(wrapper.find('.text-renderer').length).toBe(2);
    });

    test('should choose field renderer by the value of `renderer` field', () => {
      const meta: any = cloneDeep(metaMinimal);
      meta.fields[1].renderer = 'customRenderer';
      const wrapper = render(getFormInstace({ meta }));

      expect(wrapper.find('.text-renderer').length).toBe(2);
      expect(wrapper.find('.custom-renderer').length).toBe(1);
    });

    test('should use <Layout /> for fields layouting', () => {
      const meta: any = cloneDeep(metaMinimal);
      const wrapper = mount(getFormInstace({ meta }));

      expect(wrapper.find(Layout).length).toBe(1);
      wrapper.unmount();
    });

    test('should use <Fields /> layout if layout is not specified', () => {
      const meta: any = cloneDeep(metaMinimal);
      const wrapper = mount(getFormInstace({ meta }));

      expect(wrapper.find(Fields).length).toBe(1);
      wrapper.unmount();
    });

    test('should not use <Fields /> layout if layout isspecified', () => {
      const meta: any = cloneDeep(metaMinimal);
      const Component = (props) => getFormInstace({ meta });
      const wrapper = mount(
        <GeneratedForm
          className="testForm"
          meta={meta}
          data={{}}
          errors={{}}
          dirtiness={{}}
          actions={{}}
          validator={null}
          renderers={mockRenderers}
          onChange={() => {}}
        >
          <div className="custom-layout" />
        </GeneratedForm>
      );

      expect(wrapper.find(Fields).length).toBe(0);
      expect(wrapper.find('.custom-layout').length).toBe(1);
      wrapper.unmount();
    });
  });

  describe('Interaction', () => {
    test('should call `props.onChange` for every field `onChange`s', () => {
      const meta: any = cloneDeep(metaMinimal);
      meta.fields[1].renderer = 'customOnChange';

      const onChange = sinon.spy();
      const wrapper = mount(getFormInstace({ meta, onChange }));

      expect(wrapper.find('.custom-on-change').length).toBe(1);
      wrapper.find('.custom-on-change').simulate('click');
      expect(onChange.calledOnce).toEqual(true);
    });

    test('should call `props.onChange` with `data`, `errors`, `isValid` and `dirtiness` arguments', () => {
      const meta: any = cloneDeep(metaMinimal);
      meta.fields[1].renderer = 'customOnChange';

      const onChange = sinon.spy();
      const wrapper = mount(getFormInstace({ meta, onChange }));

      wrapper.find('.custom-on-change').simulate('click');
      expect(onChange.args[0].length).toEqual(4);
    });

    test('should enhance `data` arguments of `props.onChange` with field\'s returned value', () => {
      const meta: any = cloneDeep(metaMinimal);
      meta.fields[1].renderer = 'customOnChange';

      const onChange = sinon.spy();
      const wrapper = mount(getFormInstace({ meta, onChange }));

      wrapper.find('.custom-on-change').simulate('click');
      expect(onChange.args[0][0]).toEqual({ 'bar': 'test' });
    });
  });
});
