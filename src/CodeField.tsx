import * as React from 'react';

import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import {getStyle, getSymbols} from './utils';

import styles from './CodeField.styles';
import useFocusState from './useFocusState';

type Props = {
  rootStyle?: StyleProp<any>;
  textInputStyle?: StyleProp<TextStyle>;
  RootProps?: Record<string, unknown>;
  RootComponent?: React.ComponentType<any>;

  cellCount?: number;
  renderCell: (options: {
    symbol: string;
    index: number;
    isFocused: boolean;
  }) => React.ReactElement<any, any>;
} & Omit<TextInputProps, 'style'>;

const DEFAULT_CELL_COUNT = 4;

const CodeField = (
  {
    rootStyle,
    textInputStyle,
    onBlur,
    onFocus,
    value,
    renderCell,
    cellCount = DEFAULT_CELL_COUNT,
    RootProps = {},
    RootComponent = View,
    ...rest
  }: Props,
  ref: React.Ref<TextInput>,
) => {
  const [isFocused, handleOnBlur, handleOnFocus] = useFocusState({
    onBlur,
    onFocus,
  });
  const cells = getSymbols(value || '', cellCount).map(
    (symbol, index, symbols) => {
      const isFirstEmptySymbol = symbols.indexOf('') === index;

      return renderCell({
        index,
        symbol,
        isFocused: isFocused && isFirstEmptySymbol,
      });
    },
  );

  return (
    <RootComponent {...RootProps} style={getStyle(styles.root, rootStyle)}>
      {cells}
      <TextInput
        disableFullscreenUI
        spellCheck={false}
        autoCorrect={false}
        blurOnSubmit={false}
        clearButtonMode="never"
        autoCapitalize="characters"
        underlineColorAndroid="transparent"
        maxLength={cellCount}
        {...rest}
        value={value}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        style={getStyle(styles.textInput, textInputStyle)}
        ref={ref}
      />
    </RootComponent>
  );
};

export default React.forwardRef(CodeField);
