import openai
import os
from dotenv import load_dotenv
from openai import OpenAI, OpenAIError

load_dotenv(dotenv_path="../.env")
#openai.api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(
    api_key = os.getenv("OPENAI_API_KEY"),
)

def analyze_sentiment(note_text):
    try:
        response = client.chat.completions.create(
            messages=[
            {
                "role": "user",
                "content": f"Analyze the sentiment of the following text and classify it as positive, neutral, or negative:\n\n'{note_text}'"
            }
            ],
            model="gpt-4o-mini",
            max_tokens=15
    )
        sentiment = response.choices[0].message.content.strip().lower()

        
        if "positive" in sentiment:
            return "happy"
        elif "negative" in sentiment:
            return "sad"
        else:
            return "neutral"
    except OpenAIError as e:
        print(f"Error: {e}")
        return "neutral"