
- `DESIGN.md`: document explaining the architecture of the application.
- `UI_DESIGN.md`: Read it before doing UI work. It defines the aspect of the software. This applies to all software built under this repo (mobile, web, etc) that is user-facing.

## Workflow

For big tasks, you should draft a plan before proceeding. Write it in your own private artifacts directory in `.artifacts/agents/`.
Also, write what you do to a `LOG.md` file, also in that directory.

If you are working on UI work and the change is localized, you should take a screenshot of the before. You can avoid this if you are implementing something form scratch (like a new screen).
After you finish, take screenshots and save them into your own private artifacts directory.
For capturing the result, the preferred tools are:

- web: Playwright
- mobile, Flutter: emulator (in headless mode) + Maestro

Read PROOF_GUIDE.md for more details on how to capture the result.



## Important

When coding, ensure that errors are notified. Do not show them in the UI, but instead use a logger. First check if the project already has a logger. If there is no logging interface / class, you can implement one. Do it in its own file, and then proceed to use it.

Avoid doing quick solutions or duplicating logic to provide easy solutions.

If you can't solve a problem, do not try a complete workaround just to complete the task. If you are asked for a set of screenshots of the app, for example, do not just create mockups with Python.


When setting up projects, prefer to use commands that automatically set dependencies, like `flutter create`. Avoid manually setting specific dependencies, specially at the beginning, unless explicitly told to do so.