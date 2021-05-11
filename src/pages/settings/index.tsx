import {
  Checkbox,
  Form,
  Select,
  Divider,
  Header,
  DropdownItemProps,
  DropdownProps,
  CheckboxProps,
} from 'semantic-ui-react';
import { FC, FormEvent, SyntheticEvent, useMemo } from 'react';
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
    value: SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => void;
  setDefaultRegion: (
    value: SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => void;
  setShowCurrencySymbol: (
    e: FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => void;
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

const createSemanticSelectOption = (
  value: string,
  text?: string = value,
  key?: string = value
): DropdownItemProps => ({
  value,
  text,
  key,
});

export const SettingsPage: FC<Props> = ({
  defaultCurrency,
  setDefaultCurrency,
  defaultRegion,
  setDefaultRegion,
  showCurrencySymbol,
  setShowCurrencySymbol,
}) => {
  const currencyOptions = useMemo<DropdownItemProps[]>(
    () => CURRENCIES.map((value) => createSemanticSelectOption(value)),
    []
  );

  const regionsOptions = useMemo<DropdownItemProps[]>(
    () => REGIONS.map((value) => createSemanticSelectOption(value)),
    []
  );

  return (
    <StyledSettingsPage className="settings-page">
      <Header size="huge">Settings</Header>
      <Divider />
      <Header size="medium">Currencies</Header>
      <Form>
        <Form.Field>
          <label>Default Currency</label>
          <Select
            value={defaultCurrency}
            onChange={setDefaultCurrency}
            options={currencyOptions}
          />
        </Form.Field>
        <Form.Field>
          <label>Show Currency Symbol</label>
          <Checkbox
            checked={showCurrencySymbol}
            onChange={setShowCurrencySymbol}
          />
        </Form.Field>
      </Form>
      <Divider />
      <Header size="medium">Regions</Header>
      <Form>
        <Form.Field>
          <label>Default Region</label>
          <Select
            value={defaultRegion}
            onChange={setDefaultRegion}
            options={regionsOptions}
          />
        </Form.Field>
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
  setDefaultCurrency(e, { value }) {
    dispatch(setDefaultCurrency(value));
  },
  setDefaultRegion(e, { value }) {
    dispatch(setDefaultRegion(value));
  },
  setShowCurrencySymbol(e, { checked }) {
    dispatch(setShowCurrencySymbol(checked));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
