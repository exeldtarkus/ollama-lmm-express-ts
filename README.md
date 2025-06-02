# 🧠 LLM Smart Search Backend

This is a backend-only Node.js + TypeScript project that integrates a local LLM (via Ollama) and Google Maps API to generate place recommendations from natural language prompts. It returns directions and map embeds via API responses.

## 📌 Features

- 🔍 Accepts user prompts like:  
  _"Best coffee shop in Bandung"_ or _"Where to eat ramen in Jakarta?"_
- 🤖 Sends the prompt to a **local LLM** via Ollama
- 🧠 Parses LLM output to extract place names
- 📍 Searches those places via **Google Places API**
- 🗺️ Returns:
  - Place name & address
  - Google Maps **embed URL**
  - Google Maps **directions link**

## 🚀 How It Works

```mermaid
graph TD
    A[User Prompt] --> B[LLM (Ollama)]
    B --> C[Extract Place Names]
    C --> D[Google Places API]
    D --> E[Return JSON (embedUrl + directionLink)]
````

## 🧪 Sample Response

```json
{
  "query": "Best coffee shops in Bandung",
  "recommendations": {
    "place": [
      {
        "name": "The Daily Grind",
        "address": "Jl. Braga No.10, Bandung",
        "mapEmbedUrl": "https://www.google.com/maps/embed/v1/place?...",
        "directionsLink": "https://www.google.com/maps/dir/?api=1&destination=..."
      }
    ]
  }
}
```

## 🔧 Requirements

* Node.js v18+
* Ollama (local LLM runtime)
* Google Cloud API Key with:

  * ✅ Places API enabled
  * ✅ Maps Embed API enabled

## 📦 Setup Instructions

1. **Clone project**

   ```bash
   git clone https://github.com/your-username/llm-smart-search-backend.git
   cd llm-smart-search-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup `.env`**

   ```env
    APP_ENV=dev
    APP_DEBUG=true
    APP_URL=localhost
    APP_PORT=8010
    APP_STATIC_TOKEN=testKey123213123131APPSTATICTOKEN
    APP_TIMEZONE=Asia/Jakarta

    APP_ACCESS_TOKEN_SECRET=testKey123213123131APPACCESSTOKENSECRET
    APP_REFRESH_TOKEN_SECRET=testKey123213123131APPREFRESHTOKENSECRET
    APP_USER_DEFAULT_PASSWORD=testKey123213123131APPUSERDEFAULTPASSWORD

    GOOGLE_MAPS_BASE_URL=https://maps.googleapis.com/maps
    GOOGLE_MAPS_API_KEY= testKey123213123131,
    OLLAMA_BASE_URL=http://localhost:11434
    OLLAMA_LEARNING_MODEL=llama3.2

   ```

4. **Run Ollama model**

   ```bash
   ollama run llama3
   ```

5. **Start backend server**

   ```bash
   npm run dev
   ```

## 🔐 Google Maps API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project
3. Enable:

   * Places API
   * Maps Embed API
4. Create credentials → API Key
5. Restrict the key to backend IP or service use only

## 📘 API Documentation (Swagger)

Visit:
`http://localhost:8010/docs`

> Documentation is generated using Swagger JSDoc and exposed via `swagger-ui-express`.

## 🧠 Prompt Examples

* "Tempat ngopi terbaik di Bandung"
* "Rekomendasi restoran Jepang di Surabaya"
* "Museum seni di Jakarta Selatan"

## 📎 License

MIT License

## ✨ Credits

* [Ollama](https://ollama.com/) for running LLMs locally
* [Google Maps Platform](https://developers.google.com/maps) for search & embed features
