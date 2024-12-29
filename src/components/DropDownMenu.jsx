import PropTypes from "prop-types";
import Arrow from "../assets/img/arrow.png";

const DropDownMenu = ({ menuState, onToggle, children }) => {
	return (
		<div
			className={`z-0 absolute bottom-0 bg-blue-700 w-full h-max p-3 rounded-t-3xl ${
				menuState.active ? "animate-slideUp" : "translate-y-full" // Применяется анимация, если активное состояние
			}`}
		>
			<header className="flex justify-end">
				<button onClick={() => onToggle("")} className="flex gap-3">
					<img className="w-[30px]" src={Arrow} alt="XMark" />
					{menuState.name}
				</button>
			</header>
			{children}
		</div>
	);
};

DropDownMenu.propTypes = {
	menuState: PropTypes.object.isRequired,
	onToggle: PropTypes.func.isRequired,
	children: PropTypes.node,
};

export default DropDownMenu;
