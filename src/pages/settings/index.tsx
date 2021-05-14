import {
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
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
  setDefaultCurrency: (
    e: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => void;
  setDefaultRegion: (
    e: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => void;
  setShowCurrencySymbol: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

const StyledSettingsPage = styled.div`
  fieldset {
    margin-bottom: 1rem;
    display: flex;
    border: none;

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
        <Typography variant="h5">Currencies</Typography>
        <fieldset>
          <section>
            <InputLabel
              id="default-currency-select-label"
              htmlFor="default-currency-select"
            >
              Default Currency
            </InputLabel>
            <Select
              id="default-currency-select"
              value={defaultCurrency}
              onChange={setDefaultCurrency}
            >
              {CURRENCIES.map((currency) => {
                return (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                );
              })}
            </Select>
          </section>
          <section>
            <InputLabel
              id="show-currency-symbol-checkbox-label"
              htmlFor="show-currency-symbol-checkbox"
            >
              Show Currency
            </InputLabel>
            <Checkbox
              id="show-currency-symbol-checkbox"
              value={showCurrencySymbol}
              onChange={setShowCurrencySymbol}
            />
          </section>
        </fieldset>
        <Typography variant="h5">Regions</Typography>
        <fieldset>
          <section>
            <InputLabel id="default-region-label" htmlFor="default-region">
              Default Region
            </InputLabel>
            <Select
              id="default-region"
              value={defaultRegion}
              onChange={setDefaultRegion}
            >
              {REGIONS.map((region) => {
                return (
                  <MenuItem key={region} value={region}>
                    {region}
                  </MenuItem>
                );
              })}
            </Select>
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
    dispatch(setShowCurrencySymbol(e.target.checked));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
