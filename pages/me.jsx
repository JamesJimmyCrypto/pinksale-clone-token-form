import { Button } from "../components/";
import { web3Connect, disconnect, DetectToken } from "../global/utils/connect";
import { updateData } from "../global/slice/blockchainSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const me = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector(state => state.blockchain);
  const connect = _ => {
    if (blockchain.account) {
      disconnect().then(data => dispatch(updateData(data)));
    } else {
      web3Connect().then(data => dispatch(updateData(data)));
    }
  };



  return (
    <div className="bg-tan rounded-lg p-6 px-8">
      <div className="mb-4">
        {blockchain.account == null ? (
          <>
            <Button
              action={_ => {
                connect();
              }}
              styles="secondary"
              text={"Connect"}
            />
          </>
        ) : (
          <>
            <div>
              <p>
                Connected as:
                <span className="font-semibold break-all">
                  {blockchain.account}
                </span>
              </p>
              <p className="text-primary text-lg">{blockchain.balance} BNB</p>
            </div>
            <div className="">
              <Button
                action={_ => {
                  connect();
                }}
                styles="secondary"
                text={"logout"}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default me;
