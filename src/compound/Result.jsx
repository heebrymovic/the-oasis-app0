import { useContext } from "react";
import { CounterContext } from "./CompoundApp";

const Result = () => {
	const { count } = useContext(CounterContext);

	return <span>{count}</span>;
};

export default Result;
