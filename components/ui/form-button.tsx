"use client";

import { experimental_useFormStatus } from "react-dom";
import { Button } from "./button";
import Spinner from "./spinner";

interface Props {
  onClick?: () => void;
}

const FormButton = ({ onClick }: Props) => {
  const { pending } = experimental_useFormStatus();

  return <Button type="submit">{pending ? <Spinner /> : "Submit"}</Button>;
};

export default FormButton;
