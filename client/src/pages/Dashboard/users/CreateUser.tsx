import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { object, string, ref } from "yup";
import { ValidationError } from "../../../types/Validation";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Loader from "../../../components/Loaders/Loader";
import Title from "../../../components/Title";
import { useStoreUserMutation } from "../../../features/apis/usersApi";

const initialValues = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const validationSchema = object({
  name: string().required(),
  email: string().email().required(),
  password: string().min(8).required(),
  password_confirmation: string()
    .min(8)
    .oneOf([ref("password"), ""], "Passwords must match")
    .required(),
});

const CreateUser = () => {
  const [globalMessage, setGlobalMessage] = useState("");
  const [createUser, { isLoading }] = useStoreUserMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (data, { setSubmitting }) => {
      setSubmitting(false);

      setGlobalMessage("");
      const response = await createUser(data);

      if ("data" in response) {
        navigate("/users");
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
      <Title title="Create User" />
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
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
          placeholder="Email"
        />
        <Input
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
          placeholder="Passsword"
        />
        <Input
          name="password_confirmation"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.password_confirmation && formik.errors.password_confirmation ? formik.errors.password_confirmation : ""}
          placeholder="Passsword Confirmation"
        />
        <div>
          <Button disabled={isLoading} content={isLoading ? <Loader /> : "Create User"} />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
