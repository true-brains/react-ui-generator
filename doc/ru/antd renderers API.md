# API отрисовщиков на базе библиотеки Ant Design

## Тип отрисовщика "text"

Возможные настройки для данного типа отрисовщика:

```js
{
  "type": "text",
  "config": {
    "label": "...",
    "placeholder": "...",
    "showAsterix": true|false,
  }
}
```

## Тип отрисовщика "textarea"

Возможные настройки для данного типа отрисовщика:

```js
{
  "type": "textarea",
  "config": {
    "label": "...",
    "placeholder": "...",
    "showAsterix": true|false,
    "rows": number
  }
}
```

## Тип отрисовщика "checkbox"

Возможные настройки для данного типа отрисовщика:

```js
{
  "type": "checkbox",
  "config": {
    "label": "...",
    "title": "...",
    "showAsterix": true|false,
  }
}
```

## Тип отрисовщика "radiogroup"

Возможные настройки для данного типа отрисовщика:

```js
{
  "type": "radiogroup",
  "config": {
    "label": "...",
    "showAsterix": true|false,
    "options": [
      { "id": ..., "title": "..." },
      ...
    ]
  }
}
```

## Тип отрисовщика "select"

Возможные настройки для данного типа отрисовщика:

```js
{
  "type": "select",
  "config": {
    "label": "...",
    "title": "...",
    "showAsterix": true|false,
    "options": [
      { "id": ..., "title": "..." },
      ...
    ]
  }
}
```

## Тип отрисовщика "button"

Возможные настройки для данного типа отрисовщика:

```js
{
  "type": "button",
  "config": {
    "title": "...",
    "color": "primary|ghost|dashed|danger",
    "outline": true|false
  }
}
```
