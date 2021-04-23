const products = [
  {
    name: 'Dyson fan',
    num: 10,
    price: 2000,
    des: 'Change summer to be spring.',
  },
  {
    name: 'MacBook Pro',
    num: 10,
    price: 15000,
    des: 'Own it and make your work more efficent.',
  },
  {
    name: 'iphone 11',
    num: 5,
    price: 8000,
    des: 'The most elegent cellphone.',
  },
  {
    name: 'Huawei mate40',
    num: 1,
    price: 5000,
    des: '',
  },
];

const requestProducts = () => new Promise((resolve) => setTimeout(() => resolve(products), 1000));

// eslint-disable-next-line import/prefer-default-export
export { requestProducts };
