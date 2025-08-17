
import React from 'react';
import { Product } from './types';
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { RiLineFill } from 'react-icons/ri';

export const HERO_BACKGROUND_IMAGES = [
  "https://i.postimg.cc/GhkPwxVn/hero-section-background-00100.webp", "https://i.postimg.cc/NjB6grv9/hero-section-background-00101.webp",
  "https://i.postimg.cc/4xPznNX8/hero-section-background-00102.webp", "https://i.postimg.cc/5tt8zd0f/hero-section-background-00103.webp",
  "https://i.postimg.cc/rpYxCn0x/hero-section-background-00104.webp", "https://i.postimg.cc/nzj7d4B5/hero-section-background-00105.webp",
  "https://i.postimg.cc/50hzDXmt/hero-section-background-00106.webp", "https://i.postimg.cc/hvVmnKC1/hero-section-background-00107.webp",
  "https://i.postimg.cc/XN5ddgVB/hero-section-background-00108.webp", "https://i.postimg.cc/NfwT4rMJ/hero-section-background-00109.webp",
  "https://i.postimg.cc/Hs4MPs8p/hero-section-background-00110.webp", "https://i.postimg.cc/pLWjNbKK/hero-section-background-00111.webp",
  "https://i.postimg.cc/3xtvYSZV/hero-section-background-00112.webp", "https://i.postimg.cc/bvd2JxCJ/hero-section-background-00113.webp",
  "https://i.postimg.cc/cJjt8v2c/hero-section-background-00114.webp", "https://i.postimg.cc/k4b6NndP/hero-section-background-00115.webp",
  "https://i.postimg.cc/FzXfD29d/hero-section-background-00116.webp", "https://i.postimg.cc/prQm7qT0/hero-section-background-00117.webp",
  "https://i.postimg.cc/RCwJNVRc/hero-section-background-00118.webp", "https://i.postimg.cc/xTYJHDxB/hero-section-background-00119.webp",
  "https://i.postimg.cc/Yq34znT0/hero-section-background-00120.webp", "https://i.postimg.cc/7ZtfpCHy/hero-section-background-00121.webp",
  "https://i.postimg.cc/qvvNbcdL/hero-section-background-00122.webp", "https://i.postimg.cc/CKZzYF5n/hero-section-background-00123.webp",
  "https://i.postimg.cc/W3gzFXM2/hero-section-background-00124.webp", "https://i.postimg.cc/vTyBWfz5/hero-section-background-00125.webp",
  "https://i.postimg.cc/SRGKVRT3/hero-section-background-00126.webp", "https://i.postimg.cc/zDw3q2z7/hero-section-background-00127.webp",
  "https://i.postimg.cc/PrtJJbNj/hero-section-background-00128.webp", "https://i.postimg.cc/65Y3v7GG/hero-section-background-00129.webp",
  "https://i.postimg.cc/g2j0qYvt/hero-section-background-00130.webp", "https://i.postimg.cc/2StS0PGk/hero-section-background-00131.webp",
  "https://i.postimg.cc/QtGx31vv/hero-section-background-00132.webp", "https://i.postimg.cc/wBsTZ04h/hero-section-background-00133.webp",
  "https://i.postimg.cc/50B9NjVy/hero-section-background-00134.webp", "https://i.postimg.cc/0j9k6xkf/hero-section-background-00135.webp",
  "https://i.postimg.cc/D052LDmK/hero-section-background-00136.webp", "https://i.postimg.cc/Wp7pBD8f/hero-section-background-00137.webp",
  "https://i.postimg.cc/155Rs9YR/hero-section-background-00138.webp", "https://i.postimg.cc/hPyDGHHL/hero-section-background-00139.webp",
  "https://i.postimg.cc/K81Z302d/hero-section-background-00140.webp", "https://i.postimg.cc/BnRJT2Zt/hero-section-background-00141.webp",
  "https://i.postimg.cc/hjBgwgdB/hero-section-background-00142.webp", "https://i.postimg.cc/prS6wY6F/hero-section-background-00143.webp",
  "https://i.postimg.cc/0Np173HH/hero-section-background-00144.webp", "https://i.postimg.cc/76w89VFP/hero-section-background-00145.webp",
  "https://i.postimg.cc/8kwDy2k2/hero-section-background-00146.webp", "https://i.postimg.cc/ZnqktqY1/hero-section-background-00147.webp",
  "https://i.postimg.cc/d3QFsB6N/hero-section-background-00148.webp", "https://i.postimg.cc/MKFww1Qt/hero-section-background-00149.webp",
  "https://i.postimg.cc/sxHkVRv1/hero-section-background-00150.webp", "https://i.postimg.cc/g0RmNrrs/hero-section-background-00151.webp",
  "https://i.postimg.cc/0Qc3fqGZ/hero-section-background-00152.webp", "https://i.postimg.cc/g09PXd4Z/hero-section-background-00153.webp",
  "https://i.postimg.cc/76xd0Lzf/hero-section-background-00154.webp", "https://i.postimg.cc/tTNyGf3V/hero-section-background-00155.webp",
  "https://i.postimg.cc/Y0XHhWyr/hero-section-background-00156.webp", "https://i.postimg.cc/SNJ0gjv9/hero-section-background-00157.webp",
  "https://i.postimg.cc/JzZ2FXcs/hero-section-background-00158.webp", "https://i.postimg.cc/QMgvF7H2/hero-section-background-00159.webp",
  "https://i.postimg.cc/GhNWVrW5/hero-section-background-00160.webp", "https://i.postimg.cc/PrLcm9Cz/hero-section-background-00161.webp",
  "https://i.postimg.cc/nLxPfL00/hero-section-background-00162.webp", "https://i.postimg.cc/7PB81SmD/hero-section-background-00163.webp",
  "https://i.postimg.cc/6pvkNgw5/hero-section-background-00164.webp", "https://i.postimg.cc/qv6Tvgcr/hero-section-background-00165.webp",
  "https://i.postimg.cc/Xv6TNL7K/hero-section-background-00166.webp", "https://i.postimg.cc/m2FXc9nm/hero-section-background-00167.webp",
  "https://i.postimg.cc/7bvN1BRm/hero-section-background-00168.webp", "https://i.postimg.cc/c4YppPd1/hero-section-background-00169.webp",
  "https://i.postimg.cc/sfBdcv8h/hero-section-background-00170.webp", "https://i.postimg.cc/DyZhRx88/hero-section-background-00171.webp",
  "https://i.postimg.cc/KzHfjcDX/hero-section-background-00172.webp", "https://i.postimg.cc/5tPT5VSg/hero-section-background-00173.webp",
  "https://i.postimg.cc/tTYf2Mrj/hero-section-background-00174.webp", "https://i.postimg.cc/VNzDHVkh/hero-section-background-00175.webp",
  "https://i.postimg.cc/qRwf5Krs/hero-section-background-00176.webp", "https://i.postimg.cc/bJW5M9M2/hero-section-background-00177.webp",
  "https://i.postimg.cc/wMnwfx15/hero-section-background-00178.webp", "https://i.postimg.cc/sXXK3GS9/hero-section-background-00179.webp",
  "https://i.postimg.cc/GttfgSqR/hero-section-background-00180.webp", "https://i.postimg.cc/7YpRX97v/hero-section-background-00181.webp",
  "https://i.postimg.cc/k5wfrvVg/hero-section-background-00182.webp", "https://i.postimg.cc/7PtdJwZZ/hero-section-background-00183.webp",
  "https://i.postimg.cc/28pJ7Ths/hero-section-background-00184.webp", "https://i.postimg.cc/sfLHDmTB/hero-section-background-00185.webp",
  "https://i.postimg.cc/g00B27bZ/hero-section-background-00186.webp", "https://i.postimg.cc/vZtpB91p/hero-section-background-00187.webp",
  "https://i.postimg.cc/bvY42Jkd/hero-section-background-00188.webp", "https://i.postimg.cc/Qxpz45qH/hero-section-background-00189.webp",
  "https://i.postimg.cc/y84f0d4s/hero-section-background-00190.webp", "https://i.postimg.cc/bJNVdBXn/hero-section-background-00191.webp",
  "https://i.postimg.cc/wvffNQHG/hero-section-background-00192.webp", "https://i.postimg.cc/sgYTmrsS/hero-section-background-00193.webp",
  "https://i.postimg.cc/SKGtSpPq/hero-section-background-00194.webp", "https://i.postimg.cc/4yc0Thk2/hero-section-background-00195.webp",
  "https://i.postimg.cc/c1t23Pg7/hero-section-background-00196.webp", "https://i.postimg.cc/MH19L2Vh/hero-section-background-00197.webp",
  "https://i.postimg.cc/3x1c7TVh/hero-section-background-00198.webp", "https://i.postimg.cc/tJsrNn4C/hero-section-background-00199.webp",
  "https://i.postimg.cc/25X9bxCX/hero-section-background-00200.webp", "https://i.postimg.cc/W3FWMJ3p/hero-section-background-00201.webp",
  "https://i.postimg.cc/Qdf0wqKx/hero-section-background-00202.webp", "https://i.postimg.cc/76FBXYG3/hero-section-background-00203.webp",
  "https://i.postimg.cc/rwVffHmP/hero-section-background-00204.webp", "https://i.postimg.cc/FFSCzc8D/hero-section-background-00205.webp",
  "https://i.postimg.cc/RCjrbv5b/hero-section-background-00206.webp", "https://i.postimg.cc/rpzQkt5G/hero-section-background-00207.webp",
  "https://i.postimg.cc/yN5nYYTM/hero-section-background-00208.webp", "https://i.postimg.cc/PJv4wGSC/hero-section-background-00209.webp",
  "https://i.postimg.cc/VvPRnGp4/hero-section-background-00210.webp", "https://i.postimg.cc/zvwkjw1N/hero-section-background-00211.webp",
  "https://i.postimg.cc/XJCLZSHp/hero-section-background-00212.webp", "https://i.postimg.cc/sD9n9zVW/hero-section-background-00213.webp",
  "https://i.postimg.cc/nhpP6zdT/hero-section-background-00214.webp", "https://i.postimg.cc/CLVPq5VY/hero-section-background-00215.webp",
  "https://i.postimg.cc/nVqTpx9W/hero-section-background-00216.webp", "https://i.postimg.cc/Cxg3SJKG/hero-section-background-00217.webp",
  "https://i.postimg.cc/c4ZhJzQL/hero-section-background-00218.webp", "https://i.postimg.cc/L6TTgVTB/hero-section-background-00219.webp",
  "https://i.postimg.cc/Hkktw7vG/hero-section-background-00220.webp", "https://i.postimg.cc/jS34ZdBD/hero-section-background-00221.webp",
  "https://i.postimg.cc/XvZch60Q/hero-section-background-00222.webp", "https://i.postimg.cc/3wPCQf87/hero-section-background-00223.webp",
  "https://i.postimg.cc/nzBKFKrm/hero-section-background-00224.webp", "https://i.postimg.cc/QCDQHBKy/hero-section-background-00225.webp",
  "https://i.postimg.cc/nr1v7Hvc/hero-section-background-00226.webp", "https://i.postimg.cc/mZ33KS0f/hero-section-background-00227.webp",
  "https://i.postimg.cc/SND6xxSg/hero-section-background-00228.webp", "https://i.postimg.cc/QxXgDT3B/hero-section-background-00229.webp",
  "https://i.postimg.cc/sgxpQC1s/hero-section-background-00230.webp", "https://i.postimg.cc/6pPCCbGR/hero-section-background-00231.webp",
  "https://i.postimg.cc/QtG5yBmd/hero-section-background-00232.webp", "https://i.postimg.cc/KYgBf7nW/hero-section-background-00233.webp",
  "https://i.postimg.cc/Y96gKpDf/hero-section-background-00234.webp", "https://i.postimg.cc/5yfzfZZc/hero-section-background-00235.webp",
  "https://i.postimg.cc/MHtQH9Sn/hero-section-background-00236.webp", "https://i.postimg.cc/mZSMmgHT/hero-section-background-00237.webp",
  "https://i.postimg.cc/CLL8XpGk/hero-section-background-00238.webp", "https://i.postimg.cc/FsWSQCpq/hero-section-background-00239.webp",
  "https://i.postimg.cc/CxRqMC6K/hero-section-background-00240.webp", "https://i.postimg.cc/Z5XyW91x/hero-section-background-00241.webp",
  "https://i.postimg.cc/g0RL8zpF/hero-section-background-00242.webp", "https://i.postimg.cc/CM76TYq4/hero-section-background-0046.webp",
  "https://i.postimg.cc/TYPNTSjv/hero-section-background-0047.webp", "https://i.postimg.cc/2y0H4FDt/hero-section-background-0048.webp",
  "https://i.postimg.cc/Znb7Bs13/hero-section-background-0049.webp", "https://i.postimg.cc/15YCXHMn/hero-section-background-0050.webp",
  "https://i.postimg.cc/jjyZ8rTP/hero-section-background-0051.webp", "https://i.postimg.cc/P5gSz5gd/hero-section-background-0052.webp",
  "https://i.postimg.cc/L8Yy110y/hero-section-background-0053.webp", "https://i.postimg.cc/RF9GybC8/hero-section-background-0054.webp",
  "https://i.postimg.cc/85HwSBjC/hero-section-background-0055.webp", "https://i.postimg.cc/FzCZfrb5/hero-section-background-0056.webp",
  "https://i.postimg.cc/VvkgLrCW/hero-section-background-0057.webp", "https://i.postimg.cc/XNsx18RH/hero-section-background-0058.webp",
  "https://i.postimg.cc/3J61YwJ2/hero-section-background-0059.webp", "https://i.postimg.cc/ncM2ymZH/hero-section-background-0060.webp",
  "https://i.postimg.cc/rwrJmLK3/hero-section-background-0061.webp", "https://i.postimg.cc/FKXxknSR/hero-section-background-0062.webp",
  "https://i.postimg.cc/63YVSWm2/hero-section-background-0063.webp", "https://i.postimg.cc/xdG3vyGP/hero-section-background-0064.webp",
  "https://i.postimg.cc/KzZrJkJh/hero-section-background-0065.webp", "https://i.postimg.cc/QCCgZ226/hero-section-background-0066.webp",
  "https://i.postimg.cc/qqFsJm0p/hero-section-background-0067.webp", "https://i.postimg.cc/SQ17fK9H/hero-section-background-0068.webp",
  "https://i.postimg.cc/TYyj7Xq1/hero-section-background-0069.webp", "https://i.postimg.cc/8PqRxntH/hero-section-background-0070.webp",
  "https://i.postimg.cc/cLwRWMzN/hero-section-background-0071.webp", "https://i.postimg.cc/9f2GQw3w/hero-section-background-0072.webp",
  "https://i.postimg.cc/tgzFZRyS/hero-section-background-0073.webp", "https://i.postimg.cc/Y9qY1cCp/hero-section-background-0074.webp",
  "https://i.postimg.cc/qRbnwmN2/hero-section-background-0075.webp", "https://i.postimg.cc/cCv3bQ32/hero-section-background-0076.webp",
  "https://i.postimg.cc/BbRF9Xc6/hero-section-background-0077.webp", "https://i.postimg.cc/c1zw8byS/hero-section-background-0078.webp",
  "https://i.postimg.cc/X7yFKk4y/hero-section-background-0079.webp", "https://i.postimg.cc/kg3STRgY/hero-section-background-0080.webp",
  "https://i.postimg.cc/L8t1w4q9/hero-section-background-0081.webp", "https://i.postimg.cc/k57bmr8x/hero-section-background-0082.webp",
  "https://i.postimg.cc/ZqjyYfFX/hero-section-background-0083.webp", "https://i.postimg.cc/rmmRDSfs/hero-section-background-0084.webp",
  "https://i.postimg.cc/zBcbKVQj/hero-section-background-0085.webp", "https://i.postimg.cc/wMRtV98d/hero-section-background-0086.webp",
  "https://i.postimg.cc/RqrWp24J/hero-section-background-0087.webp", "https://i.postimg.cc/c1vTjYdd/hero-section-background-0088.webp",
  "https://i.postimg.cc/J7SKWnhZ/hero-section-background-0089.webp", "https://i.postimg.cc/FscpF4fq/hero-section-background-0090.webp",
  "https://i.postimg.cc/FH4Z7B3K/hero-section-background-0091.webp", "https://i.postimg.cc/Jz5QJ555/hero-section-background-0092.webp",
  "https://i.postimg.cc/rpyN9RhX/hero-section-background-0093.webp", "https://i.postimg.cc/g0Mqtc5w/hero-section-background-0094.webp",
  "https://i.postimg.cc/85jd2QQZ/hero-section-background-0095.webp", "https://i.postimg.cc/Px9bh3dT/hero-section-background-0096.webp",
  "https://i.postimg.cc/brnxvxvb/hero-section-background-0097.webp", "https://i.postimg.cc/v8xLXsvB/hero-section-background-0098.webp",
  "https://i.postimg.cc/c4q7bbDc/hero-section-background-0099.webp",
];

