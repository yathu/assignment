import Image from "next/image";
import React, { useRef, useState } from "react";

export default function Home() {
  const [isSizeIssue, setIsSizeIssue] = useState<boolean>(false);
  const [baseImag, setBastImg] = useState<string>("");

  const handleChange = (data: boolean, img: string) => {
    setIsSizeIssue(data);
    setBastImg(img);
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

      {baseImag && (
        <div className={`w-full max-w-full overflow-hidden px-4 mt-4`}>
          <h6 className={`text-lg`}>Base 64 Object</h6>

          <div className={`w-full p-4 rounded-md border-gray-400 border`}>
            <p className={`break-all line-clamp-3 text-red-600`}>{baseImag}</p>
          </div>
        </div>
      )}
    </div>
  );
}

interface UploadImageProp {
  onchange: (data: boolean, img: string) => void;
}

const UploadShowImage = ({ onchange }: UploadImageProp) => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const checkSize = async (file: any) => {
    if (file) {
      let img: HTMLImageElement;
      img = document.createElement("img");

      img.onload = async function (event) {
        console.log({ width: img.width, height: img.height });
        const { width, height } = img;

        const isSize = width == 512 && height == 512;

        convertBase64(file).then((data) => {
          onchange(!isSize, data.toString());
        });
      };

      img.src = URL.createObjectURL(file);
    } else {
      console.log("no file");
    }
  };

  const convertBase64 = (file: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const out = fileReader?.result ? fileReader?.result.toString() : "";
        resolve(out);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
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

              if (event.target.files) {
                setSelectedImage(event?.target?.files[0]);
                checkSize(event?.target?.files[0]);
              }
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
