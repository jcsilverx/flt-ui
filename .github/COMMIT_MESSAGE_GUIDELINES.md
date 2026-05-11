# Commit Message Guidelines

We follow a precise format for Git commit messages to ensure readability and consistency across the project. This structure improves the commit history and enables automated changelog generation.

## General Commit

A commit message typically consists of three parts: a **header**, an optional **body**, and an optional **footer**.

```
<TYPE>(<SCOPE>): <SHORT_DESCRIPTION>
<EMPTY_LINE>
<BODY>
<EMPTY_LINE>
<FOOTER>
```

### Commit Message Header

The **header** includes a `type`, an optional `scope`, and a short `description`:

```
<TYPE>(<SCOPE>): <SHORT_DESCRIPTION>
```

- `<TYPE>` – the category of the change
- `<SCOPE>` – the part of the codebase affected
- `<SHORT_DESCRIPTION>` – a consise summary of the change

> **Note**: `<TYPE>` and `<SHORT_DESCRIPTION>` are **required**. `<SCOPE>` is **optional**.

#### Type

Use one of the following predefined types:

| Type       | Description                                                                            |
| ---------- | -------------------------------------------------------------------------------------- |
| `feat`     | Add or remove a new feature                                                            |
| `fix`      | Fix a bug                                                                              |
| `refactor` | Rewrite or restructure code without changing any public API behaviour                  |
| `perf`     | Improve performance (a subset of `refactor`)                                           |
| `style`    | Formatting changes that do **not** affect meaning (e.g., whitespace, semicolons, etc.) |
| `test`     | Add or fix tests                                                                       |
| `docs`     | Documentation-only changes                                                             |
| `build`    | Changes to build configuration, CI pipeline, dependencies, project version, etc.       |
| `ci`       | Changes to CI configuration files and scripts                                          |
| `chore`    | Routine tasks that don’t modify source or test files                                   |

#### Scope

<!-- TODO -->

The `scope` refers to the specific `npm` package or area of the codebase the change affects. Use the following scopes for this project:

<!-- TODO -->

Additional scopes:

<!-- TODO  -->

- _(empty string)_ – used for changes spanning multiple packages or not tied to a specific one

> **Note**: Do **not** use issue identifiers as scopes.

#### Description

The **description** is a brief summary of the change.

- Use **imperative, present tense**: "change" not "changed" nor "changes"
- Do **not** capitalize the first letter
- Do **not** end with a period (`.`)

### Commit Message Body

The body should include the motivation for the change and contrast this with previous behaviour.

- The **body** is **optional**
- Use **imperative, present tense**: "fix" not "fixed" nor "fixes"

### Commit Message Footer

The **footer** includes issue references and notes about breaking changes.

- The **footer** is **optional**, unless the commit introduces a breaking change
- Reference issues using keywords such as `Closes #123`, `Fixes JIRA-456`
- For breaking changes, start with `BREAKING CHANGE`: followed by an explanation
  - For a single-line explanation, use:
    ```
    BREAKING CHANGE: description of the change
    ```
  - For multi-line explanations, leave two newlines after `BREAKING CHANGE`:

### Revert Commits

If you're reverting a previous commit:

- Start the message with `revert:`, followed by the original commit’s header
- In the body, include:

  ```
  This reverts commit <SHA>.
  ```

- Add a clear explanation of why the commit is being reverted

> ℹ️ This is adapted from [Angular's commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular).
