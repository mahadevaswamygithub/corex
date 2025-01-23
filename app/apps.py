
from django.apps import AppConfig
from django.apps import apps
from django.conf import settings

excluded_models = []

excluded_model_fields = {
    'app.User': ['password'],
}

masked_model_fields = {
    'app.User': ['password'],
}

class CommonConfig(AppConfig):
    name = 'app'
    verbose_name = "App"
    label = 'app'

    def ready(self):
        from auditlog.registry import auditlog
        for each_app in settings.AUDIT_LOG_REGISTERED_APPS:
            app_models = apps.get_app_config(each_app).get_models()
            for each_model in app_models:
                if not auditlog.contains(each_model):
                    if each_model._meta.label not in excluded_models:
                        masked_fields = masked_model_fields.get(
                            each_model._meta.label, []
                        )
                        excluded_fields = excluded_model_fields.get(
                        each_model._meta.label, []
                        )
                        auditlog.register(
                            each_model,
                            mask_fields=masked_fields,
                            exclude_fields=excluded_fields
                        )