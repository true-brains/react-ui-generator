# react-ui-generator a.k.a "CRUD-hummer"

Set of libraries and tools for generation React-based UI from metadata.
Bloody enterprise is not so scaring when you have CRUD-hummer!

<blockquote>
<p>Let amazingResult be the result of doing some amazing things. </p>
<i>"DOM Living Standard"</i>
</blockquote>


## Features

- easy to generate form from the simple metadata description;
- set up custom layout on JSX (not on metadata, becouse markup-on-json is pain);
- easy to add a custom types of fields (renderers);
- easy to add a custom layouts;
- pure! (no state, just props). Easy to integrate with frameworks (Redux, etc);
- nested forms (in progress). Easy to implement dynamic forms (add field at runtime, etc).

## Lerna management

### Add dependency to choosen package

```sh
lerna add ajv --scope=@react-ui-generator/demo
```