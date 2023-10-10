import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const CreditsCollapsible = ({
  image,
  id,
  array,
  title,
}: CreditsCollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[15rem] space-y-2"
    >
      <div className="flex items-center justify-between">
        <h4 className=" font-semibold">
          See {title} <span>({array.length})</span>
        </h4>
        <CollapsibleTrigger asChild>
          <Button
            variant="default"
            size="sm"
            className="w-9 -translate-x-3 p-0 text-white hover:bg-blue-600 dark:bg-main-red dark:hover:bg-red-600"
          >
            <BsChevronDown
              className={cn(
                `h-4 w-4 transition ${isOpen && "rotate-180"}`
              )}
            />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        {array.map((person, i) => (
          <div key={i}>
            <Link
              href={`/name/${id[i]}`}
              className="flex items-center gap-x-3 rounded-lg p-3 hover:bg-muted lg:-translate-x-3"
            >
              <Image
                src={
                  image[i]
                    ? `https://image.tmdb.org/t/p/w500${image[i]}`
                    : "https://placehold.co/50x50?text=No+image"
                }
                alt={person.toString()}
                width={50}
                height={50}
                className="aspect-square rounded-md object-cover"
              />
              <span>{person}</span>
            </Link>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
export default CreditsCollapsible;
