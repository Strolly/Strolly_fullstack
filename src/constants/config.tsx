const prod = {
    url: {
        API_URL_USER: 'https://gib-2-project.herokuapp.com/user',
        API_URL_PATH_GEOM: 'https://gib-2-project.herokuapp.com/path_geom',
        API_URL_INTERSECT: 'https://gib-2-project.herokuapp.com/intersect',
        SOCIAL_AUTH_FACEBOOK_KEY: '4554233111370018',
        SOCIAL_AUTH_FACEBOOK_SECRET: '3d6191526537b18b63a6cb3109915c6a',
        CLIENT_ID: 'cKyuK5Y36dtA2Aku8sSFkZuKUf1BQUMNTIpQ4hrR',
        CLIENT_SECRET:
            'KmDjEhoTMQI5cn3bZ907Z1U0HUr8Rhx3TvtQbDAkBc4Xykfkg2XBY5RWJieZ81UPsjDdKWKLhUe15R2UoGOxTX884LhRN2VL7Ylzp1F5lDEZsF18VSqv8Aek3K5JtBrs',
        API_CONVERT_TOKEN: 'https://gib-2-project.herokuapp.com/auth/convert-token',
    },
};

const local = {
    url: {
        API_URL_USER: 'http://localhost:8000/user',
        API_URL_PATH_GEOM: 'http://localhost:8000/path_geom',
        API_URL_INTERSECT: 'http://localhost:8000/intersect',
        SOCIAL_AUTH_FACEBOOK_KEY: '4890883034293415',
        SOCIAL_AUTH_FACEBOOK_SECRET: 'd08e539b4b8f72976b0faced7df50e8a',
        CLIENT_ID: 'G3QCtsyqbWv2AFSMkBkTpNvLIArBt2BTvUqBA1Lz',
        CLIENT_SECRET:
            'trPmjTOTKEOpYjVPwkKxUnh7Rq1mrvb2aTOjyHB7gFok3iZV1c6EDFNvhPp3UiRaNEblEUeCGltRnCksc3XvTHPfykCcfHZhZirnOTDQaeWirtKGZC4CKJhC5CSpAmVl',
        API_CONVERT_TOKEN: 'http://127.0.0.1:8000/auth/convert-token',
    },
};

export const request_url = process.env.NODE_ENV === 'development' ? local : prod;
