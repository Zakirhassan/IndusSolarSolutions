const SITE_URL = "https://indussolarsolutions.com";
const DEFAULT_IMAGE = "/images/hero/hero-2b-adlershof.jpg";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export default function Seo({ title, description, path = "/", image = DEFAULT_IMAGE }: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Indus Solar Solutions" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  );
}
