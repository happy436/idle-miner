import Ore from "./assets/img/ore.png";
import Alloy from "./assets/img/alloy.png";
import CopperWire from "./assets/img/copper-wire.png";

const ORE = "ore";
const ALLOY = "alloy";
const ITEM = "item";

export const minesData = [
	{
		name: "Copper",
		purchasePrice: 0,
		purchased: false,
		amount: 0,
		img: Ore,
		color: "invert hue-rotate-180",
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
				price: 5,
				coef: 1.2,
				value: 1,
			},
			{
				name: "Cart Speed",
				level: 1,
				price: 5,
				coef: 0.95,
				value: 5,
			},
			{ name: "Cargo", level: 1, price: 5, coef: 1.5, value: 1 },
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

//TODO сделать цвет и картинку для сплавов и предметов в луте
const lootOresData = [
	{
		name: "Copper",
		price: 1,
		amount: 0,
		type: ORE,
		img: Ore,
		color: "invert hue-rotate-180",
	},
	{
		name: "Iron",
		price: 2,
		amount: 0,
		type: ORE,
		img: Ore,
		color: "invert hue-rotate-90",
	},
];
const lootAlloysData = [
	{
		name: "Copper Bar",
		price: lootOresData[0].price * 5 * 2,
		amount: 0,
		type: ALLOY,
		img: Alloy,
		color: "invert hue-rotate-180",
	},
];
const lootItemsData = [
	{
		name: "Copper Wire",
		price: lootAlloysData[0].price * 5 * 1.5,
		amount: 0,
		type: ITEM,
		img: CopperWire,
		color: "invert hue-rotate-180",
	},
];

export const lootData = [...lootOresData, ...lootAlloysData, ...lootItemsData];
