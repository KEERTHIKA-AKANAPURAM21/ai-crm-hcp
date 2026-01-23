AI CRM HCP Backend

This is a backend FastAPI application for managing healthcare professional (HCP) interactions. It integrates:

- **FastAPI** for building REST APIs
- **LangChain** with OpenAI GPT models for AI-powered interaction summaries
- **JWT authentication** for secure endpoints

---

Features

- User authentication with JWT tokens
- AI-powered interaction analysis using OpenAI GPT-3.5/GPT-4
- CORS enabled for frontend integration
- Secure endpoints with `Depends(get_current_user)`

---

Folder Structure

```

backend/
│
├─ app/
│   ├─ main.py             # FastAPI app
│   ├─ auth.py             # JWT authentication
│   ├─ langgraph_agent.py  # AI agent using LangChain
│   ├─ models.py           # Pydantic models
│   └─ **init**.py

````

---

Requirements

- Python 3.10+
- Virtual environment recommended

Install dependencies:

```bash
pip install fastapi uvicorn langchain openai python-jose
````

---

Setup

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd ai-crm-hcp/backend/app
```

2. **Activate virtual environment**

```bash
# Windows
.\.venv\Scripts\activate

# Mac/Linux
source .venv/bin/activate
```

3. **Set OpenAI API Key**

```bash
# Windows
setx OPENAI_API_KEY "your_openai_key_here"

# Mac/Linux
export OPENAI_API_KEY="your_openai_key_here"
```

4. **Optional**: Set secret key for JWT

```bash
# Windows
setx SECRET_KEY "your_secret_here"

# Mac/Linux
export SECRET_KEY="your_secret_here"
```

---

Running the App

```bash
uvicorn main:app --reload
```

* The app will run at: `http://127.0.0.1:8000`
* Swagger docs available at: `http://127.0.0.1:8000/docs`

---

API Endpoints

Authentication

* **POST /login**
  Request:

  ```json
  {
    "username": "admin",
    "password": "admin"
  }
  ```

  Response:

  ```json
  {
    "access_token": "<jwt_token>",
    "token_type": "bearer"
  }
  ```

AI Interaction

* **POST /interactions/ai**
  Requires JWT token in `Authorization: Bearer <token>` header.

  Request:

  ```json
  {
    "message": "Discussed product features with Dr. Smith."
  }
  ```

  Response:

  ```json
  {
    "hcp_name": "Detected HCP",
    "interaction_type": "Meeting",
    "date": "2026-01-23",
    "time": "10:30 AM",
    "attendees": "Doctor, Sales Rep",
    "topics_discussed": "Product efficacy",
    "materials_shared": "Brochure",
    "summary": "AI-generated summary...",
    "sentiment": "Positive",
    "follow_up": "Send clinical data"
  }
  ```

---

Notes

* The AI agent uses **LangChain v1.2.6** with `ChatOpenAI`.
* JWT secret should be stored securely in production.
* Editor underlines for `langchain.chat_models.openai` or `langchain.schema` are **normal in VS Code**; code runs fine if virtual environment is correct.

---

