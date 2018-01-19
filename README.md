# react-ui-generator a.k.a "CRUD-hammer"

**WARNING: THIS PROJECT IS UNDER ACTIVE DEVELOPMENT**

Set of libraries and tools for generation React-based UI from metadata.
Bloody enterprise is not so scaring when you have CRUD-hammer!

<blockquote>
<p>Let amazingResult be the result of doing some amazing things. </p>
<i>"DOM Living Standard"</i>
</blockquote>


## Features

- easy to generate form from the simple metadata description;
- set up custom layout on JSX (not on metadata, because markup-on-json is pain);
- easy to add a custom types of fields (renderers);
- easy to add custom layouts;
- pure! (no state, just props). Easy to integrate with frameworks (Redux, etc);
- nested forms (in progress). Easy to implement dynamic forms (add/remove fields at runtime, etc).

## TODO

- complete this README.md
- ...

## Lerna management

### Add dependency to choosen package

```sh
lerna add ajv --scope=@react-ui-generator/demo
```
