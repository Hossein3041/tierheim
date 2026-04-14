const BASE_API_URL =
  process.env.NEXT_PUBLIC_ENV === "local"
    ? "http://localhost:8080/tierheim/api"
    : "api";
const BASE_PRIVATE_URL = BASE_API_URL + "/private";
const BASE_PUBLIC_URL = BASE_API_URL + "/public";

const BASE_FILES_URL =
  process.env.NEXT_PUBLIC_ENV === "local"
    ? "https://dev.duconhub.de/tierheim/files"
    : "files";

export function isPublicUrl(url: string) {
  return url.startsWith(BASE_PUBLIC_URL);
}

// PING
export const PING_ENDPOINT = BASE_PRIVATE_URL + "/ping";

// PETS
export const GET_PETS_ENDPOINT = BASE_PRIVATE_URL + "/pet";
export const GET_PET_SPECIES_ENDPOINT = BASE_PRIVATE_URL + "/pet/species";
export const GET_PET_COLORS_ENDPOINT = BASE_PRIVATE_URL + "/pet/colors";
export const GET_PET_BREEDS_ENDPOINT = BASE_PRIVATE_URL + "/pet/breeds";
export const GET_PET_UNITS_ENDPOINT = BASE_PRIVATE_URL + "/pet/units";
export const GET_PET_OVERVIEW_ENDPOINT = BASE_PRIVATE_URL + "/pet/overview";

export const GET_APPOINTMENTS_OVERVIEW_ENDPOINT =
  BASE_PRIVATE_URL + "/appointments/overview";
export const GET_APPOINTMENT_TYPES_ENDPOINT =
  BASE_PRIVATE_URL + "/appointments/types";
export const GET_APPOINTMENT_CATEGORIES_ENDPOINT =
  BASE_PRIVATE_URL + "/appointments/categories";
export const CHECK_APPOINTMENT_ENDPOINT =
  BASE_PRIVATE_URL + "/appointments/{id}/check";
export const CREATE_APPOINTMENT_ENDPOINT = BASE_PRIVATE_URL + "/appointments";
export const UPDATE_APPOINTMENT_ENDPOINT =
  BASE_PRIVATE_URL + "/appointments/{id}";
export const DELETE_APPOINTMENT_ENDPOINT =
  BASE_PRIVATE_URL + "/appointments/{id}";

export const GET_LOCATIONS_OVERVIEW_ENDPOINT =
  BASE_PRIVATE_URL + "/occupancy/locations";
export const GET_PETS_DETAIL_ENDPOINT = BASE_PRIVATE_URL + "/pet";
export const GET_SECTION_DETAILS_ENDPOINT = `${BASE_PRIVATE_URL}/occupancy/sections`;
export const CREATE_PET_ENDPOINT = BASE_PRIVATE_URL + "/pet/create";
export const UPDATE_PET_ENDPOINT = BASE_PRIVATE_URL + "/pet/{id}";
export const UPDATE_PET_IMAGE_ENDPOINT =
  BASE_PRIVATE_URL + "/pet/{id}/update/image/{imageId}";
export const UPDATE_PET_UNIT_ENDPOINT =
  BASE_PRIVATE_URL + "/pet/{petId}/updateUnit";
export const GET_PET_FINDERS_ENDPOINT = BASE_PRIVATE_URL + "/pet/finders";
export const GET_PET_MEDICATIONS_ENDPOINT =
  BASE_PRIVATE_URL + "/pet/medications";
export const GET_PET_FOODS_ENDPOINT = BASE_PRIVATE_URL + "/pet/foods";
export const GET_PLACEMENT_STATUS_ENDPOINT =
  BASE_PRIVATE_URL + "/pet/placement-status";

// UNITS
export const GET_UNITS_BY_SECTION_ENDPOINT = BASE_PRIVATE_URL + "/getUnits";

// USER
export const LOGIN_ENDPOINT = BASE_PUBLIC_URL + "/login";
export const CONFIRM_ENDPOINT = BASE_PUBLIC_URL + "/confirm";
export const LOGOUT_ENDPOINT = BASE_PUBLIC_URL + "/logout";
export const REFRESH_TOKEN_ENDPOINT = BASE_PUBLIC_URL + "/refresh_token";

// MESSAGES
export const POST_MESSAGE = BASE_PRIVATE_URL + "/message";
export const GET_ALL_MESSAGES = BASE_PRIVATE_URL + "/messages";

// FILES
export const PUT_FILE_ENDPOINT = BASE_FILES_URL + "/upload";
export const GET_FILE_ENDPOINT = BASE_FILES_URL;
