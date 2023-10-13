export interface SenatorData {
    status: string
    copyright: string
    results: Result[]
}

interface Result {
    congress: string
    chamber: string
    num_results: number
    offset: number
    members: Member[]
}

export interface Member {
    id: string
    title: string
    short_title: string
    api_uri: string
    first_name: string
    middle_name?: string | null
    last_name: string
    suffix?: string | null
    date_of_birth: string
    gender: string
    party: string
    leadership_role?: string | null
    twitter_account?: string | null
    facebook_account?: string | null
    youtube_account?: string | null
    govtrack_id: string
    cspan_id?: string | null
    votesmart_id?: string | null
    icpsr_id: string
    crp_id?: string | null
    google_entity_id: string
    fec_candidate_id: string
    url: string
    rss_url?: string | null
    contact_form?: string | null
    in_office: boolean
    cook_pvi: any
    dw_nominate?: number | null
    ideal_point: any
    seniority: string
    next_election?: string | null
    total_votes: number
    missed_votes: number
    total_present: number
    last_updated: string
    ocd_id: string
    office?: string | null
    phone?: string | null
    fax?: string | null
    state: string
    senate_class: string
    state_rank: string
    lis_id: string
    missed_votes_pct: number
    votes_with_party_pct: number
    votes_against_party_pct: number
}
