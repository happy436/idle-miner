import PropTypes from "prop-types";

const OreIcon = ({ data }) => {
	const colorStyles = `filter ${data.color}`;
	return (
		<img
			className={`w-[60px] ${data.type === "ore" ? "-rotate-90" : ""} ${colorStyles}`}
			src={data.img}
			alt={data.name}
		/>
	);
};

OreIcon.propTypes = {
	data: PropTypes.shape({
		img: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		color: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
	}).isRequired,
};

export default OreIcon;
