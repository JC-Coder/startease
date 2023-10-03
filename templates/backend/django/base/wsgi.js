export const DJANGO_WSGI = `import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', '{{projectName}}.settings')

application = get_wsgi_application()
`
