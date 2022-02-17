const prod = {
    url: {
        API_URL_USER: 'https://gib-2-project.herokuapp.com/api/user',
        API_URL_PATH_GEOM: 'https://gib-2-project.herokuapp.com/api/path_geom',
        SOCIAL_AUTH_FACEBOOK_KEY: '4554233111370018',
        SOCIAL_AUTH_FACEBOOK_SECRET: '3d6191526537b18b63a6cb3109915c6a',
        CLIENT_ID: 'G3QCtsyqbWv2AFSMkBkTpNvLIArBt2BTvUqBA1Lz',
        CLIENT_SECRET:
            'trPmjTOTKEOpYjVPwkKxUnh7Rq1mrvb2aTOjyHB7gFok3iZV1c6EDFNvhPp3UiRaNEblEUeCGltRnCksc3XvTHPfykCcfHZhZirnOTDQaeWirtKGZC4CKJhC5CSpAmVl',
    },
};

const local = {
    url: {
        API_URL_USER: 'localhost:8000/api/user',
        API_URL_PATH_GEOM: 'localhost:8000/api/path_geom',
        SOCIAL_AUTH_FACEBOOK_KEY: '4890883034293415',
        SOCIAL_AUTH_FACEBOOK_SECRET: 'd08e539b4b8f72976b0faced7df50e8a',
        CLIENT_ID: 'G3QCtsyqbWv2AFSMkBkTpNvLIArBt2BTvUqBA1Lz',
        CLIENT_SECRET:
            'trPmjTOTKEOpYjVPwkKxUnh7Rq1mrvb2aTOjyHB7gFok3iZV1c6EDFNvhPp3UiRaNEblEUeCGltRnCksc3XvTHPfykCcfHZhZirnOTDQaeWirtKGZC4CKJhC5CSpAmVl',
    },
};

export const request_url = process.env.REACT_APP_ENV_TYPE === 'local' ? local : prod;
