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
import { useTranslation } from "react-i18next";
import Form from "../../../components/Form/Form";
import GlobalError from "../../../components/GlobalError";

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
  const { t } = useTranslation();

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
          Object.entries(errors.data.errors).forEach(([key, errors]: [string, string[]]) => {
            formik.setFieldError(key, errors[0]);
          });
        }
      }
    },
  });

  return (
    <div>
      <Title title={String(t("create")) + "  " + String(t("category"))} />
      <Form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <GlobalError global_message={globalMessage} />
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
            error={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
            placeholder={String(t("name")) + "..."}
          />
          <div className="max-w-lg">
            <Button disabled={isLoading} content={isLoading ? <Loader /> : String(t("create")) + String(t("Category"))} />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CreateCategory;
