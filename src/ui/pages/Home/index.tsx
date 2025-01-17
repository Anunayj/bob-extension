import React, {ReactElement, useCallback, useEffect, useRef, useState} from "react";
import {fetchWalletBalance, useCurrentWallet, useWalletBalance} from "@src/ui/ducks/wallet";
import postMessage from "@src/util/postMessage";
import MessageTypes from "@src/util/messageTypes";
import Identicon from "@src/ui/components/Identicon";
import {useDispatch} from "react-redux";
import {formatNumber, fromDollaryDoos} from "@src/util/number";
import "./home.scss";
import {ReceiveButton, RedeemButton, RevealButton, SendButton} from "@src/ui/components/HomeActionButton";
import classNames from "classnames";
import {
  fetchTransactions,
  resetTransactions,
  setOffset as setTXOffset,
  useTXOffset
} from "@src/ui/ducks/transactions";
import Transactions from "@src/ui/components/Transactions";
import {
  fetchDomainNames,
  useDomainOffset,
  resetDomains,
  setOffset as setDomainOffset,
} from "@src/ui/ducks/domains";
import Domains from "@src/ui/components/Domains";
import {fetchTXQueue} from "@src/ui/ducks/queue";

export default function Home(): ReactElement {
  const dispatch = useDispatch();
  const txOffset = useTXOffset();
  const domainOffset = useDomainOffset();
  const currentWallet = useCurrentWallet();
  const [tab, setTab] = useState<'domains'|'activity'>('activity');
  const { spendable, lockedUnconfirmed } = useWalletBalance();
  const [currentAddress, setCurrentAddress] = useState('');
  const listElement = useRef<HTMLDivElement>(null);
  const pageElement = useRef<HTMLDivElement>(null);
  const [fixHeader, setFixHeader] = useState(false);

  useEffect(() => {
    return () => {
      (async function onHomeUnmount() {
        dispatch(resetTransactions());
        dispatch(resetDomains());
      })();
    }
  }, []);

  useEffect(() => {
    (async function onHomeMount() {
      try {
        await dispatch(fetchWalletBalance());

        const address = await postMessage({
          type: MessageTypes.GET_WALLET_RECEIVE_ADDRESS,
          payload: {
            id: currentWallet,
            depth: 0,
          },
        });
        setCurrentAddress(address);
        await dispatch(fetchTXQueue());
        dispatch(fetchTransactions());
        dispatch(fetchDomainNames());
      } catch (e) {
        console.error(e);
      }
    })();
  }, [currentWallet]);

  const _onScroll = useCallback(async e => {
    if (!listElement.current || !pageElement.current) return;

    const {y} = listElement.current.getBoundingClientRect();
    if (y <= 60) {
      setFixHeader(true);
    } else {
      setFixHeader(false);
    }

    const {
      scrollTop,
      scrollHeight,
      offsetHeight,
    } = pageElement.current;
    if (((scrollTop + offsetHeight) / scrollHeight) > .8) {
      if (tab === 'activity') {
        dispatch(setTXOffset(txOffset + 20));
      } else {
        dispatch(setDomainOffset(domainOffset + 20));
      }
    }
  }, [
    listElement,
    pageElement,
    tab,
    txOffset,
    domainOffset,
  ]);

  return (
    <div
      className={classNames('home', {
        'home--fixed-header': fixHeader,
      })}
      ref={pageElement}
      onScroll={_onScroll}
    >
      <div className="home__top">
        <Identicon value={currentAddress} />
        <div className="home__account-info">
          <small className="home__account-info__label">
            {currentWallet}
          </small>
          <div className="home__account-info__spendable">
            {`${formatNumber(fromDollaryDoos(spendable))} HNS`}
          </div>
          {/*<small className="home__account-info__locked">*/}
          {/*  {!!lockedUnconfirmed && `+${formatNumber(fromDollaryDoos(lockedUnconfirmed))} HNS locked up`}*/}
          {/*</small>*/}
        </div>
      </div>
      <div className="home__actions">
        <SendButton />
        <ReceiveButton />
        <RevealButton />
        <RedeemButton />
      </div>
      <div
        className="home__list"
        ref={listElement}
      >
        <div className="home__list__header">
          <div
            className={classNames("home__list__header__tab", {
              'home__list__header__tab--selected': tab === 'domains',
            })}
            onClick={() => setTab('domains')}
          >
            Domains
          </div>
          <div
            className={classNames("home__list__header__tab", {
              'home__list__header__tab--selected': tab === 'activity',
            })}
            onClick={() => setTab('activity')}
          >
            Activity
          </div>
        </div>
        <div className="home__list__content">
          {tab === 'activity' ? <Transactions /> : <Domains />}
        </div>
      </div>
    </div>
  );
}
