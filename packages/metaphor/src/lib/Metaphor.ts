import cloneDeep from 'lodash-es/cloneDeep'
import get from 'lodash-es/get'
import set from 'lodash-es/set'
import invariant from 'invariant'

import {
  RawMetaDescription,
  FormMetaDescription,
  FieldMetaDescription,
  enhanceFormMeta,
  enhanceFieldMeta,
  findFieldMetaById,
} from '@react-ui-generator/core'

import { FieldPart } from '../'

export interface IdsToProcess {
  [key: string]: boolean
}

export type FieldBooleanProps = 'hidden' | 'disabled'

class Metaphor {
  private meta: FormMetaDescription

  constructor(baseMeta: RawMetaDescription) {
    this.meta = enhanceFormMeta(baseMeta)
  }

  togglePropByFieldIds(
    propName: FieldBooleanProps,
    value: boolean,
    reverseIfNotMatch?: boolean,
    ids?: string[] | string
  ): Metaphor {
    const idsArray = typeof ids === 'string' ? [ids] : ids
    const fieldsToProcess: IdsToProcess = idsArray
      ? idsArray.reduce((acc, id) => ({ ...acc, [id]: true }), {})
      : {}

    for (let fieldMeta of this.meta.fields) {
      const fieldId = fieldMeta.id

      if (ids === undefined || fieldsToProcess[fieldId]) {
        fieldMeta[propName] = value
      } else if (reverseIfNotMatch) {
        fieldMeta[propName] = !value
      }
    }

    return this
  }

  value(): FormMetaDescription {
    return cloneDeep(this.meta)
  }

  get(path: string) {
    const [fieldId, ...tokens] = path.split('.')
    const fieldMeta = findFieldMetaById(fieldId, this.meta.fields)
    return get(fieldMeta, tokens)
  }

  set(path: string, value: any) {
    const [fieldId, ...tokens] = path.split('.')
    const fieldMeta = findFieldMetaById(fieldId, this.meta.fields)
    set(fieldMeta, tokens, value)

    return this
  }

  show(fieldsToShow?: string[] | string, hideNotMatched?: boolean): Metaphor {
    return this.togglePropByFieldIds(
      'hidden',
      false,
      hideNotMatched,
      fieldsToShow
    )
  }

  showAll(): Metaphor {
    return this.show()
  }

  hide(fieldsToHide?: string[] | string, showNotMatched?: boolean): Metaphor {
    return this.togglePropByFieldIds(
      'hidden',
      true,
      showNotMatched,
      fieldsToHide
    )
  }

  hideAll(): Metaphor {
    return this.hide()
  }

  enable(
    fieldsToEnable?: string[] | string,
    disableNotMatched?: boolean
  ): Metaphor {
    return this.togglePropByFieldIds(
      'disabled',
      false,
      disableNotMatched,
      fieldsToEnable
    )
  }

  enableAll(): Metaphor {
    return this.enable()
  }

  disable(
    fieldsToDisable?: string[] | string,
    enableNotMatched?: boolean
  ): Metaphor {
    return this.togglePropByFieldIds(
      'disabled',
      true,
      enableNotMatched,
      fieldsToDisable
    )
  }

  disableAll(): Metaphor {
    return this.disable()
  }

  /**
   * Clones an existing field. Allows to append a cloned field
   * just after the original, or to the end of form.
   */
  clone(
    idSrc: string,
    idTarget: string,
    appendToSrc: boolean = true
  ): Metaphor {
    const { fields } = this.meta
    const idxSrc = getFieldIdx(idSrc, fields)

    invariantFieldUnique(idTarget, fields)

    const fieldMeta = cloneDeep(findFieldMetaById(idSrc, fields))
    fieldMeta.id = idTarget

    if (appendToSrc) {
      fields.splice(idxSrc + 1, 0, fieldMeta)
    } else {
      fields.push(fieldMeta)
    }

    return this
  }

  /**
   * Creates a new field. Allows to append it under one of existing fields
   * or to the end of form.
   */
  add(fieldId: string, type: string, underId?: string): Metaphor {
    const { fields } = this.meta

    invariantFieldUnique(fieldId, fields)

    const rawMeta = { id: fieldId, renderer: type }
    const completeMeta = enhanceFieldMeta(rawMeta)

    if (underId) {
      const idx = getFieldIdx(underId, fields)
      fields.splice(idx + 1, 0, completeMeta)
    } else {
      fields.push(completeMeta)
    }

    return this
  }

  remove(fieldId: string): Metaphor {
    const { fields } = this.meta
    const idx = getFieldIdx(fieldId, fields)

    fields.splice(idx, 1)
    return this
  }

  get config(): FieldPart {
    return new FieldPart(this, 'renderer.config')
  }

  get actions(): FieldPart {
    return new FieldPart(this, 'actions')
  }
}

export function notFoundMessage(id: string): string {
  return `Field with id "${id}" is not found.`
}

export function inUseMessage(id: string): string {
  return `Id "${id}" is already in use.`
}

export function invariantFieldUnique(fieldId: string, fields: FieldMetaDescription[]) {
  invariant(
    fields.every(item => item.id !== fieldId),
    inUseMessage(fieldId)
  )
}

export function getFieldIdx(fieldId: string, fields: FieldMetaDescription[]): number {
  const idx = fields.findIndex(item => item.id === fieldId)

  invariant(idx !== -1, notFoundMessage(fieldId))
  return idx
}

export default Metaphor
