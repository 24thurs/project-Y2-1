import { ReactNode } from "react";
import "./globals.css";

interface LayoutProps {
  children: ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};
export default layout;
