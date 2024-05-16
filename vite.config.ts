import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: 'users-test',
    root: './test/users/*',
  },
})
