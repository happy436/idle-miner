import PropTypes from "prop-types";

const OreIcon = ({ miningData }) => {
	const colorStyles = `filter ${miningData.color}`;
	return (
		<img
			className={`w-[60px] -rotate-90 ${colorStyles}`}
			src={miningData.img}
			alt={miningData.name}
		/>
	);
};

OreIcon.propTypes = {
	miningData: PropTypes.shape({
		img: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		color: PropTypes.string.isRequired,
	}).isRequired,
};

export default OreIcon;
