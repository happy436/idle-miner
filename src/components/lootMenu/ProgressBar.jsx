//TODO упростить компонент
import PropTypes from 'prop-types'

const ProgressBar = ({ value, onChange, max, onSell }) => {
	return (
		<div className="flex gap-3 items-center justify-center">
			<input
				type="range"
				min="0"
				max={max}
				value={value}
				onChange={onChange}
				
			/>
			<p>{value}</p>
            <button className="bg-yellow-400 rounded-3xl px-3 py-2" onClick={() => {onSell()}}>Sell</button>
		</div>
	);
};

ProgressBar.propTypes = {
    value:PropTypes.number.isRequired,
    onChange:PropTypes.func.isRequired,
    max:PropTypes.number.isRequired,
    onSell:PropTypes.func.isRequired
}

export default ProgressBar;