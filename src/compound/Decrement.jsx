import { useContext } from "react";
import { CounterContext } from "./CompoundApp";

const Decrement = ({ icon }) => {
	const { decrementCount } = useContext(CounterContext);

	return <button onClick={decrementCount}>{icon}</button>;
};

export default Decrement;
