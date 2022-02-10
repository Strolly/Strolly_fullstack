const prod = {
    url: {
        API_URL_USER: 'https://gib-2-project.herokuapp.com/api/user',
        API_URL_PATH_GEOM: 'https://gib-2-project.herokuapp.com/api/path_geom',
    },
};
const local = {
    url: {
        API_URL_USER: 'localhost:8000/api/user',
        API_URL_PATH_GEOM: 'localhost:8000/api/path_geom',
    },
};
export const request_url = process.env.REACT_APP_ENV_TYPE === 'local' ? local : prod;
