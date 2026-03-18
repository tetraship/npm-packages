import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	stories: ["../src/lib/glass-components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: ["@storybook/addon-links", "@storybook/addon-onboarding"],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
	async viteFinal(config) {
		config.plugins = config.plugins || [];
		config.plugins.push(
			(await import("@vitejs/plugin-react")).default({
				jsxRuntime: "automatic",
			}),
		);
		const tailwindcss = (await import("@tailwindcss/postcss")).default;
		config.css = {
			postcss: {
				plugins: [tailwindcss()],
			},
		};
		return config;
	},
};

export default config;