export const INFOGRAPHIC_BACKGROUND_IMAGES = [
  "https://i.postimg.cc/W3DDT0pv/infographic-background-001.webp",
  "https://i.postimg.cc/BtfJWKbM/infographic-background-002.webp",
  "https://i.postimg.cc/nVDsWKwK/infographic-background-003.webp",
  "https://i.postimg.cc/hjhDVnNb/infographic-background-004.webp",
  "https://i.postimg.cc/YqFSXp0d/infographic-background-005.webp",
  "https://i.postimg.cc/43fNNV50/infographic-background-006.webp",
  "https://i.postimg.cc/RC6fBxqH/infographic-background-007.webp",
  "https://i.postimg.cc/SQ3s7XSX/infographic-background-008.webp",
  "https://i.postimg.cc/GmrsGBKF/infographic-background-009.webp",
  "https://i.postimg.cc/mrmZckpg/infographic-background-0010.webp",
  "https://i.postimg.cc/wBjy4SS3/infographic-background-0011.webp",
  "https://i.postimg.cc/X79CrKfN/infographic-background-0012.webp",
  "https://i.postimg.cc/HkBjM6Vm/infographic-background-0013.webp",
  "https://i.postimg.cc/mrkky7HH/infographic-background-0014.webp",
  "https://i.postimg.cc/6Qb7kMXc/infographic-background-0015.webp",
  "https://i.postimg.cc/xC70R72r/infographic-background-0016.webp",
  "https://i.postimg.cc/wj673CxF/infographic-background-0017.webp",
  "https://i.postimg.cc/T3X3FZWf/infographic-background-0018.webp",
  "https://i.postimg.cc/13HVH97L/infographic-background-0019.webp",
  "https://i.postimg.cc/D0L8bFbp/infographic-background-0020.webp",
  "https://i.postimg.cc/B6dj6tt1/infographic-background-0021.webp",
  "https://i.postimg.cc/fT7VzzsJ/infographic-background-0022.webp",
  "https://i.postimg.cc/hvdK3rDX/infographic-background-0023.webp",
  "https://i.postimg.cc/yYCJCJwM/infographic-background-0024.webp",
  "https://i.postimg.cc/3xCxTngp/infographic-background-0025.webp",
  "https://i.postimg.cc/xjwmjpbF/infographic-background-0026.webp",
];

