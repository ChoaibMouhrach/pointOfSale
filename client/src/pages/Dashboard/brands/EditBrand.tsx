import React, { useState } from "react";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Title from "../../../components/Title";
import { useShowBrandQuery, useUpdateBrandMutation } from "../../../features/apis/brandsApi";
import { Brand, UpdateBrand } from "../../../types/Brand";
import Loader from "../../../components/Loaders/Loader";
import { useFormik } from "formik";
import { object, string } from "yup";
import { ValidationError } from "../../../types/Validation";
import { useTranslation } from "react-i18next";
import Form from "../../../components/Form/Form";
import GlobalError from "../../../components/GlobalError";

const initialValues = {
  name: "",
};

const validationSchema = object({
  name: string().required(),
});

const EditBrand = () => {
  const { id } = useParams();
  const [globalMessage, setGlobalMessage] = useState<string>("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [updateBrand, { isLoading: isUpdatingBrandLoading }] = useUpdateBrandMutation();
  const {
    data: brand,
    isLoading: isBrandLoading,
    isSuccess: isBrandSuccess,
  } = useShowBrandQuery<UseQueryHookResult<any> & { data: Brand }>(Number(id), {
    refetchOnMountOrArgChange: true,
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (data: UpdateBrand, { setSubmitting }) => {
      setSubmitting(false);

      const response = await updateBrand({ id: Number(id), brand: data });

      if ("data" in response) {
        navigate("/brands");
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
      <Title title={String(t("edit")) + " " + String(t("brand"))} />
      <Form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <GlobalError global_message={globalMessage} />
          <Input
            skelton={isBrandLoading}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
            name="name"
            defaultValue={isBrandSuccess ? brand.name : ""}
            placeholder={String(t("name"))}
          />

          <div className="max-w-lg">
            <Button disabled={isUpdatingBrandLoading} content={isUpdatingBrandLoading ? <Loader /> : String(t("update")) + "  " + String(t("brand"))} />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditBrand;
