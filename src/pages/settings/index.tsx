import { ChangeEvent, FC } from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import styled from 'styled-components';

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
  .settings-group {
    display: flex;
    border: 1px solid #333;
    padding: 1rem;
    border-radius: 0.2rem;

    > * {
      margin-right: 1rem;

      &::last-of-type {
        margin-right: 0;
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
      <Form>
        <h3>Currencies</h3>
        <Form.Group className="settings-group">
          <Form.Group>
            <Form.Label htmlFor="default-currency-select">
              Default Currency
            </Form.Label>
            <Form.Control
              as="select"
              id="default-currency-select"
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
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="show-currency-symbol-checkbox">
              Show Currency Symbol?
            </Form.Label>
            <Form.Check
              id="show-currency-symbol-checkbox"
              checked={showCurrencySymbol}
              onChange={setShowCurrencySymbol}
            />
          </Form.Group>
        </Form.Group>
        <h3>Regions</h3>
        <Form.Group className="settings-group">
          <Form.Group>
            <Form.Label
              id="default-region-label"
              htmlFor="default-region-select"
            >
              Default Region
            </Form.Label>
            <Form.Control
              as="select"
              id="default-region-select"
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
            </Form.Control>
          </Form.Group>
        </Form.Group>
      </Form>
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
