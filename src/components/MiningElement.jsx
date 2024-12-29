import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

//components
import OreIcon from "./OreIcon";

//icons
import Cart from "../assets/img/mine-cart.png";
import MineImg from "../assets/img/mine.png";

const MiningElement = ({
	mining,
	upgradesData,
	onPurchase,
	onUpgradeMenu,
	onLoad,
	onUpload,
	data,
	onMining,
}) => {
	const containerRef = useRef(null);
	const [distance, setDistance] = useState(0);
	const [progress, setProgress] = useState(1);
	const [direction, setDirection] = useState(0);
	const CargoSpeed = upgradesData
		.find((item) => item.name === mining.name)
		.upgrades.find((item) => item.name === "Cart Speed").value;

	useEffect(() => {
		if (containerRef.current) {
			const width = containerRef.current.offsetWidth;
			setDistance((width - 60) * (progress / 100));
		}
	}, [progress]);

	useEffect(() => {
		const time =
			upgradesData
				.find((item) => item.name === mining.name)
				.upgrades.find((item) => item.name === "Mining Rate").value *
			1000;
		const miningProcess = setInterval(() => {
			onMining(mining.name);
		}, time);

		return () => {
			clearInterval(miningProcess);
		};
	}, [mining]);

	useEffect(() => {
		let animationFrameId;
		const speed = 100 / CargoSpeed;
		const step = () => {
			setProgress((prev) => {
				if (prev >= 100 && direction === 1) {
					setDirection(-1);
					return 100;
				} else if (prev <= 0 && direction === -1) {
					setDirection(1);
					return 0;
				}
				return prev + (speed * direction) / 60;
			});

			animationFrameId = requestAnimationFrame(step);
		};

		animationFrameId = requestAnimationFrame(step);
		return () => cancelAnimationFrame(animationFrameId);
	}, [direction, CargoSpeed]);

	// Добыча ресурка с шахты и выгрузка в лут
	useEffect(() => {
		if (progress >= 100 && direction === -1) {
			onLoad(mining.name); // Вызов только после завершения обновления
		} else if (progress <= 0 && direction === 1) {
			onUpload(mining.name); // Вызов только после завершения обновления
		}
	}, [direction]);

	useEffect(() => {
		if (mining.purchased) {
			setDirection(1);
		}
	}, [mining.purchased]);

	return (
		<div
			className={`flex w-full p-3 text-white ${
				!mining.purchased
					? "bg-gray-700 hover:text-blue-300"
					: "hover:bg-blue-500"
			}`}
			onClick={() => {
				!mining.purchased
					? onPurchase(mining.name)
					: onUpgradeMenu("Mining", mining.name);
			}}
		>
			{!mining.purchased ? (
				<div className="flex justify-center w-full">
					Цена : {mining.purchasePrice}$
				</div>
			) : (
				<>
					<div>
						<img className="w-[60px]" src={MineImg} alt="Mine" />
					</div>
					<div
						ref={containerRef}
						className="flex-1 relative h-[60px] mx-2"
					>
						<div className="h-[10px] bg-gray-300 rounded-full w-full absolute top-[50%] translate-y-[-50%]"></div>
						<img
							className="w-[60px] absolute"
							src={Cart}
							alt="Cart"
							style={{ transform: `translateX(${distance}px)` }}
						/>
					</div>
					<div className="flex flex-col items-center">
						<OreIcon data={data} />
						<div>{mining.amount.toFixed(2)}</div>
					</div>
				</>
			)}
		</div>
	);
};

const upgradeShape = PropTypes.shape({
	name: PropTypes.string.isRequired,
	level: PropTypes.number.isRequired,
	price: PropTypes.number.isRequired,
	coef: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
});

const mineShape = PropTypes.shape({
	name: PropTypes.string.isRequired,
	upgrades: PropTypes.arrayOf(upgradeShape).isRequired,
});

MiningElement.propTypes = {
    onMining: PropTypes.func.isRequired,
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
        }).isRequired,
	mining: PropTypes.shape({
		name: PropTypes.string.isRequired,
		purchased: PropTypes.bool.isRequired,
		purchasePrice: PropTypes.number.isRequired,
		amount: PropTypes.number.isRequired,
	}).isRequired,
	onPurchase: PropTypes.func.isRequired,
	onUpgradeMenu: PropTypes.func.isRequired,
	onLoad: PropTypes.func.isRequired,
	onUpload: PropTypes.func.isRequired,
	upgradesData: PropTypes.arrayOf(mineShape).isRequired,
};

export default MiningElement;
