import React, { PropsWithChildren } from "react";

const CardTitle: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <h2 className="text-xl font-semibold mb-4 text-gray-800 md:text-left text-center">
      {children}
    </h2>
  );
};

export { CardTitle };
