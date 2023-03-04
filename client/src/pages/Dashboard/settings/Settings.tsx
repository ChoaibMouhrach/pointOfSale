import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Title from "../../../components/Title";
import Form from "../../../components/Form/Form";
import { useGetSettingsQuery, useUpdateSettingsMutation } from "../../../features/apis/settingsApi";
import { useDispatch, useSelector } from "react-redux";
import { getSettings, setSettings } from "../../../features/slices/settingsSlice";
import { useFormik } from "formik";
import { Settings, UpdateSettings } from "../../../types/Settings";
import { object, string } from "yup";
import { useState } from "react";
import GlobalError from "../../../components/GlobalError";
import Loader from "../../../components/Loaders/Loader";
import GlobalSuccess from "../../../components/GlobalSuccess";

const Settings = () => {
  const settings = useSelector(getSettings);
  const [updateSettings, { isLoading: isUpdatingSettingsLoading }] = useUpdateSettingsMutation();
  const [globalMessage, setGlobalMessage] = useState<string>("");
  const [globalSuccessMessage, setGlobalSuccessMessage] = useState<string>("");
  const dispatch = useDispatch();

  const validationSchema = object({
    currency: string().nullable(),
    company_name: string().nullable(),
    vat: string().nullable(),
  });

  const initialValues: Settings = {
    currency: "",
    company_name: "",
    vat: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (data: UpdateSettings, { setSubmitting }) => {
      setSubmitting(false);

      setGlobalMessage("");
      setGlobalSuccessMessage("");

      let somethingChanged = false;
      let changedData: { [key: string]: string } = {};

      Object.entries(data).forEach(([key, value]: string[]) => {
        if (value) {
          somethingChanged = true;
          changedData[key] = value;
        }
      });

      if (somethingChanged) {
        const response = await updateSettings(changedData);

        if ("error" in response) {
          const errors = response.error as { status: string; data: { message?: string } };

          if (errors.data.message) {
            setGlobalMessage(errors.data.message);
          }
        }

        if ("data" in response) {
          const settings = response.data as Settings;
          setGlobalSuccessMessage("Settings Updated Successfully");
          dispatch(setSettings(settings));
        }

        return;
      }

      setGlobalMessage("Change Something first");
    },
  });

  return (
    <div>
      <Title title="Settings" />
      <Form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-2">
          <GlobalError global_message={globalMessage} />
          <GlobalSuccess globalMessage={globalSuccessMessage} />
          <div className="grid lg:grid-cols-2 gap-2">
            <Input onChange={formik.handleChange} onBlur={formik.handleBlur} defaultValue={settings.currency} name="currency" placeholder="Currency..." />
            <Input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              defaultValue={settings.company_name}
              name="company_name"
              placeholder="Company Name..."
            />
            <Input onChange={formik.handleChange} onBlur={formik.handleBlur} defaultValue={settings.vat} name="vat" placeholder="VAT..." />
          </div>
          <Button disabled={isUpdatingSettingsLoading} content={isUpdatingSettingsLoading ? <Loader /> : "Update"} />
        </div>
      </Form>
    </div>
  );
};

export default Settings;
