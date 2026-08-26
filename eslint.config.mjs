import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default [
  ...nextCoreWebVitals,
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**", "scripts/**"],
  },
  {
    rules: {
      // The migrated CRA code uses <img> widely and has incomplete effect deps;
      // these are pre-existing and tracked separately from the migration.
      "@next/next/no-img-element": "off",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];
