import React from "react";
import { createUseStyles } from "react-jss";

import {
  GeneratedForm,
  GeneratedFormProps,
  GeneratedFormState,
  FormMetaDescription,
  RenderersRepo,
  enhanceFormMeta
} from "@react-ui-generator/core";

import { FieldEditorHOC } from "./FieldEditor";

interface FormEditorProps extends GeneratedFormProps {
  styles: Record<"FormEditorChrome" | "ChromeButtons" | "EditButton", any>;
  onMetaChanged?(newMeta: FormMetaDescription): void;
}

interface FormEditorState extends GeneratedFormState {
  inEdit: boolean;
  originalMeta: FormMetaDescription;
  metaBeforeUpdate: FormMetaDescription;
}

const meta: FormMetaDescription = { fields: [] };

interface ChromeProps extends FormEditorProps {
  styles: Record<"FormEditorChrome" | "ChromeButtons" | "EditButton", any>;
}

/**
 * Hack for using hook-based API of react-jss
 * in the constructed component <FormEditor />.
 */
export function Chrome(props: ChromeProps) {
  const useStyles = createUseStyles({
    FormEditorChrome: {
      display: "flex",
      flexDirection: "column"
    },
    ChromeButtons: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center"
    },
    EditButton: {
      backgroundColor: "white",
      border: "1px solid gray",
      borderRadius: "3px",
      margin: 5
    },
    ...props.styles
  });

  const styles = useStyles();

  return <FormEditor {...props} styles={styles} />;
}

export class FormEditor extends React.PureComponent<
  FormEditorProps,
  FormEditorState
> {
  state = {
    meta,
    originalMeta: meta,
    metaBeforeUpdate: meta,
    inEdit: false
  };

  constructor(props: FormEditorProps) {
    super(props);

    this.handleStartEdit = this.handleStartEdit.bind(this);
    this.handleFinishEdit = this.handleFinishEdit.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
  }

  static getDerivedStateFromProps(
    props: FormEditorProps,
    state: FormEditorState
  ) {
    if (props.meta !== state.originalMeta) {
      const completeMeta = enhanceFormMeta(props.meta);
      return {
        meta: completeMeta,
        metaBeforeUpdate: completeMeta,
        originalMeta: props.meta,
        inEdit: false
      };
    }

    return null;
  }

  getEditableMeta(meta: FormMetaDescription): FormMetaDescription {
    const nextFields = (meta.fields || []).map(item => {
      return { ...item, disabled: true };
    });

    return { fields: nextFields };
  }

  getEditableRenderers(): RenderersRepo {
    return Object.entries(this.props.renderers).reduce(
      (acc, [type, Renderer]) => {
        return {
          ...acc,
          [type]: FieldEditorHOC(Renderer)
        };
      },
      {}
    );
  }

  handleStartEdit() {
    this.setState({
      inEdit: true,
      meta: this.getEditableMeta(this.state.meta)
    });
  }

  handleFinishEdit() {
    const { onMetaChanged } = this.props;
    const { meta } = this.state;

    this.setState(
      {
        inEdit: false,
        metaBeforeUpdate: meta
      },
      () => {
        onMetaChanged && onMetaChanged(meta);
      }
    );
  }

  handleCancelEdit() {
    this.setState({
      inEdit: false,
      meta: this.state.metaBeforeUpdate
    });
  }

  render() {
    const { styles, renderers } = this.props;
    const { meta, inEdit } = this.state;
    const resolvedRenderers = inEdit ? this.getEditableRenderers() : renderers;

    return (
      <div className={`form-editor-chrome ${styles.FormEditorChrome}`}>
        <div className={`chrome-buttons ${styles.ChromeButtons}`}>
          {inEdit ? (
            <>
              <button
                className={`edit-button ${styles.EditButton}`}
                onClick={this.handleFinishEdit}
              >
                Save
              </button>

              <button
                className={`edit-button ${styles.EditButton}`}
                onClick={this.handleCancelEdit}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className={`edit-button ${styles.EditButton}`}
              onClick={this.handleStartEdit}
            >
              Edit
            </button>
          )}
        </div>

        <GeneratedForm
          {...this.props}
          meta={meta}
          renderers={resolvedRenderers}
        />
      </div>
    );
  }
}
