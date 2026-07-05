# ProspectIQ

ProspectIQ is an AI-powered CRM application for managing business leads, CSV imports, lead prioritization, and dashboard analytics. The project includes a React + Material UI frontend and a FastAPI backend with database migrations, authentication, import processing, and dashboard APIs.

## Tech Stack

Frontend:
- React
- Vite
- Material UI
- Recharts
- Axios
- React Router
- React Hook Form

Backend:
- FastAPI
- SQLAlchemy
- Alembic
- Pydantic
- JWT authentication
- Python virtual environment

Database:
- Configured through `DATABASE_URL`
- Alembic-managed schema migrations

## Folder Structure

```text
ProspectIQ/
  backend/
    alembic/                  Database migration environment
    alembic/versions/          Migration files
    app/
      core/                    Config, database, security helpers
      csv/                     CSV reading, validation, mapping, import helpers
      dependencies/            Auth dependency helpers
      enums/                   Shared enum definitions
      models/                  SQLAlchemy models
      repositories/            Database access layer
      routes/                  FastAPI route modules
      schemas/                 Pydantic request/response schemas
      services/                Business logic layer
      storage/                 Upload storage
      main.py                  FastAPI application entry point
    scripts/                   Utility scripts
    tests/                     Backend tests
    requirements.txt           Python dependencies
    seed.py                    Admin seed script

  frontend/
    public/                    Static frontend assets
    src/
      api/                     Axios clients and API modules
      assets/                  Frontend images/assets
      components/              Reusable UI components
      context/                 React context providers
      hooks/                   Custom React hooks
      layouts/                 App layout components
      pages/                   Route page components
      routes/                  Route definitions
      theme/                   Material UI theme configuration
      utils/                   Frontend utilities
      main.jsx                 React entry point
    package.json               Frontend dependencies and scripts
```

## Installation Steps

From the repository root:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

```bash
cd ../frontend
npm install
```

Run the backend:

```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

Run the frontend:

```bash
cd frontend
npm run dev
```

Default local URLs:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`
- Swagger API docs: `http://localhost:8000/docs`

## Environment Variables

Backend `.env` file location:

```text
backend/.env
```

Required backend variables:

```env
DATABASE_URL=your_database_connection_string
SECRET_KEY=your_jwt_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Frontend `.env` file location:

```text
frontend/.env
```

Optional frontend variable:

```env
VITE_API_BASE_URL=http://localhost:8000
```

If `VITE_API_BASE_URL` is not set, the frontend defaults to `http://localhost:8000`.

## Migration Commands

Run Alembic commands from the `backend` folder with the virtual environment activated.

Apply all migrations:

```bash
alembic upgrade head
```

Create a new migration after model changes:

```bash
alembic revision --autogenerate -m "describe_change"
```

Rollback one migration:

```bash
alembic downgrade -1
```

View migration history:

```bash
alembic history
```

View current database revision:

```bash
alembic current
```

## Seed Instructions

Create the default admin user:

```bash
cd backend
venv\Scripts\activate
python seed.py
```

Default seeded credentials:

```text
Email: admin@prospectiq.com
Password: Admin@123
```

Alternative admin creation script:

```bash
python scripts/create_admin.py
```

Change the default password before using the project outside local development.

## API Overview

Base URL:

```text
http://localhost:8000
```

Authentication:
- `POST /auth/login` - Login with email and password.
- `POST /auth/token` - OAuth2-compatible login for Swagger UI.
- `GET /auth/me` - Get the current authenticated user.
- `GET /auth/admin-test` - Admin-only route check.

Businesses:
- `POST /businesses` - Create a business record.
- `GET /businesses` - List businesses with search, filters, sorting, and pagination.
- `GET /businesses/{business_id}` - Get one business.
- `PUT /businesses/{business_id}` - Update one business.
- `DELETE /businesses/{business_id}` - Delete one business.

Imports:
- `POST /imports/businesses` - Import business records from an uploaded/processed CSV payload.

Dashboard:
- `GET /dashboard/summary` - Summary metrics for dashboard cards.
- `GET /dashboard/city-distribution` - Business counts grouped by city.
- `GET /dashboard/category-distribution` - Business counts grouped by category.
- `GET /dashboard/recent-businesses` - Recent business records.
- `GET /dashboard/import-summary` - Import status and imported record totals.

Upload history:
- Routes are defined in `backend/app/routes/upload_history.py` and exposed through the backend application.

## Frontend Scripts

Run from `frontend`:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Notes

- The frontend uses JWT tokens from local auth storage and sends them through the shared Axios client.
- The backend CORS configuration currently allows `http://localhost:5173`.
- Apply migrations before running seed scripts.
- Keep `.env` files out of version control.
