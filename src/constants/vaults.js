const stagingVaults = [
    { // Pangolin AVAX/PNG => PNG Vault
        addresses: {
            vault: "0xE0083aB1A3A02084Bb74008aF7e9Be75Fa798657",
            strategy: "0x64B94Ba8f9B49e110182beBdF547A9EE8b98fbD4",
            pair: "0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367",
            rewards: "0x49d7Df284915239ed519F2fF1C6771526862e5F2"
        },
        vaultName: "Pangolin AVAX/PNG",
        rewardToken: "PNG",
        LPtoken: "PGL",
        protocol: "pangolin",
        amm: "pangolin",
        farmType: "SR",
        logo: "pangolin.jpg"
    },
    { // Pangolin ETH/PNG => PNG 
        addresses: {
            vault: "0xCe9F100bAe6DbC559018b49e5e57Ae16232948b8",
            strategy: "0xbf9967983a423A0daFDF085F36BA38a7a8B5Cd97",
            pair: "0x53B37b9A6631C462d74D65d61e1c056ea9dAa637",
            rewards: "0x3DD7f7d935EDafC7fe61E3143496aC8c6cf407b4"
        },
        vaultName: "Pangolin ETH/PNG",
        rewardToken: "PNG",
        LPtoken: "PGL",
        protocol: "pangolin",
        amm: "pangolin",
        farmType: "SR",
        logo: "pangolin.jpg"
    },
    { // Olive OLIVE/AVAX => OLIVE 
        addresses: {
            vault: "0xD09969C91172EfDd0C9854f40d1B2dACF0e2265F",
            strategy: "0xD4aeb1c31A4eae8e57bCaA452c6ea903649Cda5D",
            pair: "0x57cc32Cd7F5a531953E9af25e1C9394093428082",
            rewards: "0x75f72A4AfEd61Bbeb6D4aB1362B1f2B271C66C6c"
        },
        vaultName: "Olive AVAX/OLIVE",
        rewardToken: "OLIVE",
        LPtoken: "Olive LP",
        protocol: "olive",
        amm: "olive",
        farmType: "MC",
        logo: "olive.png",
        decomm: true
    },
    { // Pangolin ETH/AVAX => PNG 
        addresses: {
            vault: "0xF1D5Fb27Eb2121Db54f8905bC207CEE0AAF6A373",
            strategy: "0x4a893426Ec880AEcCa0E7BAA79f1EFfB0ebeE149",
            pair: "0x1aCf1583bEBdCA21C8025E172D8E8f2817343d65",
            rewards: "0x1b50C1A063d1f213f8d4aDf56D71BEf9Df1BDf5C"
        },
        vaultName: "Pangolin AVAX/ETH",
        rewardToken: "PNG",
        LPtoken: "PGL",
        protocol: "pangolin",
        amm: "pangolin",
        farmType: "SR",
        logo: "pangolin.jpg"
    },
];

// Available Variables
// { // Vault
//     addresses: {
//         vault: "",
//         strategy: "",
//         pair: "",
//         rewards: ""
//     },
//     vaultName: "",
//     rewardToken: "",
//     LPtoken: "",
//     protocol: "",
//     amm: "",
//     farmType: "",
//     logo: "",
//     farmLink: "",
//     decimals: 0,
//     lpOnly: true,
//     hideAvaxDisplay: true,
//     apyDown: true,
//     nonGeneric: true,
//     type: "",
//     decomm: false
// }

