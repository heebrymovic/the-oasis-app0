import { useContext } from "react";
import { CounterContext } from "./CompoundApp";

const Increment = ({ icon }) => {
	const { incrementCount } = useContext(CounterContext);

	return <button onClick={incrementCount}>{icon}</button>;
};

export default Increment;
