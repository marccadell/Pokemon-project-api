import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2/";

export const getResourceList = async (endpoint, limit = 20, offset = 0) =>
    axios.get(`${API_BASE_URL}${endpoint}/?limit=${limit}&offset=${offset}`)
        .then(res => res.data)
        .catch(err => (console.error(`Error en ${endpoint}:`, err), null));

export const getResourceDetails = async (endpoint, idOrName) =>
    axios.get(`${API_BASE_URL}${endpoint}/${idOrName}`)
        .then(res => res.data)
        .catch(err => (console.error(`Error en ${endpoint}/${idOrName}:`, err), null));

export const getCharacteristicById = async (id) =>
    axios.get(`${API_BASE_URL}characteristic/${id}`)
        .then(res => res.data)
        .catch(err => (console.error(`Error en characteristic/${id}:`, err), null));

export const getAbilityByNameOrId = async (idOrName) =>
    axios.get(`${API_BASE_URL}ability/${idOrName}`)
        .then(res => res.data)
        .catch(err => (console.error(`Error en ability/${idOrName}:`, err), null));