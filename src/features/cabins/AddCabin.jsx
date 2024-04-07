import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { CreateCabinForm } from "./";

const AddCabin = () => {
	return (
		<div>
			<Modal>
				<Modal.Open open="form">
					<Button size="medium">Add new cabin</Button>
				</Modal.Open>

				<Modal.Window name="form" modalTitle="Add New Cabin">
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</div>
	);
};

export default AddCabin;
