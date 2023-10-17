<p align="center">
   <img src="https://github.com/InternationallyLate/InternationallyLate/assets/19315384/ad74a572-4b10-4d29-a551-29bb630de9f3" alt="banner" width="400px"/>
</p>

# InternationallyLate

This project enables interaction with LLM via the OpenAI API.
  
# Project Workflow 
<p align="center">
   <img src="https://github.com/InternationallyLate/InternationallyLate/assets/19315384/a04dca8a-3d95-4925-accb-5efc6f38eb47" alt="Workflow" width="700px"/>
</p>

## Setup

1. **Setting Up Environment Variables**:

   - Navigate to the `inference/` directory.
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

   - Install [nodejs](https://nodejs.org/en/) if you haven't already.
   - Navigate to the `server` directory.
   - Install the dependencies with the following command:

      ```shell
      npm install
      ```

## Running the Project

- Navigate to the `server/` directory.
- Start the server with the following command:

   ```shell
   npm run dev
   ```

   The server will be running on port `3500`. You can access the website at `127.0.0.1:3500`.

## Project Structure

- `inference`: Contains the code for the Python Inference.
- `server`: Contains the code for the Express server, including the API and the frontend.
- `datasets`: Contains datasets used for training the probability models.
- `prob_model`: Contains the Jupyter Notebook with the probability model analysis.
