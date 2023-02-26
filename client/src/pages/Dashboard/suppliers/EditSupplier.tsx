import React, { useState } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import Title from "../../../components/Title";
import { updateSupplier } from "../../../types/Supplier";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Loader from "../../../components/Loaders/Loader";
import { useNavigate, useParams } from "react-router-dom";
import {
  useShowSuppliersQuery,
  useUpdateSupplierMutation,
} from "../../../features/apis/suppliersApi";
import { ValidationError } from "../../../types/Validation";

const initialValues = {
  name: "",
  email: "",
  vat: "",
  phone: "",
};

const validationSchema = object({
  name: string().nullable(),
  phone: string().nullable(),
  email: string().email().nullable(),
  vat: string().nullable(),
});

const EditSupplier = () => {
  const [globalMessage, setGlobalMessage] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  const [updateSupplier, { isLoading: isUpdatingSupplierLoading }] =
    useUpdateSupplierMutation();
  const { data: supplier, isSuccess } = useShowSuppliersQuery(Number(id));

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (data: updateSupplier, { setSubmitting }) => {
      setSubmitting(false);

      if (data.email || data.name || data.vat || data.phone) {
        const response = await updateSupplier({
          id: Number(id),
          supplier: data,
        });

        if ("data" in response) {
          navigate("/suppliers");
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
      } else {
        setGlobalMessage("Update something first");
      }
    },
  });

  return (
    <div>
      <Title title="Edit Supplier" />
      {isSuccess && (
        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-white dark:bg-transparent p-4 dark:p-0 border-2 dark:border-none border-gray rounded-md"
        >
          {globalMessage && (
            <div className="bg-danger h-12  lg:col-start-1 lg:col-end-4 flex items-center justify-center rounded-md">
              {globalMessage}
            </div>
          )}
          <Input
            name="name"
            defaultValue={supplier.name}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""
            }
            placeholder="Name"
          />
          <Input
            name="vat"
            defaultValue={supplier.vat}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            error={
              formik.touched.vat && formik.errors.vat ? formik.errors.vat : ""
            }
            placeholder="Vat"
          />
          <Input
            name="email"
            defaultValue={supplier.email}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
            placeholder="Email"
          />
          <Input
            name="phone"
            defaultValue={supplier.phone}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            error={
              formik.touched.phone && formik.errors.phone
                ? formik.errors.phone
                : ""
            }
            placeholder="Phone"
          />
          <div>
            <Button
              disabled={isUpdatingSupplierLoading}
              content={
                isUpdatingSupplierLoading ? <Loader /> : "Update Supplier"
              }
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditSupplier;
