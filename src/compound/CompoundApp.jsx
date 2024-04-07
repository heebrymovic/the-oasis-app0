import { createContext, useState } from "react";
import Counter from "./Counter";
import Label from "./Label";
import Increment from "./Increment";
import Decrement from "./Decrement";
import Result from "./Result";

export const CounterContext = createContext();

Counter.Label = Label;
Counter.Increment = Increment;
Counter.Decrement = Decrement;
Counter.Result = Result;

const CompoundApp = () => {
	const [count, setCount] = useState(0);

	const incrementCount = () => setCount((initialCount) => initialCount + 1);

	const decrementCount = () => setCount((initialCount) => initialCount - 1);

	return (
		<CounterContext.Provider
			value={{ count, incrementCount, decrementCount }}
		>
			<div>
				<h1>Counter Application</h1>

				<Counter>
					<Counter.Label color="red">Counter Label</Counter.Label>
					<div>
						<Counter.Increment icon="+" />
						<div>
							<Counter.Result />
						</div>
						<Counter.Decrement icon="-" />
					</div>
				</Counter>
			</div>
		</CounterContext.Provider>
	);
};

export default CompoundApp;
