import { Card } from "@/lib/tarot-data";
import Image from "next/image";

type WrapperProps = {
  children: React.ReactNode;
  card: Card;
  index: number;
};

export function CardReadingWrapper(props: WrapperProps) {
  const { children, card, index } = props;
  const gradientTo = index === 1 ? "right" : "left";

  const delay =
    index === 1
      ? "animation-delay-1000"
      : index === 2
      ? "animation-delay-2000"
      : "";

  return (
    <div
      className={`rounded-lg p-[1px] gradient-${gradientTo} animate-reading-tarotCard ${delay}`}
      key={card.name}
    >
      <div
        className={`flex flex-col gap-y-4 px-3 py-5 rounded-lg sm:grid bg-dark ${
          index !== 1
            ? "sm:grid-cols-[max-content_1fr]"
            : "sm:grid-cols-[1fr_max-content]"
        } sm:gap-x-5`}
      >
        <div
          className={`h-screen max-h-[265px] w-screen max-w-[155px] self-center rounded-lg bg-neutral-700 ${
            index === 1 ? "col-start-2" : "col-start-1"
          }`}
        >
          <Image
            width={155}
            height={265}
            src={require(`@/public/tarot-cards/${card.img}`)}
            alt={`${card.name} image`}
            className={`mx-auto h-auto max-h-[265px] w-auto max-w-[155px] sm:mx-0`}
          />
        </div>

        <div
          className={`row-start-1  flex flex-col gap-y-2 ${
            index === 1 ? "col-start-1 pl-2" : "col-start-2 pl-0"
          }`}
        >
          <h3
            className={`text-center anim font-spectral text-xl font-medium text-primary-40 sm:text-start md:text-2xl`}
          >
            {index === 0 ? "Passé" : index === 1 ? "Présent" : "Futur"} -{" "}
            {card.name}
          </h3>

          {children}
        </div>
      </div>
    </div>
  );
}

export function ReadingLoading() {
  return (
    <div className="animate-pulse flex h-full">
      <div className="flex-1 flex flex-col gap-y-3 bg-neutral-800 p-3 pr-5 rounded-lg">
        <div className="bg-neutral-700 max-h-4 rounded-lg flex-1 max-w-[75%]" />
        <div className="bg-neutral-700 max-h-4 rounded-lg flex-1 max-w-[80%]" />
        <div className="bg-neutral-700 max-h-4 rounded-lg flex-1 max-w-[85%]" />
        <div className="bg-neutral-700 max-h-4 rounded-lg flex-1 max-w-[90%]" />
        <div className="bg-neutral-700 max-h-4 rounded-lg flex-1 max-w-[100%]" />
      </div>
    </div>
  );
}
