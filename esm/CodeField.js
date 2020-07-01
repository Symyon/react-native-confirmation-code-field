import * as React from 'react';
import {TextInput, View} from 'react-native';
import {getStyle, getSymbols} from './utils';
import styles from './CodeField.styles';
import useFocusState from './useFocusState';
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
  },
  ref,
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
  return React.createElement(
    RootComponent,
    Object.assign({}, RootProps, {style: getStyle(styles.root, rootStyle)}),
    cells,
    React.createElement(
      TextInput,
      Object.assign(
        {
          disableFullscreenUI: true,
          spellCheck: false,
          autoCorrect: false,
          blurOnSubmit: false,
          clearButtonMode: 'never',
          autoCapitalize: 'characters',
          underlineColorAndroid: 'transparent',
          maxLength: cellCount,
        },
        rest,
        {
          value: value,
          onBlur: handleOnBlur,
          onFocus: handleOnFocus,
          style: getStyle(styles.textInput, textInputStyle),
          ref: ref,
        },
      ),
    ),
  );
};
export default React.forwardRef(CodeField);
