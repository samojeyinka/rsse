import React, { useEffect, useState } from "react";
import bigCircle from "../assets/images/bigCircle.svg";
import cloudtop1 from "../assets/PresalePagesImages/r2.png";
import cloudtop2 from "../assets/PresalePagesImages/r1.png";
import ctr from "../assets/PresalePagesImages/ctr.png";
import cco from "../assets/PresalePagesImages/cco.png";
import l from "../assets/PresalePagesImages/l.png";
import r from "../assets/PresalePagesImages/r.png";
import herov from "../assets/PresalePagesImages/cloud 2 3.png";
import avocado1 from "../assets/images/avocado1.svg";
import avocado2 from "../assets/images/avocado2.svg";
import avocado3 from "../assets/images/avocado3.svg";
import avocado4 from "../assets/images/avocado4.svg";
import miniCircle from "../assets/images/miniCircle.svg";
import svg1 from "../assets/images/svg1.svg";
import svg2 from "../assets/images/svg2.svg";
import svg3 from "../assets/images/svg3.svg";
import svg4 from "../assets/images/svg4.svg";
import cloud1 from "../assets/images/cloud1.svg";
import cloud2 from "../assets/images/cloud2.svg";
import cloud3 from "../assets/images/cloud3.svg";
import cloud4 from "../assets/images/cloud4.svg";
import brownline from "../assets/images/brownLine.svg";
import avodiv from "../assets/images/avodiv.svg";
import smallcavr from "../assets/images/smallcavr.svg";
import sol from "../assets/images/sol.svg";
import usdt from "../assets/images/usdt.svg";
import equalSign from "../assets/images/equal_sign.svg";
import dino from "../assets/images/dino.svg";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  chainlinkFeed,
  chainlinkProgram,
  mint,
  usdtMint,
} from "../utils/constants";
import { ASSOCIATED_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { formatUnits, parseUnits } from "@ethersproject/units";
import * as anchor from "@coral-xyz/anchor";
import {
  TOKEN_PROGRAM_ID,
  getMint,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import {
  Keypair,
  PublicKey,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  findAssociatedTokenAccountPublicKey,
  sendTransaction,
  usePresaleProgram,
} from "../utils/hooks";
import NotificationModal from "../NotificationModal/NotificationModal";
import { Box, Container, Stack } from "@mui/material";
const PresaleHero = () => {
  const { publicKey, sendTransaction: sendWalletTx } = useWallet();
  const wallet = useWallet();
  const [From, setFrom] = useState("");
  const [ToToken, setToToken] = useState("");
  const presaleProgram = usePresaleProgram();
  const [tokenTransfer, settokenTransfer] = useState("");
  const { connection } = useConnection();
  const [loading, setloading] = useState(false);
  const [notificationProps, setnotificationProps] = useState({
    error: "",
    message: "",
    modal: false,
  });
  const [presaleData, setpresaleData] = useState(undefined);
  const [userData, setuserData] = useState(undefined);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tokenType, settokenType] = useState(1);
  let getData = async () => {
    try {
      let [
        [presaleAccount],
        { decimals },
        {
          data: { USD },
        },
      ] = await Promise.all([
        presaleProgram.account.presaleAccount.all(),

        getMint(connection, mint),
        axios.get(
          "https://min-api.cryptocompare.com/data/price?fsym=SOL&tsyms=USD"
        ),
      ]);

      if (presaleAccount) {
        let obtain = +formatUnits(
          presaleAccount?.account?.stages?.[
            Math.min(
              Number(presaleAccount.account?.activeStage),
              Number(presaleAccount.account?.stages?.length - 1)
            )
          ]?.soldTokens.toString(),
          decimals.toString()
        );
        console.log(obtain, "obtain");

        let total = Number(
          presaleAccount?.account?.stages?.[
            Math.min(
              Number(presaleAccount.account?.activeStage),
              Number(presaleAccount.account?.stages?.length - 1)
            )
          ]?.allocation
        );
        let usdtRaised = +formatUnits(
          presaleAccount?.account?.usdtRaised.toString(),
          presaleAccount.account.usdtDecimals.toString()
        );
        console.log(total, "presaleAccount");
        let solRaised =
          +formatUnits(presaleAccount?.account?.solRaised.toString(), 9) * USD;
        let totalRaised = (usdtRaised + solRaised).toFixed(2);
        console.log(solRaised, usdtRaised, totalRaised, "solRaised");
        let percentage = ((+obtain / total) * 100).toFixed(2);
        setpresaleData({
          percentage,
          ...presaleAccount.account,
          remaining: total - obtain,
          obtain,
          total,
          presaleAccount: presaleAccount.publicKey,
          currentTokenPrice: (
            1 /
            Number(
              presaleAccount.account.stages[
                Math.min(
                  Number(presaleAccount.account?.activeStage),
                  Number(presaleAccount.account?.stages?.length - 1)
                )
              ].price
            )
          ).toFixed(4),
          nextTokenPrice: (
            1 /
            Number(
              presaleAccount.account.stages[
                Math.min(
                  Number(presaleAccount.account?.activeStage + 1),
                  Number(presaleAccount.account?.stages?.length - 1)
                )
              ]?.price
            )
          ).toFixed(3),
          oneUsdPrice: Number(
            presaleAccount.account.stages[
              Math.min(
                Number(presaleAccount.account?.activeStage),
                Number(presaleAccount.account?.stages?.length - 1)
              )
            ].price
          ),
          totalRaised,
          oneSolPrice: USD,
        });
      }
      if (publicKey) {
        let userAccounts = await presaleProgram.account.userAccount.all();
        let tokens = 0;
        console.log(userAccounts.length);
        userAccounts.map(({ account, publicKey }) => {
          tokens += +formatUnits(account.totalTokens.toString(), decimals);
          console.log(
            +formatUnits(account.totalTokens.toString(), decimals),
            account?.user.toString(),
            publicKey.toString(),
            "Tokens"
          );
        });
        console.log(tokens, "total tokens");
        userAccounts = userAccounts.find(({ account: { user } }) =>
          user.equals(publicKey)
        );
        if (userAccounts?.publicKey) {
          setuserData({
            userAccount: userAccounts.publicKey,
            ...userAccounts.account,
            totalTokens:
              +formatUnits(
                userAccounts.account.totalTokens.toString(),
                decimals
              ) -
              +formatUnits(
                userAccounts.account.claimedTokens.toString(),
                decimals
              ),
          });
        }
      }
    } catch (error) {
      console.log(error, "+++++++++++++");
    }
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const bebe_ref = searchParams.get("bebe_ref");
    console.log(bebe_ref, "called");
    if (bebe_ref) {
      localStorage.setItem("bebe_ref", bebe_ref);
      // const code = searchParams.get("code");
    }
    if (connection) {
      getData();
    }
  }, [connection, publicKey]);

  const buyHandler = async () => {
    try {
      if (!From || From <= 0 || isNaN(From)) {
        return setnotificationProps({
          ...notificationProps,
          modal: true,
          error: true,
          message: "Enter a valid value to buy.",
        });
      }

      if (ToToken > presaleData.remaining) {
        let fromAmount = 0;
        if (tokenType == 1) {
          fromAmount = presaleData.remaining / presaleData.oneUsdPrice;
          fromAmount = (fromAmount / presaleData.oneSolPrice).toFixed(4);
        } else {
          fromAmount = (
            presaleData.remaining / presaleData.oneUsdPrice
          ).toFixed(2);
        }
        setFrom(fromAmount);
        return setnotificationProps({
          ...notificationProps,
          modal: true,
          error: true,
          message: `You can only buy ${fromAmount} ${
            tokenType === 1 ? "SOL" : "USDT"
          } amount of bebe tokens in this stage.`,
        });
      }

      setloading(true);
      console.log(presaleData, "presaleData");
      const userAccount = Keypair.generate();
      let userAssociateAccount;
      let referralAssociateAccount;
      const [
        [presalePda, bump],
        userAssociateUsdtAccount,
        { decimals: usdtDecimals },
        { blockhash, lastValidBlockHeight },
      ] = await Promise.all([
        PublicKey.findProgramAddressSync(
          [Buffer.from(anchor.utils.bytes.utf8.encode("presale_authority"))],
          presaleProgram.programId
        ),
        findAssociatedTokenAccountPublicKey(publicKey, usdtMint),
        getMint(connection, usdtMint),
        connection.getLatestBlockhash("finalized"),
      ]);
      const [userAccountData] = await Promise.all([
        connection.getParsedAccountInfo(userAssociateUsdtAccount),
      ]);
      if (userAccountData.value) {
        userAssociateAccount = userAssociateUsdtAccount;
      } else {
        const ix = new TransactionInstruction({
          programId: ASSOCIATED_PROGRAM_ID,
          data: Buffer.from([]),
          keys: [
            { pubkey: publicKey, isSigner: true, isWritable: true },
            {
              pubkey: userAssociateUsdtAccount,
              isSigner: false,
              isWritable: true,
            },
            { pubkey: publicKey, isSigner: false, isWritable: false },
            {
              pubkey: usdtMint,
              isSigner: false,
              isWritable: false,
            },
            {
              pubkey: SystemProgram.programId,
              isSigner: false,
              isWritable: false,
            },
            {
              pubkey: TOKEN_PROGRAM_ID,
              isSigner: false,
              isWritable: false,
            },
            {
              pubkey: SYSVAR_RENT_PUBKEY,
              isSigner: false,
              isWritable: false,
            },
          ],
        });
        await sendTransaction(connection, wallet, [ix], []);
        userAssociateAccount = userAssociateUsdtAccount;
      }

      let { presaleAccount, owner, ownerUsdtAccount } = presaleData;

      if (userData?.userAccount) {
        const tx = await presaleProgram.methods
          .existingBuy(
            tokenType == 1
              ? new anchor.BN(+parseUnits(From.toString(), 9))
              : new anchor.BN(+parseUnits(From, usdtDecimals)),
            new anchor.BN(+tokenType)
          )
          .accounts({
            userAccount: userData.userAccount,
            presalePda,
            chainlinkFeed,
            chainlinkProgram,
            presaleAccount,
            ownerUsdtAccount,
            userUsdtAccount: userAssociateAccount,
            owner,
            user: publicKey,
            rent: SYSVAR_RENT_PUBKEY,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          })
          .signers([])
          .transaction();
        tx.recentBlockhash = blockhash;
        tx.lastValidBlockHeight = lastValidBlockHeight;
        tx.feePayer = publicKey;
        const sign = await sendWalletTx(tx, connection, {
          signers: [],
        });
        console.log(tx, "sign");
        await connection.confirmTransaction({
          signature: sign,
          blockhash,
          lastValidBlockHeight,
        });
      } else {
        const tx = await presaleProgram.methods
          .buy(
            tokenType == 1
              ? new anchor.BN(+parseUnits(From.toString(), 9))
              : new anchor.BN(+parseUnits(From, usdtDecimals)),
            new anchor.BN(+tokenType)
          )
          .accounts({
            userAccount: userAccount.publicKey,
            presalePda,
            chainlinkFeed,
            chainlinkProgram,
            presaleAccount,
            ownerUsdtAccount,
            userUsdtAccount: userAssociateAccount,
            owner,
            user: publicKey,
            rent: SYSVAR_RENT_PUBKEY,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          })
          .signers([userAccount])
          .transaction();
        tx.recentBlockhash = blockhash;
        tx.lastValidBlockHeight = lastValidBlockHeight;
        tx.feePayer = publicKey;
        const sign = await sendWalletTx(tx, connection, {
          signers: [userAccount],
        });
        await connection.confirmTransaction({
          signature: sign,
          blockhash,
          lastValidBlockHeight,
        });
      }
      setnotificationProps({
        modal: true,
        message: "Transaction Confirmed",
        error: false,
      });
      getData();
      setloading(false);
    } catch (error) {
      let mainMessage;
      console.log(error, "error==>");
      const regex = /Error Message: (.+?)\.\.$/;
      const match = regex.exec(error);

      if (match) {
        mainMessage = match[1];
      } else {
        mainMessage =
          error?.message ||
          error?.data?.message ||
          error?.response?.data?.data?.message ||
          error?.name;
      }
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: mainMessage,
      });
      setloading(false);
    }
  };
  const claimHandler = async () => {
    try {
      if (
        Number(presaleData?.claimedTokens) >= Number(presaleData?.totalTokens)
      ) {
        return setnotificationProps({
          ...notificationProps,
          modal: true,
          error: true,
          message: "You dont have any token to claim.",
        });
      }

      setloading(true);
      let userAssociateAccount;
      const [
        [presalePda, bump],
        associateAccount,
        { blockhash, lastValidBlockHeight },
      ] = await Promise.all([
        PublicKey.findProgramAddressSync(
          [Buffer.from(anchor.utils.bytes.utf8.encode("presale_authority"))],
          presaleProgram.programId
        ),
        findAssociatedTokenAccountPublicKey(publicKey, mint),
        connection.getLatestBlockhash("finalized"),
      ]);
      const userAccountData = await connection.getParsedAccountInfo(
        associateAccount
      );

      if (userAccountData.value) {
        userAssociateAccount = associateAccount;
      } else {
        const ix = new TransactionInstruction({
          programId: ASSOCIATED_PROGRAM_ID,
          data: Buffer.from([]),
          keys: [
            { pubkey: publicKey, isSigner: true, isWritable: true },
            {
              pubkey: associateAccount,
              isSigner: false,
              isWritable: true,
            },
            { pubkey: publicKey, isSigner: false, isWritable: false },
            {
              pubkey: mint,
              isSigner: false,
              isWritable: false,
            },
            {
              pubkey: SystemProgram.programId,
              isSigner: false,
              isWritable: false,
            },
            {
              pubkey: TOKEN_PROGRAM_ID,
              isSigner: false,
              isWritable: false,
            },
            {
              pubkey: SYSVAR_RENT_PUBKEY,
              isSigner: false,
              isWritable: false,
            },
          ],
        });
        await sendTransaction(connection, wallet, [ix], []);
        userAssociateAccount = associateAccount;
      }

      let { presaleAccount, owner, presaleTokenVault } = presaleData;
      let { userAccount } = userData;
      const tx = await presaleProgram.methods
        .claim()
        .accounts({
          userAccount,
          presalePda,
          presaleAccount,
          presaleTokenVault,
          userTokenAccount: userAssociateAccount,
          owner,
          user: publicKey,
          rent: SYSVAR_RENT_PUBKEY,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .signers([])
        .transaction();
      tx.recentBlockhash = blockhash;
      tx.lastValidBlockHeight = lastValidBlockHeight;
      tx.feePayer = publicKey;
      const sign = await sendWalletTx(tx, connection, {
        signers: [],
      });
      await connection.confirmTransaction({
        signature: sign,
        blockhash,
        lastValidBlockHeight,
      });

      setnotificationProps({
        modal: true,
        message: "Transaction Confirmed",
        error: false,
      });
      getData();
      setloading(false);
    } catch (error) {
      let mainMessage;
      console.log(error, "error==>");
      const regex = /Error Message: (.+?)\.\.$/;
      const match = regex.exec(error);

      if (match) {
        mainMessage = match[1];
      } else {
        mainMessage =
          error?.message ||
          error?.data?.message ||
          error?.response?.data?.data?.message ||
          error?.name;
      }
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: mainMessage,
      });
      setloading(false);
    }
  };
  useEffect(() => {
    if (From > 0 && presaleData?.oneUsdPrice) {
      if (tokenType === 1) {
        setToToken(presaleData.oneUsdPrice * presaleData.oneSolPrice * From);
      } else {
        setToToken((presaleData.oneUsdPrice * From).toFixed(2));
      }
    } else {
      setToToken("");
    }
  }, [From, tokenType]);

  console.log(
    Number(presaleData?.stages?.[1]?.soldTokens),
    Number(presaleData?.stages?.[1]?.allocation),
    Number(userData?.totalTokens)
  );
  return (
    <>
      <NotificationModal
        notificationProps={notificationProps}
        setnotificationProps={setnotificationProps}
      />
      <section className="presale_hero">
        <div className="presale_hero-con">
          <img src={herov} className="herov hero-v" />
          <img src={bigCircle} className="bigCircle" />
          <img src={miniCircle} className="miniCircle" />

          <img src={cloudtop1} className="c cloud1" />
          <img src={ctr} className="cloud cloud3" />
         

          <img src={l} className="bcloud svg1" />
          <img src={r} className="bcloud svg3" />

          <img src={ctr} className="avo cc1" />
          <img src={cco} className="avo cc2" />
     

          <img src={cloudtop1} className="tp tl" />
          <img src={cloudtop2} className="tp tr" />

          <div className="top">
            <p className="cp">Current Phase</p>
            <h1>
              Presale Stage{" "}
              {Math.min(
                Number(presaleData?.activeStage ?? 0) + 1,
                presaleData?.stages?.length ?? 0
              )}
            </h1>
            <h5>1 DINO = {presaleData?.currentTokenPrice ?? 0.0} USDT</h5>
            <h4>1 DINO = {presaleData?.currentTokenPrice ?? 0.0} USDT</h4>
            <div className="t_box">
              <b>
                {presaleData?.obtain ?? 0.0}{" "}
                <span>/{presaleData?.total ?? 0.0} Meters</span>
              </b>
              <span className="stage">
                <b>
                  Stage{" "}
                  {Math.min(
                    Number(presaleData?.activeStage ?? 0) + 1,
                    presaleData?.stages?.length ?? 0
                  )}{" "}
                  = {presaleData?.percentage ?? 0.0}%
                </b>{" "}
                of the journey
              </span>
              <small className="rmus">
                Remaining meters until Stage{" "}
                {Math.min(
                  Number(presaleData?.activeStage ?? 0) + 2,
                  presaleData?.stages?.length ?? 0
                )}
              </small>
            </div>
          </div>

          {/* <div className="divider">
            <img src={brownline} className="line" />
            <img src={avodiv} className="avodiv" />
            <img src={smallcavr} className="cat" />
          </div> */}
          <Container maxWidth="lg">
            <Stack
              sx={{
                position: "relative",
                px: { xs: 5, sm: 10, md: 5 },
              }}
              direction="row"
              alignItems="center"
            >
              <Stack
                sx={{
                  height: "12px",
                  borderRadius: "10px",
                  backgroundColor: "#676D60",
                  // position: "relative",
                  width: "95%",
                }}
              >
                <Stack
                  sx={{
                    alignItems: "end",
                    width: `${presaleData?.percentage ?? 0}%`,
                    height: "12px",
                    background: "#ffffff",
                    position: "relative",
                    borderRadius: "10px",
                  }}
                >
                  <Box
                    component={"img"}
                    alt=""
                    src={avodiv}
                    sx={{
                      height: { xs: "45px", sm: "60px" },
                      width: { xs: "45px", sm: "60px" },
                      position: "relative",
                      top: { xs: "-8px", sm: "-12px" },
                      right: "-13px",
                    }}
                  />
                </Stack>
              </Stack>
              <Box>
                <img src={smallcavr} className="cat" width="100%" />
              </Box>
            </Stack>
          </Container>
          <div className="middle">
            <h3>USD Raised ${presaleData?.totalRaised ?? 0.0}</h3>
            <p className="small">
              $1 USDT = {presaleData?.oneUsdPrice ?? 0.0}DINO
            </p>
            <p className="step_instruction">
              Step 1: Select the payment method
            </p>
            <div className="flex__crypt">
              <div
                className={`crypt__box cb ${
                  tokenType === 1 ? "sol_box" : "usdt_box"
                }`}
                onClick={() => {
                  settokenType(1);
                }}
              >
                <div className="crypt__box__flex">
                  <img src={sol} />
                  <div className="sol_right">
                    <p>SOL</p>
                    <small>Solana</small>
                  </div>
                </div>
              </div>

              <div
                className={`crypt__box cb ${
                  tokenType === 2 ? "sol_box" : "usdt_box"
                }`}
                onClick={() => {
                  settokenType(2);
                }}
              >
                <div className="crypt__box__flex">
                  <img src={usdt} />
                  <div className="usdt_right">
                    <p>USDT</p>
                    <small>USDT</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="step-2-box">
              <p className="step2">
                Step 2: Enter the amount of token you would like to purchase
              </p>
            </div>

            <div className="soldino_flex">
              <div className="soldinobox soldino-sol">
                <div>
                  <input
                    type="number"
                    value={From}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFrom(e.target.value);
                      if (value > 0) {
                        console.log(+presaleData?.tokenPrice);
                        const toValue = +value * +presaleData?.tokenPrice;
                        setToToken(toValue);
                      } else {
                        setToToken(0);
                      }
                    }}
                    className="crypto_input"
                  />
                </div>
                <div className="soldino-sol_flex">
                  <div>
                    <p>{tokenType === 1 ? "SOL" : "USDT"}</p>
                    <small>{tokenType === 1 ? "Solana" : "USDT"}</small>
                  </div>
                  <img src={tokenType === 1 ? sol : usdt} />
                </div>
              </div>
              <div className="equal_sign">
                <img src={equalSign} />
              </div>

              <div className="soldinobox soldino-dino">
                <div>
                  <input
                    type="number"
                    className="crypto_input"
                    readOnly
                    value={parseFloat(ToToken)?.toFixed(0)}
                  />
                </div>
                <div className="soldino-dino_flex">
                  <div>
                    <p>DINO</p>
                  </div>
                  <img src={dino} />
                </div>
              </div>
            </div>
          </div>

          <div className="bottom">
            <div className="bottom_btns">
              {publicKey ? (
                <button
                  className="buy_now"
                  onClick={buyHandler}
                  disabled={
                    presaleData?.activeStage === presaleData?.stages?.length ||
                    loading
                  }
                >
                  {presaleData?.activeStage === presaleData?.stages?.length
                    ? "Presale Ended"
                    : loading
                    ? "Processing"
                    : "Buy Now"}
                </button>
              ) : (
                <WalletMultiButton
                  style={{
                    width: "200px",
                    height: "39px",
                    borderRadius: "12px",
                    background: "var(--light-bg)",
                    color: "var(--color-1)",
                    fontFamily: "Rowdies",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "100px",
                  }}
                  className="buy_now"
                >
                  CONNECT WALLET
                </WalletMultiButton>
              )}
              <div
                className="flex__crypt"
                style={{
                  color: "white",
                }}
              >
                <p className="step2">
                  Your Tokens : {userData?.totalTokens ?? 0.0}
                </p>
              </div>
              {publicKey && (
                <button
                  onClick={claimHandler}
                  disabled={
                    userData?.totalTokens === 0 ||
                    Number(presaleData?.vesting) === 0
                  }
                >
                  {userData?.totalTokens > 0 &&
                  Number(presaleData?.vesting) === 1
                    ? "Claim Tokens"
                    : loading
                    ? "Processing"
                    : userData?.totalTokens === 0
                    ? "Claimed"
                    : "Claiming Not Started"}
                </button>
              )}
              <button className="how_to_buy">How to buy</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PresaleHero;
