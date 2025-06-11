import { Helmet } from "react-helmet"; // or 'react-helmet-async'

interface IProps {
  subtitle: string;
  favicon?: string;
}

function HelmetCustom({ subtitle, favicon }: IProps) {
  const title = subtitle + " | DonorHive";

  return (
    <Helmet>
      <title>{title}</title>
      <link rel="shortcut icon" href={favicon || "/images/logo.png"} type="image/x-icon" />
      {/* Optional: other common head elements */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  );
}

export default HelmetCustom;
