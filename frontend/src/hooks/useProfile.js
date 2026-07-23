import { useEffect, useState } from "react";

import { profileService } from "../services/profileService";

const useProfile = () => {

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {

    let active = true;

    Promise.resolve()

      .then(() => {

        if (active) {

          setLoading(true);

        }

        return profileService.getProfile();

      })

      .then((result) => {

        if (active) {

          setProfile(result);

        }

      })

      .catch(() => {

        if (active) {

          setError(true);

        }

      })

      .finally(() => {

        if (active) {

          setLoading(false);

        }

      });

    return () => {

      active = false;

    };

  }, []);

  return {

    profile,

    loading,

    error,

    setError,

  };

};

export default useProfile;