const productionVaults = [
   { // Pangolin AVAX/PNG => PNG Vault
        addresses: {
            vault: "0xccB42c29285754f441Dc6A4461De011efCD09F75",
            strategy: "0xD3105702ee5635381AE91908016771d50D17C5a6",
            pair: "0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367",
            rewards: "0x3f5aeA81406d40b173d8800876eFF9A34dAc325A"
        },
        vaultName: "Pangolin AVAX/PNG",
        rewardToken: "PNG",
        LPtoken: "PGL",
        protocol: "pangolin",
        amm: "pangolin",
        farmType: "SR",
        logo: "pangolin.jpg",
        farmLink: "https://info.pangolin.exchange/#/pair/0xd7538cabbf8605bde1f4901b47b8d42c61de0367",
        type: "lp",
        decomm: true
        // decimals: 3
    },
    { // Olive AVAX/OLIVE => OLIVE Vault
        addresses: {
            vault: "0xCD1eee22a0Ec06f5D169753cc1B1CC0C57513B24",
            strategy: "0xd712540FBf2A7AE9E0c74a372e93986AedB667c0",
            pair: "0x57cc32Cd7F5a531953E9af25e1C9394093428082",
            rewards: "0x0C31F85F6805B968a03161eb4Bf3707402d2711D"
        },
        vaultName: "Olive AVAX/OLIVE",
        rewardToken: "OLIVE",
        LPtoken: "Olive LP",
        protocol: "olive",
        amm: "olive",
        farmType: "MC",
        logo: "olive.png",
        farmLink: "https://info.olive.cash/#/pair/0x57cc32cd7f5a531953e9af25e1c9394093428082",
        type: "lp",
        decomm: true
    },
    { // Avaware AVAX/AVE => AVE Vault
        addresses: {
            vault: "0x950bF2fb93c4Cb8CaBc7A08eb8A70Ea3c4A2bcC2",
            strategy: "0x439841369Eb83669e0889908d21e473ca65E3885",
            pair: "0x62a2F206CC78BAbAC9Db4dbC0c9923D4FdDef047",
            rewards: "0x0ff2b0F0b42B4BB7d318cfCbC614653719966eaF"
        },
        vaultName: "Avaware AVAX/AVE",
        rewardToken: "AVE",
        LPtoken: "PGL",
        protocol: "avaware",
        amm: "pangolin",
        farmType: "SR",
        logo: "avaware.png",
        farmLink: "https://info.pangolin.exchange/#/pair/0x62a2f206cc78babac9db4dbc0c9923d4fddef047",
        type: "lp"
    },
    // { // TraderJoe AVAX/JOE => JOE Vault
    //     addresses: {
    //         vault: "0xB19bFa46148636C97B0C00A68B24647f60C1995D",
    //         strategy: "0xA778D06450f6109F7B61daE940ec54d4A80089F5",
    //         pair: "0x454E67025631C065d3cFAD6d71E6892f74487a15",
    //         rewards: "0x7d5e16d18256A1C3b9f0b98d2f0dc417ba03FED2"
    //     },
    //     vaultName: "Trader Joe AVAX/JOE",
    //     rewardToken: "JOE",
    //     LPtoken: "JLP",
    //     protocol: "traderjoe",
    //     amm: "traderjoe",
    //     farmType: "MC",
    //     logo: "traderjoe.png",
    //     farmLink: "https://analytics.traderjoexyz.com/pairs/0x454e67025631c065d3cfad6d71e6892f74487a15",
    //     type: "lp"
    // },
    // { // TraderJoe AVAX/SNOB => JOE Vault
    //     addresses: {
    //         vault: "0x16aB820ABB64BcE04d15de945c18c0CC31822514",
    //         strategy: "0x937832F65473C54E308D7f8C8dAB2B5bCDa052fD",
    //         pair: "0x8fB5bD3aC8eFD05DACae82F512dD03e14aAdAb73",
    //         rewards: "0x93C707a713B4cA4d1Ec680508c0F5895e70c217A"
    //     },
    //     vaultName: "Trader Joe AVAX/SNOB",
    //     rewardToken: "JOE",
    //     LPtoken: "JLP",
    //     protocol: "traderjoe",
    //     amm: "traderjoe",
    //     farmType: "MC",
    //     logo: "traderjoe.png",
    //     farmLink: "https://analytics.traderjoexyz.com/pairs/0x8fb5bd3ac8efd05dacae82f512dd03e14aadab73",
    //     type: "lp"
    // },
    { // Avaware AVE/CYCLE => AVE Vault
        addresses: {
            vault: "0x4762baf391Ca1A18f71320a6A09bCD2067EA32cA",
            strategy: "0xe9c252Abb288b17ACBB5Ed03cbD843E2Fa71f704",
            pair: "0xF5DaEECcB0aB17C8eD2DEf92765D4F94eAABdf83",
            rewards: "0x223e84fc870A919c51Ba7760C0770806Af715b70"
        },
        vaultName: "Avaware AVE/CYCLE",
        rewardToken: "AVE",
        LPtoken: "PGL",
        protocol: "avaware",
        amm: "pangolin",
        farmType: "SR",
        logo: "avaware.png",
        farmLink: "https://info.pangolin.exchange/#/pair/0xf5daeeccb0ab17c8ed2def92765d4f94eaabdf83",
        type: ["cycle","lp"],
        decomm: true
    },
    // { // Avaware AVE/SHERPA => AVE Vault
    //     addresses: {
    //         vault: "0x60B9Fa802C2Bf85203b22c2aC0A68948632bf1f1",
    //         strategy: "0xC95CC37320b83B4AebBE042f818bcedcfA4Bcb46",
    //         pair: "0xA0136Db5B8524b9096a099BcC5Da871D1A46A384",
    //         rewards: "0x43615cBF829F1622A215878272046D29e6437E6c"
    //     },
    //     vaultName: "Avaware AVE/SHERPA",
    //     rewardToken: "AVE",
    //     LPtoken: "PGL",
    //     protocol: "avaware",
    //     amm: "pangolin",
    //     farmType: "SR",
    //     logo: "avaware.png",
    //     farmLink: "https://info.pangolin.exchange/#/pair/0xa0136db5b8524b9096a099bcc5da871d1a46a384",
    //     type: "lp",
    //     decomm: true
    // },
    // { // Avaware AVE/YAK => AVE Vault
    //     addresses: {
    //         vault: "0xaA76c50B510A668F48E612f980C45DC9691b647A",
    //         strategy: "0x7D23CD635766ac563F50eCC59cF9621832452132",
    //         pair: "0xfb540c8FBBcD9ed15A918cE01235010FbD24bcf1",
    //         rewards: "0x6aF724df8968C861E18Df0050090aED33Be31962"
    //     },
    //     vaultName: "Avaware AVE/YAK",
    //     rewardToken: "AVE",
    //     LPtoken: "PGL",
    //     protocol: "avaware",
    //     amm: "pangolin",
    //     farmType: "SR",
    //     logo: "avaware.png",
    //     farmLink: "https://info.pangolin.exchange/#/pair/0xfb540c8fbbcd9ed15a918ce01235010fbd24bcf1",
    //     type: "lp",
    //     decomm: true
    // },
    // { // Pangolin AVAX/XAVA => PNG Vault
    //     addresses: {
    //         vault: "0x13C9810d32bA9B7e51FeEf9aeF3b3D479efCfACC",
    //         strategy: "0xc867bd275Db99342A11603c04Dee3cCA1D53c9b1",
    //         pair: "0x42152bDD72dE8d6767FE3B4E17a221D6985E8B25",
    //         rewards: "0x5702D359771f10be0178eC8F5b4568A1b9774dFC"
    //     },
    //     vaultName: "Pangolin AVAX/XAVA",
    //     rewardToken: "PNG",
    //     LPtoken: "PGL",
    //     protocol: "pangolin",
    //     amm: "pangolin",
    //     farmType: "SR",
    //     logo: "pangolin.jpg",
    //     farmLink: "https://info.pangolin.exchange/#/pair/0x42152bdd72de8d6767fe3b4e17a221d6985e8b25",
    //     type: "lp",
    //     decomm: true
    // },
    { // Pangolin AVAX/WETH.e => PNG Vault
        addresses: {
            vault: "0x056b234bE3Aaa56506d484e17721Db0098e52474",
            strategy: "0xAF12AC5b2AB034782FCF3eA83e6974577f009D47",
            pair: "0x7c05d54fc5CB6e4Ad87c6f5db3b807C94bB89c52",
            rewards: "0xdbA511c2dB33F6a939CE16Cf33eA6BA19efB5807"
        },
        vaultName: "Pangolin AVAX/WETH.e",
        rewardToken: "PNG",
        LPtoken: "PGL",
        protocol: "pangolin",
        amm: "pangolin",
        farmType: "SR",
        logo: "pangolin.jpg",
        farmLink: "https://info.pangolin.exchange/#/pair/0x7c05d54fc5cb6e4ad87c6f5db3b807c94bb89c52",
        decimals: 4,
        type: "lp",
        decomm: true
    },
    { // Trader Joe AVAX/WETH.e => JOE Vault
        addresses: {
            vault: "0xc2C215d9263592665993eEfc77976e70590f0DF1",
            strategy: "0x1Ff17C88909f9Ed1352A338CEd0DD4BcEeC2Ff5b",
            pair: "0xFE15c2695F1F920da45C30AAE47d11dE51007AF9",
            rewards: "0x690F33c54596E48310B8e653511bacDc83DdE0cd"
        },
        vaultName: "Trader Joe AVAX/WETH.e",
        rewardToken: "JOE",
        LPtoken: "JLP",
        protocol: "traderjoe",
        amm: "traderjoe",
        farmType: "MC",
        logo: "traderjoe.png",
        farmLink: "https://analytics.traderjoexyz.com/pairs/0xfe15c2695f1f920da45c30aae47d11de51007af9",
        decimals: 4,
        type: "lp",
        tempZeroAPY: true
    },
    // { // Pangolin AVAX/DAI.e => PNG Vault
    //     addresses: {
    //         vault: "0x4Fbb4C6dBD68A609780C79A18C04e5Ac52dD622C",
    //         strategy: "0xbAe49646b7fD57a7A949090b3414a901B13412C1",
    //         pair: "0xbA09679Ab223C6bdaf44D45Ba2d7279959289AB0",
    //         rewards: "0x39811e656FBb25FeFEcDcb151ba30c9EF7564942"
    //     },
    //     vaultName: "Pangolin AVAX/DAI.e",
    //     rewardToken: "PNG",
    //     LPtoken: "PGL",
    //     protocol: "pangolin",
    //     amm: "pangolin",
    //     farmType: "SR",
    //     logo: "pangolin.jpg",
    //     farmLink: "https://info.pangolin.exchange/#/pair/0xba09679ab223c6bdaf44d45ba2d7279959289ab0"
    // },
    // { // Pangolin AVAX/USDT.e => PNG Vault
    //     addresses: {
    //         vault: "0xD65B47A5b6B6A07CFf8798AB54F136A0f05ADFF6",
    //         strategy: "0x0a8D9002A3DE53063A32D87535698213586c826E",
    //         pair: "0xe28984e1EE8D431346D32BeC9Ec800Efb643eef4",
    //         rewards: "0xe53fc16d838D509e4d45EFF161dF03EAba420938"
    //     },
    //     vaultName: "Pangolin AVAX/USDT.e",
    //     rewardToken: "PNG",
    //     LPtoken: "PGL",
    //     protocol: "pangolin",
    //     amm: "pangolin",
    //     farmType: "SR",
    //     logo: "pangolin.jpg",
    //     farmLink: "https://info.pangolin.exchange/#/pair/0xe28984e1ee8d431346d32bec9ec800efb643eef4",
    //     decimals: 10,
    //     apyDown: true
    // },
    // { // Pangolin AVAX/QI => PNG Vault
    //     addresses: {
    //         vault: "0x7754Be84f3305A12558e631e5df2A4DF474Cc046",
    //         strategy: "0x4243C3C305201976264ccdc238E5D83DB3866aDe",
    //         pair: "0xE530dC2095Ef5653205CF5ea79F8979a7028065c",
    //         rewards: "0x763f77232AbB1850E9a14635b83C60C8FaB56d92"
    //     },
    //     vaultName: "Pangolin AVAX/QI",
    //     rewardToken: "PNG",
    //     LPtoken: "PGL",
    //     protocol: "pangolin",
    //     amm: "pangolin",
    //     farmType: "SR",
    //     logo: "pangolin.jpg",
    //     farmLink: "https://info.pangolin.exchange/#/pair/0xe530dc2095ef5653205cf5ea79f8979a7028065c",
    //     decimals: 13,
    //     type: "lp",
    //     decomm: true
    // },
    { // Trader Joe AVAX/USDT.e => JOE Vault
        addresses: {
            vault: "0x1058B8eAC995968DE18d6a8baf36B3F6536a2Ca1",
            strategy: "0x41D197387bAEFc844f34E46CC2C424aE3668DC92",
            pair: "0xeD8CBD9F0cE3C6986b22002F03c6475CEb7a6256",
            rewards: "0x954dD483248833F973D2e6FcD98f553efD7839f3"
        },
        vaultName: "Trader Joe AVAX/USDT.e",
        rewardToken: "JOE",
        LPtoken: "JLP",
        protocol: "traderjoe",
        amm: "traderjoe",
        farmType: "MC",
        logo: "traderjoe.png",
        farmLink: "https://analytics.traderjoexyz.com/pairs/0xed8cbd9f0ce3c6986b22002f03c6475ceb7a6256",
        decimals: 10,
        type: ["stables","lp"],
        decomm: true
    },
    // { // Trader Joe AVAX/DAI.e => JOE Vault
    //     addresses: {
    //         vault: "0x226C4E8758D37A151Fd01a46505A1D3C0dba3a24",
    //         strategy: "0x72863eB2541fc28251BBFe2286bF684092633f17",
    //         pair: "0x87Dee1cC9FFd464B79e058ba20387c1984aed86a",
    //         rewards: "0xA0268A5B8130564CA706e1b30Bb5E58e48835e03"
    //     },
    //     vaultName: "Trader Joe AVAX/DAI.e",
    //     rewardToken: "JOE",
    //     LPtoken: "JLP",
    //     protocol: "traderjoe",
    //     amm: "traderjoe",
    //     farmType: "MC",
    //     logo: "traderjoe.png",
    //     farmLink: "https://analytics.traderjoexyz.com/pairs/0x87dee1cc9ffd464b79e058ba20387c1984aed86a",
    //     type: ["stables","lp"],
    //     decomm: true
    // },
    { // Trader Joe USDT.e/DAI.e => JOE Vault
        addresses: {
            vault: "0x49D4663dBC92f4AfD0BE0459Ceb20F8e9F5a7118",
            strategy: "0x07d65288E1d3af9Da7a2aD15800AfB3C40fbaF25",
            pair: "0xa6908C7E3Be8F4Cd2eB704B5cB73583eBF56Ee62",
            rewards: "0xb6e6361F9f1820C7d6e606460757a2deace829AD"
        },
        vaultName: "Trader Joe USDT.e/DAI.e",
        rewardToken: "JOE",
        LPtoken: "JLP",
        protocol: "traderjoe",
        amm: "traderjoe",
        farmType: "MC",
        logo: "traderjoe.png",
        farmLink: "https://analytics.traderjoexyz.com/pairs/0xa6908c7e3be8f4cd2eb704b5cb73583ebf56ee62",
        decimals: 10,
        type: ["stables","lp"],
        decomm: true
    },
    // { // Trader Joe AVAX/LINK.e => JOE Vault
    //     addresses: {
    //         vault: "0xd7d9151D1cB958F55cAc94196D03Ba267bc7d0dB",
    //         strategy: "0xd97F1479CDf4833F2F32de0C1E9795D88A3b17e9",
    //         pair: "0x6F3a0C89f611Ef5dC9d96650324ac633D02265D3",
    //         rewards: "0xb5eEdDfCbedb1ABE0d0EAE329365d3832c1B78f9"
    //     },
    //     vaultName: "Trader Joe AVAX/LINK.e",
    //     rewardToken: "JOE",
    //     LPtoken: "JLP",
    //     protocol: "traderjoe",
    //     amm: "traderjoe",
    //     farmType: "MC",
    //     logo: "traderjoe.png",
    //     farmLink: "https://analytics.traderjoexyz.com/pairs/0x6f3a0c89f611ef5dc9d96650324ac633d02265d3",
    //     type: "lp",
    //     decomm: true
    // },
    // { // Trader Joe AVAX/WBTC.e => JOE Vault
    //     addresses: {
    //         vault: "0xc732a6aA22B60cEAA5c2193EF81D008658a20623",
    //         strategy: "0xD1e56404025070b5e7fCEc172d0d90707bAbD2b7",
    //         pair: "0xd5a37dC5C9A396A03dd1136Fc76A1a02B1c88Ffa",
    //         rewards: "0xbF4eF26af2Aa021dc947E00e66b5293990c036EF"
    //     },
    //     vaultName: "Trader Joe AVAX/WBTC.e",
    //     rewardToken: "JOE",
    //     LPtoken: "JLP",
    //     protocol: "traderjoe",
    //     amm: "traderjoe",
    //     farmType: "MC",
    //     logo: "traderjoe.png",
    //     farmLink: "https://analytics.traderjoexyz.com/pairs/0xd5a37dc5c9a396a03dd1136fc76a1a02b1c88ffa",
    //     decimals: 10,
    //     type: "lp",
    //     decomm: true
    // },
    // { // Trader Joe AVAX/YAK => JOE Vault
    //     addresses: {
    //         vault: "0x970C251E85CE1cE0b714de9510135a5B9Cd80b02",
    //         strategy: "0x4eE4240F2Daa9f6b5d6236d9A832B161A4FDb950",
    //         pair: "0xb5c9e891AF3063004a441BA4FaB4cA3D6DEb5626",
    //         rewards: "0xA056e74d89EF4FFdFCE37330F900bD14CC31f901"
    //     },
    //     vaultName: "Trader Joe AVAX/YAK",
    //     rewardToken: "JOE",
    //     LPtoken: "JLP",
    //     protocol: "traderjoe",
    //     amm: "traderjoe",
    //     farmType: "MC",
    //     logo: "traderjoe.png",
    //     farmLink: "https://analytics.traderjoexyz.com/pairs/0xb5c9e891af3063004a441ba4fab4ca3d6deb5626",
    //     decimals: 5,
    //     type: "lp"
    // },
    { // Trader Joe AVAX/USDC.e => JOE Vault
        addresses: {
            vault: "0xb5a23bdF77a8926E732ce4b1F0885e7bB3b2Dfe9",
            strategy: "0xEbC2b6B5fD360B5D271A31B042FC6e71F34C8aBe",
            pair: "0xA389f9430876455C36478DeEa9769B7Ca4E3DDB1",
            rewards: "0x4141CCDa9eF0d78e11455Aa1F0E207A47e89913b"
        },
        vaultName: "Trader Joe AVAX/USDC.e",
        rewardToken: "JOE",
        LPtoken: "JLP",
        protocol: "traderjoe",
        amm: "traderjoe",
        farmType: "MC",
        logo: "traderjoe.png",
        farmLink: "https://analytics.traderjoexyz.com/pairs/0xa389f9430876455c36478deea9769b7ca4e3ddb1",
        decimals: 10,
        type: ["stables","lp"],
        decomm: true
    },
    // { // Trader Joe USDC.e/DAI.e => JOE Vault
    //     addresses: {
    //         vault: "0x32bdcdDA8eb152759c2F27D71e1F8d242D46D9Ca",
    //         strategy: "0x614bdbc277C247ED33C39FD3D3eC4aA19E574211",
    //         pair: "0x63ABE32d0Ee76C05a11838722A63e012008416E6",
    //         rewards: "0x88F0B80935972991727133b09D046639f8Ef8b1e"
    //     },
    //     vaultName: "Trader Joe USDC.e/DAI.e",
    //     rewardToken: "JOE",
    //     LPtoken: "JLP",
    //     protocol: "traderjoe",
    //     amm: "traderjoe",
    //     farmType: "MC",
    //     logo: "traderjoe.png",
    //     farmLink: "https://analytics.traderjoexyz.com/pairs/0x63abe32d0ee76c05a11838722a63e012008416e6",
    //     decimals: 10,
    //     type: ["stables","lp"],
    //     decomm: true
    // },
    // { // Pangolin AVAX/USDC.e => PNG Vault
    //     addresses: {
    //         vault: "0xF3a8B41a91dee7828Af281C7716b21EE36751E9e",
    //         strategy: "0x5f2e435279dcCf466dC4F2869a00e63e8E445507",
    //         pair: "0xbd918Ed441767fe7924e99F6a0E0B568ac1970D9",
    //         rewards: "0xE0DF3F3841c8DAC0435c839edDDb69c2c608Ba4f"
    //     },
    //     vaultName: "Pangolin AVAX/USDC.e",
    //     rewardToken: "PNG",
    //     LPtoken: "PGL",
    //     protocol: "pangolin",
    //     amm: "pangolin",
    //     farmType: "SR",
    //     logo: "pangolin.jpg",
    //     farmLink: "https://info.pangolin.exchange/#/pair/0xbd918ed441767fe7924e99f6a0e0b568ac1970d9",
    //     decimals: 10,
    //     type: ["stables","lp"],
    //     decomm: true
    // },
    { // Tip Blue AVAX/BLUE => BLUE Vault
        addresses: {
            vault: "0x2067c8f6c56963d9b5070c04815f30b1187e2fAB",
            strategy: "0x7A0F40C46867d55544bF4223A857735169CE1c41",
            pair: "0x985C2b7ca25FD79b07F5Af33f11BF03A6119BF49",
            rewards: "0x04c6EA8A165b98a948DA25B64f290dA103a3f861"
        },
        vaultName: "Tip Blue AVAX/BLUE",
        rewardToken: "BLUE",
        LPtoken: "PGL",
        protocol: "tipblue",
        amm: "pangolin",
        farmType: "SR",
        logo: "blue1.png",
        farmLink: "https://info.pangolin.exchange/#/pair/0x985c2b7ca25fd79b07f5af33f11bf03a6119bf49",
        type: "lp"
    },
    { // Pangolin AVAX/CYCLE => PNG Vault
        addresses: {
            vault: "0xbF7C508C1C98566F8dF694630BC5E15065Cee895",
            strategy: "0x609eCD1B8b6b18754C600Aac78Cd6C48457E042c",
            pair: "0x51486D916A273bEA3AE1303fCa20A76B17bE1ECD",
            rewards: "0xd0Eab51E7BfDd5B23A7C071d59A213ec429FE57b"
        },
        vaultName: "Pangolin AVAX/CYCLE",
        rewardToken: "PNG",
        LPtoken: "PGL",
        protocol: "pangolin",
        amm: "pangolin",
        farmType: "SR",
        logo: "pangolin.jpg",
        farmLink: "https://info.pangolin.exchange/#/pair/0x51486d916a273bea3ae1303fca20a76b17be1ecd",
        type: ["cycle","lp"],
        decomm: true
    },
    // { // Trader Joe AVAX/MIM => JOE Vault
    //     addresses: {
    //         vault: "0xb1D072aD231E50851e6E9d5a04E2d61Ef995BEd1",
    //         strategy: "0xf8e744195aD211c6d86dDe2f1F5C1231fd3C0b0d",
    //         pair: "0x781655d802670bbA3c89aeBaaEa59D3182fD755D",
    //         rewards: "0x1187390A41dcd8Ce927F24FfcaF86a6f8403B7B4"
    //     },
    //     vaultName: "Trader Joe AVAX/MIM",
    //     rewardToken: "JOE",
    //     LPtoken: "JLP",
    //     protocol: "traderjoe",
    //     amm: "traderjoe",
    //     farmType: "MC",
    //     logo: "traderjoe.png",
    //     farmLink: "https://analytics.traderjoexyz.com/pairs/0x781655d802670bba3c89aebaaea59d3182fd755d",
    //     type: ["stables","lp"],
    //     decomm: true
    // },
    // { // Trader Joe AVAX/BNB => JOE Vault
    //     addresses: {
    //         vault: "0x78f0da74d7883bE7b9ce7016D233f7f59CFED1a2",
    //         strategy: "0x56604479bEFaeD1Df8cFD5f9638296d65cb43F74",
    //         pair: "0xeb8eB6300c53C3AddBb7382Ff6c6FbC4165B0742",
    //         rewards: "0x455cC8DaE09FaAB9726EB713FE1E0A6AB598DCff"
    //     },
    //     vaultName: "Trader Joe AVAX/BNB",
    //     rewardToken: "JOE",
    //     LPtoken: "JLP",
    //     protocol: "traderjoe",
    //     amm: "traderjoe",
    //     farmType: "MC",
    //     logo: "traderjoe.png",
    //     farmLink: "https://analytics.traderjoexyz.com/pairs/0xeb8eb6300c53c3addbb7382ff6c6fbc4165b0742",
    //     type: "lp",
        
    // },
    // { // Trader Joe JOE/USDT.e => JOE Vault
    //     addresses: {
    //         vault: "0x2466242c61f305EAc73550E2329D4c2FD3d1Fff7",
    //         strategy: "0x4Ee798775C7872A048363A438c21947b18023f70",
    //         pair: "0x1643de2efB8e35374D796297a9f95f64C082a8ce",
    //         rewards: "0x00755b47135A9Aa892f19f6Dd0D7e09e9B6a45e3"
    //     },
    //     vaultName: "Trader Joe JOE/USDT.e",
    //     rewardToken: "JOE",
    //     LPtoken: "JLP",
    //     protocol: "traderjoe",
    //     amm: "traderjoe",
    //     farmType: "MC",
    //     logo: "traderjoe.png",
    //     farmLink: "https://analytics.traderjoexyz.com/pairs/0x1643de2efb8e35374d796297a9f95f64c082a8ce",
    //     decimals: 8,
    //     type: ["stables","lp"],
    //     decomm: true
    // },
    // { // Trader Joe AVAX/AAVE.e => JOE Vault
    //     addresses: {
    //         vault: "0x4b1CaBCE20a6A590558092776d42Bf031Ea777F1",
    //         strategy: "0xa1a42EE77db067D18EF192ca573539ACbd64338B",
    //         pair: "0xc3e6D9f7a3A5E3e223356383C7C055Ee3F26A34F",
    //         rewards: "0x1CDa572A66D639Be05f6b951fcE776F2D75B2d60"
    //     },
    //     vaultName: "Trader Joe AVAX/AAVE.e",
    //     rewardToken: "JOE",
    //     LPtoken: "JLP",
    //     protocol: "traderjoe",
    //     amm: "traderjoe",
    //     farmType: "MC",
    //     logo: "traderjoe.png",
    //     farmLink: "https://analytics.traderjoexyz.com/pairs/0xc3e6d9f7a3a5e3e223356383c7c055ee3f26a34f",
    //     decimals: 4,
    //     type: "lp",
    //     decomm: true
    // },
    { // Trader Joe xJOE => JOE Vault
        addresses: {
            vault: "0x04E6F23217C13E1dfE54ee80fb96F7ECC90116Fe",
            strategy: "0x04E6F23217C13E1dfE54ee80fb96F7ECC90116Fe",
            pair: "0x57319d41F71E81F3c65F2a47CA4e001EbAFd4F33",
            rewards: "0x8f8159332cB9B4a19712685DdAE2eda1380D0C89"
        },
        vaultName: "Trader Joe xJOE",
        rewardToken: "JOE",
        LPtoken: "xJOE",
        protocol: "traderjoe",
        amm: "traderjoe",
        farmType: "MC",
        logo: "traderjoe.png",
        farmLink: "https://www.traderjoexyz.com/#/stake",
        nonGeneric: true,
        type: "single",
        decomm: true
    },
    // { // Trader Joe AVAX/TEDDY => JOE Vault
    //     addresses: {
    //         vault: "0x72FBFf9056C3b483413929E8514e2A792cf83A8c",
    //         strategy: "0xfFb07a480861c989Fd1Cc5B3f083C087f59C9171",
    //         pair: "0x91f0963873bbcA2e58d21bB0941c0D859Db3ca31",
    //         rewards: "0xbCDC0F7AF5FC1e746c5730d421BF986BAcf4Ce83"
    //     },
    //     vaultName: "Trader Joe AVAX/TEDDY",
    //     rewardToken: "JOE",
    //     LPtoken: "JLP",
    //     protocol: "traderjoe",
    //     amm: "traderjoe",
    //     farmType: "MC",
    //     logo: "traderjoe.png",
    //     farmLink: "https://analytics.traderjoexyz.com/pairs/0x91f0963873bbcA2e58d21bB0941c0D859Db3ca31",
    //     type: "lp",
    //     decomm: true
    // },
    // { // Trader Joe AVAX/TSD => JOE Vault
    //     addresses: {
    //         vault: "0xDf4c29B702BDeff2Ec5c9b0adB287ff5B3bC2af3",
    //         strategy: "0x405a162fF86059E1d4c89ea474E28c47DE2267EF",
    //         pair: "0x2d16af2D7f1edB4bC5DBAdF3ffF04670B4BcD0BB",
    //         rewards: "0x1a5f645EF3DC751C4DE18d4555f84aA497969315"
    //     },
    //     vaultName: "Trader Joe AVAX/TSD",
    //     rewardToken: "JOE",
    //     LPtoken: "JLP",
    //     protocol: "traderjoe",
    //     amm: "traderjoe",
    //     farmType: "MC",
    //     logo: "traderjoe.png",
    //     farmLink: "https://analytics.traderjoexyz.com/pairs/0x2d16af2D7f1edB4bC5DBAdF3ffF04670B4BcD0BB",
    //     type: ["stables","lp"],
    //     decomm: true
    // },
    // { // Pangolin PNG => AVAX Vault
    //     addresses: {
    //         vault: "0x8AdEaddcB00F4ea34c7EB0B4d48Bff8de0a39244",
    //         strategy: "0x8AdEaddcB00F4ea34c7EB0B4d48Bff8de0a39244",
    //         pair: "0x60781C2586D68229fde47564546784ab3fACA982",
    //         rewards: "0xF6D666045832c0b9f6583386aC31b602d66d8536"
    //     },
    //     vaultName: "Pangolin PNG",
    //     rewardToken: "AVAX",
    //     LPtoken: "PNG",
    //     protocol: "pangolin",
    //     amm: "pangolin",
    //     farmType: "SR",
    //     logo: "pangolin.jpg",
    //     farmLink: "https://app.pangolin.exchange/#/stake/0/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    //     nonGeneric: true,
    //     type: "single",
    //     decomm: true
    // },
    { // Lydia AVAX/CYCLE => LYD Vault
        addresses: {
            vault: "0x724ba8a684BB5004ecEAfe3969483a09cb71AeA8",
            strategy: "0x5A2f5162539BB24d1200C939645631c9cE54Aa96",
            pair: "0x234285bEf3a95479F3432e1AD2b396b76Bf4E4D2",
            rewards: "0x2B54EFfF12b27C1A4C417361E3Aa0f827BB66052"
        },
        vaultName: "Lydia AVAX/CYCLE",
        rewardToken: "LYD",
        LPtoken: "Lydia LP",
        protocol: "lydia",
        amm: "lydia",
        farmType: "MC",
        logo: "lydia.png",
        farmLink: "https://info.lydia.finance/#/pair/0x234285bef3a95479f3432e1ad2b396b76bf4e4d2",
        type: ["cycle","lp"],
        decomm: true
    },
    { // Avaware AUSD/USDC.e => AVE Vault
        addresses: {
            vault: "0x88DB7ae5C4B0EbFa5F474168A4e8a3886fDF4662",
            strategy: "0x84965dB648845E38c2A3D50A869C92374492fe2C",
            pair: "0x236548d895c7f82311b6d55909e5A242566fdc30",
            rewards: "0x645de72dF22780A3712830814918c6d0d481C1aE"
        },
        vaultName: "Avaware AUSD/USDC.e",
        rewardToken: "AVE",
        LPtoken: "PGL",
        protocol: "avaware",
        amm: "pangolin",
        farmType: "SR",
        logo: "avaware.png",
        farmLink: "https://info.pangolin.exchange/#/pair/0x236548d895c7f82311b6d55909e5A242566fdc30",
        type: ["stables","lp"],
        decimals: 10,
        lpOnly: true
    }
];

export default productionVaults;
