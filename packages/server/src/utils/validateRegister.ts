import { RegisterInput } from "../resolvers/inputs/RegisterInput";

export const validateRegister = (options: RegisterInput) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "メールアドレスが正しくありません",
      },
    ];
  }
  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "ユーザ名は4文字以上を入力してください",
      },
    ];
  }
  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "ユーザ名に使用できない記号があります",
      },
    ];
  }
  if (options.password.length <= 3) {
    return [
      {
        field: "password",
        message: "パスワードは4文字以上を入力してください",
      },
    ];
  }
  return null;
};
