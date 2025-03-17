interface ILinkSocialNetwork {
  imgUrl: string;
  url: string;
  name: string;
}

const socialNetworks: ILinkSocialNetwork[] = [
  { imgUrl: '/img/facebook.png', url: 'https://facebook.com', name: 'facebook' },
  { imgUrl: '/img/twitter.png', url: 'https://twitter.com', name: 'twitter' },
  { imgUrl: '/img/linkedin.png', url: 'https://linkedin.com', name: 'linkedin' },
  { imgUrl: '/img/google.png', url: 'https://google.com', name: 'google' },
];

export default socialNetworks;
