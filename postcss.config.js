const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    purgecss({
      content: ["./src/**/*.html", "./src/**/*.ts", "./src/**/*.js"],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: [
        // Bootstrap classes yang digunakan dinamically
        "show",
        "fade",
        "collapse",
        "collapsing",
        "modal",
        "modal-backdrop",
        "modal-open",
        "dropdown-menu",
        "dropdown-item",
        "tooltip",
        "popover",
        "carousel-item-next",
        "carousel-item-prev",
        "active",
        "disabled",
        "selected",
        // Custom classes
        "bg-gradient-primary",
        "bg-gradient-accent",
        "text-gradient",
        "card-modern",
        "btn-gradient",
        "btn-quiz-primary",
        // Badge classes
        /^badge-/,
        // Responsive classes
        /^d-(sm|md|lg|xl)-/,
        // Spacing classes yang mungkin digunakan
        /^(m|p)(t|b|l|r|x|y)?-[0-5]$/,
        // Color utilities
        /^text-(primary|secondary|success|danger|warning|info|light|dark)$/,
        /^bg-(primary|secondary|success|danger|warning|info|light|dark)$/,
      ],
    }),
  ],
};
