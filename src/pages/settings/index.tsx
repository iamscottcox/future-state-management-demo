import { Divider, Form } from 'antd';
import { ChangeEvent, FC } from 'react';
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
import Title from 'antd/lib/typography/Title';
import { SelectValue } from 'antd/lib/select';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Checkbox, FormGroup, HTMLSelect } from '@blueprintjs/core';
import { CHECKBOX } from '@blueprintjs/core/lib/esm/common/classes';

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
  /* .settings-group {
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
  } */
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
      <h1>Settings</h1>
      <h3>Currencies</h3>
      <FormGroup inline label="Default Currency">
        <HTMLSelect value={defaultCurrency} onChange={setDefaultCurrency}>
          {CURRENCIES.map((currency) => {
            return (
              <option key={currency} value={currency}>
                {currency}
              </option>
            );
          })}
        </HTMLSelect>
      </FormGroup>
      <FormGroup
        inline
        label="Show Currency Symbol?"
        labelFor="show-currency-symbol-checkbox"
      >
        <Checkbox
          id="show-currency-symbol-checkbox"
          checked={showCurrencySymbol}
          onChange={setShowCurrencySymbol}
        />
      </FormGroup>
      <h3>Regions</h3>
      <FormGroup inline label="Default Region">
        <HTMLSelect value={defaultRegion} onChange={setDefaultRegion}>
          {REGIONS.map((region) => {
            return (
              <option key={region} value={region}>
                {region}
              </option>
            );
          })}
        </HTMLSelect>
      </FormGroup>
      {/* <Form.Group labelCol={{ span: 6 }}>
        <Form.Item label="Default Currency">
          


        </Form.Item>
        <Form.Item label="Show Currency Symbol">
          <Checkbox
            checked={showCurrencySymbol}
            onChange={setShowCurrencySymbol}
          />
        </Form.Item>
      </Form.Group>
      <h3>Regions</h3>
      <Form labelCol={{ span: 6 }}>
        <Form.Item label="Default Region">
          <Select value={defaultRegion} onChange={setDefaultRegion}>
            {REGIONS.map((region) => {
              return (
                <Select.Option key={region} value={region}>
                  {region}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form> */}
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
