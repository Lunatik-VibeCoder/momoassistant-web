// Toggle a feature's visibility here instead of commenting out nav links,
// routes, or sections in the components that render them.

export const DOWNLOAD_ENABLED = true;
export const DOCS_ENABLED = true;
export const BLOG_ENABLED = true;

// Obsolete since MARKETING-UPDATE-02: the Beta went public with the
// /download page (content/download.ts), so there is no longer a gated
// state for this flag to represent. Not read anywhere in the codebase —
// left here rather than deleted in case a future private/invite-only beta
// phase needs it again.
export const BETA_ENABLED = false;
