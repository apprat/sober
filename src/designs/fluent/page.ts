export default /*css*/`
:host{
  font-family: "Segoe UI Variable","Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",Arial,sans-serif;
  --s-color-scrim: #000000;
  /* Brand / Accent — Fluent Blue */
  --s-color-primary: #0f6cbd;
  --s-color-on-primary: #ffffff;
  --s-color-primary-container: #cfe4fa;
  --s-color-on-primary-container: #003e73;
  /* Neutral secondary */
  --s-color-secondary: #5c5c5c;
  --s-color-on-secondary: #ffffff;
  --s-color-secondary-container: #e0e0e0;
  --s-color-on-secondary-container: #242424;
  /* Informational / tertiary */
  --s-color-tertiary: #5b5fc7;
  --s-color-on-tertiary: #ffffff;
  --s-color-tertiary-container: #e0e0ff;
  --s-color-on-tertiary-container: #343268;
  /* Error — Fluent Red */
  --s-color-error: #c50f1f;
  --s-color-on-error: #ffffff;
  --s-color-error-container: #fdd8d8;
  --s-color-on-error-container: #750b1c;
  /* Surfaces — Fluent Light */
  --s-color-background: #fafafa;
  --s-color-on-background: #242424;
  --s-color-surface: #ffffff;
  --s-color-on-surface: #242424;
  --s-color-surface-variant: #f5f5f5;
  --s-color-on-surface-variant: #424242;
  --s-color-outline: #8a8886;
  --s-color-outline-variant: #d1d1d1;
  --s-color-inverse-surface: #292929;
  --s-color-inverse-on-surface: #ffffff;
  --s-color-inverse-primary: #479ef5;
  /* Fluent neutral surface hierarchy */
  --s-color-surface-container-lowest: #ffffff;
  --s-color-surface-container-low: #fafafa;
  --s-color-surface-container: #f5f5f5;
  --s-color-surface-container-high: #f0f0f0;
  --s-color-surface-container-highest: #e8e8e8;
  /* Success — Fluent Green */
  --s-color-success: #107c10;
  --s-color-on-success: #ffffff;
  --s-color-success-container: #dff6dd;
  --s-color-on-success-container: #054b16;
  /* Warning — Fluent Marigold */
  --s-color-warning: #8a6100;
  --s-color-on-warning: #ffffff;
  --s-color-warning-container: #fff4ce;
  --s-color-on-warning-container: #5c3b00;
  /* =========================================================
     Fluent Dark Theme
     ========================================================= */
  --s-color-dark-primary: #479ef5;
  --s-color-dark-on-primary: #002f5f;
  --s-color-dark-primary-container: #004578;
  --s-color-dark-on-primary-container: #cfe4fa;
  --s-color-dark-secondary: #c8c6c4;
  --s-color-dark-on-secondary: #323130;
  --s-color-dark-secondary-container: #484644;
  --s-color-dark-on-secondary-container: #f3f2f1;
  --s-color-dark-tertiary: #b4b6ff;
  --s-color-dark-on-tertiary: #3f3d8f;
  --s-color-dark-tertiary-container: #4f4da0;
  --s-color-dark-on-tertiary-container: #e0e0ff;
  --s-color-dark-error: #f1707b;
  --s-color-dark-on-error: #5d0011;
  --s-color-dark-error-container: #a4262c;
  --s-color-dark-on-error-container: #fdd8d8;
  --s-color-dark-background: #1f1f1f;
  --s-color-dark-on-background: #ffffff;
  --s-color-dark-surface: #292929;
  --s-color-dark-on-surface: #ffffff;
  --s-color-dark-surface-variant: #3b3a39;
  --s-color-dark-on-surface-variant: #d6d6d6;
  --s-color-dark-outline: #a19f9d;
  --s-color-dark-outline-variant: #484644;
  --s-color-dark-inverse-surface: #ffffff;
  --s-color-dark-inverse-on-surface: #242424;
  --s-color-dark-inverse-primary: #0f6cbd;
  /* Fluent dark neutral surface hierarchy */
  --s-color-dark-surface-container-lowest: #141414;
  --s-color-dark-surface-container-low: #1f1f1f;
  --s-color-dark-surface-container: #292929;
  --s-color-dark-surface-container-high: #333333;
  --s-color-dark-surface-container-highest: #3d3d3d;
  --s-color-dark-success: #54b054;
  --s-color-dark-on-success: #003d08;
  --s-color-dark-success-container: #0e5a0e;
  --s-color-dark-on-success-container: #dff6dd;
  --s-color-dark-warning: #fce100;
  --s-color-dark-on-warning: #4a3500;
  --s-color-dark-warning-container: #6b4e00;
  --s-color-dark-on-warning-container: #fff4ce;
  /* =========================================================
     Elevation — Fluent 2 soft, restrained shadows
     ========================================================= */
  --s-elevation-level1:
    0 1.6px 3.6px rgba(0, 0, 0, 0.13),
    0 0.3px 0.9px rgba(0, 0, 0, 0.11);
  --s-elevation-level2:
    0 3.2px 7.2px rgba(0, 0, 0, 0.13),
    0 0.6px 1.8px rgba(0, 0, 0, 0.11);
  --s-elevation-level3:
    0 6.4px 14.4px rgba(0, 0, 0, 0.13),
    0 1.2px 3.6px rgba(0, 0, 0, 0.11);
  --s-elevation-level4:
    0 12.8px 28.8px rgba(0, 0, 0, 0.14),
    0 2.4px 7.2px rgba(0, 0, 0, 0.12);
  --s-elevation-level5:
    0 25.6px 57.6px rgba(0, 0, 0, 0.18),
    0 4.8px 14.4px rgba(0, 0, 0, 0.14);
  /* =========================================================
     Shape — Fluent favors subtle corner radii
     ========================================================= */
  --s-shape-corner-extra-small: 2px;
  --s-shape-corner-small: 4px;
  --s-shape-corner-medium: 6px;
  --s-shape-corner-large: 8px;
  --s-shape-corner-large-increased: 10px;
  --s-shape-corner-extra-large: 12px;
  --s-shape-corner-extra-large-increased: 16px;
  --s-shape-corner-extra-extra-large: 20px;
  /* =========================================================
     Motion — Fluent 2
     ========================================================= */
  --s-motion-duration-short1: 50ms;
  --s-motion-duration-short2: 100ms;
  --s-motion-duration-short3: 150ms;
  --s-motion-duration-short4: 200ms;
  --s-motion-duration-medium1: 250ms;
  --s-motion-duration-medium2: 300ms;
  --s-motion-duration-medium3: 350ms;
  --s-motion-duration-medium4: 400ms;
  --s-motion-duration-long1: 450ms;
  --s-motion-duration-long2: 500ms;
  --s-motion-duration-long3: 600ms;
  --s-motion-duration-long4: 700ms;
  --s-motion-duration-extra-long1: 800ms;
  --s-motion-duration-extra-long2: 900ms;
  --s-motion-duration-extra-long3: 1000ms;
  --s-motion-duration-extra-long4: 1200ms;
  /* Fluent-style easing */
  --s-motion-easing-emphasized: cubic-bezier(0.33, 0, 0.67, 1);
  --s-motion-easing-emphasized-decelerate: cubic-bezier(0, 0, 0, 1);
  --s-motion-easing-emphasized-accelerate: cubic-bezier(1, 0, 1, 1);
  --s-motion-easing-standard: cubic-bezier(0.33, 0, 0.67, 1);
  --s-motion-easing-standard-decelerate: cubic-bezier(0, 0, 0, 1);
  --s-motion-easing-standard-accelerate: cubic-bezier(0.67, 0, 1, 1);
}
`