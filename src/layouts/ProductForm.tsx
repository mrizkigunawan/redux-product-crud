import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Flex,
  Input,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

import useEncodeImage from "../hooks/useEncodeImage";
import { InputFile } from "../components/InputFile";
import { IsActiveCheckbox } from "../components/IsActiveCheckbox";
import { ProductPicture } from "../components/ProductPicture";
import { FormSubmitButton } from "../components/FormSubmitButton";
import { ImageUploadPreview } from "../components/ImageUploadPreview";
import { FormValues, Product } from "../ts/types";
import { actionCreators } from "../state";

interface ProductFormProps {
  onClickBack: () => void;
  editMode?: boolean;
  product?: Product;
}

/*
 *  product form component
 *  form for add and update product
 */
export const ProductForm: React.FC<ProductFormProps> = ({
  onClickBack,
  editMode = false,
  product = {},
}) => {
  // react-hook-form useForm hooks
  const {
    control,
    reset,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // destructuring variabels and functions from custom hooks
  const {
    onChangeFile,
    onRemoveFile,
    previewUrl,
    base64Url,
    errorOnUpload,
    setUploadError,
  } = useEncodeImage();

  // react-redux custom hooks
  const dispatch = useDispatch();

  // bind action creators
  const { createProduct } = bindActionCreators(actionCreators, dispatch);

  // populate values on edit mode
  useEffect(() => {
    if (Object.keys(product).length) {
      setValue("name", product.name);
      setValue("qty", product.qty);
      setValue("expiredAt", product.expiredAt);
    }
  }, [product, setValue]);

  // onsubmit callback
  // function returned form values object
  const onSubmit = (formValues: FormValues) => {
    // when there's no img provided or uploaded
    if (!previewUrl && !base64Url && !editMode) {
      setUploadError("Please upload a picture");
      return;
    }

    const newProduct = {
      ...formValues,
      qty: +formValues.qty,
      picture: base64Url,
      isActive: true,
    };

    createProduct(newProduct);
    reset(); // reset form field values
    onRemoveFile(); // remove photo preview url
  };

  // get form value when updating product
  const getFormValue = () => ({
    getValue: (key: string) => getValues(key),
    picture: base64Url || product.picture!,
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
          gap={6}
        >
          {/* image/picture preview */}
          {editMode && <ProductPicture image={product.picture || ""} />}

          {/* id form field (readonly), only show in detail/edit mode */}
          {editMode && (
            <GridItem colSpan={{ base: 2, lg: "auto" }}>
              <FormControl id="id">
                <FormLabel>Product ID</FormLabel>
                <Input type="text" defaultValue={product.id} readOnly />
              </FormControl>
            </GridItem>
          )}

          {/* product name input */}
          <GridItem colSpan={{ base: 2, lg: "auto" }}>
            <FormControl id="name">
              <FormLabel>Product Name</FormLabel>
              <Input
                type="text"
                autoComplete="off"
                defaultValue={product.name || ""}
                {...register("name", {
                  required: "Please provide the product name",
                })}
              />
              {/* show the error message when there is */}
              {errors.name && (
                <FormHelperText color="red.500">
                  {errors.name.message}
                </FormHelperText>
              )}
            </FormControl>
          </GridItem>

          {/* qty input */}
          <GridItem colSpan={{ base: 2, lg: "auto" }}>
            <FormControl id="qty">
              <FormLabel>Quantity</FormLabel>
              {/* use controller for manage n validate custom number input */}
              <Controller
                control={control}
                name="qty"
                rules={{
                  required: "The minimum qty is 1",
                  min: {
                    value: 1,
                    message: "The minimum qty is 1",
                  },
                }}
                defaultValue={product.qty || 0}
                render={({ field: { ref, ...restField } }) => (
                  <NumberInput {...restField}>
                    <NumberInputField ref={ref} name={restField.name} min={0} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              />
              {/* show the error message when there is */}
              {errors.qty && (
                <FormHelperText color="red.500">
                  {errors.qty.message}
                </FormHelperText>
              )}
            </FormControl>
          </GridItem>

          {/* picture upload */}
          <GridItem
            rowSpan={3}
            order={{ base: 4, md: 3 }}
            colSpan={{ base: 2, lg: "auto" }}
          >
            <FormControl id="picture">
              <FormLabel>Photo</FormLabel>
              {/* input file custom component */}
              <InputFile
                isDisabled={!!previewUrl}
                onChangeFile={onChangeFile}
              />
              {/* show the error message when there is */}
              {errorOnUpload && (
                <FormHelperText color="red.500">{errorOnUpload}</FormHelperText>
              )}
            </FormControl>

            {/* preview the image */}
            {previewUrl && (
              <ImageUploadPreview
                previewUrl={previewUrl}
                onRemoveFile={onRemoveFile}
              />
            )}
          </GridItem>

          {/* expiredAt input */}
          <GridItem
            order={{ base: 3, md: 4 }}
            colSpan={{ base: 2, lg: "auto" }}
          >
            <FormControl id="date">
              <FormLabel>Expired Date</FormLabel>
              <Input
                type="date"
                defaultValue={product.expiredAt || ""}
                {...register("expiredAt", {
                  required: "Please provide the expired date",
                })}
              />
              {/* show the error when there is */}
              {errors.expiredAt && (
                <FormHelperText color="red.500">
                  {errors.expiredAt.message}
                </FormHelperText>
              )}
            </FormControl>
          </GridItem>

          {/* active checkbox, show only on edit mode */}
          {editMode && <IsActiveCheckbox />}
        </Grid>

        {/* buttons */}
        <Flex
          alignItems="center"
          justify="end"
          pt="5"
          pb={editMode ? "5" : "0"}
        >
          <Button
            colorScheme="blue"
            variant="ghost"
            ml="4"
            onClick={onClickBack}
          >
            Back
          </Button>
          {/* submit form button - save/update */}
          <FormSubmitButton
            editMode={editMode}
            getFormValue={getFormValue}
            onRemoveFile={onRemoveFile}
          />
        </Flex>
      </form>
    </>
  );
};
