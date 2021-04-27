import { ChangeEvent, FC } from 'react';
import { connect } from 'react-redux';
import { currencies } from 'src/constants/currencies';
import { getDefaultCurrency } from 'src/getters/settings';
import { AppDispatch, AppState } from 'src/state';

import { setDefaultCurrency } from 'src/state/slices/settings';
import styled from 'styled-components';

interface StateProps {
  defaultCurrency: AppState['settings']['defaultCurrency'];
}
interface DispatchProps {
  setDefaultCurrency: (e: ChangeEvent<HTMLSelectElement>) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

const StyledSettingsPage = styled.div`
  label,
  select,
  input {
    display: block;
  }

  label {
    margin-bottom: 0.5rem;
  }
`;

export const SettingsPage: FC<Props> = ({
  defaultCurrency,
  setDefaultCurrency,
}) => {
  return (
    <StyledSettingsPage className="settings-page">
      <div className="default-currency-container">
        <label htmlFor="default-currency">Default Currency</label>
        <select
          id="default-currency"
          value={defaultCurrency}
          onChange={setDefaultCurrency}
        >
          {currencies.map((currency) => {
            return (
              <option key={currency} value={currency}>
                {currency}
              </option>
            );
          })}
        </select>
      </div>
    </StyledSettingsPage>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  defaultCurrency: getDefaultCurrency(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  setDefaultCurrency(e) {
    dispatch(setDefaultCurrency(e.target.value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
