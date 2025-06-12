export interface ApexTokenInfo {
  type: 'native' | 'wrapped';
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  chainId: number;
  logoURI: string;
  tags: string[];
  wrapperAddress?: string;
  underlyingToken?: {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
  };
}

export class ApexTokenRegistry {
  private static tokens: Map<string, ApexTokenInfo> = new Map();
  private static wrapperToUnderlying: Map<string, string> = new Map();
  private static underlyingToWrapper: Map<string, string> = new Map();

  static {
    this.initializeRegistry();
  }

  private static initializeRegistry() {
    const tokenData: ApexTokenInfo[] = [
      {
        "type": "native",
        "address": "0xd428a6135C2286438dA1473BfCe2d95c99570ec2",
        "name": "$DMV",
        "symbol": "aDMV",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreigprbww7fqsvtqq3oulwom37jxxlxwhsxmgz45rrmhqrrllasxkoa",
        "tags": []
      },
      {
        "type": "native",
        "address": "0xa8AB3fe610086e81819e1eCE6Ac7eBf2576c6EEb",
        "name": "$DwayneElizondoMountainDewHerbertCamacho2024",
        "symbol": "CAMACHO",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreiamsuprwisafpkak4zle3n5ncu7sbzwsrfook5qfajuyp6xldwnq4",
        "tags": []
      },
      {
        "type": "wrapped",
        "address": "0x299e57930c42b43caDCd2ab4a43c5b034C821364",
        "name": "a Blub",
        "symbol": "aBLUB",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreieyfe3hdklfv54f3v74ux3av3hzjnlskoyqoymmpnh6nd3njrkw74",
        "tags": [],
        "wrapperAddress": "0xf4a9472cf47DAAebb87f9492bB64bACCEeD4FAd4",
        "underlyingToken": {
          "address": "0x0f669808d88B2b0b3D23214DCD2a1cc6A8B1B5cd",
          "name": "Blub",
          "symbol": "BLUB",
          "decimals": 18
        }
      },
      {
        "type": "wrapped",
        "address": "0x4df0a045323A36ec178db44E159A3B2Ed037DDc3",
        "name": "a yellow ket ",
        "symbol": "aKET",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreiep7ybaqa5sqa2g5moocy3blz3xlojv5otmoa2h56eir5geqgz5pu",
        "tags": [],
        "wrapperAddress": "0xa27181D721d9c582540B7Fd44904af30c1a975A8",
        "underlyingToken": {
          "address": "0xFFFF003a6BAD9b743d658048742935fFFE2b6ED7",
          "name": "yellow ket",
          "symbol": "KET",
          "decimals": 18
        }
      },
      {
        "type": "wrapped",
        "address": "0x85BBC902BB8651F55dA8f807399D064dc9C37C84",
        "name": "ACOQINU",
        "symbol": "aCOQ",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreidnacitjeb6tkqdyfyrgbtqd4d7wowkh4h4iqhnygzforkicfy64y",
        "tags": [],
        "wrapperAddress": "0x3d5a1C75662C28632F89B01595D550F1c0Ed86e1",
        "underlyingToken": {
          "address": "0x420FcA0121DC28039145009570975747295f2329",
          "name": "COQINU",
          "symbol": "COQ",
          "decimals": 18
        }
      },
      {
        "type": "native",
        "address": "0x1Bd744780607E4bd79A9e669AeA311AE4aCB19e0",
        "name": "ADDICTED TO AVAX",
        "symbol": "ADDICTED",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreig54jqnyocb2hvgapqhandsutkdquvhcttk3h2uy7o2xg4mh3i4ee",
        "tags": []
      },
      {
        "type": "wrapped",
        "address": "0x5B5913EeC2031c9D8383e3afCfd269217E481ce1",
        "name": "Apex Wrapped AUSD",
        "symbol": "aAUSD",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreiauebb5fulzsjtzdtqo2tqzbiwlix45neuou5ku7pqc6s2zz5oqiu",
        "tags": ["bluechip"],
        "wrapperAddress": "0x26ab72d5F5bDCf68e3469ecFE19029e53C3124d5",
        "underlyingToken": {
          "address": "0x00000000eFE302BEAA2b3e6e1b18d08D69a9012a",
          "name": "AUSD",
          "symbol": "AUSD",
          "decimals": 6
        }
      },
      {
        "type": "wrapped",
        "address": "0x5fACC8c76896e1958B2EFDb903Fb12505Fa26461",
        "name": "Apex Wrapped Ether",
        "symbol": "awETH.e",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreicoeahfu4cu222nykkphrk2sulppxge7plkokts7vrqyqt7vvqyni",
        "tags": ["bluechip"],
        "wrapperAddress": "0x1f6C7EF97286a4a93DeB2AC6c1251628d6F8e50F",
        "underlyingToken": {
          "address": "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
          "name": "Wrapped Ether",
          "symbol": "WETH.e",
          "decimals": 18
        }
      },
      {
        "type": "wrapped",
        "address": "0x18E0155C8Dbd145bd8ebd32BC4CCCdd2Fa25A649",
        "name": "Apex Wrapped GoGoPool Liquid Staking Token",
        "symbol": "aggAVAX",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreigeih7erclkwxqn5w6d54nnaprvkzpv4g5e6dgcu57xwkmjgb7bha",
        "tags": ["bluechip"],
        "wrapperAddress": "0x737805FdE929E5DeD9266C481926c34f076a2E68",
        "underlyingToken": {
          "address": "0xA25EaF2906FA1a3a13EdAc9B9657108Af7B703e3",
          "name": "GoGoPool Liquid Staking Token",
          "symbol": "ggAVAX",
          "decimals": 18
        }
      },
      {
        "type": "wrapped",
        "address": "0x65FCc099643919184946E844cA484F6988E053f0",
        "name": "Apex Wrapped PHARAOH",
        "symbol": "aPHAR",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreigfqp3q5fsz2ughfhzt7jgfwemzv76boablwnfs7mfgrtiohrk7eq",
        "tags": ["bluechip"],
        "wrapperAddress": "0xae3f013D863A5Ce7a3A6652E06c44861E91B47A0",
        "underlyingToken": {
          "address": "0xAAAB9D12A30504559b0C5a9A5977fEE4A6081c6b",
          "name": "PHARAOH",
          "symbol": "PHAR",
          "decimals": 18
        }
      },
      {
        "type": "wrapped",
        "address": "0x9a25d82D48766f72AbeF1Ebb3F3225c05aF70736",
        "name": "Apex Wrapped Staked AVAX",
        "symbol": "asAVAX",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreieedrqr7qifd5y3hm6m4zmpeyncxai5h7ri65jvhaqwavli3wpvm4",
        "tags": ["bluechip"],
        "wrapperAddress": "0x0133a82C4a2Ec404eA61529C45eE15B08D374bFf",
        "underlyingToken": {
          "address": "0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE",
          "name": "Staked AVAX",
          "symbol": "sAVAX",
          "decimals": 18
        }
      },
      {
        "type": "wrapped",
        "address": "0x9Fa9B0ffF6AAedf635b9a52e0Cc4661eff92C15e",
        "name": "Apex Wrapped TetherToken",
        "symbol": "aUSDt",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreid5otxyaxgxyddgprwfdpyf4sahzfus7565dhyogtqrcuyb4j56re",
        "tags": ["bluechip"],
        "wrapperAddress": "0x9Dcde306a41615296A36eB5a93399969d08BE6C4",
        "underlyingToken": {
          "address": "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
          "name": "TetherToken",
          "symbol": "USDt",
          "decimals": 6
        }
      },
      {
        "type": "wrapped",
        "address": "0x4DF08C8f17fB7BC1261CD308b049DfCe59F5dC9a",
        "name": "Apex Wrapped USD Coin",
        "symbol": "aUSDC",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreidkor4vt3n2kp3jqyiv6vqw6ser27twkq5kevoxho3zxfelyuwrbm",
        "tags": ["bluechip"],
        "wrapperAddress": "0x77cB12D513e120248cE622f08E26E09fFe9E8573",
        "underlyingToken": {
          "address": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
          "name": "USD Coin",
          "symbol": "USDC",
          "decimals": 6
        }
      },
      {
        "type": "wrapped",
        "address": "0xCbC002DD50a9C2A44637B4C9A189F291f72813fD",
        "name": "Bitcoin",
        "symbol": "aBTC.b",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreibgsyjgx2gm7c2cc56xnprhimac7jwhcurtyjmpulmckkcrgpkpoi",
        "tags": ["bluechip"],
        "wrapperAddress": "0x84E8730cdDD44a8Fe8993bb46602ab3c7Bc9312c",
        "underlyingToken": {
          "address": "0x152b9d0FdC40C096757F570A51E494bd4b943E50",
          "name": "Bitcoin",
          "symbol": "BTC.b",
          "decimals": 8
        }
      },
      {
        "type": "native",
        "address": "0x98B172A09102869adD73116FC92A0A60BFF4778F",
        "name": "APEX",
        "symbol": "APEX",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreifscjcl6hogsijmciezepy4ylwkaql3strhskhb6mro3ettymcsea",
        "tags": ["bluechip"]
      },
      {
        "type": "native",
        "address": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
        "name": "Avalanche",
        "symbol": "AVAX",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "/images/avalanche.svg",
        "tags": ["bluechip"]
      },
      {
        "type": "native",
        "address": "0xbbE4ecE3Cd7Bdf712203D57b9Ac266D9aA0Fee91",
        "name": "RockTAVAX ",
        "symbol": "$ROCKET ",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreibfx4e3le5f6t6yeggb6rbmpbhmnk3wzewxmtnunxjkxdu2xyccqe",
        "tags": []
      },
      {
        "type": "native",
        "address": "0x9DC263968b22443d27D20e2e2d4aE70c26424116",
        "name": "Rog",
        "symbol": "ROG",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreicvwb7z3dhp3npyss7xrvdxbwwjg6tbw3b4snhhqcx2hvtr5xaq7q",
        "tags": []
      },
      {
        "type": "native",
        "address": "0x88886A1D74985247D7463CbBe3F7a3ef8DBacb61",
        "name": "SHOOP DA WHOOP",
        "symbol": "SHOOP",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreifrzhae2nbkv5udiiewp456nm5r7zlz53ee777p2qp3pmv34o4eci",
        "tags": []
      },
      {
        "type": "native",
        "address": "0x3D95994F45514487AdCfa976deE2F3f601a1b338",
        "name": "SLURFY",
        "symbol": "SLFY",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreihqnyoih72iyqc6qivec3vienaj5f54t5ywjsnvuwiouxgespy6b4",
        "tags": []
      },
      {
        "type": "native",
        "address": "0x02789C830cca0F431749CEAfFC80c37eB68e7940",
        "name": "Snowdog",
        "symbol": "SDOG",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreigblpjgeoz7a5s55sheo3iuhh7xlzzjpamzfzuse463kvhvo2eyrq",
        "tags": []
      },
      {
        "type": "native",
        "address": "0xBEd8E312Bcb5C5a283e0030449c254F4c59C092E",
        "name": "Sock Wif Benefits",
        "symbol": "SOCK",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreih7eqmqkyhwhygvrzk7ky4oe3sdiyc5qpmdusp7bedwvtim33rzeq",
        "tags": []
      },
      {
        "type": "native",
        "address": "0x15667e2833D1b887993c101525dCDA5227e3D97e",
        "name": "Stick Inu",
        "symbol": "STINU",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreic7bqjpkxdbayuacgo4bc65kdr7up5pr3vhcjakr5xx26h6enucxi",
        "tags": []
      },
      {
        "type": "native",
        "address": "0xf8e4c00a8D8ae27043E4B853Dec33F2984cDeef2",
        "name": "Supa",
        "symbol": "SUPA",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreias4bm4nieegkc7dmqizhedzc74dt46d2q2bnnki6y4blz6r7ls24",
        "tags": []
      },
      {
        "type": "wrapped",
        "address": "0x381f7fA5d842731F8416F956c3fb8FF3D6b197dA",
        "name": "TECH Improving",
        "symbol": "$TECH",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreih6alat73j42br7jglgjyphzh6lwc6a4lpn5qe7qc7fzubzjawnyi",
        "tags": [],
        "wrapperAddress": "0xc6aAe6d64A3455ACb6125a2EcF6b58e3054d941b",
        "underlyingToken": {
          "address": "0x5Ac04b69bDE6f67C0bd5D6bA6fD5D816548b066a",
          "name": "NumberGoUpTech",
          "symbol": "TECH",
          "decimals": 18
        }
      },
      {
        "type": "native",
        "address": "0x3083b20FF79aA760777Ff6883438B0Dc5e0dAB60",
        "name": "TECH Improving",
        "symbol": "aTECH",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreih6alat73j42br7jglgjyphzh6lwc6a4lpn5qe7qc7fzubzjawnyi",
        "tags": []
      },
      {
        "type": "wrapped",
        "address": "0xC4A1B521537A5A5e7d28baCc948DE2E3168AC289",
        "name": "TECH Improving",
        "symbol": "aTECH",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreih6alat73j42br7jglgjyphzh6lwc6a4lpn5qe7qc7fzubzjawnyi",
        "tags": [],
        "wrapperAddress": "0x694c4C178B69d6F9b9348101ac4162a1D6A1e33d",
        "underlyingToken": {
          "address": "0x5Ac04b69bDE6f67C0bd5D6bA6fD5D816548b066a",
          "name": "NumberGoUpTech",
          "symbol": "TECH",
          "decimals": 18
        }
      },
      {
        "type": "native",
        "address": "0x944AE4704F17577cc0C1299945d1A84a1927A10B",
        "name": "TEQUILA CAT",
        "symbol": "TEQCAT",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreicipdvgzuqs5xsmn4bi6cfccunyb6dst6s4yayfxqgvr3shax6myq",
        "tags": []
      },
      {
        "type": "native",
        "address": "0xc5A431B35eF7f485328cd19250e6956d8cEf5683",
        "name": "The Juice on Avax",
        "symbol": "Juice V2",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreiedpm5k6nig4kv3fol4mbrlgjpmu5vztyvjttud2bf77wfke2w6vm",
        "tags": []
      },
      {
        "type": "native",
        "address": "0xA2DE3f5251883CC1810efd7C7BfAaDa12372a018",
        "name": "The Juice On Avax",
        "symbol": "Juice",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreiam5ecqqexjmsmq26wf4wczddgrobgcizdrio7iewettg32lnbfsa",
        "tags": []
      },
      {
        "type": "native",
        "address": "0xe81A9A5A369C340B879f72cD6775Bc2376C90DF8",
        "name": "The Juice On Avax ",
        "symbol": "JUICE",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreib3wj46vwbjk6cqymnn6xdzn7pj3yizxqa5triiz25r7knxx6b65u",
        "tags": []
      },
      {
        "type": "native",
        "address": "0xFb4960583724561cA7A347c5d013f77e664B266C",
        "name": "Trump",
        "symbol": "TR3MP",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreiemfk4l3r24cgxobllsrwh45oelipmd7ddspbgohd73nwub7oytqm",
        "tags": []
      },
      {
        "type": "native",
        "address": "0xCbd5780f7476604db30efa9C0b96A512Ba562E2d",
        "name": "Trumpster",
        "symbol": "Trumpster",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreifsu7veduhkvrkbu5zki32op26e3bjo6y76nlfk35vgb6tdpyfkgu",
        "tags": []
      },
      {
        "type": "native",
        "address": "0x448Ed030A8C377328159DA6ec66d5aEd3FBdb8Fa",
        "name": "Uncle Bob  ",
        "symbol": "UNCLE",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreiffdaawn6qxqpvnvyzfsi4dfi5b5d2nosgf7et4fmsfmfr4ct4clm",
        "tags": []
      },
      {
        "type": "native",
        "address": "0x588B8B827C2C161430dbfF83Fe6F40F57DA7d1AA",
        "name": "WENJASON",
        "symbol": "WENJ",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreiaflfofomydnc6wes6pnn465yb63427meqslgeb224uhsxo6apmsq",
        "tags": []
      },
      {
        "type": "native",
        "address": "0x229d5152f13539Dd861Ae5D1D16c5626A6F9AC61",
        "name": "What Can Be ",
        "symbol": "HARRIS",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreid7e66ej54bq2aenlfsfztfgcfpb5baq33hp4zt3zs2wrp4wfpsae",
        "tags": []
      },
      {
        "type": "wrapped",
        "address": "0x0F83F86D32e9bb1fc912F6C611579682A8D0C1fC",
        "name": "Wink",
        "symbol": "aWINK",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreig3jugjknu3apfzej3ncdukaiehamhafisdmxb5e2ut5xygbyozou",
        "tags": [],
        "wrapperAddress": "0xF321c3fE3887eE9097c7B02123f7895A6a39e733",
        "underlyingToken": {
          "address": "0x7698A5311DA174A95253Ce86C21ca7272b9B05f8",
          "name": "Wink",
          "symbol": "WINK",
          "decimals": 18
        }
      },
      {
        "type": "wrapped",
        "address": "0xBf835b8c4543DAeE8BB3BDb54ce1AF8bCEAe176D",
        "name": "Apex Wrapped Emini Spaghettini",
        "symbol": "aEMINI",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafybeiaahhohuquyskmzbwagm2vutpwj4shyvosan4umjer3y57wq4r4ai",
        "tags": [],
        "wrapperAddress": "0x69e852291aE462ABb2Fd708D81f4a6A34A87143B",
        "underlyingToken": {
          "address": "0x8cF71B4f445A47f234A0Dc61034708A4087bead0",
          "name": "Emini Spaghettini",
          "symbol": "EMINI",
          "decimals": 18
        }
      },
      {
        "type": "wrapped",
        "address": "0xdA5d3f44652C6671748ba66EfAFB8BA18DB00947",
        "name": "Apex Wrapped Erol Musk",
        "symbol": "sEROL",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreifzkyynb4t66nz3wbcc3sdffz4rpeeeq5dbigxtsbkcdcugexjidi",
        "tags": [],
        "wrapperAddress": "0x0980861fD8088AB937Dc4ac9c27aA7685118b3DA",
        "underlyingToken": {
          "address": "0xCaC4904E1DB1589Aa17A2Ec742F5a6bCF4c4D037",
          "name": "Erol Musk",
          "symbol": "EROL",
          "decimals": 18
        }
      },
      {
        "type": "wrapped",
        "address": "0x1C7B3Fc72018AD4688AE7a20f949e8c681aaD39A",
        "name": "Apex Wrapped Magic Internet Money",
        "symbol": "aMIM",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreidlgbwoupiy2el5ig2nerk7hd6vsqkba4yqkgwxf7kqoc6fe5t2bm",
        "tags": [],
        "wrapperAddress": "0x28F699F63324f9FA09515C0D7642108a1fad020c",
        "underlyingToken": {
          "address": "0x8D8B084269f4b2Ad111b60793e9f3577A7795605",
          "name": "Magic Internet Money",
          "symbol": "MIM",
          "decimals": 18
        }
      },
      {
        "type": "wrapped",
        "address": "0x19b7Cc0AF65Bd5557c24307e326eD4dFB07f4fed",
        "name": "Apex Wrapped PHARM",
        "symbol": "aPHARM",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreiad6ounncmqxpshxcbjgtsaz6l7cfy265ihmi4flttcnolm5sulbi",
        "tags": [],
        "wrapperAddress": "0xD714f26E6d0bB8de4e70e00F77932fCA77fba4eC",
        "underlyingToken": {
          "address": "0x91a1C5a6001e6Aa628f49094658C65A19794D7f6",
          "name": "PHARM",
          "symbol": "PHARM",
          "decimals": 18
        }
      },
      {
        "type": "wrapped",
        "address": "0x04302672Bdb4F7b90d99e0F6Ea932EF5aD3B4416",
        "name": "Apex Wrapped LAMBO",
        "symbol": "aLAMBO",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreie4aqote2ywqonov4xrx4qdi3cmsaiwqoctm66yitdp2gs2twbow4",
        "tags": [],
        "wrapperAddress": "0x7e41260Fc1946826a30A2427C7232E3240811B5d",
        "underlyingToken": {
          "address": "0x6F43fF77A9C0Cf552b5b653268fBFe26A052429b",
          "name": "LAMBO",
          "symbol": "LAMBO",
          "decimals": 18
        }
      },
      {
        "type": "native",
        "address": "0xa43f06724E10561Ea416ad7438CCFC94f486374F",
        "name": "xAPEX",
        "symbol": "xAPEX",
        "decimals": 18,
        "chainId": 43114,
        "logoURI": "ipfs://bafkreidrcggbprhfjyqyfhs5w3hmsmrki2s63bi2ekhonsalofqkwh3ayu",
        "tags": ["bluechip"]
      },
      {
        "type": "native",
        "address": "0x2468a9B0fD297CA7411aF891b5C86A212fD2a519",
        "name": "APEX",
        "symbol": "APEX",
        "decimals": 18,
        "chainId": 43113,
        "logoURI": "ipfs://bafkreifscjcl6hogsijmciezepy4ylwkaql3strhskhb6mro3ettymcsea",
        "tags": []
      }
    ];

    // Initialize maps for fast lookups
    for (const token of tokenData) {
      const address = token.address.toLowerCase();
      this.tokens.set(address, token);
      
      if (token.type === 'wrapped' && token.wrapperAddress && token.underlyingToken) {
        const wrapperAddr = token.wrapperAddress.toLowerCase();
        const underlyingAddr = token.underlyingToken.address.toLowerCase();
        
        this.wrapperToUnderlying.set(wrapperAddr, underlyingAddr);
        this.underlyingToWrapper.set(underlyingAddr, wrapperAddr);
      }
    }

    console.log(`Initialized Apex Token Registry with ${this.tokens.size} tokens`);
  }

  static getTokenByAddress(address: string): ApexTokenInfo | null {
    return this.tokens.get(address.toLowerCase()) || null;
  }

  static getWrapperByUnderlying(underlyingAddress: string): string | null {
    return this.underlyingToWrapper.get(underlyingAddress.toLowerCase()) || null;
  }

  static getUnderlyingByWrapper(wrapperAddress: string): string | null {
    return this.wrapperToUnderlying.get(wrapperAddress.toLowerCase()) || null;
  }

  static findTokensBySymbol(symbol: string): ApexTokenInfo[] {
    const results: ApexTokenInfo[] = [];
    for (const token of this.tokens.values()) {
      if (token.symbol.toLowerCase().includes(symbol.toLowerCase())) {
        results.push(token);
      }
    }
    return results;
  }

  static getAllTokens(): ApexTokenInfo[] {
    return Array.from(this.tokens.values());
  }

  static getBluechipTokens(): ApexTokenInfo[] {
    return Array.from(this.tokens.values()).filter(token => 
      token.tags.includes('bluechip')
    );
  }

  static hasToken(address: string): boolean {
    return this.tokens.has(address.toLowerCase());
  }
}
