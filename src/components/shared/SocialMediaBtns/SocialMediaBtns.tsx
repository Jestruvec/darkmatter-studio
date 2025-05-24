import { CustomBtn } from "@/components";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export const SocialMediaBtns = () => {
  return (
    <>
      <CustomBtn variant="text" size="sm">
        <FaFacebook size={24} />
      </CustomBtn>
      <CustomBtn variant="text" size="sm">
        <FaInstagram size={24} />
      </CustomBtn>
    </>
  );
};
