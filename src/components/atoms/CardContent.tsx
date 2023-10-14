import React, { PropsWithChildren } from "react";

export const CardContent: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className="backdrop-blur-xl hover:bg-cyan-400 hover:bg-opacity-5 hover:shadow-sm bg-cyan-300 bg-opacity-5 rounded-lg px-1 mx-1 sm:p-6 sm:m-6">
    {children}
  </div>
);
