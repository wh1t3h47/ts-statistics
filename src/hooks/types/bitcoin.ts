export interface BitcoinData {
    status: Status
    data: Data[]
}

export interface Status {
    timestamp: string
    error_code: number
    error_message: any
    elapsed: number
    credit_count: number
    notice: any
    total_count: number
}

export interface Data {
    id: number
    name: string
    symbol: string
    slug: string
    num_market_pairs: number
    date_added: string
    tags: string[]
    max_supply?: number | null
    circulating_supply: number
    total_supply: number
    infinite_supply: boolean
    platform?: Platform | null
    cmc_rank: number
    self_reported_circulating_supply?: number | null
    self_reported_market_cap?: number | null
    tvl_ratio?: number | null
    last_updated: string
    quote: Quote
}

export interface Platform {
    id: number
    name: string
    symbol: string
    slug: string
    token_address: string
}

export interface Quote {
    USD: Usd
}

export interface Usd {
    price: number
    volume_24h: number
    volume_change_24h: number
    percent_change_1h: number
    percent_change_24h: number
    percent_change_7d: number
    percent_change_30d: number
    percent_change_60d: number
    percent_change_90d: number
    market_cap: number
    market_cap_dominance: number
    fully_diluted_market_cap: number
    tvl?: number | null
    last_updated: string
}
