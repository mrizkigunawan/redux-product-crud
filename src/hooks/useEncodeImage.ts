import { useEffect, useState } from "react";
import { ALLOWED_IMG_TYPES, MAXIMUM_FILE_SIZE } from "../constant";

/*
 *  custom hooks for encode file to base64, preview, check or validating
 */
const useEncodeImage = () => {
  const [previewUrl, setPreviewUrl] = useState<string>(""); // preview Image url
  const [base64Url, setBase64Url] = useState<string>(""); // base64 encoded Image
  const [file, setFile] = useState<File | null>(null); // uploaded file (raw)
  const [errorOnUpload, setErrorOnUpload] = useState<string>(""); // error when uploading

  // create a preview as a side effect whenever selected file is changed
  useEffect(() => {
    if (!file) return;

    const objectUrl: string = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // get base64 encoded img when selected file is changed
    getBase64(file).then((text) => {
      const textEncoded = text as string;
      setBase64Url(textEncoded);
    });

    // free memory when ever this component is unmounted
    return () => {
      URL.revokeObjectURL(objectUrl);
      setPreviewUrl("");
      setBase64Url("");
      setFile(null);
      setErrorOnUpload("");
    };
  }, [file]);

  // get base64 encoded img when selected file is changed
  const getBase64 = (file: File) => {
    return new Promise((resolve) => {
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        const baseURL: string | ArrayBuffer | null = reader.result;
        resolve(baseURL);
      };
    });
  };

  // check file size to match the rules
  const checkSize = (size: number) => {
    return size < MAXIMUM_FILE_SIZE;
  };

  // check file type to match the rules
  const checkType = (typeFile: string) => {
    return ALLOWED_IMG_TYPES.includes(typeFile);
  };

  // fire when input file is changed
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;

    // grab the File object from FileList
    const img: File = files![0];

    // checking ..
    const isFileTypeValid = checkType(img.type);
    const isSizevalid = checkSize(img.size);

    // validating, if pass then state will update
    // error state will update when validation is not pass
    if (isFileTypeValid && isSizevalid) {
      setFile(img);
      setErrorOnUpload("");
    } else {
      setErrorOnUpload("Please check the file type or your image size");
    }
  };

  // fire when "Remove Photo" Btn clicked
  // clean all the state
  const onRemoveFile = () => {
    setPreviewUrl("");
    setBase64Url("");
    setFile(null);
    setErrorOnUpload("");
  };

  // returned variables and functions
  return {
    previewUrl,
    base64Url,
    onChangeFile,
    onRemoveFile,
    errorOnUpload,
    setUploadError: (msg: string) => setErrorOnUpload(msg),
  };
};

export default useEncodeImage;
