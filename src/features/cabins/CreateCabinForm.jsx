import { useForm } from "react-hook-form";
import { useCreateCabin, useEditCabin } from "./hooks";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

const CreateCabinForm = ({ cabinValues = {}, onCloseModal, type }) => {
  const { id: cabinId, ...defaultCabins } = cabinValues;

  const onEditForm = cabinId !== undefined;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: onEditForm ? defaultCabins : {},
  });

  const { creatingCabin, isSubmitting } = useCreateCabin(reset, onCloseModal);

  const { editCabin, isEditing } = useEditCabin(onCloseModal);

  const isWorking = isEditing || isSubmitting;

  const submitForm = (data) => {
    const image =
      typeof data.image === "string" ? defaultCabins.image : data.image[0];

    if (onEditForm)
      editCabin({
        newCabinData: { ...data, image, oldPath: defaultCabins.image },
        id: cabinId,
      });
    else creatingCabin({ ...data, image });
  };

  return (
    <Form
      onSubmit={handleSubmit(submitForm)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          autoComplete="off"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum value should not be lesser than 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              +value < +getValues().regularPrice ||
              "Discount Value should be lesser than Regular Price",
          })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          {...register("description", { required: "This field is required" })}
          defaultValue=""
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          {...register("image", {
            required: onEditForm ? false : "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isWorking}
          onClick={() => onCloseModal?.()}
          variation="secondary"
          type="reset"
        >
          Close
        </Button>
        <Button>
          {isWorking
            ? "Submitting Cabin......"
            : onEditForm
              ? "Edit Cabin"
              : "Create Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
