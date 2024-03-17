import { TUploadImageResponse } from "@/types/image";
import { request } from "./utils";

const uploadImage = (formData: FormData): Promise<TUploadImageResponse> =>
  request.post("upload-image", formData, {}).then((res) => res.data);

const imageApi = {
  uploadImage,
};

export default imageApi;
