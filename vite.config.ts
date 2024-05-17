import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: 'unit tests',
    root: './test/unit',
    coverage: {
      reportsDirectory: './coverage',
    },
  },
})
