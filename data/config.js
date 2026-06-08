// ============================================================
//  TrEnCh-IR static site — image hosting configuration
// ============================================================
// Images are served straight from a GitHub repository (raw.githubusercontent.com),
// which avoids Google Drive / OneDrive rate-limiting on bulk image loads.
//
// To point the gallery/map at YOUR image repo, edit the values below.
//   OWNER  : the GitHub user or org that owns the image repo
//   REPO   : the repository name
//   BRANCH : the branch the images live on (usually "main")
//   PATH   : folder inside the repo holding the images (no leading/trailing slash)
//
// Final image URL becomes:
//   https://raw.githubusercontent.com/OWNER/REPO/BRANCH/PATH/<filename>
//
// You can also host images in THIS same repo: set OWNER/REPO/BRANCH to this
// repo and PATH to e.g. "images/gallery". Or, for a fully self-contained site,
// set IMAGE_BASE directly to a relative folder like "images/gallery".
// ------------------------------------------------------------
const TRENCH_CONFIG = {
  OWNER:  "trenchproject",
  REPO:   "TrenchIR_gallery",
  BRANCH: "main",
  PATH:   "images",
};

// Build the base URL for images. If you'd rather serve images from a local
// folder in this same site, replace the return value with e.g. "images/gallery".
function imageBase() {
  const c = TRENCH_CONFIG;
  return `https://raw.githubusercontent.com/${c.OWNER}/${c.REPO}/${c.BRANCH}/${c.PATH}`;
}

// Convenience: full URL for a given filename.
function imageUrl(filename) {
  return `${imageBase()}/${filename}`;
}
