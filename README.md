# InternationallyLate

## Running the API fn to interact with LLM
make a .env file in that stores your openai API key; the .env file should be in the api_stuff folder

run the command
python fn.py --file ./../prob_model/data.json --string "Your Question to LLM?"
to continue the conversation further use these commands
python fn.py --file ./conversation.json --string "Further questions?"
and your can keep on using the above command to continue the conversation just chage your question in the string "Further question?"
