import { Checkbox, Divider, Form, Select } from 'antd';
import { FC } from 'react';
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

interface StateProps {
  defaultCurrency: AppState['settings']['defaultCurrency'];
  defaultRegion: AppState['settings']['defaultRegion'];
  showCurrencySymbol: AppState['settings']['showCurrencySymbol'];
}

interface DispatchProps {
  setDefaultCurrency: (value: SelectValue) => void;
  setDefaultRegion: (value: SelectValue) => void;
  setShowCurrencySymbol: (e: CheckboxChangeEvent) => void;
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
      <Title level={1}>Settings</Title>
      <Divider orientation="left">
        <Title level={3}>Currencies</Title>
      </Divider>
      <Form labelCol={{ span: 6 }}>
        <Form.Item label="Default Currency">
          <Select value={defaultCurrency} onChange={setDefaultCurrency}>
            {CURRENCIES.map((currency) => {
              return (
                <Select.Option key={currency} value={currency}>
                  {currency}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Show Currency Symbol">
          <Checkbox
            checked={showCurrencySymbol}
            onChange={setShowCurrencySymbol}
          />
        </Form.Item>
      </Form>
      <Divider orientation="left">
        <Title level={3}>Regions</Title>
      </Divider>
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
  setDefaultCurrency(value) {
    dispatch(setDefaultCurrency(value));
  },
  setDefaultRegion(value) {
    dispatch(setDefaultRegion(value));
  },
  setShowCurrencySymbol(e) {
    dispatch(setShowCurrencySymbol(e.target.checked));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
