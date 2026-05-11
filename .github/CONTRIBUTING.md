# Contributing

Thank you for considering contributing to this project! Please take a moment to review this document before opening a pull request.

## Code of Conduct

This project has adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as its Code of Conduct, and we expect all participants to adhere to it.

Please read [the full text](/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## Questions

If you have any questions, you can ask in our [GitHub Discussions - Q&A](https://github.com/flt-ui/ui/discussions/categories/q-a).

## Monorepo

The `flt-ui/ui` repo is a monorepo using `pnpm` workspaces.

## How to Contribute

There are many ways to contribute to the project.

- **Support**: Help others in the community by answering questions in [GitHub Discussions - Q&A](https://github.com/flt-ui/ui/discussions/categories/q-a) or providing solutions for others in [open issues](https://github.com/flt-ui/ui/issues).

- **Ideas**: Share your ideas in [GitHub Discussions - Ideas](https://github.com/flt-ui/ui/discussions/categories/ideas) for new features or improvements. We welcome suggestions that can enhance the project.

- **Report**: Report bugs or anything that is not working as expected by creating an [issue](https://github.com/flt-ui/ui/issues).

- **Feedback**: Tell us what is going well or where there is improvement opportunities.

## Working on your first Pull Request?

There are a lot of great resources to help you create a good pull request. Check out this free video series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github). We appreciate all contributions and are excited to see what you’ll bring to the project!

## Preparing a Pull Request

We always welcome [Pull Requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). However, before working on a significant change, we recommend opening an issue to discuss your ideas with the maintainers. This helps ensure alignment and facilitates a smoother review process.

To make your Pull Request easier to review and more likely to be accepted, keep it concise. Aim to address a single feature or bug fix per PR; it’s often more effective to submit multiple smaller PRs rather than a single large one. This approach not only simplifies the review process but also makes it easier to track changes.

1. [Fork the repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)

2. Clone the fork to your local machine:

```sh
git clone https://github.com/<YOUR_GITHUB_USERNAME>/ui.git
```

3. Add upstream remote:

```sh
cd ui
git remote add upstream https://github.com/flt-ui/ui.git
```

4. Synchronize your local `main` branch with the upstream remote:

```sh
git checkout main
git pull upstream main
```

5. Install dependencies with [pnpm](https://pnpm.io/):

   > **Note**: If `pnpm` isn't enabled on your system, you can enable it using [`corepack`](https://nodejs.org/api/corepack.html):
   >
   > ```sh
   > corepack enable pnpm
   > ```

Then, run:

```sh
pnpm install
```

6. Create a new branch related to your PR (the branch name must be written in lowercase)

```sh
git checkout -b <BRANCH_TYPE>/<BRANCH_NAME>
```

- `<BRANCH_TYPE>` is the type of change (e.g., `feat`, `fix`, `chore`, etc.).
- `<BRANCH_NAME>` should be a short, descriptive name for the change you’re making.

7. Make changes, then [commit](./COMMIT_MESSAGE_GUIDELINES.md) and push to your fork:

```sh
git push -u origin HEAD
```

8. Go to [the repository](https://github.com/flt-ui/ui.git) and create a [Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

9. Once your pull request is created, we will review it and either merge it, request changes or clarifications, or close it with an explanation.
