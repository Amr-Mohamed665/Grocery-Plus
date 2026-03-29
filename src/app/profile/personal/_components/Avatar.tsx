"use client";

// Icons
import { Plus, User } from "lucide-react";

// React
import { useRef, useState, ChangeEvent, useEffect } from "react";

// Next
import Image from "next/image";
import avatar from "@/assets/avatar.jpg";

// Custom Hooks
import { useUpdateImage } from "@/hooks/profile/useProfile";

// export default function Avatar({
//   dataUser,
//   isLoading,
// }: {
//   dataUser: { profile_image_url: string };
//   isLoading: boolean;
// }) {
export default function Avatar() {
  const [fileValid, setFileValid] = useState(true);
  const [imageSrc, setImageSrc] = useState(avatar);

  // const [imageSrc, setImageSrc] = useState(
  //   dataUser?.profile_image_url || avatar,
  // );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // useEffect(() => {
  //   setImageSrc(dataUser?.profile_image_url || avatar);
  // }, [dataUser]);

  const mutation = useUpdateImage();

  // Update Image
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate size & type
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (file.size > 5 * 1024 * 1024 || !validTypes.includes(file.type)) {
      setFileValid(false);
      return;
    }

    // Preview
    const imageUrl: any = URL.createObjectURL(file);
    setImageSrc(imageUrl || avatar);
    setFileValid(true);

    // Upload via mutation
    mutation.mutate(file);
  };

  return (
    <div className="bg-white border border-[#dad8d8] rounded-lg p-6 w-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex flex-col gap-4 items-start">
        <h2 className="text-[#0a0a0a] text-[20px]">Profile Picture</h2>

        <div className="flex flex-wrap gap-6 items-center">
          <div className="h-24 w-24 rounded-full overflow-hidden relative">
            {/* {isLoading ? (
              <div className="flex items-center bg-[#dad8d8] justify-center h-full w-full">
                <User className="text-[#014162] size-12" />
              </div>
            ) : (
              <Image
                src={imageSrc}
                alt="Profile"
                fill
                className="relative -top-3 object-cover"
              />
            )} */}

            <Image
              src={imageSrc}
              alt="Profile"
              fill
              className="relative -top-3 object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <button
              onClick={handleButtonClick}
              className="cursor-pointer bg-[#014162] text-[#f7fcff] w-fit flex items-center gap-1 px-2 py-2 rounded-lg hover:bg-[#015b7f] transition-colors"
            >
              <Plus className="text-[#f7fcff]" />
              <span>Upload New Photo</span>
            </button>

            <p
              className={`text-[18px] ${!fileValid ? "text-red-500" : "text-[#bcb8b1]"}`}
            >
              JPG, PNG or GIF. Max size 5MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
