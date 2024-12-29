/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				slide: "slide var(--animation-duration, 3s) linear infinite",
				slideUp: "slideUp 0.5s ease-out",
			},
			keyframes: {
				slide: {
					"0%": { transform: "translateX(0)" },
					"50%": {
						transform:
							"translateX(var(--animation-distance, 200px))",
					},
					"100%": { transform: "translateX(0)" },
				},
				slideUp: {
					"0%": { transform: "translateY(100%)" },
					"100%": { transform: "translateY(0)" },
				},
			},
		},
	},
	plugins: [],
};
