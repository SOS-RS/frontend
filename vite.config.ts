import fs from 'fs';
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default (({ mode }) => {

  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const serverConfig = {
    port: Number(process.env.VITE_PORT),
    https: {
      key: fs.readFileSync('./certs/key.pem'),
      cert: fs.readFileSync('./certs/cert.pem'),
    },
  };

  return defineConfig({
    plugins: [react()],
    server: serverConfig,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  })
})