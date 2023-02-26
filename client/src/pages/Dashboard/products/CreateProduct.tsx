import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Title from "../../../components/Title";
import { StoreProduct } from "../../../types/Product";
import { mixed, number, object, string } from "yup";
import { useStoreProductMutation } from "../../../features/apis/productsApi";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "../../../types/Validation";
import Loader from "../../../components/Loaders/Loader";
import InputDropDown from "../../../components/InputDropDown";
import { useGetCategoriesQuery } from "../../../features/apis/categoriesApi";
import { Category } from "../../../types/Category";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { useGetBrandsQuery } from "../../../features/apis/brandsApi";
import { Brand } from "../../../types/Brand";
import { useGetUnitsQuery } from "../../../features/apis/unitsApi";
import { Unit } from "../../../types/Unit";

const initialValues = {
  id: "",
  name: "",
  cost: 0,
  price: 0,
  stock: 0,
  unit_id: 0,
  brand_id: 0,
  category_id: 0,
  image: undefined,
};

const validationSchema = object({
  id: string().required(),
  name: string().required(),
  cost: number().min(1).required(),
  price: number().min(1).required(),
  image: mixed().nullable(),
  stock: number().min(1).required(),
  unit_id: number().min(1).required(),
  brand_id: number().min(1).required(),
  category_id: number().min(1).required(),
});

const CreateProduct = () => {
  const [global_message, setGlobal_message] = useState<string | null>("");
  const navigate = useNavigate();

  const [storeProduct, { isLoading, isSuccess }] = useStoreProductMutation();
  const { data: categories, isSuccess: isCategoriesSuccess } =
    useGetCategoriesQuery<UseQueryHookResult<any> & { data: Category[] }>({});

  const { data: brands, isSuccess: isBrandsSuccess } = useGetBrandsQuery<
    UseQueryHookResult<any> & { data: Brand[] }
  >({});

  const { data: units, isSuccess: isUnitSuccess } = useGetUnitsQuery<
    UseQueryHookResult<any> & { data: Unit[] }
  >({});

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (data: StoreProduct, { setSubmitting }) => {
      setSubmitting(false);
      setGlobal_message(null);
      const formData = new FormData();

      Object.entries(data).forEach(
        ([key, value]: [string, string | number | Blob]) => {
          if (key === "image") {
            const file: Blob = value as Blob;
            formData.append(key, file);
          } else {
            formData.append(key, String(value));
          }
        }
      );

      const response = await storeProduct(formData);

      if ("error" in response) {
        const errors = response.error as {
          status: string;
          data: ValidationError;
        };

        if (errors.data.message) {
          setGlobal_message(errors.data.message);
        }

        if (errors.data.errors) {
          Object.entries(errors.data.errors).forEach(
            ([key, value]: [string, string[]]) => {
              formik.setFieldError(key, value[0]);
            }
          );
        }
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/products");
    }
  }, [isSuccess]);

  return (
    <div>
      <Title title="Create Product" />
      {isCategoriesSuccess && isBrandsSuccess && isUnitSuccess && (
        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-white dark:bg-transparent p-4 dark:p-0 border-2 dark:border-none border-gray rounded-md"
        >
          {global_message && (
            <div className="bg-danger h-12  lg:col-start-1 lg:col-end-4 flex items-center justify-center rounded-md">
              {global_message}
            </div>
          )}
          <Input
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            error={
              formik.touched.id && formik.errors.id ? formik.errors.id : ""
            }
            name="id"
            placeholder="id"
          />
          <Input
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""
            }
            name="name"
            placeholder="name"
          />
          <Input
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            error={
              formik.touched.cost && formik.errors.cost
                ? formik.errors.cost
                : ""
            }
            name="cost"
            placeholder="cost"
            type="number"
          />
          <Input
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            error={
              formik.touched.price && formik.errors.price
                ? formik.errors.price
                : ""
            }
            name="price"
            placeholder="price"
            type="number"
          />
          <Input
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            error={
              formik.touched.stock && formik.errors.stock
                ? formik.errors.stock
                : ""
            }
            name="stock"
            placeholder="stock"
            type="number"
          />
          <div className="flex flex-col justify-center bg-gray-200 dark:bg-dark-gray px-4 rounded-md">
            <input
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.files)
                  formik.setFieldValue("image", event.target.files[0]);
              }}
              onBlur={formik.handleBlur}
              type="file"
              name="image"
            />
          </div>

          <InputDropDown
            placeholder="Choose Unit"
            handleChange={(value: string) =>
              formik.setFieldValue("unit_id", value)
            }
            error={
              formik.touched.unit_id && formik.errors.unit_id
                ? formik.errors.unit_id
                : ""
            }
            data={units.map((unit: Unit) => ({
              id: unit.id,
              name: unit.name,
            }))}
          />
          <InputDropDown
            placeholder="Choose Brand"
            handleChange={(value: string) =>
              formik.setFieldValue("brand_id", value)
            }
            error={
              formik.touched.brand_id && formik.errors.brand_id
                ? formik.errors.brand_id
                : ""
            }
            data={brands.map((brand: Brand) => ({
              id: brand.id,
              name: brand.name,
            }))}
          />
          <InputDropDown
            placeholder="Choose Category"
            handleChange={(value: string) =>
              formik.setFieldValue("category_id", value)
            }
            error={
              formik.touched.category_id && formik.errors.category_id
                ? formik.errors.category_id
                : ""
            }
            data={categories.map((category: Category) => ({
              id: category.id,
              name: category.name,
            }))}
          />
          <div>
            <Button
              disabled={isLoading}
              type="submit"
              content={isLoading ? <Loader /> : "Create Product"}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateProduct;
