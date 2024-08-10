import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Button,
  Typography,
  useMediaQuery,
  Stack,
  Menu,
} from "@mui/material";
import * as anchor from "@coral-xyz/anchor";
import sol from "../../assets/images/sol.svg";
import dino from "../../assets/images/dino.svg";
import { CustomizeInput } from "./CustomizeInput";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import BigOrangeButton from "./BigOrangeButton";
import {
  Keypair,
  PublicKey,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import { mint, usdtMint } from "../../utils/constants";
import {
  findAssociatedTokenAccountPublicKey,
  sendTransaction,
  usePresaleProgram,
} from "../../utils/hooks";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAccount,
  getMint,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import { formatUnits, parseUnits } from "@ethersproject/units";
import NotificationModal from "../../NotificationModal/NotificationModal";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import moment from "moment";

const OwnerPrevilege = () => {
  const match = useMediaQuery("(max-width:900px)");
  const [currency, setCurrency] = useState("Binance");
  const { publicKey, sendTransaction: sendWalletTx } = useWallet();
  const wallet = useWallet();
  const [tokenPrice, settokenPrice] = useState("");
  const presaleProgram = usePresaleProgram();
  const [tokenTransfer, settokenTransfer] = useState("");
  const { connection } = useConnection();
  const [loading, setloading] = useState(false);
  const [activeStage, setactiveStage] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [notificationProps, setnotificationProps] = useState({
    error: "",
    message: "",
    modal: false,
  });
  const [presaleData, setpresaleData] = useState(undefined);
  const [stageEndTime, setstageEndTime] = useState("");

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };
  let getData = async () => {
    try {
      let [presaleAccount] = await presaleProgram.account.presaleAccount.all();
      console.log(
        presaleAccount.account.presaleTokenVault.toString(),
        "presale token vault"
      );
      const { amount } = await getAccount(
        connection,
        presaleAccount.account.presaleTokenVault
      );
      setstageEndTime(
        moment
          .unix(Number(presaleAccount.account.stageEndTime))
          .format("YYYY-MM-DDTHH:mm")
      );
      setactiveStage(Number(presaleAccount.account.activeStage));
      if (presaleAccount) {
        setpresaleData({
          ...presaleAccount.account,
          presaleTokenVaultBalance: formatUnits(
            amount,
            presaleAccount.account.decimals.toString()
          ),
          presaleAccount: presaleAccount.publicKey,
        });
      }
    } catch (error) {
      console.log(error, "+++++++++++++");
    }
  };
  useEffect(() => {
    if (connection && publicKey) {
      getData();
    }
  }, [publicKey, connection]);
  const initializeHandler = async () => {
    try {
      // if (!tokenPrice || tokenPrice <= 0 || isNaN(tokenPrice)) {
      //   return setnotificationProps({
      //     ...notificationProps,
      //     modal: true,
      //     error: true,
      //     message: "Enter a valid token price.",
      //   });
      // }
      setloading(true);
      // let owner = new PublicKey("F7FVuNSN4g1Sbz7k1swtTaj6y5UH3c3brQnShj8fyesH");
      const presaleAccount = Keypair.generate();
      const presaleTokenVault = Keypair.generate();
      // cont mintInfo=new Mint
      const [
        [presalePda, bump],
        { decimals: usdtDecimals },
        { decimals },
        associateTokenAccount,
        { blockhash, lastValidBlockHeight },
      ] = await Promise.all([
        PublicKey.findProgramAddressSync(
          [Buffer.from(anchor.utils.bytes.utf8.encode("presale_authority"))],
          presaleProgram.programId
        ),
        getMint(connection, usdtMint),
        getMint(connection, mint),
        findAssociatedTokenAccountPublicKey(publicKey, usdtMint),
        connection.getLatestBlockhash("finalized"),
      ]);
      let associateUsdtAccount;
      const AccountData = await connection.getParsedAccountInfo(
        associateTokenAccount
      );
      if (AccountData.value) {
        associateUsdtAccount = associateTokenAccount;
      } else {
        const ix = new TransactionInstruction({
          programId: ASSOCIATED_TOKEN_PROGRAM_ID,
          data: Buffer.from([]),
          keys: [
            { pubkey: publicKey, isSigner: true, isWritable: true },
            {
              pubkey: associateTokenAccount,
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
        associateUsdtAccount = associateTokenAccount;
      }

      const tx = await presaleProgram.methods
        .initializePresale(
          bump,
          [
            {
              price: new anchor.BN(1428),
              allocation: new anchor.BN(200000000),
              // allocation: new anchor.BN(100000),
              sold_tokens: new anchor.BN(0),
              sol_raised: new anchor.BN(0),
              usdt_raised: new anchor.BN(0),
            },
            {
              price: new anchor.BN(1000),
              allocation: new anchor.BN(200000000),
              // allocation: new anchor.BN(125000),
              sold_tokens: new anchor.BN(0),
              sol_raised: new anchor.BN(0),
              usdt_raised: new anchor.BN(0),
            },
            {
              price: new anchor.BN(769),
              allocation: new anchor.BN(200000000),
              sold_tokens: new anchor.BN(0),
              sol_raised: new anchor.BN(0),
              usdt_raised: new anchor.BN(0),
            },
            {
              price: new anchor.BN(625),
              allocation: new anchor.BN(200000000),
              sold_tokens: new anchor.BN(0),
              sol_raised: new anchor.BN(0),
              usdt_raised: new anchor.BN(0),
            },
            {
              price: new anchor.BN(526),
              allocation: new anchor.BN(200000000),
              sold_tokens: new anchor.BN(0),
              sol_raised: new anchor.BN(0),
              usdt_raised: new anchor.BN(0),
            },
          ],
          usdtDecimals,
          decimals
        )
        .accounts({
          presaleAccount: presaleAccount.publicKey,
          presalePda,
          presaleTokenVault: presaleTokenVault.publicKey,
          ownerUsdtAccount: associateUsdtAccount,
          owner: publicKey,
          admin: publicKey,
          mint,
          usdtMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
          systemProgram: SystemProgram.programId,
        })
        .signers([presaleAccount, presaleTokenVault])
        .transaction();
      tx.recentBlockhash = blockhash;
      tx.lastValidBlockHeight = lastValidBlockHeight;
      tx.feePayer = publicKey;
      const sign = await sendWalletTx(tx, connection, {
        signers: [presaleAccount, presaleTokenVault],
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
  const addMoreStagesHandler = async () => {
    try {
      setloading(true);
      let { presaleAccount } = presaleData;
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash("finalized");

      const tx = await presaleProgram.methods
        .addStages([
          {
            price: new anchor.BN(454),
            allocation: new anchor.BN(150000000),
            sold_tokens: new anchor.BN(0),
            sol_raised: new anchor.BN(0),
            usdt_raised: new anchor.BN(0),
          },
          {
            price: new anchor.BN(400),
            allocation: new anchor.BN(150000000),
            sold_tokens: new anchor.BN(0),
            sol_raised: new anchor.BN(0),
            usdt_raised: new anchor.BN(0),
          },
          {
            price: new anchor.BN(357),
            allocation: new anchor.BN(150000000),
            sold_tokens: new anchor.BN(0),
            sol_raised: new anchor.BN(0),
            usdt_raised: new anchor.BN(0),
          },
          {
            price: new anchor.BN(322),
            allocation: new anchor.BN(150000000),
            sold_tokens: new anchor.BN(0),
            sol_raised: new anchor.BN(0),
            usdt_raised: new anchor.BN(0),
          },
          {
            price: new anchor.BN(294),
            allocation: new anchor.BN(150000000),
            sold_tokens: new anchor.BN(0),
            sol_raised: new anchor.BN(0),
            usdt_raised: new anchor.BN(0),
          },
          {
            price: new anchor.BN(270),
            allocation: new anchor.BN(100000000),
            sold_tokens: new anchor.BN(0),
            sol_raised: new anchor.BN(0),
            usdt_raised: new anchor.BN(0),
          },
          {
            price: new anchor.BN(250),
            allocation: new anchor.BN(100000000),
            sold_tokens: new anchor.BN(0),
            sol_raised: new anchor.BN(0),
            usdt_raised: new anchor.BN(0),
          },
          {
            price: new anchor.BN(232),
            allocation: new anchor.BN(100000000),
            sold_tokens: new anchor.BN(0),
            sol_raised: new anchor.BN(0),
            usdt_raised: new anchor.BN(0),
          },
          {
            price: new anchor.BN(217),
            allocation: new anchor.BN(100000000),
            sold_tokens: new anchor.BN(0),
            sol_raised: new anchor.BN(0),
            usdt_raised: new anchor.BN(0),
          },
          {
            price: new anchor.BN(204),
            allocation: new anchor.BN(100000000),
            sold_tokens: new anchor.BN(0),
            sol_raised: new anchor.BN(0),
            usdt_raised: new anchor.BN(0),
          },
        ])
        .accounts({
          presaleAccount,

          admin: publicKey,
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
  const changeVestingHandler = async (state) => {
    try {
      setloading(true);
      let { presaleAccount } = presaleData;
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash("finalized");
      const tx = await presaleProgram.methods
        .changeVesting(new anchor.BN(state))
        .accounts({
          presaleAccount: presaleAccount,
          owner: publicKey,
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
      getData();
      setnotificationProps({
        modal: true,
        message: "Transaction Confirmed",
        error: false,
      });

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
  const deletePresaleHandler = async (state) => {
    try {
      setloading(true);
      let { presaleAccount } = presaleData;
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash("finalized");
      const tx = await presaleProgram.methods
        .deletePresale()
        .accounts({
          presaleAccount: presaleAccount,
          admin: publicKey,
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
      getData();
      setnotificationProps({
        modal: true,
        message: "Transaction Confirmed",
        error: false,
      });

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
  const changeActiveStageHandler = async () => {
    try {
      setloading(true);
      if (!stageEndTime) {
        return setnotificationProps({
          ...notificationProps,
          modal: true,
          error: true,
          message: "Enter a valid value of stage end time.",
        });
      }
      let { presaleAccount } = presaleData;
      let endTime = moment(stageEndTime).format("X");
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash("finalized");
      const tx = await presaleProgram.methods
        .changeStage(new anchor.BN(activeStage), new anchor.BN(endTime))
        .accounts({
          presaleAccount: presaleAccount,
          admin: publicKey,
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
      getData();
      setnotificationProps({
        modal: true,
        message: "Transaction Confirmed",
        error: false,
      });

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
  const transferHandler = async () => {
    try {
      if (!tokenTransfer || tokenTransfer <= 0 || isNaN(tokenTransfer)) {
        return setnotificationProps({
          ...notificationProps,
          modal: true,
          error: true,
          message: "Enter a valid token transfer value.",
        });
      }
      setloading(true);
      let { presaleAccount, presaleTokenVault } = presaleData;
      console.log(presaleData, "presaleData");
      // cont mintInfo=new Mint
      let associateAccount;
      const [
        [presalePda, bump],
        { decimals },
        associateTokenAccount,
        { blockhash, lastValidBlockHeight },
      ] = await Promise.all([
        PublicKey.findProgramAddressSync(
          [Buffer.from(anchor.utils.bytes.utf8.encode("presale_authority"))],
          presaleProgram.programId
        ),
        getMint(connection, mint),
        findAssociatedTokenAccountPublicKey(publicKey, mint),
        connection.getLatestBlockhash("finalized"),
      ]);
      const AccountData = await connection.getParsedAccountInfo(
        associateTokenAccount
      );
      if (AccountData.value) {
        associateAccount = associateTokenAccount;
      } else {
        const ix = new TransactionInstruction({
          programId: ASSOCIATED_TOKEN_PROGRAM_ID,
          data: Buffer.from([]),
          keys: [
            { pubkey: publicKey, isSigner: true, isWritable: true },
            {
              pubkey: associateTokenAccount,
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
        associateAccount = associateTokenAccount;
      }
      console.log(presaleAccount.toString());
      const tx = await presaleProgram.methods
        .transferToken(new anchor.BN(tokenTransfer), new anchor.BN(decimals))
        .accounts({
          presaleAccount: presaleAccount,
          presaleTokenVault: presaleTokenVault,
          mint,
          ownerTokenAccount: associateAccount,
          presalePda,
          owner: publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
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
      getData();
      setnotificationProps({
        modal: true,
        message: "Transaction Confirmed",
        error: false,
      });

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
  console.log(presaleData);
  const stages = [
    "Stage 1",
    "Stage 2",
    "Stage 3",
    "Stage 4",
    "Stage 5",
    "Stage 6",
    "Stage 7",
    "Stage 8",
    "Stage 9",
    "Stage 10",
    "Stage 11",
    "Stage 12",
    "Stage 13",
    "Stage 14",
    "Stage 15",
    "End Presale",
  ];
  return (
    <>
      <NotificationModal
        notificationProps={notificationProps}
        setnotificationProps={setnotificationProps}
      />
      <Box
        sx={{
          py: 3,
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              bgcolor: "#171518",
              border: "1px solid #504c54",
              borderRadius: "18px",
              p: { xs: 2, sm: 4 },
              textAlign: "center",
            }}
          >
            <Box>
              <Typography variant="h4" textAlign="center" color="#ffff" mb={2}>
                Admin Panel
              </Typography>
            </Box>

            <Grid
              container
              spacing={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" color="#fff">
                  Initialize Presale
                </Typography>
                <Stack direction="row" justifyContent="center">
                  <BigOrangeButton
                    loading={loading}
                    onClick={initializeHandler}
                    disabled={presaleData || loading}
                  >
                    {presaleData ? "Already Initilized" : "Initialize Presale"}
                  </BigOrangeButton>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" color="#fff">
                  Add More Stages
                </Typography>
                <Stack direction="row" justifyContent="center">
                  <BigOrangeButton
                    loading={loading}
                    onClick={addMoreStagesHandler}
                    disabled={loading}
                  >
                    Add Stages
                  </BigOrangeButton>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h6" color="#fff">
                  Initialize Vesting
                </Typography>
                <Stack direction="row" justifyContent="center">
                  <BigOrangeButton
                    loading={loading}
                    onClick={() =>
                      changeVestingHandler(
                        Number(presaleData?.vesting) == 1 ? 0 : 1
                      )
                    }
                    disabled={loading}
                  >
                    {Number(presaleData?.vesting) == 1
                      ? "Disable Vesting"
                      : "Enable Vesting"}
                  </BigOrangeButton>
                </Stack>
              </Grid>
            </Grid>
            <Typography variant="h6" color="#fff">
              Send tokens to presale token vault
            </Typography>
            <Typography variant="h6" color="#fff">
              Presale token vault Balance:{" "}
              {presaleData?.presaleTokenVaultBalance ?? 0.0} DINO
            </Typography>
            <Grid
              container
              spacing={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={12}>
                <Box
                  sx={{
                    bgcolor: "#050505",
                    border: "1px solid #504c54",
                    borderRadius: "18px",
                    px: 1,
                    py: 1,
                    textAlign: "left",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: "13px", sm: "16px" },
                    }}
                    color="#9A999A"
                    my={0}
                  >
                    Send DINO to presale token vault
                  </Typography>
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Grid item xs={6} sm={8}>
                      <CustomizeInput
                        type="number"
                        placeholder="1"
                        inputProps={{
                          min: 0,
                        }}
                        onChange={(e) => settokenTransfer(e.target.value)}
                        value={tokenTransfer}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Stack alignItems="flex-end">
                        <Button
                          id="basic-button"
                          sx={{
                            bgcolor: "#212024",
                            borderRadius: "24px",
                            color: "white",
                            px: 2,
                            fontWeight: "bold",
                          }}
                          startIcon={<img src={dino} width="35px" />}
                        >
                          DINO
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="center">
                  <BigOrangeButton onClick={transferHandler} loading={loading}>
                    Transfer Tokens
                  </BigOrangeButton>
                </Stack>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Grid item xs={12}>
                <Box
                  sx={{
                    bgcolor: "#050505",
                    border: "1px solid #504c54",
                    borderRadius: "18px",
                    px: 1,
                    py: 1,
                    textAlign: "left",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: "13px", sm: "16px" },
                    }}
                    color="#9A999A"
                    my={0}
                  >
                    Modify Stages
                  </Typography>
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Grid item xs={6} sm={8}>
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        sx={{
                          bgcolor: "#212024",
                          borderRadius: "24px",
                          color: "white",
                          px: 2,
                          fontWeight: "bold",
                        }}
                        endIcon={<KeyboardArrowDownIcon />}
                      >
                        {stages[activeStage]}
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                        slotProps={{
                          paper: {
                            sx: {
                              bgcolor: "#212024",
                            },
                          },
                        }}
                      >
                        {presaleData &&
                          presaleData?.stages?.map((item, index) => (
                            <MenuItem
                              onClick={() => {
                                setactiveStage(index);
                                handleClose();
                              }}
                            >
                              <Typography
                                variant="h6"
                                sx={{
                                  fontSize: { xs: "13px", sm: "16px" },
                                }}
                                color="#9A999A"
                                my={0}
                              >
                                Stage {index + 1}
                              </Typography>
                            </MenuItem>
                          ))}

                        <MenuItem
                          onClick={() => {
                            setactiveStage(presaleData?.stages?.length);
                            handleClose();
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="#9A999A"
                            my={0}
                          >
                            End Presale
                          </Typography>
                        </MenuItem>
                      </Menu>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Stack alignItems="flex-end">
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: { xs: "13px", sm: "16px" },
                          }}
                          color="#9A999A"
                          my={0}
                        >
                          Stage end time
                        </Typography>
                        <input
                          type="datetime-local"
                          style={{
                            background: "#212024",
                            borderRadius: "24px",
                            fontWeight: "bold",
                            outline: "none",
                            border: "none",
                            color: "white",
                            padding: "10px",
                          }}
                          value={stageEndTime}
                          onChange={(e) =>
                            setstageEndTime(
                              moment(e.target.value).format("YYYY-MM-DDTHH:mm")
                            )
                          }
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="center">
                  <BigOrangeButton
                    onClick={changeActiveStageHandler}
                    loading={loading}
                  >
                    Set Stage
                  </BigOrangeButton>
                </Stack>
              </Grid>
            </Grid>

            <Box
              sx={{
                bgcolor: "#050505",
                border: "1px solid #504c54",
                borderRadius: "18px",
                px: 1,
                py: 1,
                textAlign: "left",
                my: 2,
              }}
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                rowSpacing={1}
                columnSpacing={1}
              >
                {presaleData && (
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        bgcolor: "#050505",
                        border: "1px solid #504c54",
                        borderRadius: "18px",
                        px: 1,
                        py: 1,
                        textAlign: "left",
                      }}
                    >
                      <Typography
                        variant="h6"
                        textAlign="center"
                        sx={{
                          fontSize: { xs: "13px", sm: "16px" },
                        }}
                        color="#9A999A"
                        my={0}
                      >
                        Global Data
                      </Typography>
                      <Typography
                        variant="h6"
                        textAlign="center"
                        sx={{
                          fontSize: { xs: "13px", sm: "16px" },
                        }}
                        color="#9A999A"
                        my={0}
                      >
                        Total Token Sold :{" "}
                        {formatUnits(
                          presaleData?.soldTokens?.toString(),
                          presaleData?.decimals?.toString()
                        )}
                      </Typography>
                      <Typography
                        variant="h6"
                        textAlign="center"
                        sx={{
                          fontSize: { xs: "13px", sm: "16px" },
                        }}
                        color="#9A999A"
                        my={0}
                      >
                        SOL Raised :{" "}
                        {formatUnits(presaleData?.solRaised?.toString(), 9)}
                      </Typography>
                      <Typography
                        variant="h6"
                        textAlign="center"
                        sx={{
                          fontSize: { xs: "13px", sm: "16px" },
                        }}
                        color="#9A999A"
                        my={0}
                      >
                        USDT Raised :{" "}
                        {formatUnits(
                          presaleData?.usdtRaised?.toString(),
                          presaleData?.usdtDecimals?.toString()
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "13px", sm: "16px" },
                }}
                color="#9A999A"
                my={0}
              >
                Stages Info
              </Typography>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                rowSpacing={1}
                columnSpacing={1}
              >
                {presaleData &&
                  presaleData?.stages?.map(
                    (
                      { allocation, soldTokens, solRaised, usdtRaised },
                      index
                    ) => (
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            bgcolor: "#050505",
                            border: `1px solid ${
                              presaleData?.activeStage === index
                                ? "orange"
                                : "#504c54"
                            }`,
                            borderRadius: "18px",
                            px: 1,
                            py: 1,
                            textAlign: "left",
                          }}
                          key={index}
                        >
                          <Typography
                            variant="h6"
                            textAlign="center"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="#9A999A"
                            my={0}
                          >
                            {presaleData.activeStage === index && "Active"}{" "}
                            Stage {index + 1}
                          </Typography>
                          <Typography
                            variant="h6"
                            textAlign="center"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="#9A999A"
                            my={0}
                          >
                            Allocation : {Number(allocation)}
                          </Typography>
                          <Typography
                            variant="h6"
                            textAlign="center"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="#9A999A"
                            my={0}
                          >
                            Sold Tokens :{" "}
                            {formatUnits(
                              soldTokens.toString(),
                              presaleData?.decimals?.toString()
                            )}
                          </Typography>
                          <Typography
                            variant="h6"
                            textAlign="center"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="#9A999A"
                            my={0}
                          >
                            SOL Raised : {formatUnits(solRaised.toString(), 9)}
                          </Typography>
                          <Typography
                            variant="h6"
                            textAlign="center"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="#9A999A"
                            my={0}
                          >
                            USDT Raised :{" "}
                            {formatUnits(
                              usdtRaised.toString(),
                              presaleData?.usdtDecimals?.toString()
                            )}
                          </Typography>
                        </Box>
                      </Grid>
                    )
                  )}
              </Grid>
            </Box>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="center">
                <BigOrangeButton
                  onClick={deletePresaleHandler}
                  loading={loading}
                >
                  Delete Presale
                </BigOrangeButton>
              </Stack>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default OwnerPrevilege;
