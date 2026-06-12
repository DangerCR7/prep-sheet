# How to Deploy Your Prep Sheet Dashboard (100% Free)

This SDE, Data Engineer, and AI Engineer dashboard is serverless, fully responsive, and offline-capable. Here are the simplest ways to host it:

---

## Option 1: GitHub Pages (Recommended)
This hosts your prep sheet on a live URL: `https://DangerCR7.github.io/prep-sheet/`

### The Quick Way (Windows Batch Script):
1. Create a new public repository named **`prep-sheet`** on GitHub: [https://github.com/new](https://github.com/new) (leave description, README, and gitignore unchecked).
2. Double-click the **`deploy-github.bat`** file inside this directory.
3. Follow the onscreen prompts. It will automate the local Git initialization, commit, and link pushing.
4. Go to your repository settings on GitHub to enable hosting:
   - Open: [https://github.com/DangerCR7/prep-sheet/settings/pages](https://github.com/DangerCR7/prep-sheet/settings/pages)
   - Under **Build and deployment**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and `/ (root)`, then click **Save**.
5. Your live link will be ready in 1-2 minutes!

---

## Option 2: Netlify Drop (10 Seconds)
No terminal or Git commands needed.
1. Download or locate the zip package: `d:\Prep_Sheet_Dashboard.zip`.
2. Open your browser and go to [Netlify Drop](https://app.netlify.com/drop).
3. Drag and drop the `Prep_Sheet_Dashboard.zip` file directly into the upload area.
4. Your site is instantly live with a shareable URL!

---

## Option 3: Local Offline Run
1. Double-click `index.html` to launch it.
2. Bookmark it in your browser (`Ctrl+D`).
3. Your progress is saved automatically inside your browser's LocalStorage database, allowing you to close and open it anytime without losing data.
