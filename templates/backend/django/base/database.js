export const DJANGO_POSTGRES_SETUP = `{
  'default': dj_database_url.parse(
      os.environ.get("DATABASE_URL"),
      conn_max_age=600,
      conn_health_checks=True,
  )
}`;

export const DJANGO_SQLITE_SETUP = `{
  'default': {
      'ENGINE': 'django.db.backends.sqlite3',
      'NAME': BASE_DIR / 'db.sqlite3',
  }
}`;
