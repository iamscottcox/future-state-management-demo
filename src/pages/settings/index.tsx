import { ChangeEvent, FC } from 'react';
import { connect } from 'react-redux';
import { CURRENCIES } from 'src/constants/currencies';
import { REGIONS } from 'src/constants/regions';
import {
  getDefaultCurrency,
  getDefaultRegion,
  getShowCurrencySymbol,
} from 'src/getters/settings';
import { AppDispatch, AppState } from 'src/state';

import {
  setDefaultCurrency,
  setDefaultRegion,
  setShowCurrencySymbol,
} from 'src/state/slices/settings';
import styled from 'styled-components';

interface StateProps {
  defaultCurrency: AppState['settings']['defaultCurrency'];
  defaultRegion: AppState['settings']['defaultRegion'];
  showCurrencySymbol: AppState['settings']['showCurrencySymbol'];
}

interface DispatchProps {
  setDefaultCurrency: (e: ChangeEvent<HTMLSelectElement>) => void;
  setDefaultRegion: (e: ChangeEvent<HTMLSelectElement>) => void;
  setShowCurrencySymbol: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

const StyledSettingsPage = styled.div`
  fieldset {
    margin-bottom: 1rem;
    display: flex;

    section {
      display: flex;
      flex-direction: column;
      margin-right: 1rem;

      label {
        margin-bottom: 0.5rem;
      }

      p {
        margin: 0;
      }
    }
  }
`;

export const SettingsPage: FC<Props> = ({
  defaultCurrency,
  setDefaultCurrency,
  defaultRegion,
  setDefaultRegion,
  showCurrencySymbol,
  setShowCurrencySymbol,
}) => {
  return (
    <StyledSettingsPage className="settings-page">
      <div className="default-currency-container">
        <h3>Currencies</h3>
        <fieldset>
          <section>
            <label htmlFor="default-currency">Default Currency</label>
            <select
              id="default-currency"
              value={defaultCurrency}
              onChange={setDefaultCurrency}
            >
              {CURRENCIES.map((currency) => {
                return (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                );
              })}
            </select>
          </section>
          <section>
            <label htmlFor="show-currency-symbol">Currency Symbol</label>
            <p>
              Show?{' '}
              <input
                checked={showCurrencySymbol}
                onChange={setShowCurrencySymbol}
                id="show-currency-symbol"
                type="checkbox"
              />
            </p>
          </section>
        </fieldset>
        <h3>Regions</h3>
        <fieldset>
          <section>
            <label htmlFor="default-region">Default Region</label>
            <select
              id="default-region"
              value={defaultRegion}
              onChange={setDefaultRegion}
            >
              {REGIONS.map((region) => {
                return (
                  <option key={region} value={region}>
                    {region}
                  </option>
                );
              })}
            </select>
          </section>
        </fieldset>
      </div>
    </StyledSettingsPage>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  defaultCurrency: getDefaultCurrency(state),
  defaultRegion: getDefaultRegion(state),
  showCurrencySymbol: getShowCurrencySymbol(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  setDefaultCurrency(e) {
    dispatch(setDefaultCurrency(e.target.value));
  },
  setDefaultRegion(e) {
    dispatch(setDefaultRegion(e.target.value));
  },
  setShowCurrencySymbol(e) {
    dispatch(setShowCurrencySymbol(e.target.value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
