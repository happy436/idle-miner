import { useState } from "react";
import OreIcon from "../OreIcon";
import ProgressBar from "./ProgressBar";
import PropTypes from "prop-types";

const LootContent = ({
	loot,
	activeLootPage,
	onActiveLootPage,
	miningData,
	handleChangeValue,
	choosedValueOnLoot,
	handleSell,
	handleChooseItemForSell,
	activeLootItemForSell,
}) => {
	const lootPages = ["Ores", "Alloys", "Items"];
	const renderItems = (name) => {
		let arr = [];
		switch (name) {
			case "Ores":
				arr = loot.filter((item) => item.type === "ore");
				break;
			case "Alloys":
				arr = loot.filter((item) => item.type === "alloy");
				break;
			case "Items":
				arr = loot.filter((item) => item.type === "item");
				break;
			default:
				break;
		}
		return (
			<>
				{arr.map((item) => {
					if (Object.prototype.hasOwnProperty.call(item, "amount")) {
						return (
							<li key={item.name}>
								<div
									className="grid grid-cols-4 gap-4 items-center justify-items-center"
									onClick={() =>
										handleChooseItemForSell(item.name)
									}
								>
									<OreIcon data={item} />
									<p>{item.name}</p>
									<p>{item.amount.toFixed(2)}</p>
									<p>{item.price}$</p>
								</div>
								<div
									className={`${
										item.name === activeLootItemForSell
											? "block"
											: "hidden"
									}`}
								>
									<ProgressBar
										value={choosedValueOnLoot}
										onChange={handleChangeValue}
										max={item.amount}
										onSell={() =>
											handleSell(
												item.name,
												choosedValueOnLoot
											)
										}
									/>
								</div>
							</li>
						);
					} else {
						return null;
					}
				})}
			</>
		);
	};
	return (
		<div className="flex flex-col gap-3">
			<ul className="flex gap-4 justify-center">
				{lootPages.map((item) => (
					<li key={item}>
						<button
							className={`underline hover:underline-offset-1 ${
								activeLootPage === item && "underline-offset-4"
							}`}
							onClick={() => onActiveLootPage(item)}
						>
							{item}
						</button>
					</li>
				))}
			</ul>
			<ul className="">{renderItems(activeLootPage)}</ul>
		</div>
	);
};

LootContent.propTypes = {
	handleSell: PropTypes.func.isRequired,
	activeLootPage: PropTypes.string.isRequired,
	onActiveLootPage: PropTypes.func.isRequired,
	miningData: PropTypes.arrayOf(PropTypes.object).isRequired,
	loot: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
			amount: PropTypes.number.isRequired,
			type: PropTypes.string.isRequired,
		})
	).isRequired,
	choosedValueOnLoot: PropTypes.number.isRequired,
	handleChangeValue: PropTypes.func.isRequired,
};

export default LootContent;
