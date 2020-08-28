import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import GetAppIcon from '@material-ui/icons/GetApp';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Grid, FormLabel } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import SnikerImage from '../../assets/download.jpeg';
import { loadData, updateDatas } from '../../services/action';

export type ProductData = {
  name: string;
  quantity: number;
}

export type BankData = {
  coin: string;
  quantity: number;
}

export type MachineData = {
  product: ProductData,
  bank: Array<BankData>
}

type CoinData = {
  coin: number,
  count: number
}

type VendingMachineProps = {
  machineData:MachineData;
  actions;
}

const mapStateToProps = (state) => ({
  machineData: state.machineData,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadData,
    updateDatas,
  }, dispatch),
});

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: 345,
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  button: {
    textTransform: 'none',
  },
  chipRoot: {
    width: '90%',
  },
  actionButton: {
    width: '100%',
  },
  countValueBox: {
    height: '30px',
    width: '80%',
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
  },
}));

function VendingMachine(props: VendingMachineProps): JSX.Element {
  const { machineData, actions } = props;
  const [count10c, setCount10c] = useState(0);
  const [count20c, setCount20c] = useState(0);
  const [count50c, setCount50c] = useState(0);
  const [countDollar1, setCountDollar1] = useState(0);
  const [countDollar2, setCountDollar2] = useState(0);
  const [countValue, setCountValue] = useState(0);
  const [loadAllData, setLoadAllData] = useState(true);
  const [updateData, setUpdateData] = useState(true);
  const [openRestock, setOpenRestock] = useState(false);
  const [openMachineLow, setOpenMachineLow] = useState(false);
  const [returnCash, setReturnCash] = useState('');
  const [snikerIssued, setSnikerIssued] = useState('');
  const maxAllowedBars = 10;
  const classes = useStyles();

  const machineCount10c = machineData.bank.filter((d) => d.coin === '10c').map((d) => d.quantity)[0];
  const machineCount20c = machineData.bank.filter((d) => d.coin === '20c').map((d) => d.quantity)[0];
  const machineCount50c = machineData.bank.filter((d) => d.coin === '50c').map((d) => d.quantity)[0];
  const machineCountDollar1 = machineData.bank.filter((d) => d.coin === '$1').map((d) => d.quantity)[0];
  const machineCountDollar2 = machineData.bank.filter((d) => d.coin === '$2').map((d) => d.quantity)[0];

  const checkReturn = (flag: boolean) => {
    if ((count10c + machineCount10c) > 25) {
      setLoadAllData(!flag);
      setCount10c(count10c - 1);
      setReturnCash('10c Returned');
    } else if ((count20c + machineCount20c) > 25) {
      setLoadAllData(!flag);
      setCount20c(count20c - 1);
      setReturnCash('20c Returned');
    } else if ((count50c + machineCount50c) > 25) {
      setLoadAllData(!flag);
      setCount50c(count50c - 1);
      setReturnCash('50c Returned');
    } else if ((countDollar1 + machineCountDollar1) > 25) {
      setLoadAllData(!flag);
      setCountDollar1(countDollar1 - 1);
      setReturnCash('$1 Returned');
    } else if ((countDollar2 + machineCountDollar2) > 25) {
      setLoadAllData(!flag);
      setCountDollar2(countDollar2 - 1);
      setReturnCash('$2 Returned');
    } else {
      const totalVal = (count10c * 0.1) + (count20c * 0.2) + (count50c * 0.5) + (countDollar1 * 1) + (countDollar2 * 2);
      setCountValue(parseFloat(totalVal.toFixed(2)));
    }
  };

  useEffect(() => {
    if (updateData) {
      actions.loadData();
    }
    const totalVal = (count10c * 0.1) + (count20c * 0.2) + (count50c * 0.5) + (countDollar1 * 1) + (countDollar2 * 2);
    setCountValue(parseFloat(totalVal.toFixed(2)));
    checkReturn(loadAllData);
  }, [loadAllData, updateData, count10c, count20c, count50c, countDollar1, countDollar2, actions]);

  const handleFabClick = (data: string, flag:boolean) => {
    setLoadAllData(!flag);
    setUpdateData(false);
    if (data === '5c') {
      setSnikerIssued('Coin unsupported');
      setReturnCash('5c Returned');
    } else {
      if (data === '10c') setCount10c(count10c + 1);
      else if (data === '20c') setCount20c(count20c + 1);
      else if (data === '50c') setCount50c(count50c + 1);
      else if (data === '$1') setCountDollar1(countDollar1 + 1);
      else if (data === '$2') setCountDollar2(countDollar2 + 1);
      setSnikerIssued('');
      setReturnCash('');
    }
  };

  const handleChange = () => {
    setCount10c(0);
    setCount20c(0);
    setCount50c(0);
    setCountDollar1(0);
    setCountDollar2(0);
    setCountValue(0);
  };

  const updateQtyInStore = (flag:boolean, count10cCoins:number,
    count20cCoins:number, count50cCoins:number,
    countDollar1Coins:number, countDollar2Coins:number) => {
    setSnikerIssued('Sniker bar is issued');
    machineData.bank.forEach((data) => {
      if (data.coin === '10c') data.quantity = count10cCoins;
      if (data.coin === '20c') data.quantity = count20cCoins;
      if (data.coin === '50c') data.quantity = count50cCoins;
      if (data.coin === '$1') data.quantity = countDollar1Coins;
      if (data.coin === '$2') data.quantity = countDollar2Coins;
    });
    if (machineData.product.quantity !== 0) machineData.product.quantity -= 1;
    if (machineData.product.quantity === 0) setOpenMachineLow(true);
    actions.updateDatas(machineData);
    setLoadAllData(!flag);
  };

  const getChange = (amount: number) => {
    amount *= 100; // Convert to number of cents
    const denominations = [1, 2, 10, 20, 50];
    const result: Array<CoinData> = [];
    while (amount > 0) {
      const coin = denominations.pop(); // Get next greatest coin
      if (coin) {
        const count = Math.floor(amount / coin);
        amount -= count * coin;
        const obj = {
          coin,
          count,
        };
        if (count) result.push(obj);
      }
    }
    return result;
  };

  const handleDispenseClick = (flag:boolean) => {
    let total10cCoins = (count10c + machineData.bank.filter((d) => d.coin === '10c').map((d) => d.quantity)[0]);
    let total20cCoins = (count20c + machineData.bank.filter((d) => d.coin === '20c').map((d) => d.quantity)[0]);
    let total50cCoins = (count50c + machineData.bank.filter((d) => d.coin === '50c').map((d) => d.quantity)[0]);
    let totalDollar1Coins = (countDollar1 + machineData.bank.filter((d) => d.coin === '$1').map((d) => d.quantity)[0]);
    let totalDollar2Coins = (countDollar2 + machineData.bank.filter((d) => d.coin === '$2').map((d) => d.quantity)[0]);
    if (countValue === 1.6) {
      if (machineData.product.quantity <= 0) {
        setSnikerIssued('Transaction cancelled. Insufficient Bars');
        setReturnCash('$1.6 Returned');
        handleChange();
      } else {
        updateQtyInStore(flag, total10cCoins, total20cCoins, total50cCoins, totalDollar1Coins, totalDollar2Coins);
        handleChange();
      }
    }
    if (countValue > 1.6) {
      if (machineData.product.quantity <= 0) {
        setSnikerIssued('Transaction cancelled. Insufficient Bars');
        const returnRemainingCash = ((count10c * 0.1) + (count20c * 0.2) + (count50c * 0.5) + (countDollar1 * 1) + (countDollar2 * 2));
        const returnCashMsg = returnRemainingCash >= 1 ? `$${returnRemainingCash}` : `${returnRemainingCash}c`;
        setReturnCash(`${returnCashMsg} Returned`);
        handleChange();
      } else {
        const remainingValue = parseFloat((countValue - 1.6).toFixed(2));
        const coins = getChange(remainingValue);
        for (let i = 0; i < coins.length; i += 1) {
          const item = coins[i];
          if (item.coin === 10) { total10cCoins -= item.count; }
          if (item.coin === 20) { total20cCoins -= item.count; }
          if (item.coin === 50) { total50cCoins -= item.count; }
          if (item.coin === 1) { totalDollar1Coins -= item.count; }
          if (item.coin === 2) { totalDollar2Coins -= item.count; }
        }
        setSnikerIssued('Sniker bar is issued');
        const returnCashMsg = remainingValue >= 1 ? `$${remainingValue}` : `${remainingValue}c`;
        setReturnCash(`${returnCashMsg} Returned`);
        updateQtyInStore(flag, total10cCoins, total20cCoins, total50cCoins, totalDollar1Coins, totalDollar2Coins);
        handleChange();
      }
    }
  };

  const handleCancelClick = () => {
    const totalCash = ((count10c * 0.1) + (count20c * 0.2) + (count50c * 0.5) + (countDollar1 * 1) + (countDollar2 * 2));
    if (totalCash <= 0) setReturnCash('');
    else {
      const returnCashMsg = totalCash >= 1 ? `$${totalCash}` : `${totalCash}c`;
      setReturnCash(`${returnCashMsg} Returned`);
      setCount10c(0);
      setCount20c(0);
      setCount50c(0);
      setCountDollar1(0);
      setCountDollar2(0);
      setCountValue(0);
    }
  };

  const handleRestock = () => {
    setSnikerIssued('');
    const diffProductQty = (maxAllowedBars - machineData.product.quantity);
    machineData.product.quantity += diffProductQty;
    actions.updateDatas(machineData);
    setSnikerIssued('');
    setReturnCash('');
    setOpenRestock(true);
  };

  const handleRestockClose = () => {
    setOpenRestock(false);
  };

  const handleMachineLowClose = () => {
    setOpenMachineLow(false);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Vending Machine"
        subheader="Snicker Bars"
      />
      <CardMedia
        className={classes.media}
        image={SnikerImage}
        title="Paella dish"
      />
      <CardActions disableSpacing>
        <Grid item xs={12}>
          <Grid item xs={12} style={{ display: 'flex' }}>
            <Grid item xs={2} />
            <Grid item xs={3}>
              <Fab color="primary" aria-label="add" size="small" className={classes.button} onClick={() => handleFabClick('5c', loadAllData)}>
                5c
              </Fab>
            </Grid>
            <Grid item xs={3}>
              <Fab color="primary" aria-label="add" size="small" className={classes.button} onClick={() => handleFabClick('10c', loadAllData)}>
                10c
              </Fab>
            </Grid>
            <Grid item xs={3}>
              <Fab color="primary" aria-label="add" size="small" className={classes.button} onClick={() => handleFabClick('20c', loadAllData)}>
                20c
              </Fab>
            </Grid>
            <Grid item xs={2} />
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', marginTop: '5%' }}>
            <Grid item xs={2} />
            <Grid item xs={3}>
              <Fab color="primary" aria-label="add" size="small" className={classes.button} onClick={() => handleFabClick('50c', loadAllData)}>
                50c
              </Fab>
            </Grid>
            <Grid item xs={3}>
              <Fab color="primary" aria-label="add" size="small" className={classes.button} onClick={() => handleFabClick('$1', loadAllData)}>
                $1
              </Fab>
            </Grid>
            <Grid item xs={3}>
              <Fab color="primary" aria-label="add" size="small" className={classes.button} onClick={() => handleFabClick('$2', loadAllData)}>
                $2
              </Fab>
            </Grid>
            <Grid item xs={2} />
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', marginTop: '5%' }}>
            <Grid item xs={6}>
              <input className={classes.countValueBox} value={countValue} readOnly />
            </Grid>
            <Grid item xs={6}>
              <FormLabel>Amount Inserted</FormLabel>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', marginTop: '10%' }}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                className={classes.actionButton}
                endIcon={<GetAppIcon color="inherit" fontSize="small" />}
                onClick={() => handleDispenseClick(loadAllData)}
              >
                Dispense
              </Button>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={5}>
              <Button
                variant="contained"
                color="primary"
                className={classes.actionButton}
                endIcon={<HighlightOffIcon color="inherit" fontSize="small" />}
                onClick={() => handleCancelClick()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', marginTop: '5%' }}>
            {(snikerIssued !== '') && (
            <Grid item xs={12}>
              <Chip
                className={classes.chipRoot}
                size="small"
                label={snikerIssued}
                color="secondary"
              />
            </Grid>
            )}
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', marginTop: '5%' }}>
            {(returnCash !== '') && (
            <Grid item xs={12}>
              <Chip
                className={classes.chipRoot}
                size="small"
                label={returnCash}
                color="secondary"
              />
            </Grid>
            )}
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', marginTop: '5%' }}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.actionButton}
                endIcon={<AddCircleOutlineIcon color="inherit" fontSize="small" />}
                onClick={() => handleRestock()}
              >
                Restock Machine
              </Button>
            </Grid>
          </Grid>
          <Snackbar open={openRestock} autoHideDuration={1000} onClose={handleRestockClose}>
            <Alert severity="success">
              Machine restocked successfully!
            </Alert>
          </Snackbar>
          <Snackbar open={openMachineLow} autoHideDuration={2000} onClose={handleMachineLowClose}>
            <Alert severity="error">
              Machine running low!
            </Alert>
          </Snackbar>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(VendingMachine);