export const SECTION_BACKGROUND_IMAGES = [
  "https://i.postimg.cc/jd9fBTpD/sections-backgrounds-001.jpg",
  "https://i.postimg.cc/L8Yts5tk/sections-backgrounds-0010.jpg",
  "https://i.postimg.cc/hP38gTdP/sections-backgrounds-0011.jpg",
  "https://i.postimg.cc/5Nt5ZnjR/sections-backgrounds-0012.jpg",
  "https://i.postimg.cc/NFd6KrCD/sections-backgrounds-0013.jpg",
  "https://i.postimg.cc/7P9MspPz/sections-backgrounds-0014.jpg",
  "https://i.postimg.cc/Gh9YMt50/sections-backgrounds-002.jpg",
  "https://i.postimg.cc/c1FwMwTM/sections-backgrounds-003.jpg",
  "https://i.postimg.cc/7htzHrbQ/sections-backgrounds-004.jpg",
  "https://i.postimg.cc/x81HV1jz/sections-backgrounds-005.jpg",
  "https://i.postimg.cc/Hx25Nymm/sections-backgrounds-006.jpg",
  "https://i.postimg.cc/PxhYKMBK/sections-backgrounds-007.jpg",
  "https://i.postimg.cc/7LSSgRQf/sections-backgrounds-008.jpg",
  "https://i.postimg.cc/Cx3jn073/sections-backgrounds-009.jpg",
];

