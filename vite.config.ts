import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, Plugin } from 'vite';
import JavaScriptObfuscator from 'javascript-obfuscator';

function obfuscate(includes: string[] = []): Plugin {
  return {
    name: 'vite-javascript-obfuscator',
    apply: 'build',
    enforce: 'post',
    generateBundle(options, bundle) {
      for (const fileName in bundle) {
        const chunk = bundle[fileName];
        if (
          chunk.type === 'chunk' &&
          fileName.endsWith('.js') &&
          includes.some((f) => fileName.includes(f))
        ) {
          const obfuscatedCode = JavaScriptObfuscator.obfuscate(chunk.code, {
            compact: true,
            numbersToExpressions: true,
            stringArrayShuffle: true,
            splitStrings: true,
            stringArrayThreshold: 1,
          }).getObfuscatedCode();
          chunk.code = obfuscatedCode;
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), obfuscate(['api'])],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          api: ['./src/api'],
        },
      },
    },
  },
});
