import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Title from "../../../components/Title";
import { mixed, number, object, string } from "yup";
import { UpdateProduct } from "../../../types/Product";
import {
  useShowProductQuery,
  useUpdateProductMutation,
} from "../../../features/apis/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Loader from "../../../components/Loaders/Loader";
import { ValidationError } from "../../../types/Validation";
import InputDropDown from "../../../components/InputDropDown";
import { useGetCategoriesQuery } from "../../../features/apis/categoriesApi";
import { useGetBrandsQuery } from "../../../features/apis/brandsApi";
import { Category } from "../../../types/Category";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { Unit } from "../../../types/Unit";
import { Brand } from "../../../types/Brand";

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
  id: string().nullable(),
  name: string().nullable(),
  cost: number().nullable(),
  price: number().nullable(),
  stock: number().nullable(),
  unit_id: number().nullable(),
  brand_id: number().nullable(),
  category_id: number().nullable(),
  image: mixed().nullable(),
});

const EditProduct = () => {
  const [
    updateProduct,
    {
      isSuccess: isUpdatingProductSuccess,
      isLoading: isUpdatingProductLoading,
    },
  ] = useUpdateProductMutation();
  const [global_message, setGlobal_message] = useState<string | null>(null);
  const navigate = useNavigate();

  const { data: categories, isSuccess: isCategoriesSuccess } =
    useGetCategoriesQuery<UseQueryHookResult<any> & { data: Category[] }>({});
  const { data: units, isSuccess: isUnitsSuccess } = useGetCategoriesQuery<
    UseQueryHookResult<any> & { data: Unit[] }
  >({});
  const { data: brands, isSuccess: isBrandsSuccess } = useGetBrandsQuery<
    UseQueryHookResult<any> & { data: Brand[] }
  >({});

  const { id } = useParams();
  const { data: product, isSuccess: isProductSuccess } = useShowProductQuery(
    id ?? "",
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (data: UpdateProduct, { setSubmitting }) => {
      setSubmitting(false);
      setGlobal_message(null);

      let something_changed = false;

      const formData = new FormData();

      formData.append("__method", "patch");

      Object.entries(data).forEach(
        ([key, value]: [string, string | number | Blob]) => {
          if (value) {
            something_changed = true;
            if (key === "image") {
              const file = value as Blob;
              formData.append(key, file);
            } else formData.append(key, String(value));
          }
        }
      );

      if (something_changed) {
        if (id) {
          const response = await updateProduct({ id, product: formData });

          if ("error" in response) {
            const errors = response.error as {
              status: string;
              data: ValidationError;
            };

            if (errors.data.errors) {
              Object.entries(errors.data.errors).forEach(
                ([key, value]: [string, string[]]) => {
                  formik.setFieldError(key, value[0]);
                }
              );
            }

            if (errors.data.message) {
              setGlobal_message(errors.data.message);
            }
          }
        }
      } else {
        setGlobal_message("Update Something first");
      }
    },
  });

  useEffect(() => {
    if (isUpdatingProductSuccess) {
      navigate("/products");
    }
  }, [isUpdatingProductSuccess]);

  return (
    <div>
      <Title title="Edit Product" />
      {isProductSuccess &&
        isCategoriesSuccess &&
        isProductSuccess &&
        isUnitsSuccess && (
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
              defaultValue={product?.id ?? ""}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={
                formik.touched.id && formik.errors.id ? formik.errors.id : ""
              }
              name="id"
              placeholder="id"
            />
            <Input
              defaultValue={product?.name ?? ""}
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
              defaultValue={product?.cost ?? ""}
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
              defaultValue={product?.price ?? ""}
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
              defaultValue={product?.stock ?? ""}
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
              defaultValue={product.unit_id}
              data={units.map((unit: Unit) => ({
                id: unit.id,
                name: unit.name,
              }))}
              handleChange={(value: string) => {
                formik.setFieldValue("unit_id", value);
              }}
              error={
                formik.touched.unit_id && formik.errors.unit_id
                  ? formik.errors.unit_id
                  : ""
              }
              placeholder={"Choose Unit"}
            />
            <InputDropDown
              defaultValue={product.brand_id}
              data={brands.map((brand: Brand) => ({
                id: brand.id,
                name: brand.name,
              }))}
              handleChange={(value: string) => {
                formik.setFieldValue("brand_id", value);
              }}
              error={
                formik.touched.brand_id && formik.errors.brand_id
                  ? formik.errors.brand_id
                  : ""
              }
              placeholder={"Choose Brand"}
            />
            <InputDropDown
              defaultValue={product.category_id}
              data={categories.map((category: Category) => ({
                id: category.id,
                name: category.name,
              }))}
              handleChange={(value: string) => {
                formik.setFieldValue("category_id", value);
              }}
              error={
                formik.touched.category_id && formik.errors.category_id
                  ? formik.errors.category_id
                  : ""
              }
              placeholder={"Choose Category"}
            />
            <div>
              <Button
                disabled={isUpdatingProductLoading}
                type="submit"
                content={
                  isUpdatingProductLoading ? <Loader /> : "Update Product"
                }
              />
            </div>
          </form>
        )}
    </div>
  );
};

export default EditProduct;
