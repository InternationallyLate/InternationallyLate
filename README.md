# InternationallyLate

## Running the API fn to interact with LLM
make a .env file in that stores your openai API key; the .env file should be in the api_stuff folder

run the command
python fn.py --file ./../prob_model/data.json --string "Your Question to LLM?"
to continue the conversation further use these commands
python fn.py --file ./conversation.json --string "Further questions?"
and your can keep on using the above command to continue the conversation just chage your question in the string "Further question?"

# InternationallyLate

This project enables interaction with LLM via the OpenAI API.

## Setup

1. **Setting Up Environment Variables**:
   - Navigate to the `api_stuff` directory.
   - Create a `.env` file.
   - Add the following content to the `.env` file:
     ```
     OPENAI_API_KEY=your_key_here
     ```

## Running the API Interaction

### Starting a New Conversation

Execute the following command to start a new interaction with LLM:

```bash
python fn.py --file ./../prob_model/data.json --string "Your initial question to LLM?"
```

### Continuing the Conversation

For subsequent questions, use:

```bash
python fn.py --file ./conversation.json --string "Your follow-up question?"
```
Note: Simply replace the content within the quotes after --string for each new question. You can use this command repeatedly for ongoing interactions, updating the question as needed.
