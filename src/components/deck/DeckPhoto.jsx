import { cn } from "@/lib/utils";
import { Image } from "@/components/ui/image";

/** One warm object photograph, held to a halftone so it sits inside the type. */
export default function DeckPhoto({ src, alt, className }) {
  return (
    <figure className={cn("dk-photo", className)}>
      <Image src={src} alt={alt} fittingType="fill" className="h-full w-full" />
    </figure>
  );
}