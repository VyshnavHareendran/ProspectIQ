from sqlalchemy.orm import Session

from app.models.admin_setting import AdminSetting


class SettingsRepository:
    def __init__(self, db: Session):
        self.db = db

    def get(self, key: str, user_id: int | None = None):
        return (
            self.db.query(AdminSetting)
            .filter(
                AdminSetting.key == key,
                AdminSetting.user_id == user_id,
            )
            .first()
        )

    def get_value(self, key: str, default: dict, user_id: int | None = None):
        setting = self.get(key, user_id)
        return setting.value if setting else default

    def upsert(self, key: str, value: dict, user_id: int | None = None):
        setting = self.get(key, user_id)

        if setting:
            setting.value = value
        else:
            setting = AdminSetting(key=key, user_id=user_id, value=value)
            self.db.add(setting)

        self.db.commit()
        self.db.refresh(setting)

        return setting
