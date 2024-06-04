import CryptoJS from 'crypto-js';

export interface IHmacProps {
  method: string;
  url: string;
  body?: string;
}

function getHmacHeaders(props: Partial<IHmacProps>) {
  const { method, url, body } = props;
  const timestamp = Math.floor(Date.now() / 1000);

  const payload = `${method}:${url}:${timestamp}:${JSON.stringify(body)}`;

  const signature = CryptoJS.HmacSHA256(
    payload,
    import.meta.env.VITE_HMAC_SECRET_KEY
  ).toString(CryptoJS.enc.Hex);

  return {
    'x-hmac-signature': signature,
    'x-hmac-timestamp': `${timestamp}`,
  };
}

export { getHmacHeaders };
