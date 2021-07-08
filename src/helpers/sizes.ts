interface Sizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

const sizes = {
  up() {},
  down(size: keyof Sizes) {
    const szs: Sizes = {
      xs: '575.98px',
      sm: '767.98px',
      md: '991.98px',
      lg: '1199.98px',
      xl: '1600px',
    };
    return `@media (max-width: ${szs[size]})`;
  },
};

export default sizes;
