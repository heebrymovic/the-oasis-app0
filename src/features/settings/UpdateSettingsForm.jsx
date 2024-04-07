import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings, useUpdateSettings } from "./hooks";
import Spinner from "../../ui/Spinner";

const UpdateSettingsForm = () => {
  const {
    isLoading,
    setting: {
      minBookingLenth,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSettings();

  const handleSettingsUpdate = (key, value) => {
    const newSetting = { [key]: value };

    updateSetting(newSetting);
  };

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          onBlur={(e) =>
            handleSettingsUpdate("minBookingLenth", e.target.value)
          }
          defaultValue={minBookingLenth}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          onBlur={(e) =>
            handleSettingsUpdate("maxBookingLength", e.target.value)
          }
          defaultValue={maxBookingLength}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          onBlur={(e) =>
            handleSettingsUpdate("maxGuestsPerBooking", e.target.value)
          }
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          onBlur={(e) => handleSettingsUpdate("breakfastPrice", e.target.value)}
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
};

export default UpdateSettingsForm;
