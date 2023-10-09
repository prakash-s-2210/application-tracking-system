import React, {useState} from "react";
import { Upload, message, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import "./UploadCover.css";
import { ApplicationForm } from "../../types";

type UploadCoverPictureProps = {
  formData: ApplicationForm;
  updateFormData: (value: ApplicationForm) => void
}

const UploadCover = ({formData, updateFormData}: UploadCoverPictureProps) => {
  const [imgSrc, setImgSrc] = useState<string>(formData.coverImage);
  const { Dragger } = Upload;
  const aspectRatio = 16 / 9;

  const checkFileSize = (file: File) => {
    const maxSizeInBytes = 1024 * 1024; // 1 MB
    if (file.size > maxSizeInBytes) {
      message.error("File size must be less than 1 MB");
      return false;
    }
    return true;
  };

  const checkAspectRatio = (file: File, aspectRatio: number) => {
    return new Promise<void>((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        const width = image.width;
        const height = image.height;
        const calculatedAspectRatio = width / height;
        if (Math.abs(calculatedAspectRatio - aspectRatio) <= 0.01) {
          resolve();
        } else {
          reject();
        }
      };

      image.onerror = () => {
        reject();
      };
    });
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => reject(error);
    });

  const customRequest = async ({ file }: any) => {
    try {
      const isSizeValid = checkFileSize(file);
      if (!isSizeValid) {
        return;
      }

      await checkAspectRatio(file, aspectRatio);
      const imageSource = await getBase64(file);
      setImgSrc(imageSource);
      updateFormData({
        ...formData, 
        coverImage: imageSource
      });

    } catch (error) {
      message.error("Image must have a 16:9 aspect ratio");
    }
  };
  const props: UploadProps = {
    name: "file",
    maxCount: 1,
    accept: ".jpg,.jpeg,.png,.gif,.bmp,.tiff,.webp,.svg,.avif",
    customRequest,
    showUploadList: false,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };



  return (
    <div className="upload-container">
      <h3 className="layout-heading">Upload cover image</h3>

      {formData.coverImage ? (
        <Upload {...props} className="preview-wrapper">
          <img src={imgSrc ? imgSrc : ""} alt="Preview Cover" className="preview-img" />
          <div className="reupload-wrapper">
            <img
              src="/assets/icons/close.svg"
              alt="close icon"
              width={24}
              height={24}
            />

            <p>Delete & re-upload</p>
          </div>
        </Upload>
      ) : (
        <Dragger {...props} className="dragger">
          <img
            src="/assets/icons/upload.svg"
            alt="upload icon"
            className="ant-upload-drag-icon"
          />
          <p className="ant-upload-text" style={{ fontWeight: "bold" }}>
            Upload cover image
          </p>
          <p className="ant-upload-hint" style={{ fontWeight: 500 }}>
            16:9 ratio is recommended. Max image size 1mb
          </p>
        </Dragger>
      )}
    </div>
  );
};

export default UploadCover;
