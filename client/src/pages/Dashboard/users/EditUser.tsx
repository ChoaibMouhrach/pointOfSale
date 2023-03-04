import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { object, string, ref } from "yup";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Loader from "../../../components/Loaders/Loader";
import Title from "../../../components/Title";
import { useShowUserQuery, useUpdateUserMutation } from "../../../features/apis/usersApi";
import { UpdateUser } from "../../../types/User";
import { ValidationError } from "../../../types/Validation";

const initialValues = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const validationSchema = object({
  name: string().nullable(),
  email: string().email().nullable(),
});

const EditUser = () => {
  const [globalMessage, setGlobalMessage] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: user, isSuccess } = useShowUserQuery(Number(id));
  const [updateUser, { isLoading: isUpdatingUserLoading }] = useUpdateUserMutation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (data: UpdateUser, { setSubmitting }) => {
      setSubmitting(false);

      if (data.email || data.name || data.password || data.password_confirmation) {
        if (data.password || data.password_confirmation) {
          if (data.password !== data.password_confirmation) {
            formik.setFieldError("password", "Passwords does not match");
            return;
          }
        }

        const requestBody: UpdateUser & { [key: string]: string } = {};

        Object.entries(data).forEach(([key, value]: [string, string]) => {
          if (value) requestBody[key] = value;
        });

        const response = await updateUser({
          id: Number(id),
          user: requestBody,
        });

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
      } else {
        setGlobalMessage("Update something first");
      }
    },
  });

  return (
    <div>
      <Title title="Edit User" />
      {isSuccess && (
        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-white dark:bg-transparent p-4 dark:p-0 border-2 dark:border-none border-gray rounded-md"
        >
          {globalMessage && <div className="bg-danger h-12  lg:col-start-1 lg:col-end-4 flex items-center justify-center rounded-md">{globalMessage}</div>}
          <Input
            name="name"
            defaultValue={user.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
            placeholder="Name"
          />
          <Input
            name="email"
            defaultValue={user.email}
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
            placeholder="Password"
          />
          <Input
            name="password_confirmation"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.password_confirmation && formik.errors.password_confirmation ? formik.errors.password_confirmation : ""}
            placeholder="Password confirmation"
          />
          <div>
            <Button disabled={isUpdatingUserLoading} content={isUpdatingUserLoading ? <Loader /> : "Update Supplier"} />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditUser;
