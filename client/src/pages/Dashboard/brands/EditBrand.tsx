import React, { useState } from "react";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Title from "../../../components/Title";
import {
  useShowBrandQuery,
  useUpdateBrandMutation,
} from "../../../features/apis/brandsApi";
import { Brand, UpdateBrand } from "../../../types/Brand";
import Loader from "../../../components/Loaders/Loader";
import { useFormik } from "formik";
import { object, string } from "yup";
import { ValidationError } from "../../../types/Validation";

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

  const [updateBrand, { isLoading: isUpdatingBrandLoading }] =
    useUpdateBrandMutation();
  const { data: brand, isSuccess } = useShowBrandQuery<
    UseQueryHookResult<any> & { data: Brand }
  >(Number(id), {
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
          Object.entries(errors.data.errors).forEach(
            ([key, errors]: [string, string[]]) => {
              formik.setFieldError(key, errors[0]);
            }
          );
        }
        if (errors.data.message) {
          setGlobalMessage(errors.data.message);
        }
      }
    },
  });

  return (
    <div>
      <Title title="Edit Brand" />
      {isSuccess && (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          {globalMessage && (
            <div className="bg-danger h-12  lg:col-start-1 lg:col-end-4 flex items-center justify-center rounded-md">
              {globalMessage}
            </div>
          )}
          <Input
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""
            }
            name="name"
            defaultValue={brand.name}
            placeholder="Brand Name"
          />

          <div className="max-w-lg">
            <Button
              disabled={isUpdatingBrandLoading}
              content={isUpdatingBrandLoading ? <Loader /> : "Update Brand"}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditBrand;
