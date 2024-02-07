function login(username, password) {
  if (username === "admin" && password === "admin") {
    return Promise.resolve(
      "fasdasdagadasgasdsada.dasdgasdsadasfgad.dasdasdafdagrga"
    );
  }

  return Promise.reject("Invalid username or password");
}

export { login };
