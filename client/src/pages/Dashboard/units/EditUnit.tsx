import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { ValidationError } from "../../../types/Validation";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Loader from "../../../components/Loaders/Loader";
import Title from "../../../components/Title";
import { useShowUnitQuery, useUpdateUnitMutation } from "../../../features/apis/unitsApi";
import { Unit, UpdateUnit } from "../../../types/Unit";
import { useTranslation } from "react-i18next";
import GlobalError from "../../../components/GlobalError";
import Form from "../../../components/Form/Form";

const initialValues = {
  name: "",
  shortname: "",
};

const validationSchema = object({
  name: string().nullable(),
  shortname: string().nullable(),
});

const EditUnit = () => {
  const { id } = useParams();
  const [globalMessage, setGlobalMessage] = useState<string>("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [updateUnit, { isLoading: isUpdatingUnitLoading }] = useUpdateUnitMutation();
  const {
    data: unit,
    isLoading: isUnitLoading,
    isSuccess: isUnitsSuccess,
  } = useShowUnitQuery<UseQueryHookResult<any> & { data: Unit }>(Number(id), {
    refetchOnMountOrArgChange: true,
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (data: UpdateUnit, { setSubmitting }) => {
      setSubmitting(false);

      setGlobalMessage("");

      if (data.name || data.shortname) {
        const response = await updateUnit({ id: Number(id), unit: data });

        if ("data" in response) {
          navigate("/units");
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
      } else {
        setGlobalMessage("Update something first");
      }
    },
  });
  return (
    <div>
      <Title title="Edit Unit" />
      <Form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <GlobalError global_message={globalMessage} />
          <Input
            skelton={isUnitLoading}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
            name="name"
            defaultValue={isUnitsSuccess ? unit.name : ""}
            placeholder={String(t("name"))}
          />
          <Input
            skelton={isUnitLoading}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.shortname && formik.errors.shortname ? formik.errors.shortname : ""}
            name="shortname"
            defaultValue={isUnitsSuccess ? unit.shortname : ""}
            placeholder={String(t("shortname"))}
          />
          <div className="max-w-lg">
            <Button disabled={isUpdatingUnitLoading} content={isUpdatingUnitLoading ? <Loader /> : String(t("update")) + " " + String(t("Unit"))} />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditUnit;
