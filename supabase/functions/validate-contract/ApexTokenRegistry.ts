
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
