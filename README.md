# Miliastra Tools

Browser-based utilities for editing and generating Miliastra `.gia` exports and variable `.json` files.

The GitHub Pages site is intentionally **client-side only**: opened files stay in the browser and are not uploaded by the editor.

## Current layout

```text
index.html       GitHub Pages shell, product styling, and compatibility loader
assets/
  icon.svg       Site/app icon
```

The current editor engine is pinned to the last known-good v12 commit and loaded into the new shell. This keeps all validated GIA/JSON behavior unchanged while the interface can be iterated independently. The next structural cleanup is to extract that pinned engine into normal source modules in this repository, without changing serialization behavior.

## Development principles

- Keep file processing local to the browser.
- Preserve validated GIA/JSON serialization behavior during UI refactors.
- Prefer automatic application of edits over confirmation clicks.
- Keep destructive bulk actions explicit and undoable.
- Base new GIA serializers on validated exports rather than guessed binary fields.
- Keep variable names within the known 20-character limit.
- Optimize common editing flows for as few clicks as practical.

## Supported workflows

- Open/edit/export supported GIA files.
- Build Single Choice, Tab Page, Deck Selector, and Structure GIA files.
- Open/edit/build supported variable JSON exports.
- CSV import where supported.
- Undo/redo, filtering, copy/paste, reordering, and keyboard shortcuts.

## Iteration plan

1. Keep the current pinned engine as the compatibility baseline.
2. Refine layout, hierarchy, responsive behavior, and quick-edit workflows.
3. Extract parsing/serialization, app state, GIA UI, JSON UI, builders, and I/O into separate source files.
4. Add small regression fixtures for every validated GIA type before deeper serializer changes.

This separation lets visual work move quickly without risking the binary formats we have already verified in Miliastra.