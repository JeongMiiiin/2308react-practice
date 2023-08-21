import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";


async function reissue(accessToken: string | null) {
    await axios.create({
        baseURL: import.meta.env.VITE_APP_SERVER as string,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        },
        withCredentials : true,
    }).post(`/reissue`, {
        accessToken : accessToken,
    }).then((res) => {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('expireAt', moment().add(3, "minute").format("yyyy-MM-DD HH:mm:ss"))
    }).catch(() => {})
}

const nonAuthHttp : AxiosInstance = axios.create({
    baseURL : import.meta.env.VITE_APP_SERVER as string,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials : true,
})

const authHttp = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER as string,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials : true,
});

authHttp.interceptors.request.use(
    (config : InternalAxiosRequestConfig):InternalAxiosRequestConfig => {
        const expireAt = localStorage.getItem('expireAt');
        const accessToken: string | null = localStorage.getItem('accessToken');
        
        if (moment().isAfter(expireAt)) {
            reissue(accessToken);
        }

        if (config.headers && accessToken){
            config.headers.Authorization = `Bearer ` + localStorage.getItem('accessToken');
        }

      return config;
    }
)

const formHttp : AxiosInstance = axios.create({
    baseURL : import.meta.env.VITE_APP_SERVER as string,
    timeout: 10000,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    withCredentials : true,
})

formHttp.interceptors.request.use(
    (config : InternalAxiosRequestConfig):InternalAxiosRequestConfig => {
      const expireAt = localStorage.getItem('expireAt');
      const accessToken: string | null = localStorage.getItem('accessToken');
      
      if (moment().isAfter(expireAt)) {
          reissue(accessToken);
      }

      if (config.headers && accessToken){
          config.headers.Authorization = `Bearer ` + localStorage.getItem('accessToken');
      }

    return config;
    }
)

export {authHttp, nonAuthHttp, formHttp};