import fetcher from "../../config/fetcher";

type LoginForm = {
  email: string;
  password: string;
  fb_token: string;
};

export async function login(form: LoginForm) {
  const res = fetcher.post("/v1/auth/login", { form });
}
