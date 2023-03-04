import React, { useState } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import Title from "../../../components/Title";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useStoreSupplierMutation } from "../../../features/apis/suppliersApi";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "../../../types/Validation";
import Loader from "../../../components/Loaders/Loader";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  vat: "",
};

const validationSchema = object({
  name: string().required(),
  email: string().email().required(),
  phone: string().required(),
  vat: string().required(),
});

const CreateSupplier = () => {
  const [globalMessage, setGlobalMessage] = useState("");
  const [createSupplier, { isLoading }] = useStoreSupplierMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (data, { setSubmitting }) => {
      setSubmitting(false);

      setGlobalMessage("");
      const response = await createSupplier(data);

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
          Object.entries(errors.data.errors).forEach(([key, errors]: [string, string[]]) => {
            formik.setFieldError(key, errors[0]);
          });
        }
      }
    },
  });

  return (
    <div>
      <Title title="Create Supplier" />
      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-white dark:bg-transparent p-4 dark:p-0 border-2 dark:border-none border-gray rounded-md"
      >
        {globalMessage && <div className="bg-danger h-12  lg:col-start-1 lg:col-end-4 flex items-center justify-center rounded-md">{globalMessage}</div>}
        <Input
          name="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
          placeholder="Name"
        />
        <Input
          name="vat"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.vat && formik.errors.vat ? formik.errors.vat : ""}
          placeholder="Vat"
        />
        <Input
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
          placeholder="Email"
        />
        <Input
          name="phone"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ""}
          placeholder="Phone"
        />
        <div>
          <Button disabled={isLoading} content={isLoading ? <Loader /> : "Create Supplier"} />
        </div>
      </form>
    </div>
  );
};

export default CreateSupplier;
