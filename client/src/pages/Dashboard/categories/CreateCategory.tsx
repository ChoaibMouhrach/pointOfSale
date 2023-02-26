import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { ValidationError } from "../../../types/Validation";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Loader from "../../../components/Loaders/Loader";
import Title from "../../../components/Title";
import { useStoreCategoryMutation } from "../../../features/apis/categoriesApi";
import { StoreCategory } from "../../../types/Category";

const initialValues = {
  name: "",
};

const validationSchema = object({
  name: string().required(),
});

const CreateCategory = () => {
  const [globalMessage, setGlobalMessage] = useState("");
  const navigate = useNavigate();
  const [createCategory, { isLoading }] = useStoreCategoryMutation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (data: StoreCategory, { setSubmitting }) => {
      setSubmitting(false);
      const response = await createCategory(data);

      if ("data" in response) {
        navigate("/categories");
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
      <Title title="Create Category" />
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
            content={isLoading ? <Loader /> : "Create Category"}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
