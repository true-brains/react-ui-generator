import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { cloneDeep } from 'lodash';

import { GeneratedForm } from '../../src/components/GeneratedForm';
import {
  FieldRenderer,
  FieldRendererProps,
  RawMetaDescription
} from '../../src/interfaces';

import metaMinimal from '../../examples/meta/minimal';

class Text extends FieldRenderer {
  render() {
    const { id, disabled } = this.props;

    return (
      <div
        id={id}
        className={`${disabled ? 'disabled-' : ''}text-renderer`}
      />
    );
  }
}

const mockRenderers = {
  text: Text
};

describe('<GeneratedForm />', () => {
  const getFormInstace = ({ meta }) => (
    <GeneratedForm
      className="testForm"
      meta={meta}
      data={{}}
      errors={{}}
      actions={{}}
      validator={null}
      renderers={mockRenderers}
      onChange={() => {}}
    />
  );
  test('should render "text" renderer if renderer not specified', () => {
    const wrapper = render(getFormInstace({ meta: metaMinimal }));

    expect(wrapper.find('.text-renderer').length).toBe(3);
  });

  test('should not render hidden fields', () => {
    const meta: RawMetaDescription = cloneDeep(metaMinimal);
    meta.fields[1].hidden = true;
    const wrapper = render(getFormInstace({ meta }));

    expect(wrapper.find('.text-renderer').length).toBe(2);
  });

  test('should propagate `id` property to field renderers', () => {
    const wrapper = render(getFormInstace({ meta: metaMinimal }));

    expect(wrapper.find('#foo').length).toBe(1);
    expect(wrapper.find('#bar').length).toBe(1);
    expect(wrapper.find('#baz').length).toBe(1);
  });

  test('should propagate `disabled` property to field renderers', () => {
    const meta: RawMetaDescription = cloneDeep(metaMinimal);
    meta.fields[0].disabled = true;
    meta.fields[1].disabled = true;
    const wrapper = render(getFormInstace({ meta }));

    expect(wrapper.find('.text-renderer').length).toBe(1);
    expect(wrapper.find('.disabled-text-renderer').length).toBe(2);
  });
});
