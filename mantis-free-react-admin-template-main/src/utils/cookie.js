import Cookies from 'js-cookie';

const isLocal = process.env.NODE_ENV === 'local';

const cookies = Cookies.withAttributes({
  httpOnly: isLocal
});

const setCookieWithAttributes = (key, value = {}) => {
  cookies.set(key, value, { path: '/' });
};

const setCookie = (key, value) => {
  cookies.set(key, value);
};

const getCookie = (key) => {
  if (key !== null && key !== undefined) {
    return cookies.get(key);
  } else {
    return cookies.get();
  }
};

const removeCookie = (cookie) => {
  if (cookie !== null && cookie !== undefined) {
    cookies.remove(cookie);
  } else {
    const cookiesList = cookies.get();
    Object.keys(cookiesList).forEach((_cookie) => {
      cookies.remove(_cookie);
    });
  }
};

export { setCookieWithAttributes, setCookie, getCookie, removeCookie };
