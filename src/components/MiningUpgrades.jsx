import PropTypes from "prop-types";

const MiningUpgrades = ({ mining, name, onUpgrade }) => {
	const miningData = mining.find((item) => item.name === name).upgrades;
	return (
		<div className="">
			<ul className="">
				{miningData.map((item) => (
					<li
						className="grid grid-cols-3 gap-4 justify-items-center items-center pb-5 pt-5"
						key={item.name}
					>
						<p>{item.name}</p>
						<p>{item.level}</p>
						<button
							onClick={() => {onUpgrade(name, item.name)}}
							className="text-white bg-yellow-400 px-5 py-3 rounded-3xl"
						>
							{item.price}$
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

MiningUpgrades.propTypes = {
	mining: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			upgrades: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string.isRequired,
					level: PropTypes.number.isRequired,
					price: PropTypes.number.isRequired,
				})
			).isRequired,
		})
	).isRequired,
	name: PropTypes.string.isRequired,
};

export default MiningUpgrades;
