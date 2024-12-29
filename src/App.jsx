import { useEffect, useState } from "react";
import Chest from "./assets/img/chest.png";
import WorkerFemale from "./assets/img/worker-female.png";
import WorkerMale from "./assets/img/worker-male.png";
import Engineers from "./assets/img/engineers.png";
import Tools from "./assets/img/crossed-hammers.png";
import Upgrades from "./assets/img/upgrades.png";
import XMark from "./assets/img/cancel.png";
import { lootData, minesData, minesUpgradesData } from "./mockData";
import MiningUpgrades from "./components/MiningUpgrades";
import LootContent from "./components/lootMenu/LootContent";
import MiningElement from "./components/MiningElement";
import DropDownMenu from "./components/DropDownMenu";

function App() {
	const [DropDownMenuState, setDropDownMenuState] = useState({
		name: "",
		minesName: "",
		active: false,
	});

	const handleActiveDropDownMenu = (nameMenu, minesName) => {
		setDropDownMenuState((prev) => ({
			name: nameMenu,
			minesName: minesName,
			active: !prev.active,
		}));
	};
	const [money, setMoney] = useState(0);
	const [mines, setMines] = useState(minesData);
	const [minesUpgrade, setMinesUpgrade] = useState(minesUpgradesData);
	const [loot, setLoot] = useState(lootData);
	const [choosedValueOnLoot, setChoosedValueOnLoot] = useState(0);
	const [activeLootPage, setActiveLootPage] = useState("Ores");

	const handleChangeValueOnProgressLoot = (e) => {
		setChoosedValueOnLoot(Number(e.target.value));
	};

	const handleActiveLootPage = (name) => {
		setActiveLootPage(name);
	};

	// фукнция продажи
	const SellItem = (name, value) => {
		//найденный елемент
		const findedItem = loot.find((item) => item.name === name);

		//вырученные деньги с продажи
		const proceeds = findedItem.price * value;
		//уменьшение количества предмета
		const newCount = findedItem.amount - value;
		//обновление данных
		setLoot((prev) => {
			return prev.map((item) => {
				if (item.name === name) {
					return { ...item, amount: newCount };
				}
				return item;
			});
		});
		//добавление денег
		setMoney((prev) => prev + proceeds);
	};

	const Mining = (name) => {
		const miningData = mines.find((item) => item.name === name);
		const miningSpeed = minesUpgrade
			.find((item) => item.name === name)
			?.upgrades.find((upgrade) => upgrade.name === "Mining Rate")?.value;

		if (miningData?.purchased) {
			const newAmount = miningData.amount + miningSpeed;

			if (newAmount !== miningData.amount) {
				setMines((prev) =>
					prev.map((item) =>
						item.name === name
							? { ...item, amount: newAmount }
							: item
					)
				);
			}
		}
	};
	// Загрузка вагонетки сырьем по имени шахты
	const LoadingCart = (name) => {
		const miningData = mines.find((item) => item.name === name);
		const cartCargo = minesUpgrade
			.find((item) => item.name === name)
			?.upgrades.find((upgrade) => upgrade.name === "Cargo")?.value;

		if (miningData?.purchased) {
			let newAmount = Math.max(0, miningData.amount - cartCargo);

			// Обновление только если значение действительно изменилось
			if (newAmount !== miningData.amount) {
				setMines((prev) =>
					prev.map((item) =>
						item.name === name
							? { ...item, amount: newAmount }
							: item
					)
				);
			}
		}
	};

	// Выгрузка вагонетки сырьем по имени шахты
	const UploadingCart = (name) => {
		const lootOreData = loot.find((item) => item.name === name);
		const cartCargo = minesUpgrade
			.find((item) => item.name === name)
			?.upgrades.find((upgrade) => upgrade.name === "Cargo")?.value;

		const lootCapacity = lootOreData?.maxCapacity || Infinity; // Максимальная вместимость (или бесконечность)
		const newAmount = Math.min(
			lootCapacity,
			lootOreData.amount + cartCargo
		);

		// Обновление только если значение действительно изменилось
		if (newAmount !== lootOreData.amount) {
			setLoot((prev) =>
				prev.map((item) =>
					item.name === name ? { ...item, amount: newAmount } : item
				)
			);
		}
	};

	useEffect(() => {
		const mining = setInterval(() => {
			Mining("Copper");
		}, 1000);

		return () => {
			clearInterval(mining);
		};
	}, [mines]);

	const handlePurchase = (nameOre) => {
		let newData = mines.map((item) => {
			if (item.name === nameOre) {
				return { ...item, purchased: true };
			}
			return item;
		});
		setLoot((prev) => {
			return prev.map((item) =>
				item.name === nameOre ? { ...item, amount: 0 } : item
			);
		});
		setMines(newData);
	};

	const navMenu = [
		{ name: "Loot", img: Chest },
		{ name: "Craft", img: Tools },
		{ name: "Upgrades", img: Upgrades },
		{ name: "Personal", img: Engineers },
	];

	const RenderDropDownMenuContent = (name) => {
		switch (name) {
			case "Mining":
				return (
					<MiningUpgrades
						mining={minesUpgrade}
						name={DropDownMenuState.minesName}
					/>
				);
			case "Loot":
				return (
					<LootContent
						miningData={mines}
						loot={loot}
						activeLootPage={activeLootPage}
						onActiveLootPage={handleActiveLootPage}
						handleChangeValue={handleChangeValueOnProgressLoot}
						choosedValueOnLoot={choosedValueOnLoot}
						handleSell={SellItem}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div className="app bg-green-900 flex flex-col h-full">
			<header>
				<div className="text-white">
					<p>$ {money}</p>
				</div>
			</header>
			<main className="flex-1 relative z-10">
				<ul>
					{mines.map((item) => (
						<li key={item.name}>
							<MiningElement
								mining={item}
								onPurchase={handlePurchase}
								onUpgradeMenu={handleActiveDropDownMenu}
								upgradesData={minesUpgrade}
								onLoad={LoadingCart}
								onUpload={UploadingCart}
							/>
						</li>
					))}
				</ul>
				<DropDownMenu
					menuState={DropDownMenuState}
					onToggle={handleActiveDropDownMenu}
				>
					{RenderDropDownMenuContent(DropDownMenuState.name)}
				</DropDownMenu>
			</main>

			<footer className="z-30 bg-gray-800">
				<nav className="">
					<ul className="flex gap-3 items-center z-10">
						{navMenu.map((item) => (
							<li key={item.name}>
								<button
									className="p-3 border-2 border-transparent hover:border-white hover:border-3 active:bg-gray-500"
									onClick={() =>
										handleActiveDropDownMenu(item.name)
									}
								>
									<img className="w-[60px]" src={item.img} />
								</button>
							</li>
						))}
					</ul>
				</nav>
			</footer>
		</div>
	);
}

export default App;
