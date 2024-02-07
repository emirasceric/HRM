import { get, post, remove, update } from "../utils/request";

const ACCOUNTS_API = "http://localhost:7654/accounts";

export function getAccounts() {
  return get(ACCOUNTS_API);
}

export function getAccountById(id) {
  return get(`${ACCOUNTS_API}/${id}`);
}

export function postAccount(account) {
  return post(ACCOUNTS_API, account);
}

export function editAccount(account) {
  return update(`${ACCOUNTS_API}/${account.id}`, account);
}

export function deleteAccount(id) {
  return remove(`${ACCOUNTS_API}/${id}`);
}
