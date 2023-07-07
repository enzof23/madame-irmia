import { tarotCards } from "@/lib/tarot-data";
import { supabaseServer } from "@/supabase-clients/server";
import Image from "next/image";

export default async function TarotDisplay({
  activity_id,
}: {
  activity_id: string;
}) {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("tarot")
    .select("*")
    .eq("activity_id", activity_id);

  if (!data || data.length === 0 || error)
    throw new Error(`Couldn't retrieve activity data from tarot table`);

  const activity_data = data[0];

  const created_at = new Date(activity_data.created_at).toLocaleDateString();
  const question = activity_data.question;

  const reading = [
    {
      card: activity_data.first_cardID,
      reading: activity_data.first_reading,
      context: "Passé",
    },
    {
      card: activity_data.second_cardID,
      reading: activity_data.second_reading,
      context: "Présent",
    },
    {
      card: activity_data.third_cardID,
      reading: activity_data.third_reading,
      context: "Futur",
    },
  ];

  const cardNames: string[] = reading.map((item) => {
    const matchingCard = tarotCards.find((card) => card.img === item.card);
    return matchingCard ? matchingCard.name : "";
  });

  return (
    <div className="flex w-full max-w-2xl flex-col gap-y-5">
      <h3 className="text-primary-20 text-2xl font-spectral font-semibold">
        Tirage du {created_at}
      </h3>

      <div className="gradient-right p-[1px] rounded-lg animate-fadeIn">
        <div className="flex flex-col gap-y-2 rounded-lg bg-dark p-4">
          <h3 className="font-spectral text-2xl font-semibold text-primary-60 md:text-2xl">
            Votre question
          </h3>

          <div className="font-inter pl-2 text-primary-40">{question}</div>
        </div>
      </div>

      <div className="flex flex-col gap-y-4 py-2">
        {reading.map((rd, index) => {
          const { card, context, reading } = rd;
          const gradientTo = index === 1 ? "right" : "left";

          const duration =
            index === 0
              ? "animation-duration-500"
              : index === 1
              ? "animation-duration-1000"
              : "animation-duration-1500";

          return (
            <div
              className={`rounded-lg p-[1px] gradient-${gradientTo} animate-reading-activityCard ${duration}`}
              key={cardNames[index]}
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
                    src={require(`@/public/tarot-cards/${card}`)}
                    alt={`${cardNames[index]} image`}
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
                    {context} - {cardNames[index]}
                  </h3>

                  {reading}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
