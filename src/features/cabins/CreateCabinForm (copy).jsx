import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/ApiCabins";
import toast from "react-hot-toast";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

const CreateCabinForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  console.log(errors);
  const queryClient = useQueryClient();

  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin Successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const submitForm = (data) => {
    mutate({ ...data, image: data.image[0] });
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isSubmitting}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isSubmitting}
          {...register("maxCapacity", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isSubmitting}
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isSubmitting}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              +value < +getValues().regularPrice ||
              "Discount Value should be lesser than Regular Price",
            min: {
              value: 1,
              message: "Minimum value should not be lesser than 1",
            },
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
          disabled={isSubmitting}
          {...register("description", { required: "This field is required" })}
          defaultValue=""
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          {...register("image")}
          disabled={isSubmitting}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isSubmitting} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>
          {isSubmitting ? "Creating Cabin......" : "Create Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
