import Image from "next/image";
import React, { useRef, useState } from "react";

export default function Home() {
  const [isSizeIssue, setIsSizeIssue] = useState<boolean>(false);

  const handleChange = (data: boolean) => {
    setIsSizeIssue(data);
  };

  return (
    <div
      className={`w-screen h-screen bg-indigo-50 flex justify-center items-center flex-col`}
    >
      <div
        className={`w-[512px] h-[512px] bg-indigo-200 border border-dashed border-indigo-600 rounded-full overflow-hidden flex justify-center items-center`}
      >
        <UploadShowImage onchange={handleChange} />
      </div>
      {isSizeIssue && (
        <div>
          <p className={`bg-red-600 px-10 py-2 mt-5 rounded-md text-white`}>
            {isSizeIssue && "The image size should be 512 * 512"}
          </p>
        </div>
      )}
    </div>
  );
}

interface UploadImageProp {
  onchange: (data: boolean) => void;
}

const UploadShowImage = ({ onchange }: UploadImageProp) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const checkSize = (file: any) => {
    if (file) {
      let img: HTMLImageElement;
      img = document.createElement("img");

      img.onload = function (event) {
        console.log({ width: img.width, height: img.height });
        const { width, height } = img;

        const isSize = width == 512 && height == 512;
        onchange(!isSize);
      };

      img.src = URL.createObjectURL(file);
    } else {
      console.log("no file");
    }
  };

  return (
    <div>
      {!selectedImage && (
        <>
          <input
            className={`bg-indigo-400 w-[230px] py-2 px-2 rounded-md`}
            ref={inputRef}
            type="file"
            accept="image/png"
            name="myImage"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              // console.log(event?.target?.files[0]);
              setSelectedImage(event?.target?.files[0]);
              checkSize(event?.target?.files[0]);
            }}
          />
        </>
      )}
      {selectedImage && (
        <div>
          <Image
            height={512}
            width={512}
            alt="not found"
            src={URL.createObjectURL(selectedImage)}
          />
        </div>
      )}
    </div>
  );
};
