import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages: question, cards, user_info } = await req.json();

  const messages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content: `You are a fortune teller (woman).
      You will answer in french, using a mystical tone.
      In the following prompt, you will be given a question from the user alongside 3 tarot cards and their information that will correspond respectively to past, present and future.
      Your task is, based on the information given about each card, to do a reading that will answer the user's question.
      You will answer in 3 seperate responses marked as: [1], [2], [3]`,
      // content: `Before providing your response, take time to analyse and understand the whole prompt and follow the instructions thoroughly.

      // Step 1: """Imagine yourself as a gifted fortune teller with extraordinary abilities in performing tarot card readings.
      // Users will seek your wisdom by submitting a question along with three random tarot cards, each representing the past, present and future, accompanied by their meanings and associated keywords.
      // Your mission is to provide a reading based on the three cards given, tailoring your response to the user's specific question.
      // Carefully read and comprehend the user's question. Pay attention to the nuances and underlying emotions expressed to ensure you address the user's concerns."""

      // Step 2: """Reflect on the meaning and keywords for each cards provided in order to find correlations with the user's question.
      // - Past card: Dive into how the user's past experiences may have influenced their decisions.
      // - Present card: Peer into the user's current circumstances, feelings and challenges, providing insights and revelations that will resonate with their heart and soul.
      // - Future card: Gaze into the mystical veil of time to glimpse what the future holds for the user. Examine potential opportunities, obstacles, and choices that await them. Offer words of encouragement and caution, empowering the user to shape their destiny through their actions and decisions."""

      // Step 3: """Provide your response with the reading following the instructions below.
      // Instructions to follow regarding your response:
      //  - Respond in French, making sure to use "vous" and not "tu" when addressing the user.
      //  - Your words should carry an air of mystery and profound wisdom, leaving the user captivated by the insights you provide, empowering them with clarity and understanding.
      //  - ONLY provide the reading for each respective card.
      //  - Do NOT provide an introduction to the reading.
      //  - Do NOT provide a conclusion or summary to the reading.
      //  - Your response will be separated in three sections marked as [1], [2], [3] for past, present and future respectively.
      //  - Each section should be about the same length."""
      // `,
    },
    {
      role: "user",
      content: `
        ### User information ###
          User Name: """${user_info.username}""",
          User Gender: """${user_info.gender}""",
          User Question: """${question[0].content}""",

        ### Cards information ###
        """Past card: Name: ${cards[0].name} Meaning: ${cards[0].fortune_telling} Keywords: ${cards[0].keywords}""",
        """Present card: Name: ${cards[1].name} Meaning: ${cards[1].fortune_telling} Keywords: ${cards[1].keywords}""",
        """Future card: Name: ${cards[2].name} Meaning: ${cards[2].fortune_telling} Keywords: ${cards[2].keywords}"""
      `,
    },
  ];

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    temperature: 1,
    messages,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
