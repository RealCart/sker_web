import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import svgr from 'vite-plugin-svgr';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
	base: '/skerr_web/',
	plugins: [
		react(),
		svgr({
			svgrOptions: {
				icon: true,
			},
		}),
		tailwindcss()
	],
	css: {
		devSourcemap: true,
	},
	resolve: {
		alias: {
			'@': `${__dirname}/src`
		}
	}
})
