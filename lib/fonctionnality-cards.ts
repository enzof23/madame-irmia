import TarotImage from "@/public/fct-card-tarot.svg";
import ChatImage from "@/public/fct-card-chat.svg";
import HoroscopeImage from "@/public/fct-card-horoscope.svg";

export type Functionnality = {
  available: boolean;
  tagline: "tarot" | "voyance" | "horoscope";
  title: string;
  description: string;
  cta: string;
  image: string;
};

export const fonctionnalities: Functionnality[] = [
  {
    available: true,
    tagline: "tarot",
    title: "Révélez votre destinée en tirant les bonnes cartes",
    description:
      "Donnez à l'Univers votre intention, tirez vos cartes et bénéficiez d'une prédiction pour vous orienter et vous aider à anticiper tous les imprévus.",
    cta: "Prédire mon avenir",
    image: TarotImage,
  },
  {
    available: false,
    tagline: "voyance",
    title: "Posez-moi vos questions et trouvez votre chemin vers la réussite",
    description:
      "Demandez-moi ce que vous désirez et recevez en quelques secondes des conseils pour réussir votre vie.",
    cta: "Consulter maintenant",
    image: ChatImage,
  },
  {
    available: false,
    tagline: "horoscope",
    title: "Découvrez chaque jour votre potentiel caché",
    description:
      "Recevez des informations quotidiennes sur votre personnalité et votre avenir.",
    cta: "Découvrir",
    image: HoroscopeImage,
  },
];
