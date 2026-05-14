import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import type { StorybookConfig } from '@storybook/nextjs-vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [],
  framework: {
    name: getAbsolutePath('@storybook/nextjs-vite'),
    options: {
      builder: {
        viteConfigPath: 'vite.config.mts',
      },
    },
  },
  features: {
    sidebarOnboardingChecklist: false,
  },
  viteFinal(config) {
    // Configure webpack module resolution for path aliases
    if (!config.resolve) {
      config.resolve = {};
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      '@types': resolve(__dirname, '../../types/src'),
      '@tokens': resolve(__dirname, '../styles/design-tokens'),
      '@ui': resolve(__dirname, '../src'),
    };

    return config;
  },
};

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

export default config;
