import openai
from dotenv import load_dotenv
import json
import argparse
import os


# add the new message to the JSON file
def modify_json_content(data, new_string):
    # Append a new message with role 'user' and the given content
    user_message = {
        "role": "user",
        "content": new_string
    }
    data['messages'].append(user_message)
    return data


# Define the function
def ask(messages):
    # Check for the messages in the input
    if not messages:
        return {"error": "No messages provided"}
    # Ensure the system message is provided in the input
    if not any(msg["role"] == "system" for msg in messages):
        return {"error": "No system message provided"}
    # Communicate with OpenAI's API
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    answer = response.choices[0].message['content']
    return {"answer": answer, "messages": messages + [{"role": "assistant", "content": answer}]}



# Command line arguments setup
if __name__ == '__main__':
    # Load environment variables from .env file
    load_dotenv()
    # Access the API key using the os module
    API_KEY = os.getenv('OPENAI_API_KEY')
    # Set the API key for the openai library
    openai.api_key = API_KEY

    parser = argparse.ArgumentParser(description='Modify a JSON file with a new user message and then use it with OpenAI API.')
    parser.add_argument('-f', '--file', required=True, help='Path to the JSON file')
    parser.add_argument('-m', '--string', required=True, help='Content string for the new user message')
    args = parser.parse_args()

    # Read and modify the JSON using the path provided in command line
    with open(args.file, 'r') as file:
        input_data = json.load(file)
        modified_data = modify_json_content(input_data, args.string)
        result = ask(modified_data.get("messages", []))

        # Print only the answer to the console
        print(result["answer"])

        # Remove the 'answer' key from the dictionary
        del result["answer"]

        # Save the result to 'conversation.json'
        with open('../../conversation.json', 'w') as outfile:
            json.dump(result, outfile, indent=4)