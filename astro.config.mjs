import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

/**
 * 🚀 Astro 기본 설정 (안정 버전)
 * - React만 사용
 * - Tailwind는 PostCSS 방식으로 처리 (vite 플러그인 X)
 */
export default defineConfig({
  integrations: [react()],
});