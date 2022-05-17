import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { isMobile, isDesktop, parseQueryString } from "../../../../../common/utils/tools";
import PlatformDropdown from "./components/platform-dropdown.jsx";
import { isLoggedIn } from "../../utils";
import { getActiveToken } from "../../utils";
import {
  getTokenList,
  removeAllTokens,
  syncWithDerivApp,
} from "../../../../../common/utils/storageManager";
import {
  updateIsLogged,
  resetClient,
  updateActiveAccount,
  updateBalance,
  updateActiveToken
} from "../../store/client-slice";
import { setAccountSwitcherLoader, updateShowMessagePage } from "../../store/ui-slice";
import {
  DrawerMenu,
  AuthButtons,
  AccountActions,
  MenuLinks,
  AccountSwitcherLoader,
} from "./components";
import { queryToObjectArray } from "../../../../../common/appId";
import api from "../../api";

const AccountSwitcher = () => {
  const { account_switcher_loader } = useSelector((state) => state.ui);
  const { is_logged } = useSelector((state) => state.client);
  const query_string = parseQueryString();
  const query_string_array = queryToObjectArray(query_string);

  // [Todo] We should remove this after update the structure of get token list on login
  if (query_string_array[0]?.token) {
    return (
      <div className="header__menu-right-loader">
        <AccountSwitcherLoader />
      </div>
    );
  }
  if (account_switcher_loader) {
    return (
      <div className="header__menu-right-loader">
        <AccountSwitcherLoader />
      </div>
    );
  }

  if (is_logged) return <AccountActions />;

  return <AuthButtons />;
};

const Header = () => {
  const [isPlatformSwitcherOpen, setIsPlatformSwitcherOpen] = React.useState(
    false
  );
  const [showDrawerMenu, updateShowDrawerMenu] = React.useState(false);
  const platformDropdownRef = React.useRef();
  const { is_logged, active_token } = useSelector((state) => state.client);
  const { is_bot_running } = useSelector(state => state.ui);
  const dispatch = useDispatch();
  const hideDropdown = (e) =>
    !platformDropdownRef.current.contains(e.target) &&
    setIsPlatformSwitcherOpen(false);

  React.useEffect(() => {
    api.onMessage().subscribe(({ data }) => {
      if (data?.error?.code) return;
      if (data?.msg_type === "balance") {
        dispatch(updateBalance(data.balance));
      }
    });
  }, []);

  React.useEffect(() => {
    const token_list = getTokenList();
    const active_token = getActiveToken(token_list);
    const landing_company = active_token?.loginInfo.landing_company_name;

    dispatch(updateShowMessagePage(landing_company === 'maltainvest'));

    if (!active_token) {
      removeAllTokens();
      dispatch(resetClient());
      dispatch(setAccountSwitcherLoader(false));
    }
    if (active_token) {
      api.authorize(active_token.token).then((account) => {
        if (account?.error?.code) return;
        dispatch(updateActiveToken(active_token.token))
        dispatch(updateActiveAccount(account.authorize));
        dispatch(setAccountSwitcherLoader(false));

        api.send({ forget_all: "balance" }).then(() => {
          api.send({
            balance: 1,
            account: "all",
            subscribe: 1,
          });
        });
      }).catch(() => {
        removeAllTokens();
        dispatch(resetClient());
        dispatch(setAccountSwitcherLoader(true));
      });
      syncWithDerivApp();
    }
  }, [active_token]);

  React.useEffect(() => {
    dispatch(updateIsLogged(isLoggedIn()));
  }, [is_logged]);

  React.useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload, { capture: true });
    return (() => {
      window.removeEventListener('beforeunload', onBeforeUnload, { capture: true });
    })
  }, [is_bot_running])

  const onBeforeUnload = (e) => {
    if(is_bot_running) {
      e.preventDefault();
      e.returnValue = true;
    }
  }

  return (
    <div className="header">
      <div id="deriv__header" className="header__menu-items">
        {isDesktop() && (
          <div className="header__menu-left">
            {isPlatformSwitcherOpen && (
              <PlatformDropdown
                hideDropdown={hideDropdown}
                ref={platformDropdownRef}
                setIsPlatformSwitcherOpen={setIsPlatformSwitcherOpen}
              />
            )}
            <div
              id="platform__switcher"
              className="header__menu-item platform__switcher"
              onClick={() => setIsPlatformSwitcherOpen(!isPlatformSwitcherOpen)}
            >
              <img
                className="header__logo"
                src="image/deriv/brand/ic-brand-binarybot.svg"
              />
              <div className="platform__switcher-header">Binary Bot</div>
              <img
                id="platform__switcher-expand"
                className={classNames("header__icon header__expand", {
                  open: isPlatformSwitcherOpen,
                })}
                src="image/deriv/ic-chevron-down-bold.svg"
              />
            </div>
            {is_logged && <MenuLinks />}
          </div>
        )}
        {isMobile() && (
          <img
            className="btn__close header__hamburger"
            src="image/deriv/ic-hamburger.svg"
            onClick={() => {
              updateShowDrawerMenu(true);
            }}
          />
        )}
        <div className="header__menu-right">
          <AccountSwitcher />
        </div>
      </div>
      {showDrawerMenu && (
        <DrawerMenu
          updateShowDrawerMenu={updateShowDrawerMenu}
          setIsPlatformSwitcherOpen={setIsPlatformSwitcherOpen}
          isPlatformSwitcherOpen={isPlatformSwitcherOpen}
          hideDropdown={hideDropdown}
          platformDropdownRef={platformDropdownRef}
          is_logged={is_logged}
        />
      )}
    </div>
  );
};

export default Header;
