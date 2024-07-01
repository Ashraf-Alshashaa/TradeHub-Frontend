import { FC, useEffect } from "react";
import CustomButton from "../button/Button";
import { CloudinaryUploadWidgetProps } from "./types";

const CloudinaryUploadWidget: FC<CloudinaryUploadWidgetProps> = ({
  onUpload,
}) => {
  useEffect(() => {
    if (window.cloudinary) {
      const myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: import.meta.env
            .VITE_REACT_APP_CLOUDINARY_CLOUD_NAME as string,
          uploadPreset: import.meta.env
            .VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET as string,
          sources: ["local", "url", "camera", "image_search"],
          cropping: true,
          croppingAspectRatio: 1,
          croppingCoordinatesMode: "custom",
          croppingValidateDimensions: true,
          showAdvancedOptions: true,
          multiple: false,
          defaultSource: "local",
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            onUpload(result.info.secure_url);
            myWidget.close();
          }
        }
      );

      const uploadButton = document.getElementById("upload_widget");

      const handleClick = () => {
        myWidget.open();
      };

      uploadButton?.addEventListener("click", handleClick);

      return () => {
        uploadButton?.removeEventListener("click", handleClick);
      };
    }
  }, [onUpload]);

  return (
    <CustomButton
      buttonType="secondary"
      text="Upload Image"
      id="upload_widget"
      className="cloudinary-button"
      onClick={() => {}}
    />
  );
};

export default CloudinaryUploadWidget;
