import React, { useState } from "react";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { ValidationError } from "../../../types/Validation";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Loader from "../../../components/Loaders/Loader";
import Title from "../../../components/Title";
import { useShowCategoryQuery, useUpdateCategoryMutation } from "../../../features/apis/categoriesApi";
import { Category, UpdateCategory } from "../../../types/Category";
import { useTranslation } from "react-i18next";
import GlobalError from "../../../components/GlobalError";
import Form from "../../../components/Form/Form";

const initialValues = {
  name: "",
};

const validationSchema = object({
  name: string().required(),
});

const EditCategory = () => {
  const { id } = useParams();
  const [globalMessage, setGlobalMessage] = useState<string>("");
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [updateCategory, { isLoading: isUpdatingCategoryLoading }] = useUpdateCategoryMutation();
  const {
    data: category,
    isSuccess: isCategorySuccess,
    isLoading: isCategoryLoading,
  } = useShowCategoryQuery<UseQueryHookResult<any> & { data: Category }>(Number(id), {
    refetchOnMountOrArgChange: true,
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (data: UpdateCategory, { setSubmitting }) => {
      setSubmitting(false);

      const response = await updateCategory({ id: Number(id), category: data });

      if ("data" in response) {
        navigate("/categories");
      }

      if ("error" in response) {
        const errors = response.error as {
          status: string;
          data: ValidationError;
        };

        if (errors.data.errors) {
          Object.entries(errors.data.errors).forEach(([key, errors]: [string, string[]]) => {
            formik.setFieldError(key, errors[0]);
          });
        }

        if (errors.data.message) {
          setGlobalMessage(errors.data.message);
        }
      }
    },
  });

  return (
    <div>
      <Title title={String(t("edit")) + " " + String(t("category"))} />

      <Form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <GlobalError global_message={globalMessage} />
          <Input
            skelton={isCategoryLoading}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
            name="name"
            defaultValue={isCategorySuccess ? category.name : ""}
            placeholder={String(t("name"))}
          />

          <div className="max-w-lg">
            <Button disabled={isUpdatingCategoryLoading} content={isUpdatingCategoryLoading ? <Loader /> : String(t("update")) + " " + String(t("category"))} />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditCategory;
