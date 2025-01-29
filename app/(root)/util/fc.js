const FC = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  });
  
  export const formatCurrency = (value) => FC.format(value);
  