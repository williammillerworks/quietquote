# GitHub Pages Deployment Instructions

## Step 1: Download Your Project Files

1. **Export from Bolt**: Use the download/export feature to get all your project files
2. **Verify you have these key files**:
   - `index.html`
   - `newtab.css` 
   - `newtab.js`
   - `public/quotes-database.json`
   - `.github/workflows/deploy.yml` (for automatic deployment)
   - `README.md`
   - `package.json`

## Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Repository name: `daily-quotes` (or any name you prefer)
4. Make it **Public** (required for free GitHub Pages)
5. ✅ Check "Add a README file"
6. Click "Create repository"

## Step 3: Upload Files

### Method A: Web Interface (Easiest)
1. In your new repository, click "uploading an existing file"
2. Drag and drop ALL your project files
3. Make sure to maintain the folder structure:
   ```
   /
   ├── index.html
   ├── newtab.css
   ├── newtab.js
   ├── package.json
   ├── README.md
   ├── .github/
   │   └── workflows/
   │       └── deploy.yml
   └── public/
       └── quotes-database.json
   ```
4. Commit message: "Initial commit - Daily Quote Website"
5. Click "Commit changes"

### Method B: Git Commands (If you have Git installed)
```bash
git clone https://github.com/yourusername/daily-quotes.git
cd daily-quotes
# Copy all your exported files here
git add .
git commit -m "Initial commit - Daily Quote Website"
git push origin main
```

## Step 4: Enable GitHub Pages

1. Go to your repository → **Settings** tab
2. Scroll down to **Pages** section (left sidebar)
3. Source: **"Deploy from a branch"**
4. Branch: **"main"** 
5. Folder: **"/ (root)"**
6. Click **Save**

## Step 5: Access Your Live Site

- Your site will be available at: `https://yourusername.github.io/repository-name`
- It may take 5-10 minutes for the first deployment
- GitHub will show you the URL in the Pages settings

## Expected Results ✅

Once deployed, your site will have:
- ✅ Daily quotes loading properly
- ✅ English/Korean language switching
- ✅ Smooth animations and transitions  
- ✅ Responsive design on all devices
- ✅ No CORS errors (unlike local file:// protocol)

## Troubleshooting

If quotes don't load:
1. Check that `public/quotes-database.json` exists in your repository
2. Verify the file path in `newtab.js` is `"public/quotes-database.json"`
3. Wait a few minutes for GitHub Pages to fully deploy

## Automatic Deployments

The included `.github/workflows/deploy.yml` file will automatically redeploy your site whenever you push changes to the main branch.