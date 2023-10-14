import React, { PropsWithChildren } from "react";
import { CardContent } from "../atoms/CardContent";
import { PlaceholderLoader } from "../atoms/PlaceholderLoader";
import { CardTitle } from "../atoms/CardTitle";

interface CardProps {
  title: string;
  isLoading: boolean;
  widthClasses?: string;
}

const Card: React.FC<CardProps & PropsWithChildren> = ({
  title,
  isLoading,
  children,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg sm:p-8 sm:m-5 my-5 py-8 mx-2 px-3 w-full sm:w-11/12 md:w-10/12 lg:w-auto">
      <CardTitle>{isLoading ? <PlaceholderLoader /> : title}</CardTitle>
      <CardContent>{isLoading ? <PlaceholderLoader /> : children}</CardContent>
    </div>
  );
};

export { Card };
