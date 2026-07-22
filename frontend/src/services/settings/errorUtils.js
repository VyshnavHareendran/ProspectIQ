export function getSettingsErrorMessage(error, fallback = "Something went wrong.") {
  return error?.response?.data?.detail || error?.message || fallback;
}
