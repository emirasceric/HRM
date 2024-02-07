import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAccountById } from "../api/accountApi";

export default function AccountDetails() {
  const params = useParams();
  const [account, setAccount] = useState();

  useEffect(() => {
    getAccountById(params.id)
      .then((response) => {
        setAccount(response);
      })
      .catch((error) => {
        alert(error);
      });
  }, [params]);

  return account ? <div>{account.name}</div> : <div>No Data</div>;
}
