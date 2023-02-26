import React, { useState } from "react";
import Title from "../../../components/Title";
import { useFormik } from "formik";
import { StoreBrand } from "../../../types/Brand";
import { object, string } from "yup";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useStoreBrandMutation } from "../../../features/apis/brandsApi";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "../../../types/Validation";
import Loader from "../../../components/Loaders/Loader";

const initialValues = {
  name: "",
};
const validationSchema = object({
  name: string().required(),
});

const CreateBrand = () => {
  const [globalMessage, setGlobalMessage] = useState("");
  const navigate = useNavigate();
  const [createBrand, { isLoading }] = useStoreBrandMutation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (data: StoreBrand, { setSubmitting }) => {
      setSubmitting(false);
      const response = await createBrand(data);

      if ("data" in response) {
        navigate("/brands");
        return;
      }

      if ("error" in response) {
        const errors = response.error as {
          status: string;
          data: ValidationError;
        };

        if (errors.data.message) {
          setGlobalMessage(errors.data.message);
        }

        if (errors.data.errors) {
          Object.entries(errors.data.errors).forEach(
            ([key, errors]: [string, string[]]) => {
              formik.setFieldError(key, errors[0]);
            }
          );
        }
      }
    },
  });

  return (
    <div>
      <Title title="Create Brand" />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        {globalMessage && (
          <div className="bg-danger h-12  lg:col-start-1 lg:col-end-4 flex items-center justify-center rounded-md">
            {globalMessage}
          </div>
        )}

        <Input
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          name="name"
          error={
            formik.touched.name && formik.errors.name ? formik.errors.name : ""
          }
          placeholder="Name..."
        />
        <div className="max-w-lg">
          <Button
            disabled={isLoading}
            content={isLoading ? <Loader /> : "Create Brand"}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateBrand;