export const MENU_ITEMS = [
  { name: 'header.menu.home', to: 'home' },
  { 
    name: 'header.menu.ourStory', 
    to: 'legacy',
    subItems: [
        { name: 'header.menu.ourStoryLegacy', to: 'legacy' },
        { name: 'header.menu.ourStoryPalmyra', to: 'palmyra-palm' },
        { name: 'header.menu.ourStoryHarvest', to: 'harvest-art' },
        { name: 'header.menu.ourStoryCommitment', to: 'commitment' },
    ]
  },
  { name: 'header.menu.products', to: 'products' },
  { name: 'header.menu.healthBenefits', to: 'benefits' },
  { name: 'header.menu.recipes', to: 'recipes' },
  { name: 'header.menu.faq', to: 'faq' },
  { name: 'header.menu.contactUs', to: 'contact' },
];

export const PRODUCTS_DATA = [
  {
    id: 1,
    image: 'https://i.postimg.cc/T1cB4Q79/Traditional-Palm-Sugar-Block.webp',
    price: 12,
    isQuote: false,
    key: 'products.items.1',
  },
  {
    id: 2,
    image: 'https://i.postimg.cc/7h4p9jVh/Palm-Sugar-Powder.webp',
    price: 15,
    isQuote: false,
    key: 'products.items.2',
  },
  {
    id: 3,
    image: 'https://i.postimg.cc/N03h9K21/Palm-Sugar-Syrup.webp',
    price: 18,
    isQuote: false,
    key: 'products.items.3',
  },
  {
    id: 4,
    image: 'https://i.postimg.cc/8kB8cPp6/Certified-Organic-Toddy-Palm-Sugar.webp',
    price: 0,
    isQuote: true,
    key: 'products.items.4',
  },
  {
    id: 5,
    image: 'https://i.postimg.cc/wvLCh9Dn/Palm-Sugar-Fusion-Flavors.webp',
    price: 0,
    isQuote: true,
    key: 'products.items.5',
  },
];


export const FAQ_DATA = [
  {
    key: 'faq.items.1'
  },
  {
    key: 'faq.items.2'
  },
  {
    key: 'faq.items.3'
  },
  {
    key: 'faq.items.4'
  },
];

export const SOCIAL_LINKS = [
  { icon: <FaFacebook />, href: 'https://facebook.com', name: 'Facebook' },
  { icon: <FaInstagram />, href: 'https://instagram.com', name: 'Instagram' },
  { icon: <FaYoutube />, href: 'https://youtube.com', name: 'YouTube' },
];

export const CERTIFICATION_ICONS = [
  { src: 'https://picsum.photos/seed/organic/100/100', alt: 'Organic Certified' },
  { src: 'https://picsum.photos/seed/otop/100/100', alt: 'OTOP Certified' },
  { src: 'https://picsum.photos/seed/halal/100/100', alt: 'HALAL Certified' },
];

export const CHAT_OPTIONS = [
    { icon: <FaWhatsapp className="w-8 h-8"/>, href: 'https://wa.me/66968615795', name: 'WhatsApp'},
    { icon: <RiLineFill className="w-8 h-8"/>, href: '#', name: 'LINE'}
];
