import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2/";
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const getResourceList = async (endpoint, limit = 20, offset = 0) =>
    axios
        .get(`${API_BASE_URL}${endpoint}/?limit=${limit}&offset=${offset}`)
        .then((res) => ({
            ...res.data,
            results: res.data.results.map((item) => ({
                ...item,
                name: capitalize(item.name),
            })),
        }))
        .catch((err) => (console.error(`Error en ${endpoint}:`, err), null));

export const getResourceDetails = async (endpoint, idOrName) =>
    axios
        .get(`${API_BASE_URL}${endpoint}/${idOrName}`)
        .then((res) => {
            const data = res.data;
            if (data.name) data.name = capitalize(data.name);

            if (Array.isArray(data.stats)) {
                data.stats = data.stats.map((stat) => ({
                    ...stat,
                    stat: {
                        ...stat.stat,
                        name: capitalize(stat.stat.name),
                    },
                }));
            }

            if (Array.isArray(data.types)) {
                data.types = data.types.map((type) => ({
                    ...type,
                    type: {
                        ...type.type,
                        name: capitalize(type.type.name),
                    },
                }));
            }

            return data;
        })
        .catch((err) =>
            (console.error(`Error en ${endpoint}/${idOrName}:`, err), null)
        );

export const getCharacteristicById = async (id) =>
    axios
        .get(`${API_BASE_URL}characteristic/${id}`)
        .then((res) => {
            const data = res.data;
            if (data.name) data.name = capitalize(data.name);

            if (Array.isArray(data.descriptions)) {
                data.descriptions = data.descriptions.map((desc) => ({
                    ...desc,
                    description: capitalize(desc.description),
                }));
            }

            return data;
        })
        .catch((err) =>
            (console.error(`Error en characteristic/${id}:`, err), null)
        );

export const getAbilityByNameOrId = async (idOrName) =>
    axios
        .get(`${API_BASE_URL}ability/${idOrName}`)
        .then((res) => {
            const data = res.data;
            if (data.name) data.name = capitalize(data.name);

            if (Array.isArray(data.effect_entries)) {
                data.effect_entries = data.effect_entries.map((entry) => ({
                    ...entry,
                    effect: capitalize(entry.effect),
                    short_effect: capitalize(entry.short_effect),
                }));
            }

            if (Array.isArray(data.flavor_text_entries)) {
                data.flavor_text_entries = data.flavor_text_entries.map((entry) => ({
                    ...entry,
                    flavor_text: capitalize(entry.flavor_text),
                }));
            }

            if (Array.isArray(data.effect_changes)) {
                data.effect_changes = data.effect_changes.map((change) => ({
                    ...change,
                    version_group: {
                        ...change.version_group,
                        name: capitalize(change.version_group.name),
                    },
                }));
            }

            return data;
        })
        .catch((err) =>
            (console.error(`Error en ability/${idOrName}:`, err), null)
        );
