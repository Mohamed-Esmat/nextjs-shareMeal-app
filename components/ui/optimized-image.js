import Image from "next/image";

export default function OptimizedImage({ src, alt, className, ...props }) {
  return <Image src={src} alt={alt} className={className} {...props} />;
}
