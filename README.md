# Miliastra Tools

Browser-based utilities for editing and generating Miliastra `.gia` exports and variable `.json` files.

The GitHub Pages site is intentionally **client-side only**: opened files stay in the browser and are not uploaded by the editor.

## Repository layout

```text
index.html          App shell / semantic layout
assets/
  styles.css        Visual system, responsive layout, component styling
  icon.svg          Site/app icon
  js/
    templates.js    Embedded validated GIA fixtures
    core.js         Binary/protobuf helpers
    gia.js          GIA parsers, models, serializers
    json.js         JSON variable models and schema helpers
    state.js        Shared app state, history, clipboard, DOM registry
    ui-gia.js       GIA editor rendering and interactions
    ui-json.js      Recursive JSON visual editor
    io.js           Open/export + CSV import
    builders.js     Build New workflows
    events.js       Modal + global event wiring
```

## Development principles

- Keep file processing local to the browser.
- Preserve existing element IDs when changing layout; the editor scripts bind directly to them.
- Prefer automatic application of edits over confirmation clicks.
- Keep destructive bulk actions explicit and undoable.
- New GIA serializers should be based on validated exports rather than guessed binary fields.
- Keep variable names within the known 20-character limit.

## Supported workflows

- Open/edit/export supported GIA files.
- Build Single Choice, Tab Page, Deck Selector, and Structure GIA files.
- Open/edit/build supported variable JSON exports.
- CSV import where supported.
- Undo/redo, filtering, copy/paste, reordering, and keyboard shortcuts.

## Iterating on the UI

The presentation layer is isolated in `assets/styles.css`, so most visual/UX work should not require touching parsing logic. Structural HTML changes belong in `index.html`; behavior changes should go into the matching file under `assets/js/`. Keep script order in `index.html` intact because the editor intentionally uses classic browser scripts with shared state.
