import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuthenticateMutation } from "../../features/apis/authApi";
import { Login } from "../../types/Auth";
import Loader from "../../components/Loaders/Loader";
import { ValidationError } from "../../types/Validation";
import { User } from "../../types/User";
import { setUser } from "../../features/slices/userSlice";
import { useDispatch } from "react-redux";
import GlobalError from "../../components/GlobalError";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const Login = () => {
  const [global_message, set_global_message] = useState<string>("");
  const [login, { isLoading, isError, isSuccess }] = useAuthenticateMutation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (data: Login, { setSubmitting }) => {
      setSubmitting(false);

      set_global_message("");

      const response = await login(data);

      if ("data" in response) {
        const { user, token }: { user: User; token: string } = response.data;

        dispatch(setUser(user));
        localStorage.setItem("authToken", token);
      }

      if ("error" in response) {
        const error = response.error as {
          status: string;
          data: ValidationError;
        };

        if (error.data.errors) {
          const errors: [string, string[]][] = Object.entries(error.data.errors);

          errors.forEach(([error_name, error_value]: [string, string[]]) => {
            formik.setFieldError(error_name, error_value[0]);
          });
        }

        if (error.data.message) {
          set_global_message(error.data.message);
        }
      }
    },
  });

  return (
    <div className=" w-full h-screen bg-primary flex items-center flex-col gap-4 justify-center">
      <GlobalError global_message={global_message} />
      <div className="w-full max-w-lg bg-white  dark:bg-dark dark:text-light-gray rounded-md shadow-lg p-4 mx-4">
        <div className="flex items-center justify-center  mb-9 mt-6">
          <h2 className="text-2xl font-semibold ">LOGIN</h2>
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <Input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.email && formik.touched.email ? formik.errors.email : ""}
            placeholder="Email Address..."
            name="email"
            type="email"
          />
          <Input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.password && formik.touched.password ? formik.errors.password : ""}
            placeholder="Password"
            name="password"
            type="password"
          />
          <Button variation={isError ? "error" : isSuccess ? "success" : "default"} content={isLoading ? <Loader /> : "LOGIN"} />
        </form>
      </div>
    </div>
  );
};

export default Login;
