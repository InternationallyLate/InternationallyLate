# InternationallyLate

This project enables interaction with LLM via the OpenAI API.

## Setup

1. **Setting Up Environment Variables**:

   - Navigate to the `inference` directory.
   - Create a `.env` file.
   - Add the following content to the `.env` file:

      ```text
      OPENAI_API_KEY=<your_openai_key>
      ```

      where `<your_openai_key>` is your OpenAI API key (remove the angle brackets).

2. **Installing Python Dependencies**:

   - Create a conda environment with the following command:

      ```shell
      conda env create --name <env> --file environment.yml
      ```

      where `<env>` is the name of the environment.
   - Activate the environment with the following command:

      ```shell
      conda activate <env>
      ```

3. **Installing Node Dependencies**:

   - Navigate to the `server` directory.
   - Install the dependencies with the following command:

      ```shell
      npm install
      ```

## Running the Project

1. **Starting the Server**:

   - Install [nodejs](https://nodejs.org/en/) if you haven't already.
   - Navigate to the `server` directory.
   - Start the server with the following command:

      ```shell
      npm run dev
      ```

      The server will be running on port `3500`.

2. **Starting the Frontend**:

   - We are using VSCode's [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to serve the client on port `5500`.

## Project Structure

- `inference`: Contains the code for the Python Inference.
- `server`: Contains the code for the NodeJS Server.
- `frontend`: Contains the code for the Frontend.
- `datasets`: Contains datasets used for training the probability models.
- `prob_model`: Contains the Jupyter Notebook with the probability model analysis.
