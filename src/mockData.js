import Ore from "./assets/img/ore.png";

const ORE = "ore";
const ALLOY = "alloy";
const ITEM = "item";

export const minesData = [
	{
		name: "Copper",
		img: Ore,
		purchasePrice: 0,
		purchased: false,
		color: "invert hue-rotate-180",
		amount: 0,
	},
	{
		name: "Iron",
		img: Ore,
		purchasePrice: 100,
		purchased: false,
		color: "invert hue-rotate-90",
		amount: 0,
	},
];

/* hue-rotate-0	filter: hue-rotate(0deg);
hue-rotate-15	filter: hue-rotate(15deg);
hue-rotate-30	filter: hue-rotate(30deg);
hue-rotate-60	filter: hue-rotate(60deg);
hue-rotate-90	filter: hue-rotate(90deg);
hue-rotate-180 
180 - медь
*/
export const minesUpgradesData = [
	{
		name: "Copper",
		upgrades: [
			{
				name: "Mining Rate",
				level: 1,
				price: 10,
				coef: 0.5,
				value: 1,
			},
			{
				name: "Cart Speed",
				level: 1,
				price: 10,
				coef: 0.25,
				value: 10,
			},
			{ name: "Cargo", level: 1, price: 10, coef: 0.5, value: 1 },
		],
	},
	{
		name: "Iron",
		upgrades: [
			{
				name: "Mining Rate",
				level: 1,
				price: 10,
				coef: 0.5,
				value: 1,
			},
			{
				name: "Cart Speed",
				level: 1,
				price: 10,
				coef: 0.25,
				value: 10,
			},
			{ name: "Cargo", level: 1, price: 10, coef: 0.5, value: 1 },
		],
	},
];
const lootOresData = [
	{ name: "Copper", price: 1, amount: 0, type: ORE },
	{ name: "Iron", price: 2, amount: 0, type: ORE },
];
const lootAlloysData = [
	{
		name: "Copper Bar",
		price: lootOresData[0].price * 5 * 2,
		amount: 0,
		type: ALLOY,
	},
];
const lootItemsData = [
	{
		name: "Copper Wire",
		price: lootAlloysData[0].price * 5 * 1.5,
		amount: 0,
		type: ITEM,
	},
];

export const lootData = [...lootOresData, ...lootAlloysData, ...lootItemsData];
