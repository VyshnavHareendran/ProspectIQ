from app.repositories.profile_repository import (
    ProfileRepository
)


class ProfileService:

    def __init__(
        self,
        repository: ProfileRepository
    ):
        self.repository = repository

    def get_profile(
        self,
        user_id: int
    ):

        return (
            self.repository
            .get_profile(user_id)
        )