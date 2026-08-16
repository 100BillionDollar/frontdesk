from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/frontdesk"

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
