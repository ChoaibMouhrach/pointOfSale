import { useFormik } from 'formik';
import * as yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const Login = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data, { setSubmitting }) => {
      setSubmitting(false);
    },
  });

  return (
    <div className=" w-full h-screen bg-primary flex items-center justify-center">
      <div className="w-full max-w-lg bg-white mx-4 dark:bg-dark dark:text-light-gray rounded-md shadow-lg p-4">
        <div className="flex items-center justify-center  mb-9 mt-6">
          <h2 className="text-2xl font-semibold ">LOGIN</h2>
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <Input
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            placeholder="Email Address"
            name="email"
            type="email"
            error={
              formik.touched.email &&
              formik.touched.password &&
              formik.errors.email
            }
          />
          <Input
            handleBlur={formik.handleBlur}
            error={
              formik.touched.password &&
              formik.touched.password &&
              formik.errors.password
            }
            handleChange={formik.handleChange}
            placeholder="Password"
            name="password"
            type="password"
          />
          <Button content="LOGIN" />
        </form>
      </div>
    </div>
  );
};

export default Login;
