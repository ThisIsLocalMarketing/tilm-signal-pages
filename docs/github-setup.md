# GitHub Setup Notes

Approved setup decisions:

- Repo: `tilm-signal-pages`
- Visibility: public
- Local folder: `C:/Users/Allan/TILM/tilm-signal-pages/`
- Commit name: `Allan`
- Commit email: GitHub private noreply email if available
- Auth: SSH key for long-term correctness

## Current setup state

- Git is installed.
- Local folder is created.
- `.gitignore` and README are created.
- SSH key path intended for GitHub: `~/.ssh/id_ed25519_tilm_github.pub`

## Still needed

1. Allan signs into or creates GitHub account.
2. Allan gets GitHub private noreply email if available.
3. Configure Git email:

```bash
git config --global user.email "<github-private-noreply-email>"
```

4. Add SSH public key to GitHub:

GitHub → Settings → SSH and GPG keys → New SSH key

5. Create public GitHub repository:

```text
tilm-signal-pages
```

6. Connect local repo to remote and push.

7. Enable GitHub Pages from main branch/root.
