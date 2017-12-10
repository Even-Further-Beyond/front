interface BrowerSizes {
  extraSmall: boolean;
  small: boolean;
  medium: boolean;
  large: boolean;
  extraLarge: boolean;
}

interface Browser {
  mediaType: string;
  orientation: string;
  lessThan: BrowerSizes;
  greaterThan: BrowerSizes;
  is: BrowerSizes;
}

export default Browser;
