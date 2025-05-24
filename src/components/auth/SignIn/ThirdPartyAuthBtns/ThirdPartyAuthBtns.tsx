import { CustomBtn } from "@/components";
import { FaFacebook, FaGoogle } from "react-icons/fa";

interface Props {
  className?: string;
}

export const ThirdPartyAuthBtns = ({ className }: Props) => {
  const authWithFacebook = () => {};

  const authWithGoogle = () => {};

  return (
    <div className={`flex gap-2 justify-center ${className}`}>
      <CustomBtn variant="text" onClick={authWithGoogle}>
        <FaGoogle size="32" />
      </CustomBtn>

      <CustomBtn variant="text" onClick={authWithFacebook}>
        <FaFacebook size="32" />
      </CustomBtn>
    </div>
  );
};
