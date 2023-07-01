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
  const { messages: question, cards, prompt } = await req.json();

  const messages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content: `${prompt}. You will answer in 3 seperate responses marked as: [1], [2], [3]`,
    },
    {
      role: "user",
      content: `User question: ${question.content},
        Past card - Name: ${cards[0].name} Meaning: ${cards[0].fortune_telling} Keywords: ${cards[0].keywords},
        Present card - Name: ${cards[1].name} Meaning: ${cards[1].fortune_telling} Keywords: ${cards[1].keywords},
        Future card - Name: ${cards[2].name} Meaning: ${cards[2].fortune_telling} Keywords: ${cards[2].keywords}`,
    },
  ];

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    temperature: 0.6,
    messages,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
