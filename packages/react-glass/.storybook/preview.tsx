import type { Preview } from "@storybook/react-vite";
import "../src/styles/globals.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		layout: "fullscreen",
	},
	decorators: [
		(Story) => (
			<div className="theme-background min-h-screen p-8 text-on-surface">
				<Story />
			</div>
		),
	],
};

export default preview;
